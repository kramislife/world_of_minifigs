import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getDashboardStats = catchAsyncErrors(async (req, res, next) => {
  // Get current date and last month's date
  const currentDate = new Date();
  const lastMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );

  // Get total sales and orders
  const [totalSales, totalOrders] = await Promise.all([
    Order.aggregate([
      { $match: { orderStatus: { $ne: "Cancelled" } } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]),
    Order.countDocuments({ orderStatus: { $ne: "Cancelled" } }),
  ]);

  // Get total products
  const totalProducts = await Product.countDocuments();

  // Get total users (customers only)
  const totalUsers = await User.countDocuments({ role: "customer" });

  // Get total refunds
  const totalRefunds = await Order.countDocuments({
    orderStatus: "Cancelled",
    "paymentInfo.status": "Refunded",
  });

  // Get payment methods statistics
  const paymentStats = await Order.aggregate([
    { $match: { orderStatus: { $ne: "Cancelled" } } },
    {
      $group: {
        _id: "$paymentInfo.method",
        count: { $sum: 1 },
        total: { $sum: "$totalPrice" },
      },
    },
    { $sort: { count: -1 } },
  ]);

  // Calculate total number of orders for percentage
  const totalSuccessfulOrders = paymentStats.reduce(
    (acc, curr) => acc + curr.count,
    0
  );

  // Format payment methods data with percentages
  const paymentMethods = paymentStats.map((method) => ({
    method: method._id,
    count: method.count,
    total: method.total,
    percentage: ((method.count / totalSuccessfulOrders) * 100).toFixed(1),
  }));

  // Get the most popular payment method
  const popularPayment =
    paymentMethods.length > 0
      ? {
          method: paymentMethods[0].method,
          percentage: paymentMethods[0].percentage,
          breakdown: paymentMethods,
        }
      : {
          method: "N/A",
          percentage: "0",
          breakdown: [],
        };

  // Calculate growth rates (comparing with last month)
  const lastMonthStats = await Promise.all([
    Order.aggregate([
      {
        $match: {
          orderStatus: { $ne: "Cancelled" },
          createdAt: { $gte: lastMonth, $lt: currentDate },
        },
      },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]),
    Order.countDocuments({
      orderStatus: { $ne: "Cancelled" },
      createdAt: { $gte: lastMonth, $lt: currentDate },
    }),
  ]);

  // Get monthly sales data dynamically based on first order date
  const monthlySales = await Order.aggregate([
    {
      $match: {
        orderStatus: { $ne: "Cancelled" },
      },
    },
    {
      $group: {
        _id: null,
        firstOrder: { $min: "$createdAt" },
        lastOrder: { $max: "$createdAt" },
      },
    },
  ]).then(async ([timeRange]) => {
    if (!timeRange) return [];

    const startDate = timeRange.firstOrder;
    const endDate = timeRange.lastOrder;

    return Order.aggregate([
      {
        $match: {
          orderStatus: { $ne: "Cancelled" },
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          total: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
      {
        $project: {
          _id: 0,
          month: {
            $let: {
              vars: {
                monthsInString: [
                  "",
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ],
              },
              in: { $arrayElemAt: ["$$monthsInString", "$_id.month"] },
            },
          },
          year: "$_id.year",
          monthNumber: "$_id.month",
          total: 1,
        },
      },
    ]);
  });

  // Fill in missing months between first and last order
  const fillMissingMonths = (salesData) => {
    if (!salesData || salesData.length === 0) return [];

    const firstSale = salesData[0];
    const lastSale = salesData[salesData.length - 1];
    const filledMonths = [];

    let currentDate = new Date(firstSale.year, firstSale.monthNumber - 1);
    const endDate = new Date(lastSale.year, lastSale.monthNumber - 1);

    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const monthName = new Date(year, month - 1, 1).toLocaleString("default", {
        month: "long",
      });

      const existingData = salesData.find(
        (m) => m.year === year && m.monthNumber === month
      );

      filledMonths.push({
        month: `${monthName} ${year}`,
        monthNumber: month,
        year: year,
        total: existingData ? existingData.total : 0,
      });

      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return filledMonths;
  };

  // Get the filled monthly sales data
  const filledMonthlySales = fillMissingMonths(await monthlySales);

  // Get current month and last month sales
  const currentMonthSales = await Order.aggregate([
    {
      $match: {
        orderStatus: { $ne: "Cancelled" },
        createdAt: {
          $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
          $lt: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            1
          ),
        },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$totalPrice" },
      },
    },
  ]);

  const lastMonthSales = await Order.aggregate([
    {
      $match: {
        orderStatus: { $ne: "Cancelled" },
        createdAt: {
          $gte: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            1
          ),
          $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
        },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$totalPrice" },
      },
    },
  ]);

  // Get 5 most recent orders
  const recentOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("user", "name email")
    .populate("orderItems.product", "product_name");

  // Get top selling products with both sales and quantity data
  const topProducts = await Order.aggregate([
    { $unwind: "$orderItems" },
    {
      $lookup: {
        from: "products",
        localField: "orderItems.product",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },
    {
      $lookup: {
        from: "colors",
        localField: "product.product_color",
        foreignField: "_id",
        as: "color",
      },
    },
    { $unwind: "$color" },
    {
      $group: {
        _id: {
          product: "$orderItems.product",
          color: "$color._id",
        },
        name: { $first: "$product.product_name" },
        color_name: { $first: "$color.name" },
        color_code: { $first: "$color.code" },
        totalSales: {
          $sum: {
            $multiply: ["$orderItems.discountedPrice", "$orderItems.quantity"],
          },
        },
        quantity: { $sum: "$orderItems.quantity" },
      },
    },
    { $sort: { totalSales: -1 } },
    { $limit: 10 },
    {
      $project: {
        _id: 0,
        name: 1,
        color_name: 1,
        color_code: 1,
        totalSales: { $round: ["$totalSales", 2] },
        quantity: 1,
      },
    },
  ]);

  // Get sales by category with proper lookup and population
  const categoryStats = await Order.aggregate([
    { $unwind: "$orderItems" },
    {
      $lookup: {
        from: "products",
        localField: "orderItems.product",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },
    {
      $lookup: {
        from: "categories",
        localField: "product.product_category",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: "$category" },
    {
      $group: {
        _id: "$category._id",
        name: { $first: "$category.name" },
        totalSales: {
          $sum: {
            $multiply: ["$orderItems.discountedPrice", "$orderItems.quantity"],
          },
        },
        totalOrders: { $sum: 1 },
        averageOrderValue: {
          $avg: {
            $multiply: ["$orderItems.discountedPrice", "$orderItems.quantity"],
          },
        },
      },
    },
    { $sort: { totalSales: -1 } },
    { $limit: 5 },
  ]);

  // Get sales by collection with proper lookup and population
  const collectionStats = await Order.aggregate([
    { $unwind: "$orderItems" },
    {
      $lookup: {
        from: "products",
        localField: "orderItems.product",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },
    {
      $lookup: {
        from: "collections",
        localField: "product.product_collection",
        foreignField: "_id",
        as: "collection",
      },
    },
    { $unwind: "$collection" },
    {
      $group: {
        _id: "$collection._id",
        name: { $first: "$collection.name" },
        totalSales: {
          $sum: {
            $multiply: ["$orderItems.discountedPrice", "$orderItems.quantity"],
          },
        },
        totalOrders: { $sum: 1 },
        averageOrderValue: {
          $avg: {
            $multiply: ["$orderItems.discountedPrice", "$orderItems.quantity"],
          },
        },
      },
    },
    { $sort: { totalSales: -1 } },
    { $limit: 5 },
  ]);

  // Get product performance metrics
  const productPerformance = await Order.aggregate([
    { $unwind: "$orderItems" },
    {
      $group: {
        _id: "$orderItems.product",
        name: { $first: "$orderItems.name" },
        salesVolume: { $sum: "$orderItems.quantity" },
        revenue: { $sum: "$orderItems.discountedPrice" },
        profitMargin: {
          $avg: {
            $multiply: [
              {
                $divide: [
                  {
                    $subtract: [
                      "$orderItems.discountedPrice",
                      "$orderItems.cost",
                    ],
                  },
                  "$orderItems.discountedPrice",
                ],
              },
              100,
            ],
          },
        },
      },
    },
    { $sort: { revenue: -1 } },
    { $limit: 10 },
  ]);

  // Get low stock products
  const lowStockProducts = await Product.find({ stock: { $lte: 5 } })
    .select("product_name stock")
    .limit(5)
    .sort({ stock: 1 })
    .then((products) =>
      products.map((p) => ({
        name: p.product_name,
        stock: p.stock,
      }))
    );

  // Get order status distribution
  const orderStatusCount = await Order.aggregate([
    {
      $facet: {
        // Count orders by status
        statusCounts: [
          {
            $group: {
              _id: "$orderStatus",
              count: { $sum: 1 },
            },
          },
        ],
        // Count delivered orders that need review
        toReviewCount: [
          {
            $match: {
              orderStatus: "Delivered",
              isReviewed: false,
            },
          },
          {
            $count: "count",
          },
        ],
        // Count delivered orders that are reviewed
        reviewedCount: [
          {
            $match: {
              orderStatus: "Delivered",
              isReviewed: true,
            },
          },
          {
            $count: "count",
          },
        ],
      },
    },
    {
      $project: {
        counts: {
          $arrayToObject: {
            $map: {
              input: "$statusCounts",
              as: "status",
              in: ["$$status._id", "$$status.count"],
            },
          },
        },
        toReviewCount: { $arrayElemAt: ["$toReviewCount.count", 0] },
        reviewedCount: { $arrayElemAt: ["$reviewedCount.count", 0] },
      },
    },
    {
      $project: {
        Pending: { $ifNull: ["$counts.Pending", 0] },
        Processing: { $ifNull: ["$counts.Processing", 0] },
        Shipped: { $ifNull: ["$counts.Shipped", 0] },
        Delivered: {
          $subtract: [
            { $ifNull: ["$counts.Delivered", 0] },
            { $ifNull: ["$toReviewCount", 0] },
          ],
        },
        "To Review": { $ifNull: ["$toReviewCount", 0] },
        Cancelled: { $ifNull: ["$counts.Cancelled", 0] },
        "On Hold": { $ifNull: ["$counts.On Hold", 0] },
        _id: 0,
      },
    },
  ]);

  // Get daily orders for the last 7 days
  const getDailyOrders = async () => {
    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6); // Go back 6 days to get 7 days total

    // Set times to start and end of day
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const dailyOrders = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Fill in any missing days with zero orders
    const filledDailyOrders = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateString = date.toISOString().split("T")[0];

      filledDailyOrders.push({
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        count:
          dailyOrders.find((order) => order._id === dateString)?.count || 0,
      });
    }

    return filledDailyOrders;
  };

  // Get customer type statistics
  const customerStats = await User.aggregate([
    {
      $match: { role: "customer" }, // Only consider customers
    },
    {
      $lookup: {
        from: "orders",
        localField: "_id",
        foreignField: "user",
        as: "orders",
      },
    },
    {
      $project: {
        hasOrders: { $gt: [{ $size: "$orders" }, 0] }, // Has at least one order
        createdAt: 1,
        // New users are those created in last 30 days AND have no orders
        isNew: {
          $and: [
            {
              $gte: [
                "$createdAt",
                new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
              ],
            },
            { $eq: [{ $size: "$orders" }, 0] },
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        totalCustomers: { $sum: 1 },
        activeCustomers: { $sum: { $cond: ["$hasOrders", 1, 0] } },
        newCustomers: { $sum: { $cond: ["$isNew", 1, 0] } },
        // Inactive are those who are not new and have no orders
        inactiveCustomers: {
          $sum: {
            $cond: [
              {
                $and: [{ $not: "$hasOrders" }, { $not: "$isNew" }],
              },
              1,
              0,
            ],
          },
        },
      },
    },
  ]);

  // Get customer purchase metrics
  const purchaseMetrics = await Order.aggregate([
    {
      $match: {
        orderStatus: { $nin: ["Cancelled"] }, // Exclude cancelled orders
      },
    },
    {
      $group: {
        _id: "$user",
        orderCount: { $sum: 1 },
        totalSpent: { $sum: "$totalPrice" },
      },
    },
    {
      $facet: {
        customerCounts: [
          {
            $group: {
              _id: null,
              totalCustomers: { $sum: 1 },
              repeatCustomers: {
                $sum: { $cond: [{ $gt: ["$orderCount", 1] }, 1, 0] },
              },
              singleOrderCustomers: {
                $sum: { $cond: [{ $eq: ["$orderCount", 1] }, 1, 0] },
              },
            },
          },
        ],
        averageMetrics: [
          {
            $group: {
              _id: null,
              avgOrdersPerCustomer: { $avg: "$orderCount" },
              avgLifetimeValue: { $avg: "$totalSpent" },
            },
          },
        ],
      },
    },
    {
      $project: {
        metrics: { $arrayElemAt: ["$customerCounts", 0] },
        averages: { $arrayElemAt: ["$averageMetrics", 0] },
      },
    },
    {
      $project: {
        repeatCustomers: "$metrics.repeatCustomers",
        singleOrderCustomers: "$metrics.singleOrderCustomers",
        totalCustomers: "$metrics.totalCustomers",
        repeatRate: {
          $multiply: [
            {
              $divide: [
                "$metrics.repeatCustomers",
                { $max: ["$metrics.totalCustomers", 1] },
              ],
            },
            100,
          ],
        },
        avgOrdersPerCustomer: { $round: ["$averages.avgOrdersPerCustomer", 2] },
        avgLifetimeValue: { $round: ["$averages.avgLifetimeValue", 2] },
      },
    },
  ]);

  const purchaseData = purchaseMetrics[0] || {
    repeatCustomers: 0,
    singleOrderCustomers: 0,
    totalCustomers: 0,
    repeatRate: 0,
    avgOrdersPerCustomer: 0,
    avgLifetimeValue: 0,
  };

  res.status(200).json({
    success: true,
    totalSales: totalSales[0]?.total || 0,
    totalOrders,
    totalProducts,
    totalUsers,
    totalRefunds,
    popularPayment,
    salesGrowth: calculateGrowth(
      totalSales[0]?.total || 0,
      lastMonthStats[0]?.[0]?.total || 0
    ),
    ordersGrowth: calculateGrowth(totalOrders, lastMonthStats[1] || 0),
    monthlySales: filledMonthlySales,
    currentMonthSales: currentMonthSales[0]?.total || 0,
    lastMonthSales: lastMonthSales[0]?.total || 0,
    recentOrders,
    topProducts,
    categoryStats: categoryStats.map((cat) => ({
      ...cat,
      totalSales: parseFloat(cat.totalSales.toFixed(2)),
      averageOrderValue: parseFloat(cat.averageOrderValue.toFixed(2)),
    })),
    collectionStats: collectionStats.map((col) => ({
      ...col,
      totalSales: parseFloat(col.totalSales.toFixed(2)),
      averageOrderValue: parseFloat(col.averageOrderValue.toFixed(2)),
    })),
    productPerformance,
    lowStockProducts,
    orderStatusCount: orderStatusCount[0],
    dailyOrders: await getDailyOrders(),
    customerStats: customerStats[0] || {
      totalCustomers: 0,
      activeCustomers: 0,
      inactiveCustomers: 0,
      newCustomers: 0,
    },
    purchaseMetrics: {
      ...purchaseData,
      repeatRate: Number(purchaseData.repeatRate.toFixed(1)),
    },
  });
});

const calculateGrowth = (current, previous) => {
  if (!previous) return 0;
  return (((current - previous) / previous) * 100).toFixed(1);
};

import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getDashboardStats = catchAsyncErrors(async (req, res, next) => {
  // Get current date and last month's date
  const currentDate = new Date();
  const firstDayOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const firstDayOfLastMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );
  const firstDayOfNextMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    1
  );

   // Add greeting logic
   const getGreeting = (hour) => {
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Add formatted date and time
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(currentDate);

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(currentDate);

  // Add navigation tabs data
  const navigationTabs = [
    {
      id: "overview",
      label: "Analytical Overview",
      icon: "LayoutDashboard",
    },
    {
      id: "products",
      label: "Product Analytics",
      icon: "Package2",
    },
    {
      id: "orders",
      label: "Order Analytics",
      icon: "ShoppingCart",
    },
    {
      id: "customers",
      label: "Customer Analytics",
      icon: "Users",
    },
  ];

  // -------------------------------- Stat Cards -------------------------------- //
  // Get current month and last month orders
  const [currentMonthOrders, lastMonthOrders] = await Promise.all([
    Order.countDocuments({
      orderStatus: { $ne: "Cancelled" },
      createdAt: {
        $gte: firstDayOfCurrentMonth,
        $lt: firstDayOfNextMonth,
      },
    }),
    Order.countDocuments({
      orderStatus: { $ne: "Cancelled" },
      createdAt: {
        $gte: firstDayOfLastMonth,
        $lt: firstDayOfCurrentMonth,
      },
    }),
  ]);

  // Get total sales and orders
  const [totalSales, totalOrders] = await Promise.all([
    Order.aggregate([
      { $match: { orderStatus: { $ne: "Cancelled" } } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]),
    Order.countDocuments(),
  ]);

  // Get total products and users
  const [totalProducts, totalUsers] = await Promise.all([
    Product.countDocuments(),
    User.countDocuments({ role: "customer" }),
  ]);

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

  const totalSuccessfulOrders = paymentStats.reduce(
    (acc, curr) => acc + curr.count,
    0
  );

  const paymentMethods = paymentStats.map((method) => ({
    method: method._id,
    count: method.count,
    total: method.total,
    percentage: ((method.count / totalSuccessfulOrders) * 100).toFixed(1),
  }));

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

  // -------------------------------- Sales Charts -------------------------------- //
  // Sales Chart Helper Functions
  const getGrowthDescription = (thisMonth, lastMonth, monthNames) => {
    if (!lastMonth && !thisMonth) return "Waiting for your first sale! 🚀";
    if (!lastMonth)
      return "Exciting times - your first month of sales data! 🎉";
    if (!thisMonth) return "Still waiting for sales this month 📊";

    const ratio = thisMonth / lastMonth;
    const percentChange = ((thisMonth - lastMonth) / lastMonth) * 100;
    const isPositive = percentChange > 0;

    // Format the month names
    const thisMonthName = monthNames[1]?.split(" ")[0] || "This month";
    const lastMonthName = monthNames[0]?.split(" ")[0] || "Last month";

    if (ratio >= 3) {
      const times = Math.round(ratio * 10) / 10;
      return `🚀 Exceptional growth! ${thisMonthName} skyrocketed to ${times}x ${lastMonthName}'s performance`;
    }
    if (ratio >= 2) {
      const times = Math.round(ratio * 10) / 10;
      return `💫 Outstanding! ${thisMonthName} doubled with ${times}x ${lastMonthName}'s sales`;
    }
    if (ratio >= 1.5 && ratio < 2) {
      return `📈 Impressive growth! ${thisMonthName} outperformed ${lastMonthName} by ${Math.abs(
        percentChange
      ).toFixed(1)}%`;
    }
    if (ratio > 1.05 && ratio < 1.5) {
      return `📈 Solid progress! ${thisMonthName} showed a ${Math.abs(
        percentChange
      ).toFixed(1)}% uptick from ${lastMonthName}`;
    }
    if (Math.abs(percentChange) <= 5) {
      return `📊 Maintaining stability: ${thisMonthName} performed similarly to ${lastMonthName}`;
    }
    if (ratio >= 0.5 && ratio < 0.95) {
      return `📉 Room for growth: ${thisMonthName} saw a ${Math.abs(
        percentChange
      ).toFixed(1)}% dip compared to ${lastMonthName}`;
    }
    if (ratio < 0.5) {
      const times = Math.round((1 / ratio) * 10) / 10;
      return `⚠️ Attention needed: ${thisMonthName} decreased ${times}x compared to ${lastMonthName}`;
    }
    return `${thisMonthName} ${isPositive ? "grew" : "declined"} by ${Math.abs(
      percentChange
    ).toFixed(1)}% compared to ${lastMonthName}`;
  };

  const calculateGrowthPercentage = (thisMonth, lastMonth) => {
    if (lastMonth === 0) return thisMonth > 0 ? 100 : 0;
    return (((thisMonth - lastMonth) / lastMonth) * 100).toFixed(1);
  };

  // Get monthly sales data
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

  // Fill in missing months helper function
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

  const filledMonthlySales = fillMissingMonths(await monthlySales);

  // Get current month and last month sales
  const [currentMonthSales, lastMonthSales] = await Promise.all([
    Order.aggregate([
      {
        $match: {
          orderStatus: { $ne: "Cancelled" },
          createdAt: {
            $gte: firstDayOfCurrentMonth,
            $lt: firstDayOfNextMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" },
        },
      },
    ]),
    Order.aggregate([
      {
        $match: {
          orderStatus: { $ne: "Cancelled" },
          createdAt: {
            $gte: firstDayOfLastMonth,
            $lt: firstDayOfCurrentMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" },
        },
      },
    ]),
  ]);

  // -------------------------------- Product Analytics -------------------------------- //
  // Get top selling products
  const topProducts = await Order.aggregate([
    {
      $match: {
        orderStatus: { $ne: "Cancelled" },
      },
    },
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

  // Get categories by order count
  const categoryStats = await Order.aggregate([
    {
      $match: {
        orderStatus: { $ne: "Cancelled" },
      },
    },
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
    { $unwind: "$product.product_category" },
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
        _id: {
          orderId: "$_id",
          categoryId: "$category._id",
        },
        name: { $first: "$category.name" },
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: "$_id.categoryId",
        name: { $first: "$name" },
        orderCount: { $sum: 1 },
      },
    },
    { $sort: { orderCount: -1 } },
    { $limit: 5 },
  ]);

  // Get collections by order count
  const collectionStats = await Order.aggregate([
    {
      $match: {
        orderStatus: { $ne: "Cancelled" },
      },
    },
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
    { $unwind: "$product.product_collection" },
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
        _id: {
          orderId: "$_id",
          collectionId: "$collection._id",
        },
        name: { $first: "$collection.name" },
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: "$_id.collectionId",
        name: { $first: "$name" },
        orderCount: { $sum: 1 },
      },
    },
    { $sort: { orderCount: -1 } },
    { $limit: 5 },
  ]);

  // Get low stock products
  const lowStockProducts = await Product.find({ stock: { $lte: 5 } })
    .select("product_name stock")
    .sort({ stock: 1 })
    .then((products) =>
      products.map((p) => ({
        name: p.product_name,
        stock: p.stock,
      }))
    );

  // -------------------------------- Order Analytics -------------------------------- //
  // Get order status distribution
  const orderStatusCount = await Order.aggregate([
    {
      $facet: {
        statusCounts: [
          {
            $group: {
              _id: "$orderStatus",
              count: { $sum: 1 },
            },
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
      },
    },
    {
      $project: {
        Pending: { $ifNull: ["$counts.Pending", 0] },
        Processing: { $ifNull: ["$counts.Processing", 0] },
        Shipped: { $ifNull: ["$counts.Shipped", 0] },
        Delivered: { $ifNull: ["$counts.Delivered", 0] },
        Cancelled: { $ifNull: ["$counts.Cancelled", 0] },
        "On Hold": { $ifNull: ["$counts.On Hold", 0] },
        _id: 0,
      },
    },
  ]);

  // Get daily orders for the last 7 days
  const dailyOrders = await (async () => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6);

    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(23, 59, 59, 999);

    const orders = await Order.aggregate([
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
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
              timezone: "UTC",
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const filledDailyOrders = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateString = date.toISOString().split("T")[0];

      const orderCount =
        orders.find((order) => order._id === dateString)?.count || 0;

      filledDailyOrders.push({
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        count: orderCount,
      });
    }

    return filledDailyOrders;
  })();

  // -------------------------------- Customer Analytics -------------------------------- //
  // Get customer statistics
  const customerStats = await User.aggregate([
    {
      $match: { role: "customer" },
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
      $addFields: {
        lastPurchaseDate: { $max: "$orders.createdAt" },
        hasOrders: { $size: "$orders" },
        thirtyDaysAgo: {
          $subtract: [new Date(), 30 * 24 * 60 * 60 * 1000],
        },
      },
    },
    {
      $group: {
        _id: null,
        totalCustomers: { $sum: 1 },
        activeCustomers: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $gt: ["$hasOrders", 0] },
                  { $gte: ["$lastPurchaseDate", "$thirtyDaysAgo"] },
                ],
              },
              1,
              0,
            ],
          },
        },
        newCustomers: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$hasOrders", 0] },
                  { $gte: ["$createdAt", "$thirtyDaysAgo"] },
                ],
              },
              1,
              0,
            ],
          },
        },
        inactiveCustomers: {
          $sum: {
            $cond: [
              {
                $or: [
                  {
                    $and: [
                      { $eq: ["$hasOrders", 0] },
                      { $lt: ["$createdAt", "$thirtyDaysAgo"] },
                    ],
                  },
                  {
                    $and: [
                      { $gt: ["$hasOrders", 0] },
                      { $lt: ["$lastPurchaseDate", "$thirtyDaysAgo"] },
                    ],
                  },
                ],
              },
              1,
              0,
            ],
          },
        },
        repeatCustomers: {
          $sum: {
            $cond: [{ $gt: ["$hasOrders", 1] }, 1, 0],
          },
        },
        singleOrderCustomers: {
          $sum: {
            $cond: [{ $eq: ["$hasOrders", 1] }, 1, 0],
          },
        },
      },
    },
    {
      $addFields: {
        repeatRate: {
          $multiply: [
            {
              $divide: [
                "$repeatCustomers",
                { $add: ["$repeatCustomers", "$singleOrderCustomers"] },
              ],
            },
            100,
          ],
        },
      },
    },
  ]);

  // -------------------------------- Recent Orders Table -------------------------------- //
  // Get 5 most recent orders
  const recentOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("user", "name email")
    .populate("orderItems.product", "product_name");

  // Calculate various metrics for the response
  const totalValidOrders = totalOrders - (orderStatusCount[0]?.Cancelled || 0);
  const deliveredRate = (
    ((orderStatusCount[0]?.Delivered || 0) / (totalValidOrders || 1)) *
    100
  ).toFixed(1);
  const lowStockPercentage = (
    (lowStockProducts.length / (totalProducts || 1)) *
    100
  ).toFixed(1);
  const activeCustomerPercentage = (
    ((customerStats[0]?.activeCustomers || 0) /
      (customerStats[0]?.totalCustomers || 1)) *
    100
  ).toFixed(1);
  const refundRate = ((totalRefunds / (totalOrders || 1)) * 100).toFixed(1);

  // Get last 2 months of sales data
  const last2Months = filledMonthlySales.slice(-2);
  const thisMonth = last2Months[1]?.total || 0;
  const lastMonth = last2Months[0]?.total || 0;
  const monthOverMonthGrowth = (
    ((thisMonth - lastMonth) / (lastMonth || 1)) *
    100
  ).toFixed(1);


  // Send response with additional data
  res.status(200).json({
    success: true,
    totalSales: totalSales[0]?.total || 0,
    totalOrders,
    totalProducts,
    totalUsers,
    totalRefunds,
    popularPayment,
    currentMonthOrders,
    lastMonthOrders,
    monthlySales: filledMonthlySales,
    currentMonthSales: currentMonthSales[0]?.total || 0,
    lastMonthSales: lastMonthSales[0]?.total || 0,
    recentOrders,
    topProducts,
    categoryStats,
    collectionStats,
    lowStockProducts,
    orderStatusCount: orderStatusCount[0],
    dailyOrders,
    customerStats: customerStats[0] || {
      totalCustomers: 0,
      activeCustomers: 0,
      inactiveCustomers: 0,
      newCustomers: 0,
      repeatCustomers: 0,
      singleOrderCustomers: 0,
      repeatRate: 0,
    },
    stats: {
      totalSales: totalSales[0]?.total || 0,
      totalValidOrders,
      totalProducts,
      customerStats: customerStats[0] || {
        totalCustomers: 0,
        activeCustomers: 0,
      },
      totalRefunds,
      popularPayment,
      monthlySales: filledMonthlySales,
      lowStockProducts,
      orderStatusCount: orderStatusCount[0],
      deliveredRate,
      lowStockPercentage,
      activeCustomerPercentage,
      refundRate,
      thisMonth,
      lastMonth,
      monthOverMonthGrowth,
      growthDescription: getGrowthDescription(
        thisMonth,
        lastMonth,
        last2Months.map((m) => m?.month || "")
      ),
      growthPercentage: calculateGrowthPercentage(thisMonth, lastMonth),
    },
    ui: {
      greeting: getGreeting(currentDate.getHours()),
      currentDate: formattedDate,
      currentTime: formattedTime,
      navigationTabs,
    },
  });
});

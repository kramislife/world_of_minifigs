import React, { useState, useMemo } from "react";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import { useGetAllOrdersAdminQuery } from "@/redux/api/orderApi";
import { createOrderColumns } from "@/components/admin/shared/table/columns/OrderColumns";
import OrderDetailsDialog from "./OrderDetailsDialog";

const ViewOrder = () => {
  const { data: orderData, isLoading, error } = useGetAllOrdersAdminQuery();
  const [globalFilter, setGlobalFilter] = useState("");

  // Dialog state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle view details
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  // Get columns with view handler
  const columns = useMemo(
    () => createOrderColumns({ onViewDetails: handleViewDetails }),
    []
  );

  // Transform data for table
  const data = useMemo(() => {
    if (!orderData?.data) return [];
    return [...orderData.data]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((order, index) => ({
        id: index + 1,
        _id: order._id,
        user: order.user,
        email: order.email,
        totalItems: order.orderItems?.length || 0,
        totalPrice: order.totalPrice,
        orderStatus: order.orderStatus,
        paymentInfo: order.paymentInfo,
        createdAt: new Date(order.createdAt).toLocaleString(),
        // Include all fields needed for the details dialog
        orderItems: order.orderItems,
        taxPrice: order.taxPrice,
        shippingPrice: order.shippingPrice,
        priority: order.priority,
        orderNotes: order.orderNotes,
        deliveredAt: order.deliveredAt,
        shippingAddress: order.shippingAddress,
        cancelledAt: order.cancelledAt,
        cancellationReason: order.cancellationReason,
        shippingInfo: order.shippingInfo,
      }));
  }, [orderData]);

  return (
    <>
      <ViewLayout
        title="Order"
        description="Manage customer orders"
        isLoading={isLoading}
        error={error}
        data={data}
        columns={columns}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <OrderDetailsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        order={selectedOrder}
      />
    </>
  );
};

export default ViewOrder;

import React, { useMemo } from "react";
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";
import { useNavigate } from "react-router-dom";
import Metadata from "@/components/layout/Metadata/Metadata";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { orderStatus } from "@/constant/orderStatus";
import OrderCard from "./components/OrderCard";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import ErrorState from "./components/ErrorState";
import EmptyState from "./components/EmptyState";

const MyOrders = () => {
  const { data, isLoading, error } = useGetAllOrdersQuery();
  const navigate = useNavigate();

  const ordersByStatus = useMemo(() => {
    if (!data?.data) return {};

    return data.data.reduce((acc, order) => {
      const status = order.orderStatus;
      if (!acc[status]) acc[status] = [];
      acc[status].push(order);
      return acc;
    }, {});
  }, [data]);

  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (isLoading) return <LoadingSpinner />;

  if (error && error.status !== 404) {
    return <ErrorState message={error.data?.message || error.message} />;
  }

  if (!data?.data || data.data.length === 0 || error?.status === 404) {
    return (
      <EmptyState
        title="My Orders"
        message="You haven't placed any orders yet."
      />
    );
  }

  return (
    <>
      <Metadata title="My Orders" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-white">My Orders</h1>

        <Tabs defaultValue="Pending" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 gap-4">
            {orderStatus.map((status) => (
              <TabsTrigger
                key={status.id}
                value={status.value}
                disabled={!ordersByStatus[status.value]}
                className="flex items-center gap-2"
              >
                {status.icon && <status.icon className="w-4 h-4" />}
                {status.label}
              </TabsTrigger>
            ))}
            <TabsTrigger value="all">All Orders</TabsTrigger>
          </TabsList>

          {/* Orders by Status */}
          {orderStatus.map((status) => (
            <TabsContent key={status.id} value={status.value} className="mt-6">
              <div className="grid gap-6">
                {ordersByStatus[status.value]?.map((order) => (
                  <OrderCard
                    key={order._id}
                    order={order}
                    onClick={handleOrderClick}
                  />
                ))}
              </div>
            </TabsContent>
          ))}

          {/* All Orders*/}
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6">
              {data.data.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  onClick={handleOrderClick}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default MyOrders;

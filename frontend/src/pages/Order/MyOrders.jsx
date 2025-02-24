import React, { useMemo } from "react";
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("status");

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

  const handleTabChange = (value) => {
    // Update URL when tab changes
    setSearchParams({ status: value });
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
      <div className="p-10">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              My Orders
            </h1>
            <div className="text-gray-400 text-sm">
              Total Orders: {data.data.length}
            </div>
          </div>

          <Tabs
            defaultValue={statusParam || "Pending"}
            className="w-full"
            onValueChange={handleTabChange}
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 bg-gray-900/50 p-1 rounded-lg">
              {orderStatus.map((status) => (
                <TabsTrigger
                  key={status.id}
                  value={status.value}
                  disabled={!ordersByStatus[status.value]}
                  className="flex items-center gap-2 transition-all duration-200 hover:bg-gray-700/50"
                >
                  {status.icon && (
                    <status.icon className="w-4 h-4 text-gray-400" />
                  )}
                  <span className="hidden md:inline">{status.label}</span>
                  <span className="md:hidden">{status.label.slice(0, 3)}</span>
                  {ordersByStatus[status.value] && (
                    <span className="ml-1 text-xs bg-primary/20 px-1.5 py-0.5 rounded-full">
                      {ordersByStatus[status.value].length}
                    </span>
                  )}
                </TabsTrigger>
              ))}
              <TabsTrigger
                value="all"
                className="transition-all duration-200 hover:bg-gray-700/50"
              >
                All Orders
                <span className="ml-1 text-xs bg-primary/20 px-1.5 py-0.5 rounded-full">
                  {data.data.length}
                </span>
              </TabsTrigger>
            </TabsList>

            {/* Orders by Status */}
            {orderStatus.map((status) => (
              <TabsContent
                key={status.id}
                value={status.value}
                className="mt-8 min-h-[300px]"
              >
                <div className="grid grid-cols-1 gap-2">
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
            <TabsContent value="all" className="mt-8 min-h-[300px]">
              <div className="grid gap-2 sm:grid-cols-1 lg:grid-cols-2">
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

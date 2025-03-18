import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import OrderCard from "./OrderCard";
import { ReviewTabs } from "./ReviewTabs";

const OrdersContent = ({
  ordersByStatus,
  orderStatus,
  onOrderClick,
  orders,
}) => {
  return (
    <>
      {/* Orders by Status */}
      {orderStatus.map((status) => (
        <TabsContent
          key={status.id}
          value={status.value}
          className="mt-8 min-h-[300px]"
        >
          {status.value === "To Review" ? (
            <ReviewTabs
              ordersByStatus={ordersByStatus}
              onOrderClick={onOrderClick}
            />
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {ordersByStatus[status.value]?.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  onClick={onOrderClick}
                />
              ))}
            </div>
          )}
        </TabsContent>
      ))}

      {/* All Orders*/}
      <TabsContent value="all" className="mt-8 min-h-[300px]">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} onClick={onOrderClick} />
          ))}
        </div>
      </TabsContent>
    </>
  );
};

export default OrdersContent;

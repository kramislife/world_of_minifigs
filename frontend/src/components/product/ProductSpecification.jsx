import React from "react";
import { FallbackMessage } from "./shared/FallbackStates";
import { Card, CardContent } from "@/components/ui/card";

const ProductSpecification = ({ product, specifications }) => {
  if (!product) return null;

  return (
    <div className="bg-brand-dark/50 py-10 px-4">
      <h2 className="text-3xl font-semibold mb-5 flex items-center gap-4">
        <div className="w-1 h-8 bg-accent rounded-full" />
        <span>Specifications</span>
      </h2>

      {specifications && specifications.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {specifications.map((spec, index) => (
            <Card key={index}>
              <CardContent className="pt-5">
                <div className="flex flex-col items-center gap-3 mb-5">
                  <div className="p-3">
                    {spec?.icon}
                  </div>
                  <h2 className="text-base md:text-2xl font-semibold text-background text-center">
                    {spec?.title}
                  </h2>
                </div>

                <ul>
                  {spec?.items?.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-gray-400 font-medium text-sm md:text-base text-center"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <FallbackMessage
          title="No Specifications Available"
          message="This product doesn't have any specifications defined yet."
          minHeight="min-h-[300px]"
        />
      )}
    </div>
  );
};

export default ProductSpecification;

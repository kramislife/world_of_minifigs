import React from "react";
import { FallbackMessage } from "./shared/FallbackStates";

const ProductSpecification = ({ product, specifications }) => {
  if (!product) {
    return null;
  }

  return (
    <div className="bg-brand-dark/50 py-10">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 flex items-center gap-4 px-4">
          <div className="w-1 h-8 bg-accent rounded" />
          <span>Specifications</span>
        </h2>

        {specifications && specifications.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 sm:gap-5 sm:mx-5">
            {specifications.map((spec, index) => (
              <div
                key={index}
                className="bg-brand-end/30 p-4 sm:p-6 rounded-xl border border-brand-end/50 hover:border-brand-end/70 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-1 sm:p-3 rounded-lg bg-brand-dark/50 flex-shrink-0">
                    {spec?.icon}
                  </div>
                  <h2 className="text-md sm:text-2xl font-semibold tracking-wide text-white drop-shadow-md">
                    {spec?.title}
                  </h2>
                </div>
                <ul className="space-y-2 sm:space-y-3 mb-2 sm:mb-4 pt-3 sm:pt-5">
                  {spec?.items?.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-gray-300/90 text-sm sm:text-md font-medium transition-colors hover:text-white text-center"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-4 sm:mx-5">
            <FallbackMessage
              title="No Specifications Available"
              message="This product doesn't have any specifications defined yet."
              minHeight="min-h-[300px]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSpecification;

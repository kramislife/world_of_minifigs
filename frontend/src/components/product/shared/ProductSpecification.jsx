import React from "react";
import { Box, Ruler, User, Dices } from "lucide-react";

const DEFAULT_SPECS = {
  pieceCount: {
    title: "Piece Count",
    icon: <Box className="w-8 h-8 text-orange-400" />,
  },
  skillLevel: {
    title: "Skill Level",
    icon: <Dices className="w-8 h-8 text-green-400" />,
  },
  dimensions: {
    title: "Dimensions",
    icon: <Ruler className="w-8 h-8 text-blue-400" />,
  },
  designer: {
    title: "Designed By",
    icon: <User className="w-8 h-8 text-purple-400" />,
  },
};

const ProductSpecification = ({ product }) => {
  if (!product) {
    return null;
  }

  const formatDimensions = () => {
    const dims = [];
    if (product?.product_length) dims.push(`L: ${product.product_length}`);
    if (product?.product_width) dims.push(`W: ${product.product_width}`);
    if (product?.product_height) dims.push(`H: ${product.product_height}`);
    return dims.length > 0 ? [dims.join(' × ')] : [];
  };

  const specifications = [
    {
      ...DEFAULT_SPECS.pieceCount,
      items: product?.product_piece_count
        ? [
            `${product?.product_piece_count} ${
              product?.product_piece_count === 1 ? "piece" : "pieces"
            }`,
          ]
        : [],
    },
    {
      ...DEFAULT_SPECS.skillLevel,
      items: product?.product_skill_level?.name
        ? [product.product_skill_level.name]
        : [],
    },
    {
      ...DEFAULT_SPECS.dimensions,
      items: formatDimensions(),
    },
    {
      ...DEFAULT_SPECS.designer,
      items: product?.product_designer?.name
        ? [product.product_designer.name]
        : [],
    },
  ].filter((spec) => spec.items.length > 0);

  return (
    <div className="bg-gradient-to-b from-brand-start to-brand-end py-20 px-4">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 flex items-center gap-4">
          <div className="w-1 h-8 bg-red-500 rounded" />
          <span>Specifications</span>
        </h2>

        {specifications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mx-5">
            {specifications.map((spec, index) => (
              <div
                key={index}
                className="bg-brand/70 p-6 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-gray-800/50">
                    {spec?.icon}
                  </div>
                  <h2 className="text-2xl font-semibold tracking-wide text-white drop-shadow-md pl-5">
                    {spec?.title}
                  </h2>
                </div>
                <ul className="space-y-3 mb-4 pt-5">
                  {spec?.items?.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-gray-300/90 text-md font-medium transition-colors hover:text-white text-center"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400">
            <Box className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl">No Product Specifications Available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSpecification;

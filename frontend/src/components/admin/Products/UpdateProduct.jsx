import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BasicInformation from "./components/BasicInformation";
import ProductDescriptions from "./components/ProductDescriptions";
import ProductSpecifications from "./components/ProductSpecifications";
import AdditionalInformation from "./components/AdditionalInformation";
import ProductCategories from "./components/ProductCategories";
import ProductCollections from "./components/ProductCollections";
import ProductIncludes from "./components/ProductIncludes";
import SkillLevel from "./components/SkillLevel";
import ProductDesigner from "./components/ProductDesigner";
import ProductStatus from "./components/ProductStatus";
import useProductUpdate from "@/hooks/Product/useProductUpdate";
import Metadata from "@/components/layout/Metadata/Metadata";

const UpdateProduct = () => {
  const { id } = useParams();
  const {
    formData,
    isLoading,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
    handleDateChange,
  } = useProductUpdate(id);


  return (
    <>
      <Metadata title="Update Product" />
      <div className="p-3 md:p-5">
        <form onSubmit={handleSubmit}>
          <Card className="border-t-4 border-t-accent">
            <CardHeader>
              <CardTitle className="text-2xl">Update Product</CardTitle>
            </CardHeader>

            <CardContent className="p-6 space-y-8">
              <BasicInformation
                formData={formData}
                onChange={handleChange}
                onCheckboxChange={handleCheckboxChange}
              />

              <ProductDescriptions
                formData={formData}
                onChange={handleChange}
              />

              <ProductSpecifications
                formData={formData}
                onChange={handleChange}
              />

              <AdditionalInformation
                formData={formData}
                onChange={handleChange}
              />

              <ProductCategories
                formData={formData}
                onCheckboxChange={handleCheckboxChange}
              />

              <ProductCollections
                formData={formData}
                onCheckboxChange={handleCheckboxChange}
              />

              <ProductIncludes
                formData={formData}
                onCheckboxChange={handleCheckboxChange}
              />

              <SkillLevel formData={formData} onChange={handleChange} />

              <ProductDesigner formData={formData} onChange={handleChange} />

              <ProductStatus
                formData={formData}
                onChange={handleChange}
                onCheckboxChange={handleCheckboxChange}
                onDateChange={handleDateChange}
              />

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button variant="submit" type="submit" className="w-auto">
                  {isLoading ? "Updating..." : "Update Product"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;

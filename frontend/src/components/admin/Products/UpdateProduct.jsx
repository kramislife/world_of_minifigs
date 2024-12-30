import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";
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
import useProductUpdate from "@/hooks/useProductUpdate";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
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

  if (isLoading || !formData) {
    return (
      <div className="flex justify-center items-center h-48">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Metadata title="Update Product" />
      <div className="mx-auto py-6 space-y-8">
        <form onSubmit={handleSubmit}>
          <Card className="shadow-xl border-t-4 border-t-blue-500">
            <CardHeader>
              <CardTitle className="text-2xl">Update Product</CardTitle>
            </CardHeader>

            <CardContent className="p-6 space-y-8">
              <BasicInformation
                formData={formData}
                onChange={handleChange}
                onCheckboxChange={handleCheckboxChange}
              />
              <Separator className="my-6" />

              <ProductDescriptions
                formData={formData}
                onChange={handleChange}
              />
              <Separator className="my-6" />

              <ProductSpecifications
                formData={formData}
                onChange={handleChange}
              />
              <Separator className="my-6" />

              <AdditionalInformation
                formData={formData}
                onChange={handleChange}
              />
              <Separator className="my-6" />

              <ProductCategories
                formData={formData}
                onCheckboxChange={handleCheckboxChange}
              />
              <Separator className="my-6" />

              <ProductCollections
                formData={formData}
                onCheckboxChange={handleCheckboxChange}
              />
              <Separator className="my-6" />

              <ProductIncludes
                formData={formData}
                onCheckboxChange={handleCheckboxChange}
              />
              <Separator className="my-6" />

              <SkillLevel formData={formData} onChange={handleChange} />
              <Separator className="my-6" />

              <ProductDesigner formData={formData} onChange={handleChange} />
              <Separator className="my-6" />

              <ProductStatus
                formData={formData}
                onChange={handleChange}
                onCheckboxChange={handleCheckboxChange}
                onDateChange={handleDateChange}
              />

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center gap-2 hover:from-blue-700 hover:to-purple-700 ${
                    isLoading ? "opacity-50" : ""
                  }`}
                >
                  <Save className="h-4 w-4" />
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

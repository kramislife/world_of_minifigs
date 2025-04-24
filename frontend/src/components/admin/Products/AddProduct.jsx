import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Metadata from "@/components/layout/Metadata/Metadata";
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
import useProductForm from "@/hooks/Product/useProductForm";
const AddProduct = () => {
  const {
    formData,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
    isLoading,
    handleDateChange,
  } = useProductForm();

  return (
    <>
      <Metadata title="Add Product" />
      <div className="p-3 md:p-5">
        <form onSubmit={handleSubmit}>
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-2xl">Add New Product</CardTitle>
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

              <div className="flex justify-end">
                <Button
                  variant="submit"
                  type="submit"
                  className="w-auto flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4" />
                      Creating Product...
                    </>
                  ) : (
                    "Create Product"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </>
  );
};

export default AddProduct;

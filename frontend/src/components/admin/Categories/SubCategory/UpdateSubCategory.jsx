import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Metadata from "@/components/layout/Metadata/Metadata";
import {
  useUpdateSubCategoryMutation,
  useGetSubCategoriesQuery,
  useGetCategoryQuery,
} from "@/redux/api/productApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UpdateSubCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [updateSubCategory, { isLoading }] = useUpdateSubCategoryMutation();

  const { data: subCategoryData } = useGetSubCategoriesQuery();
  const { data: categoryData } = useGetCategoryQuery();

  const subCategory = subCategoryData?.sub_categories?.find(
    (subCat) => subCat._id === id
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (!formData.get("category")) {
      toast.error("Please select a parent category");
      return;
    }

    if (!formData.get("name")) {
      toast.error("Please enter a sub-category name");
      return;
    }

    const popularityId = formData.get("popularityId");
    if (!popularityId || !/^\d{1,3}$/.test(popularityId)) {
      toast.error("Popularity ID must be a number between 001-999");
      return;
    }

    try {
      await updateSubCategory({
        id: id,
        name: formData.get("name").trim(),
        category: formData.get("category"),
        popularityId: popularityId.padStart(3, "0"),
        updatedBy: user?._id,
      }).unwrap();

      toast.success("Sub-category updated successfully!");
      navigate("/admin/subcategories");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update sub-category");
    }
  };

  return (
    <>
      <Metadata title="Update Sub-Category" />
      <div className="p-3 md:p-5">
        <Card className="border-t-4 border-t-accent">
          <CardHeader>
            <CardTitle className="text-2xl">Update Sub-Category</CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="space-y-3">
                  <Label
                    htmlFor="category"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    Parent Category
                  </Label>
                  <Select
                    name="category"
                    defaultValue={subCategory.category._id}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryData?.categories?.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="name"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    Sub-Category Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={subCategory.name}
                    placeholder="Enter sub-category name"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="popularityId"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    Popularity ID
                  </Label>
                  <Input
                    id="popularityId"
                    name="popularityId"
                    type="number"
                    min="001"
                    max="999"
                    placeholder="Enter popularity ID (001-999)"
                    defaultValue={subCategory.popularityId}
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <Button
                    variant="submit"
                    type="submit"
                    disabled={isLoading}
                    className="w-auto"
                  >
                    {isLoading ? "Updating..." : "Update Sub-Category"}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default UpdateSubCategory;

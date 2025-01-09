import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, FileText } from "lucide-react";
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

    const updateData = {
      name: formData.get("name"),
      category: formData.get("category"),
      updatedBy: user?._id,
    };

    try {
      await updateSubCategory({
        id: id,
        ...updateData,
      }).unwrap();

      toast.success("Sub-category updated successfully!");
      navigate("/admin/subcategories");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update sub-category");
    }
  };

  if (!subCategory) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Metadata title="Update Sub-Category" />
      <div className="mx-auto py-6">
        <Card className="shadow-xl border-t-4 border-t-blue-500">
          <CardHeader>
            <CardTitle className="text-2xl">Update Sub-Category</CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="space-y-3">
                  <Label htmlFor="category">Parent Category</Label>
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
                    <FileText className="h-5 w-5 text-blue-600" />
                    Sub-Category Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter sub-category name"
                    defaultValue={subCategory.name}
                    className="mt-1"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center gap-2 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isLoading ? (
                      <>Updating...</>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Update Sub-Category
                      </>
                    )}
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

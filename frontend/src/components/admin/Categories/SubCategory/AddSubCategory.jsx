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
  useCreateSubCategoryMutation,
  useGetCategoryQuery,
} from "@/redux/api/productApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AddSubCategory = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [createSubCategory, { isLoading }] = useCreateSubCategoryMutation();
  const { data: categoryData } = useGetCategoryQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (!formData.get("category")) {
      toast.error("Please select a parent category");
      return;
    }

    const subCategoryData = {
      name: formData.get("name"),
      category: formData.get("category"),
      createdBy: user?._id,
    };

    try {
      await createSubCategory(subCategoryData).unwrap();
      toast.success("Sub-category created successfully!");
      navigate("/admin/subcategories");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create sub-category");
    }
  };

  return (
    <>
      <Metadata title="Add Sub-Category" />
      <div className="mx-auto py-6">
        <Card className="shadow-xl border-t-4 border-t-blue-500">
          <CardHeader>
            <CardTitle className="text-2xl">Add New Sub-Category</CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="space-y-3">
                  <Label htmlFor="category">Parent Category</Label>
                  <Select name="category" required>
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
                  <Label htmlFor="name">Sub-Category Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter sub-category name"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    {isLoading ? (
                      <>Creating...</>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Create Sub-Category
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

export default AddSubCategory;

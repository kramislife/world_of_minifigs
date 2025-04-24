import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Loader2 } from "lucide-react";
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

    if (!formData.get("name")) {
      toast.error("Please enter a sub-category name");
      return;
    }

    // Validate popularityId format
    const popularityId = formData.get("popularityId");
    if (!popularityId || !/^\d{1,3}$/.test(popularityId)) {
      toast.error("Popularity ID must be a number between 001-999");
      return;
    }

    try {
      await createSubCategory({
        name: formData.get("name").trim(),
        category: formData.get("category"),
        popularityId: popularityId.padStart(3, "0"),
        createdBy: user?._id,
      }).unwrap();

      toast.success("Sub-category created successfully!");
      navigate("/admin/subcategories");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create sub-category");
    }
  };

  return (
    <>
      <Metadata title="Add Sub-Category" />
      <div className="p-3 md:p-5">
        <form onSubmit={handleSubmit}>
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-2xl">Add New Sub-Category</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="space-y-3">
                <Label
                  htmlFor="category"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <FileText className="h-5 w-5 text-purple-600" />
                  Parent Category
                </Label>
                <Select name="category" required>
                  <SelectTrigger className="bg-transparent border">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    {categoryData?.categories?.map((category) => (
                      <SelectItem
                        key={category._id}
                        value={category._id}
                        className="text-foreground"
                      >
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
                  required
                />
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="popularityId"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <FileText className="h-5 w-5 text-green-600" />
                  Popularity ID
                </Label>
                <Input
                  id="popularityId"
                  name="popularityId"
                  type="number"
                  min="001"
                  max="999"
                  placeholder="Enter popularity ID (001-999)"
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button
                  variant="submit"
                  type="submit"
                  className="w-auto"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Creating Sub-Category...
                    </>
                  ) : (
                    "Create Sub-Category"
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

export default AddSubCategory;

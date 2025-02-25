import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Metadata from "@/components/layout/Metadata/Metadata";
import { useCreateCategoryMutation } from "@/redux/api/productApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { FileText } from "lucide-react";

const AddCategory = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Validate popularityId format
    const popularityId = formData.get("popularityId");
    if (!popularityId || !/^\d{1,3}$/.test(popularityId)) {
      toast.error("Popularity ID must be a number between 001-999");
      return;
    }

    const categoryData = {
      name: formData.get("name"),
      popularityId: popularityId.padStart(3, "0"), // Ensure 3-digit format
      createdBy: user?._id,
      is_active: true,
    };

    try {
      await createCategory(categoryData).unwrap();
      toast.success("Category created successfully!");
      navigate("/admin/categories");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create category");
    }
  };

  return (
    <>
      <Metadata title="Add Category" />
      <div className="mx-auto py-6">
        <Card className="shadow-xl border-t-4 border-t-blue-500">
          <CardHeader>
            <CardTitle className="text-2xl">Add New Category</CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="space-y-3">
                  <Label
                    htmlFor="name"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <FileText className="h-5 w-5 text-blue-600" />
                    Category Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter category name"
                    className="mt-1"
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
                      <>Creating...</>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Create Category
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

export default AddCategory;

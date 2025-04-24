import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Metadata from "@/components/layout/Metadata/Metadata";
import { useCreateCategoryMutation } from "@/redux/api/productApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

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
      popularityId: popularityId.padStart(3, "0"),
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
      <div className="p-3 md:p-5">
        <form onSubmit={handleSubmit}>
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-2xl">Add New Category</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
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
                required
              />

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

              <div className="flex justify-end">
                <Button
                  variant="submit"
                  type="submit"
                  className="w-auto"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4" />
                      Creating Category...
                    </>
                  ) : (
                    "Create Category"
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

export default AddCategory;

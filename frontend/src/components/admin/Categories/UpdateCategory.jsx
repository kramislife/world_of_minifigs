import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Metadata from "@/components/layout/Metadata/Metadata";
import { useUpdateCategoryMutation, useGetCategoryQuery } from "@/redux/api/productApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  
  const { data: categoryData } = useGetCategoryQuery();
  const category = categoryData?.categories?.find(cat => cat._id === id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const categoryData = {
      name: formData.get("name"),
      updatedBy: user?._id,
    };

    try {
      await updateCategory({ 
        id: id,
        ...categoryData 
      }).unwrap();
      
      toast.success("Category updated successfully!");
      navigate("/admin/categories");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update category");
    }
  };

  return (
    <>
      <Metadata title="Update Category" />
      <div className="mx-auto py-6">
        <Card className="shadow-xl border-t-4 border-t-blue-500">
          <CardHeader>
            <CardTitle className="text-2xl">Update Category</CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="space-y-3">
                  <Label htmlFor="name" className="flex items-center gap-2 text-lg font-semibold">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Category Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter category name"
                    className="mt-1"
                    defaultValue={category?.name}
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
                        Update Category
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

export default UpdateCategory;

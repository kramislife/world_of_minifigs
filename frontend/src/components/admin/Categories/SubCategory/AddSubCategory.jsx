import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  const [subCategoryNames, setSubCategoryNames] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");

  const badgeVariants = [
    "bg-red-100 text-red-700 hover:bg-red-200",
    "bg-blue-100 text-blue-700 hover:bg-blue-200",
    "bg-green-100 text-green-700 hover:bg-green-200",
    "bg-purple-100 text-purple-700 hover:bg-purple-200",
    "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
    "bg-pink-100 text-pink-700 hover:bg-pink-200",
    "bg-indigo-100 text-indigo-700 hover:bg-indigo-200",
    "bg-orange-100 text-orange-700 hover:bg-orange-200",
  ];

  const getRandomColor = (index) => {
    return badgeVariants[index % badgeVariants.length];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (!formData.get("category")) {
      toast.error("Please select a parent category");
      return;
    }

    if (subCategoryNames.length === 0) {
      toast.error("Please add at least one sub-category name");
      return;
    }

    try {
      // Create an array of promises for each sub-category
      const createPromises = subCategoryNames.map((name) =>
        createSubCategory({
          name: name.trim(),
          category: formData.get("category"),
          createdBy: user?._id,
        }).unwrap()
      );

      // Wait for all sub-categories to be created
      await Promise.all(createPromises);

      toast.success("Sub-categories created successfully!");
      navigate("/admin/subcategories");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create sub-categories");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!subCategoryNames.includes(inputValue.trim())) {
        setSubCategoryNames([...subCategoryNames, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const removeSubCategory = (nameToRemove) => {
    setSubCategoryNames(
      subCategoryNames.filter((name) => name !== nameToRemove)
    );
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
                  <Label
                    htmlFor="category"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    Parent Category
                  </Label>
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
                  <Label
                    htmlFor="name"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    Sub-Category
                  </Label>
                  <div className="space-y-2">
                    <Input
                      id="name"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type and press Enter to add sub-category name"
                    />

                    <div className="flex flex-wrap gap-2 mb-2">
                      {subCategoryNames.map((name, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className={`flex items-center gap-2 px-3 py-1.5 ${getRandomColor(
                            index
                          )}`}
                        >
                          {name}
                          <button
                            type="button"
                            onClick={() => removeSubCategory(name)}
                            className="hover:opacity-75 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
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

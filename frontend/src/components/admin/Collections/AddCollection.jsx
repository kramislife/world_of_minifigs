import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Metadata from "@/components/layout/Metadata/Metadata";
import {
  useCreateCollectionMutation,
  useGetCollectionQuery,
} from "@/redux/api/productApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Checkbox } from "@/components/ui/checkbox";

const AddCollection = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [createCollection, { isLoading }] = useCreateCollectionMutation();

  // Get existing collections to calculate next popularity ID
  const { data: collectionData } = useGetCollectionQuery();

  // Calculate the next available popularity ID
  const nextPopularityId = React.useMemo(() => {
    if (!collectionData?.collections?.length) return "001";

    // Find the highest existing popularity ID
    const highestId = Math.max(
      ...collectionData.collections.map((col) => parseInt(col.popularityId, 10))
    );

    // Add 1 and format as 3-digit string
    return (highestId + 1).toString().padStart(3, "0");
  }, [collectionData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const collectionData = {
      name: formData.get("name"),
      description: formData.get("description"),
      popularityId: formData.get("popularityId"),
      createdBy: user?._id,
      is_active: true,
      isFeatured: formData.get("isFeatured") === "on",
    };

    try {
      await createCollection(collectionData).unwrap();
      toast.success("Collection created successfully!");
      navigate("/admin/collections");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create collection");
    }
  };

  return (
    <>
      <Metadata title="Add Collection" />
      <div className="p-3 md:p-5">
        <Card className="border-t-4 border-t-accent">
          <CardHeader>
            <CardTitle className="text-2xl">Add New Collection</CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="space-y-3">
                  <Label
                    htmlFor="name"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <FileText className="h-5 w-5 text-blue-600" />
                    Collection Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter collection name"
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
                    type="text"
                    className="mt-1 bg-gray-100"
                    value={nextPopularityId}
                    readOnly
                    disabled
                  />
                  <p className="text-sm text-gray-500">
                    This ID is automatically generated based on existing
                    collections.
                  </p>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="description"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter collection description"
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Checkbox
                      name="isFeatured"
                      id="isFeatured"
                      className="border-black data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                    />
                    <span className="text-sm font-medium">
                      Add to Featured Collection
                    </span>
                  </Label>
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <Button
                    variant="submit"
                    type="submit"
                    disabled={isLoading}
                    className="w-auto"
                  >
                    {isLoading ? "Creating..." : "Create Collection"}
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

export default AddCollection;

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, Loader2 } from "lucide-react";
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
  const { data: collectionData } = useGetCollectionQuery();

  const nextPopularityId = React.useMemo(() => {
    if (!collectionData?.collections?.length) return "001";
    const highestId = Math.max(
      ...collectionData.collections.map((col) => parseInt(col.popularityId, 10))
    );
    return (highestId + 1).toString().padStart(3, "0");
  }, [collectionData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const collectionData = {
      name: formData.get("name"),
      description: formData.get("description"),
      popularityId: nextPopularityId,
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
        <form onSubmit={handleSubmit}>
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-2xl">Add New Collection</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
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
                type="text"
                className="bg-gray-100"
                defaultValue={nextPopularityId}
                readOnly
              />
              <p className="text-sm text-gray-500">
                This ID is automatically generated based on existing
                collections.
              </p>

              <Label
                htmlFor="description"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <BookOpen className="h-5 w-5 text-purple-600" />
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter collection description"
              />

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
                      Creating Collection...
                    </>
                  ) : (
                    "Create Collection"
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

export default AddCollection;

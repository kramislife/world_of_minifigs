import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Metadata from "@/components/layout/Metadata/Metadata";
import {
  useUpdateCollectionMutation,
  useGetCollectionQuery,
} from "@/redux/api/productApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UpdateCollection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [updateCollection, { isLoading }] = useUpdateCollectionMutation();

  const { data: collectionData } = useGetCollectionQuery();
  const collection = collectionData?.collections?.find((col) => col._id === id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const popularityId = formData.get("popularityId");
    if (!popularityId || !/^\d{1,3}$/.test(popularityId)) {
      toast.error("Popularity ID must be a number between 001-999");
      return;
    }

    try {
      await updateCollection({
        id: id,
        name: formData.get("name"),
        description: formData.get("description"),
        popularityId: popularityId.padStart(3, "0"),
        isFeatured: formData.get("isFeatured") === "on",
        updatedBy: user?._id,
      }).unwrap();
      toast.success("Collection updated successfully!");
      navigate("/admin/collections");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update collection");
    }
  };

  return (
    <>
      <Metadata title="Update Collection" />
      <div className="p-3 md:p-5">
        <form onSubmit={handleSubmit}>
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-2xl">Update Collection</CardTitle>
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
                defaultValue={collection?.name}
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
                defaultValue={collection?.popularityId}
                required
              />

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
                defaultValue={collection?.description}
              />

              <Label className="flex items-center gap-2">
                <Checkbox
                  name="isFeatured"
                  id="isFeatured"
                  defaultChecked={collection?.isFeatured}
                  className="border-white/10 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
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
                      Updating Collection...
                    </>
                  ) : (
                    "Update Collection"
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

export default UpdateCollection;

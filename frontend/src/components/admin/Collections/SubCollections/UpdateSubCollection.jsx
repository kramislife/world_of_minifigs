import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Metadata from "@/components/layout/Metadata/Metadata";
import {
  useUpdateSubCollectionMutation,
  useGetSubCollectionsQuery,
  useGetCollectionQuery,
} from "@/redux/api/productApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { FileText, Loader2 } from "lucide-react";

const UpdateSubCollection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [updateSubCollection, { isLoading }] = useUpdateSubCollectionMutation();

  const { data: subCollectionData } = useGetSubCollectionsQuery();
  const { data: collectionData } = useGetCollectionQuery();

  const subCollection = subCollectionData?.subcollections?.find(
    (subCol) => subCol._id === id
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (!formData.get("collection")) {
      toast.error("Please select a parent collection");
      return;
    }

    if (!formData.get("name")) {
      toast.error("Please enter a sub-collection name");
      return;
    }

    const popularityId = formData.get("popularityId");
    if (!popularityId || !/^\d{1,3}$/.test(popularityId)) {
      toast.error("Popularity ID must be a number between 001-999");
      return;
    }

    try {
      await updateSubCollection({
        id: id,
        name: formData.get("name").trim(),
        description: formData.get("description"),
        collection: formData.get("collection"),
        popularityId: popularityId.padStart(3, "0"),
        updatedBy: user?._id,
      }).unwrap();

      toast.success("Sub-collection updated successfully!");
      navigate("/admin/subcollections");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update sub-collection");
    }
  };

  return (
    <>
      <Metadata title="Update Sub-Collection" />
      <div className="p-3 md:p-5">
        <form onSubmit={handleSubmit}>
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-2xl">Update Sub-Collection</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <Label
                htmlFor="collection"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <FileText className="h-5 w-5 text-purple-600" />
                Parent Collection
              </Label>
              <Select
                name="collection"
                defaultValue={subCollection?.collection?._id}
                required
              >
                <SelectTrigger className="bg-transparent border">
                  <SelectValue placeholder="Select a collection" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  {collectionData?.collections?.map((collection) => (
                    <SelectItem
                      className="flex items-center gap-2 text-foreground"
                      key={collection._id}
                      value={collection._id}
                    >
                      {collection.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label
                htmlFor="name"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <FileText className="h-5 w-5 text-blue-600" />
                Sub-Collection Name
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={subCollection?.name}
                placeholder="Enter sub-collection name"
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
                defaultValue={subCollection?.popularityId}
                required
              />

              <Label
                htmlFor="description"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={subCollection?.description}
                placeholder="Enter sub-collection description"
                className="h-32"
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
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Updating Sub-Collection...
                    </>
                  ) : (
                    "Update Sub-Collection"
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

export default UpdateSubCollection;

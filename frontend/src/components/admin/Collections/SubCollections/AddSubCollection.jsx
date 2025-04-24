import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Loader2 } from "lucide-react";
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
  useCreateSubCollectionMutation,
  useGetCollectionQuery,
  useGetSubCollectionsQuery,
} from "@/redux/api/productApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AddSubCollection = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [createSubCollection, { isLoading }] = useCreateSubCollectionMutation();
  const { data: collectionData } = useGetCollectionQuery();
  const { data: subCollectionData } = useGetSubCollectionsQuery();
  const [selectedCollection, setSelectedCollection] = useState("");
  const [nextPopularityId, setNextPopularityId] = useState("001");

  // Calculate next popularity ID when collection changes
  useEffect(() => {
    if (!selectedCollection || !subCollectionData?.subcollections) return;

    // Filter subcollections that belong to the selected collection
    const relatedSubCollections = subCollectionData.subcollections.filter(
      (subCol) => subCol.collection._id === selectedCollection
    );

    if (relatedSubCollections.length === 0) {
      setNextPopularityId("001");
      return;
    }

    // Find the highest popularityId
    const highestId = relatedSubCollections.reduce((max, subCol) => {
      const currentId = parseInt(subCol.popularityId, 10);
      return currentId > max ? currentId : max;
    }, 0);

    // Increment and format with leading zeros
    const nextId = (highestId + 1).toString().padStart(3, "0");
    setNextPopularityId(nextId);
  }, [selectedCollection, subCollectionData]);

  const handleCollectionChange = (value) => {
    setSelectedCollection(value);
  };

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

    try {
      await createSubCollection({
        name: formData.get("name").trim(),
        description: formData.get("description"),
        collection: formData.get("collection"),
        popularityId: nextPopularityId,
        createdBy: user?._id,
      }).unwrap();

      toast.success("Sub-collection created successfully!");
      navigate("/admin/subcollections");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create sub-collection");
    }
  };

  return (
    <>
      <Metadata title="Add Sub-Collection" />
      <div className="p-3 md:p-5">
        <form onSubmit={handleSubmit}>
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-2xl">Add New Sub-Collection</CardTitle>
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
                required
                onValueChange={handleCollectionChange}
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
                value={nextPopularityId}
                className="bg-gray-100"
                disabled
              />
              {selectedCollection && (
                <p className="text-sm text-gray-500">
                  This ID is automatically generated based on existing
                  sub-collections.
                </p>
              )}

              <Label
                htmlFor="description"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter sub-collection description"
                className="h-32"
              />

              <div className="flex justify-end">
                <Button
                  variant="submit"
                  type="submit"
                  className="w-auto"
                  disabled={isLoading || !selectedCollection}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Creating Sub-Collection...
                    </>
                  ) : (
                    "Create Sub-Collection"
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

export default AddSubCollection;

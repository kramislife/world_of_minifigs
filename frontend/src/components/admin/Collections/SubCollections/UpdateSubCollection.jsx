import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, FileText } from "lucide-react";
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
  useGetCollectionQuery 
} from "@/redux/api/productApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

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

    const updateData = {
      name: formData.get("name"),
      description: formData.get("description"),
      collection: formData.get("collection"),
      updatedBy: user?._id,
    };

    try {
      await updateSubCollection({ 
        id: id,
        ...updateData 
      }).unwrap();
      
      toast.success("Sub-collection updated successfully!");
      navigate("/admin/subcollections");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update sub-collection");
    }
  };

  if (!subCollection) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Metadata title="Update Sub-Collection" />
      <div className="mx-auto py-6">
        <Card className="shadow-xl border-t-4 border-t-blue-500">
          <CardHeader>
            <CardTitle className="text-2xl">Update Sub-Collection</CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="space-y-3">
                  <Label htmlFor="collection">Parent Collection</Label>
                  <Select 
                    name="collection" 
                    defaultValue={subCollection.collection._id}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a collection" />
                    </SelectTrigger>
                    <SelectContent>
                      {collectionData?.collections?.map((collection) => (
                        <SelectItem key={collection._id} value={collection._id}>
                          {collection.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="name">Sub-Collection Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter sub-collection name"
                    defaultValue={subCollection.name}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter sub-collection description"
                    defaultValue={subCollection.description}
                    className="h-32"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    {isLoading ? (
                      <>Updating...</>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Update Sub-Collection
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

export default UpdateSubCollection;
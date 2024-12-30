import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, FileText, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Metadata from "@/components/layout/Metadata/Metadata";
import { useUpdateCollectionMutation, useGetCollectionQuery } from "@/redux/api/productApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UpdateCollection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [updateCollection, { isLoading }] = useUpdateCollectionMutation();
  
  const { data: collectionData } = useGetCollectionQuery();
  const collection = collectionData?.collections?.find(col => col._id === id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const collectionData = {
      name: formData.get("name"),
      description: formData.get("description"),
      updatedBy: user?._id,
    };

    try {
      await updateCollection({ 
        id: id,
        ...collectionData 
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
      <div className="mx-auto py-6">
        <Card className="shadow-xl border-t-4 border-t-blue-500">
          <CardHeader>
            <CardTitle className="text-2xl">Update Collection</CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="space-y-3">
                  <Label htmlFor="name" className="flex items-center gap-2 text-lg font-semibold">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Collection Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter collection name"
                    className="mt-1"
                    defaultValue={collection?.name}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="description" className="flex items-center gap-2 text-lg font-semibold">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter collection description"
                    className="mt-1"
                    defaultValue={collection?.description}
                    rows={4}
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
                        Update Collection
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

export default UpdateCollection;

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, X } from "lucide-react";
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
} from "@/redux/api/productApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";

const AddSubCollection = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [createSubCollection, { isLoading }] = useCreateSubCollectionMutation();
  const { data: collectionData } = useGetCollectionQuery();
  const [subCollectionNames, setSubCollectionNames] = React.useState([]);
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

    if (!formData.get("collection")) {
      toast.error("Please select a parent collection");
      return;
    }

    if (subCollectionNames.length === 0) {
      toast.error("Please add at least one sub-collection name");
      return;
    }

    try {
      await createSubCollection({
        name: subCollectionNames.join(", "),
        description: formData.get("description"),
        collection: formData.get("collection"),
        createdBy: user?._id,
      }).unwrap();

      toast.success("Sub-collections created successfully!");
      navigate("/admin/subcollections");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create sub-collections");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!subCollectionNames.includes(inputValue.trim())) {
        setSubCollectionNames([...subCollectionNames, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const removeSubCollection = (nameToRemove) => {
    setSubCollectionNames(
      subCollectionNames.filter((name) => name !== nameToRemove)
    );
  };

  return (
    <>
      <Metadata title="Add Sub-Collection" />
      <div className="mx-auto py-6">
        <Card className="shadow-xl border-t-4 border-t-blue-500">
          <CardHeader>
            <CardTitle className="text-2xl">Add New Sub-Collection</CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="space-y-3">
                  <Label
                    htmlFor="collection"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    Parent Collection
                  </Label>
                  <Select name="collection" required>
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
                  <Label
                    htmlFor="name"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    Sub-Collection
                  </Label>
                  <div className="space-y-2">
                    <Input
                      id="name"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type and press Enter to add sub-collection name"
                    />

                    <div className="flex flex-wrap gap-2 mb-2">
                      {subCollectionNames.map((name, index) => (
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
                            onClick={() => removeSubCollection(name)}
                            className="hover:opacity-75 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
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
                        Create Sub-Collection
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

export default AddSubCollection;

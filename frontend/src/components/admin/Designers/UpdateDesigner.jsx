import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, FileText, Instagram, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Metadata from "@/components/layout/Metadata/Metadata";
import {
  useUpdateDesignerMutation,
  useGetDesignersQuery,
} from "@/redux/api/productApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UpdateDesigner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [updateDesigner, { isLoading }] = useUpdateDesignerMutation();
  const [previewImage, setPreviewImage] = useState(null);

  const { data: designerData } = useGetDesignersQuery();
  const designer = designerData?.designers?.find((des) => des._id === id);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const profilePicture = formData.get("profile_picture");
    const designerData = new FormData();

    designerData.append("name", formData.get("name"));
    designerData.append("bio", formData.get("bio"));
    designerData.append("social_links[instagram]", formData.get("instagram"));
    if (profilePicture.size > 0) {
      designerData.append("profile_picture", profilePicture);
    }
    designerData.append("updatedBy", user?._id);

    try {
      await updateDesigner({
        id: id,
        ...Object.fromEntries(designerData),
      }).unwrap();
      toast.success("Designer updated successfully!");
      navigate("/admin/designers");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update designer");
    }
  };

  return (
    <>
      <Metadata title="Update Designer" />
      <div className="p-3 md:p-5">
        <form onSubmit={handleSubmit}>
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-2xl">Update Designer</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <Label
                htmlFor="name"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <User className="h-5 w-5 text-blue-600" />
                Designer Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter designer name"
                defaultValue={designer?.name}
                required
              />

              <Label
                htmlFor="bio"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <FileText className="h-5 w-5 text-purple-600" />
                Bio
              </Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Enter designer bio"
                defaultValue={designer?.bio}
              />

              <Label
                htmlFor="instagram"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Instagram className="h-5 w-5 text-green-600" />
                Instagram Profile
              </Label>
              <Input
                id="instagram"
                name="instagram"
                placeholder="https://instagram.com/username"
                defaultValue={designer?.social_links?.instagram}
                type="url"
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
                      Updating Designer...
                    </>
                  ) : (
                    "Update Designer"
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

export default UpdateDesigner;

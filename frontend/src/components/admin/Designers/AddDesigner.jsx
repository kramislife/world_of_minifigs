import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, User, FileText, Instagram, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Metadata from "@/components/layout/Metadata/Metadata";
import { useCreateDesignerMutation } from "@/redux/api/productApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const DEFAULT_PROFILE_PICTURE = {
  public_id: "default_profile_pic",
  url: "https://example.com/images/default_profile_picture.jpg", // Replace with your actual default image URL
};

const AddDesigner = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [createDesigner, { isLoading }] = useCreateDesignerMutation();
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Mock image upload simulation
      setTimeout(() => {
        setUploadedImage({
          public_id: `${file.name.split(".")[0]}_profile_pic`,
          url: `https://example.com/images/${file.name}`,
        });
      }, 1000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const designerData = {
      name: formData.get("name"),
      bio: formData.get("bio"),
      social_links: {
        instagram: formData.get("instagram"),
      },
      profile_picture: uploadedImage || DEFAULT_PROFILE_PICTURE, // Use uploaded image or default
      createdBy: user?._id,
      updatedBy: user?._id,
    };

    try {
      await createDesigner(designerData).unwrap();
      toast.success("Designer created successfully!");
      navigate("/admin/designers"); // Redirect to designers list
    } catch (error) {
      toast.error("Failed to create designer. Please try again.");
    }
  };

  return (
    <>
      <Metadata title="Add Designer" />
      <div className="p-3 md:p-5">
        <form onSubmit={handleSubmit}>
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-2xl">Add New Designer</CardTitle>
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
                required
              />

              <Label
                htmlFor="bio"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <FileText className="h-5 w-5 text-purple-600" />
                Bio
              </Label>
              <Textarea id="bio" name="bio" placeholder="Enter designer bio" />

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
                      Creating Designer...
                    </>
                  ) : (
                    "Create Designer"
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

export default AddDesigner;

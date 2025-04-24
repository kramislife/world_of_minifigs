import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Metadata from "@/components/layout/Metadata/Metadata";
import {
  useUpdateColorMutation,
  useGetColorsQuery,
} from "@/redux/api/productApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UpdateColor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [updateColor, { isLoading: isUpdating }] = useUpdateColorMutation();
  const { data: colorData } = useGetColorsQuery();
  const color = colorData?.prod_color?.find((col) => col._id === id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const colorData = {
      name: formData.get("name"),
      code: formData.get("code"),
      description: formData.get("description"),
      updatedBy: user?._id,
    };

    try {
      await updateColor({
        id: id,
        ...colorData,
      }).unwrap();
      toast.success("Color updated successfully!");
      navigate("/admin/colors");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update color");
    }
  };

  return (
    <>
      <Metadata title="Update Color" />
      <div className="p-3 md:p-5">
        <form onSubmit={handleSubmit}>
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-2xl">Update Color</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <Label
                htmlFor="name"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Palette className="h-5 w-5 text-blue-600" />
                Color Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter color name"
                defaultValue={color?.name}
                required
              />

              <Label
                htmlFor="code"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Palette className="h-5 w-5 text-blue-600" />
                Color Code (HEX)
              </Label>
              <div className="flex gap-4 items-center">
                <Input
                  id="code"
                  name="code"
                  type="text"
                  placeholder="#000000"
                  pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                  defaultValue={color?.code}
                  required
                />
                <Input
                  type="color"
                  defaultValue={color?.code}
                  className="w-20 h-10 p-1"
                  onChange={(e) => {
                    document.getElementById("code").value = e.target.value;
                  }}
                />
              </div>

              <Label
                htmlFor="description"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Palette className="h-5 w-5 text-blue-600" />
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter color description"
                defaultValue={color?.description}
              />

              <div className="flex justify-end">
                <Button
                  variant="submit"
                  type="submit"
                  className="w-auto"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4" />
                      Updating Color...
                    </>
                  ) : (
                    "Update Color"
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

export default UpdateColor;

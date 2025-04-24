import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Palette } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Metadata from "@/components/layout/Metadata/Metadata";
import { useCreateColorMutation } from "@/redux/api/productApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AddColor = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [createColor, { isLoading }] = useCreateColorMutation();
  const [colorCode, setColorCode] = useState("");

  const handleColorCodeChange = (e) => {
    let value = e.target.value;
    value = value.replace("#", "");
    if (value.length === 3 || value.length === 6) {
      value = "#" + value;
    }
    setColorCode(value);
    if (value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      document.getElementById("colorPicker").value = value;
    }
  };

  const handleColorPickerChange = (e) => {
    const value = e.target.value;
    setColorCode(value);
    document.getElementById("code").value = value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const colorData = {
      name: formData.get("name"),
      code: colorCode || formData.get("code"),
      description: formData.get("description"),
      createdBy: user?._id,
      is_active: true,
    };

    try {
      await createColor(colorData).unwrap();
      toast.success("Color created successfully!");
      navigate("/admin/colors");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create color");
    }
  };

  return (
    <>
      <Metadata title="Add Color" />
      <div className="p-3 md:p-5">
        <form onSubmit={handleSubmit}>
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-2xl">Add New Color</CardTitle>
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
                required
              />

              <Label
                htmlFor="code"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Palette className="h-5 w-5 text-blue-600" />
                Color Code (HEX)
              </Label>
              <div className="grid grid-cols-4 gap-4 items-center">
                <div className="col-span-3">
                  <Input
                    id="code"
                    name="code"
                    type="text"
                    placeholder="#000000"
                    pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                    required
                    value={colorCode}
                    onChange={handleColorCodeChange}
                  />
                </div>
                <Input
                  id="colorPicker"
                  type="color"
                  className="w-full p-1"
                  onChange={handleColorPickerChange}
                  value={
                    colorCode.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
                      ? colorCode
                      : "#000000"
                  }
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
              />

              <div className="flex justify-end">
                <Button
                  variant="submit"
                  type="submit"
                  className="w-auto flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4" />
                      Creating Color...
                    </>
                  ) : (
                    "Create Color"
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

export default AddColor;

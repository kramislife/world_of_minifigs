import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Palette } from "lucide-react";
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

    // Remove any existing # symbol
    value = value.replace("#", "");

    // Add # if it's a valid hex code length (3 or 6 characters)
    if (value.length === 3 || value.length === 6) {
      value = "#" + value;
    }

    setColorCode(value);

    // Update the color picker if it's a valid hex code
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
      <div className="mx-auto py-6">
        <Card className="shadow-xl border-t-4 border-t-blue-500">
          <CardHeader>
            <CardTitle className="text-2xl">Add New Color</CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="space-y-3">
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
                    className="mt-1"
                    required
                  />
                </div>

                <div className="space-y-3">
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
                      className="mt-1"
                      required
                      value={colorCode}
                      onChange={handleColorCodeChange}
                    />
                    <Input
                      id="colorPicker"
                      type="color"
                      className="w-20 h-10 p-1"
                      onChange={handleColorPickerChange}
                      value={
                        colorCode.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
                          ? colorCode
                          : "#000000"
                      }
                    />
                  </div>
                </div>

                <div className="space-y-3">
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
                    className="mt-1"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center gap-2 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isLoading ? (
                      <>Creating...</>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Create Color
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

export default AddColor;

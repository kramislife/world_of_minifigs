import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Metadata from "@/components/layout/Metadata/Metadata";
import { useCreateSkillLevelMutation } from "@/redux/api/productApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { FileText, BookOpen } from "lucide-react";

const AddSkillLevel = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [createSkillLevel, { isLoading }] = useCreateSkillLevelMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const skillLevelData = {
      name: formData.get("name"),
      description: formData.get("description"),
      key: formData.get("name").toLowerCase().trim().replace(/\s+/g, "_"),
      createdBy: user?._id,
      updatedBy: user?._id,
      is_active: true,
    };

    try {
      await createSkillLevel(skillLevelData).unwrap();
      toast.success("Skill level created successfully!");
      navigate("/admin/skill-levels");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create skill level");
    }
  };

  return (
    <>
      <Metadata title="Add Skill Level" />
      <div className="mx-auto py-6">
        <Card className="shadow-xl border-t-4 border-t-blue-500">
          <CardHeader>
            <CardTitle className="text-2xl">Add New Skill Level</CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="space-y-3">
                  <Label
                    htmlFor="name"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <FileText className="h-5 w-5 text-blue-600" />
                    Skill Level Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter skill level name"
                    className="mt-1"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="description"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter skill level description"
                    className="mt-1"
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
                      <>Creating...</>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Create Skill Level
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

export default AddSkillLevel;

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Metadata from "@/components/layout/Metadata/Metadata";
import { useCreateSkillLevelMutation } from "@/redux/api/productApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

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
      <div className="p-3 md:p-5">
        <form onSubmit={handleSubmit}>
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-2xl">Add New Skill Level</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
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
                required
              />

              <Label
                htmlFor="description"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <BookOpen className="h-5 w-5 text-purple-600" />
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter skill level description"
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
                      Creating Skill Level...
                    </>
                  ) : (
                    "Create Skill Level"
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

export default AddSkillLevel;

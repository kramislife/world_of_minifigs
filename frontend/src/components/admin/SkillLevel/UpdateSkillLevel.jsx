import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Metadata from "@/components/layout/Metadata/Metadata";
import {
  useUpdateSkillLevelMutation,
  useGetSkillLevelsQuery,
} from "@/redux/api/productApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UpdateSkillLevel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [updateSkillLevel, { isLoading }] = useUpdateSkillLevelMutation();

  const { data: skillLevelData } = useGetSkillLevelsQuery();
  const skillLevel = skillLevelData?.skillLevels?.find(
    (skill) => skill._id === id
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const skillLevelData = {
      name: formData.get("name"),
      description: formData.get("description"),
      key: formData.get("name").toLowerCase().trim().replace(/\s+/g, "_"),
      updatedBy: user?._id,
    };

    try {
      await updateSkillLevel({
        id: id,
        ...skillLevelData,
      }).unwrap();
      toast.success("Skill level updated successfully!");
      navigate("/admin/skill-levels");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update skill level");
    }
  };

  return (
    <>
      <Metadata title="Update Skill Level" />
      <div className="p-3 md:p-5">
        <Card className="border-t-4 border-t-accent">
          <CardHeader>
            <CardTitle className="text-2xl">Update Skill Level</CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-8">
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
                    defaultValue={skillLevel?.name}
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
                    defaultValue={skillLevel?.description}
                    rows={4}
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <Button
                    type="submit"
                    variant="submit"
                    disabled={isLoading}
                    className="w-auto"
                  >
                    {isLoading ? "Updating..." : "Update Skill Level"}
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

export default UpdateSkillLevel;

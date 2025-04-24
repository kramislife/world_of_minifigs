import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useDeleteSkillLevelMutation,
  useGetSkillLevelsQuery,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { createSkillLevelColumns } from "@/components/admin/shared/table/columns/SkillLevelColumns";

const ViewSkillLevel = () => {
  const { data: skillLevelData, isLoading, error } = useGetSkillLevelsQuery();
  const [deleteSkillLevel, { isLoading: isDeleting }] =
    useDeleteSkillLevelMutation();
  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  const handleEdit = (skillLevel) => {
    navigate(`/admin/update-skill-level/${skillLevel._id}`);
  };

  const handleDelete = async (skillLevel) => {
    try {
      const response = await deleteSkillLevel(skillLevel._id).unwrap();
      toast.success(response.message || "Skill level deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete skill level");
    }
  };

  const columns = useMemo(
    () => createSkillLevelColumns(handleEdit, handleDelete, isDeleting),
    [handleEdit, handleDelete, isDeleting]
  );

  const data = useMemo(() => {
    if (!skillLevelData?.skillLevels) return [];
    return [...skillLevelData.skillLevels]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((skillLevel, index) => ({
        id: index + 1,
        _id: skillLevel._id,
        name: skillLevel.name,
        description: skillLevel.description || "N/A",
      }));
  }, [skillLevelData]);

  return (
    <ViewLayout
      title="Skill Level"
      description="Manage your product skill levels"
      addNewPath="/admin/new-skill-level"
      isLoading={isLoading}
      error={error}
      data={data}
      columns={columns}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
};

export default ViewSkillLevel;

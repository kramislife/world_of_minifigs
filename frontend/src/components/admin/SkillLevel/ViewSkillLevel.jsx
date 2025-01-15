import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useDeleteSkillLevelMutation,
  useGetSkillLevelsQuery,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { createSkillLevelColumns } from "@/components/admin/shared/table/columns/SkillLevelColumns";
import DeleteDialog from "@/components/admin/shared/DeleteDialog";

const ViewSkillLevel = () => {
  const { data: skillLevelData, isLoading, error } = useGetSkillLevelsQuery();

  // delete skill level
  const [deleteSkillLevel, { isLoading: isDeleting }] =
    useDeleteSkillLevelMutation();

  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  // handle edit
  const handleEdit = (skillLevel) => {
    navigate(`/admin/update-skill-level/${skillLevel._id}`);
  };

  // delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [skillLevelToDelete, setSkillLevelToDelete] = useState(null);

  // handle delete click
  const handleDeleteClick = (skillLevel) => {
    setSkillLevelToDelete(skillLevel);
    setDeleteDialogOpen(true);
  };

  // handle delete confirm
  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteSkillLevel(skillLevelToDelete._id).unwrap();
      toast.success(response.message || "Skill level deleted successfully");
      setDeleteDialogOpen(false);
      setSkillLevelToDelete(null);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete skill level");
    }
  };

  // column component for table
  const columns = useMemo(() =>
    createSkillLevelColumns(handleEdit, handleDeleteClick)
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
    <>
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

      {/* delete dialog */}
      <DeleteDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSkillLevelToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Skill Level"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-red-500">
              {skillLevelToDelete?.name}
            </span>
            ? This action cannot be undone.
          </>
        }
        isLoading={isDeleting}
      />
    </>
  );
};

export default ViewSkillLevel;

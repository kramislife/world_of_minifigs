import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useGetSubCategoriesQuery,
  useDeleteSubCategoryMutation,
  useUploadSubCategoryImageMutation,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { createSubCategoryColumns } from "@/components/admin/shared/table/columns/SubCategoryColumns";
import DeleteDialog from "@/components/admin/shared/DeleteDialog";

const ViewSubCategories = () => {
  const {
    data: subCategoryData,
    isLoading,
    error,
  } = useGetSubCategoriesQuery();
  const [deleteSubCategory, { isLoading: isDeleting }] =
    useDeleteSubCategoryMutation();
  const [uploadSubCategoryImage] = useUploadSubCategoryImageMutation();
  const [globalFilter, setGlobalFilter] = useState("");
  const [subCategoryToDelete, setSubCategoryToDelete] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (subCategory) => {
    navigate(`/admin/update-subcategory/${subCategory._id}`);
  };

  const handleDelete = (subCategory) => {
    setSubCategoryToDelete(subCategory);
  };

  const handleImageUpload = async (subCategory, file) => {
    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === FileReader.DONE) {
        const imageData = reader.result;

        try {
          await uploadSubCategoryImage({
            id: subCategory._id,
            body: { image: imageData },
          }).unwrap();

          toast.success("Image uploaded successfully");
        } catch (error) {
          toast.error(error?.data?.message || "Failed to upload image");
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const confirmDelete = async () => {
    try {
      await deleteSubCategory(subCategoryToDelete._id).unwrap();
      toast.success("Sub-category deleted successfully");
      setSubCategoryToDelete(null);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete sub-category");
    }
  };

  const columns = useMemo(
    () => createSubCategoryColumns(handleEdit, handleDelete, handleImageUpload)
  );

  const data = useMemo(() => {
    if (!subCategoryData?.sub_categories) return [];

    return [...subCategoryData.sub_categories]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((subCategory, index) => ({
        id: index + 1,
        _id: subCategory._id,
        name: subCategory.name,
        parentCategory: subCategory.category?.name || "N/A",
        image: subCategory.image?.url || null,
        createdBy: new Date(subCategory.createdAt).toLocaleString(),
        updatedBy: subCategory.updatedAt
          ? new Date(subCategory.updatedAt).toLocaleString()
          : "Not Updated",
      }));
  }, [subCategoryData]);

  return (
    <>
      <ViewLayout
        title="Sub Category"
        description="Manage your product sub-categories"
        addNewPath="/admin/new-subcategory"
        isLoading={isLoading}
        error={error}
        data={data}
        columns={columns}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      {/* delete dialog */}
      <DeleteDialog
        isOpen={!!subCategoryToDelete}
        onClose={() => setSubCategoryToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Sub-Category"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-red-500">
              {subCategoryToDelete?.name}
            </span>
            ? This action cannot be undone.
          </>
        }
        isLoading={isDeleting}
      />
    </>
  );
};

export default ViewSubCategories;

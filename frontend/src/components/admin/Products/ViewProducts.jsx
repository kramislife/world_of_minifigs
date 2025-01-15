import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { createProductColumns } from "@/components/admin/shared/table/columns/ProductColumns";
import DeleteDialog from "@/components/admin/shared/DeleteDialog";

const ViewProducts = () => {
  const { data: productData, isLoading, error } = useGetProductsQuery();

  // delete product
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  // handle edit
  const handleEdit = (product) => {
    navigate(`/admin/update-product/${product._id}`);
  };

  // handle view gallery
  const handleViewGallery = (product) => {
    navigate(`/admin/product-gallery/${product._id}`);
  };

  // delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // handle delete click
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  // handle delete confirm
  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteProduct(productToDelete._id).unwrap();
      toast.success(response.message || "Product deleted successfully");
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete product");
    }
  };

  // column component for table
  const columns = useMemo(() =>
    createProductColumns(handleEdit, handleDeleteClick, handleViewGallery)
  );

  const data = useMemo(() => {
    if (!productData?.allProducts) return [];
    return [...productData.allProducts]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((product, index) => ({
        id: index + 1,
        _id: product._id,
        name: product.product_name,
        price: product.price,
        category: product.product_category
          .map((category) => category?.name)
          .join(", ") || "N/A",
        collection: product.product_collection
          .map((collection) => collection.name)
          .join(", ") || "N/A",
        stock: product.stock,
        createdAt: new Date(product.createdAt).toLocaleString(),
      }));
  }, [productData]);

  return (
    <>
      <ViewLayout
        title="Product"
        description="Manage your product inventory"
        addNewPath="/admin/new-product"
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
          setProductToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-red-500">
              {productToDelete?.name}
            </span>
            ? This action cannot be undone.
          </>
        }
        isLoading={isDeleting}
      />
    </>
  );
};

export default ViewProducts;

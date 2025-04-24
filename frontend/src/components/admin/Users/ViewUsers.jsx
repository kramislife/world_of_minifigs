import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "@/redux/api/userApi";
import { toast } from "react-toastify";
import { createUserColumns } from "@/components/admin/shared/table/columns/UserColumns";
import { useSelector } from "react-redux";

const ViewUsers = () => {
  // Queries and Mutations
  const { data: userData, isLoading, error } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const { user: currentUser } = useSelector((state) => state.auth);

  // State
  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  // Handlers
  const handleEdit = (user) => {
    navigate(`/admin/update-user/${user._id}`);
  };

  const handleDelete = async (user) => {
    try {
      const response = await deleteUser(user._id).unwrap();
      toast.success(response.message || "User deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete user");
    }
  };

  // Column component for table
  const columns = useMemo(
    () => createUserColumns(handleEdit, handleDelete, isDeleting),
    [handleEdit, handleDelete, isDeleting]
  );

  // Transform data for table
  const data = useMemo(() => {
    if (!userData?.data) return [];
    return [...userData.data]
      .sort((a, b) => {
        // Put current user at the top
        if (a._id === currentUser?._id) return -1;
        if (b._id === currentUser?._id) return 1;
        // Then sort by creation date
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      .map((user, index) => ({
        id: index + 1,
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
        is_verified: user.is_verified,
        isSuspended: user.isSuspended,
        last_login: user.last_login
          ? new Date(user.last_login).toLocaleString()
          : "Never",
        createdAt: new Date(user.createdAt).toLocaleString(),
        updatedAt: user.updatedAt
          ? new Date(user.updatedAt).toLocaleString()
          : "Not Updated",
        contact_number: user.contact_number,
        isCurrentUser: user._id === currentUser?._id,
      }));
  }, [userData, currentUser]);

  return (
    <ViewLayout
      title="User"
      description="Manage system users and their permissions"
      // addNewPath="/admin/new-user"  // Uncomment if you want to add new user functionality
      isLoading={isLoading}
      error={error}
      data={data}
      columns={columns}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
};

export default ViewUsers;

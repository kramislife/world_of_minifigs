import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import SearchBar from "@/components/admin/table/SearchBar";
import ShowEntries from "@/components/admin/table/ShowEntries";
import TableLayout from "@/components/admin/table/TableLayout";
import Pagination from "@/components/admin/table/Pagination";
import Metadata from "@/components/layout/Metadata/Metadata";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";

const ViewLayout = ({
  title,
  description,
  addNewPath,
  addNewText,
  isLoading,
  error,
  data,
  columns,
  globalFilter,
  setGlobalFilter,
}) => {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error loading {title.toLowerCase()}</div>;
  }

  return (
    <>
      <Metadata title={title} />
      <div className="container mx-auto py-6 px-4">
        <div className="mb-8 flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-light tracking-tight">
              {title} Management
            </h1>
            <p className="text-gray-200/70 text-md">
              {description || `Manage your ${title.toLowerCase()}`}
            </p>
          </div>
          {addNewPath && (
            <button
              onClick={() => navigate(addNewPath)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center gap-2 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-md"
            >
              <PlusCircle className="w-5 h-5" />
              {addNewText || `Add New ${title}`}
            </button>
          )}
        </div>

        <Card className="bg-darkBrand border-none">
          <CardContent className="p-10">
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
              <ShowEntries value={pageSize} onChange={setPageSize} />
              <SearchBar
                value={globalFilter}
                onChange={setGlobalFilter}
                placeholder={`Search ${title.toLowerCase()}...`}
              />
            </div>

            <TableLayout
              data={data}
              columns={columns}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              pageSize={pageSize}
              setPageSize={setPageSize}
              renderPagination={(table) => <Pagination table={table} />}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ViewLayout;

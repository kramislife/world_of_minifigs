import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import SearchBar from "@/components/admin/shared/table/SearchBar";
import ShowEntries from "@/components/admin/shared/table/ShowEntries";
import TableLayout from "@/components/admin/shared/table/TableLayout";
import Pagination from "@/components/admin/shared/table/Pagination";
import Metadata from "@/components/layout/Metadata/Metadata";
import ViewLayoutSkeleton from "@/components/layout/skeleton/Admin/ViewLayoutSkeleton";
import { FallbackMessage } from "@/components/product/shared/FallbackStates";
import { Button } from "@/components/ui/button";

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
    return <ViewLayoutSkeleton title={title} />;
  }

  if (error) {
    return (
      <FallbackMessage
        title={`Error Loading ${title}`}
        message={`There was a problem loading the ${title.toLowerCase()}. Please try again later.`}
      />
    );
  }

  if (!data?.length) {
    return (
      <FallbackMessage
        title={`No ${title} Available`}
        message={`There are no ${title.toLowerCase()} to display. Please check back later or try refreshing the page.`}
      />
    );
  }

  return (
    <>
      <Metadata title={title} />
      <div className="p-5">
        <div className="mb-8 flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-xl md:text-3xl font-bold text-background tracking-tight">
              {title} Management
            </h1>
            <p className="text-gray-200 hidden md:block text-md">
              {description || `Manage your ${title.toLowerCase()}`}
            </p>
          </div>
          {addNewPath && (
            <Button variant="accent" onClick={() => navigate(addNewPath)}>
              <PlusCircle className="w-5 h-5" />
              {addNewText || `New ${title}`}
            </Button>
          )}
        </div>

        <Card className="bg-brand-start border border-brand-end/50 shadow-none">
          <CardContent className="p-5">
            <div className="flex flex-row justify-between gap-6 mb-10">
              <ShowEntries
                value={pageSize}
                onChange={setPageSize}
                totalEntries={data?.length || 0}
              />
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
              renderPagination={(table) =>
                pageSize < data?.length ? <Pagination table={table} /> : null
              }
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ViewLayout;

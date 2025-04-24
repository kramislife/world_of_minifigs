import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ShowEntries = ({ value, onChange, totalEntries }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize from URL parameter on mount
  useEffect(() => {
    const pageSize = searchParams.get("pageSize");
    if (pageSize) {
      if (pageSize === "all") {
        onChange(totalEntries);
      } else if (!isNaN(pageSize) && Number(pageSize) !== value) {
        onChange(Number(pageSize));
      }
    }
  }, []);

  // Update URL when value changes
  const handlePageSizeChange = (newValue) => {
    // Update URL parameter
    const newParams = new URLSearchParams(searchParams);

    if (newValue === "all") {
      newParams.set("pageSize", "all");
      setSearchParams(newParams);
      onChange(totalEntries); // Set to total number of entries
    } else {
      const newPageSize = Number(newValue);
      newParams.set("pageSize", newPageSize);
      setSearchParams(newParams);
      onChange(newPageSize);
    }
  };

  // Function to format the display value
  const getDisplayValue = () => {
    if (value >= totalEntries) return "All";
    return value.toString();
  };

  return (
    <div className="flex items-center text-background">
      <span className="mr-3 text-sm md:text-md">Show</span>
      <Select
        value={value >= totalEntries ? "all" : value.toString()}
        onValueChange={handlePageSizeChange}
      >
        <SelectTrigger className="w-[70px] bg-inherit border border-brand-end/50">
          <SelectValue placeholder={getDisplayValue()} />
        </SelectTrigger>
        <SelectContent>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <SelectItem key={pageSize} value={pageSize.toString()}>
              {pageSize}
            </SelectItem>
          ))}
          <div className="border-t border-brand-end/50 mt-2 pt-1">
            <SelectItem value="all">All</SelectItem>
          </div>
        </SelectContent>
      </Select>
      <span className="ml-3 text-sm md:text-md">entries</span>
    </div>
  );
};

export default ShowEntries;

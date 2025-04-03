import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ShowEntries = ({ value, onChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize from URL parameter on mount
  useEffect(() => {
    const pageSize = searchParams.get("pageSize");
    if (pageSize && !isNaN(pageSize) && Number(pageSize) !== value) {
      onChange(Number(pageSize));
    }
  }, []);

  // Update URL when value changes
  const handlePageSizeChange = (newValue) => {
    const newPageSize = Number(newValue);

    // Update URL parameter
    const newParams = new URLSearchParams(searchParams);
    newParams.set("pageSize", newPageSize);
    setSearchParams(newParams);

    // Call the parent's onChange
    onChange(newPageSize);
  };

  return (
    <div className="flex items-center text-white">
      <span className="mr-3 text-sm md:text-md">Show</span>
      <Select value={value.toString()} onValueChange={handlePageSizeChange}>
        <SelectTrigger className="w-[60px] bg-brand-start border-brand-end">
          <SelectValue placeholder={value} />
        </SelectTrigger>
        <SelectContent className="bg-brand-start border-brand-end">
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <SelectItem
              key={pageSize}
              value={pageSize.toString()}
              className="hover:text-black cursor-pointer text-white"
            >
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="ml-3 text-sm md:text-md">entries</span>
    </div>
  );
};

export default ShowEntries;

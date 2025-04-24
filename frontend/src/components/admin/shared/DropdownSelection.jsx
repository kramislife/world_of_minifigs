import React, { useEffect, useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-toastify";
import { ChevronRight, AlertCircle, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const DropdownSelection = ({
  title,
  mainData,
  subData,
  formData,
  onCheckboxChange,
  mainField,
  subField,
  getSubItems,
  isError,
  error,
  addNewLink,
}) => {
  const [expandedItems, setExpandedItems] = useState({});
  const dropdownRefs = useRef({});

  useEffect(() => {
    setExpandedItems({});
  }, [formData]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.entries(dropdownRefs.current).forEach(([itemId, ref]) => {
        if (
          ref &&
          !ref.contains(event.target) &&
          !event.target.closest(".item-dropdown")
        ) {
          setExpandedItems((prev) => ({
            ...prev,
            [itemId]: false,
          }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleItem = (itemId) => {
    setExpandedItems((prev) => {
      const allClosed = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});

      return {
        ...allClosed,
        [itemId]: !prev[itemId],
      };
    });
  };

  const getNameArray = (name) => {
    return name.split(",").map((item) => item.trim());
  };

  const handleSubItemChange = (mainId, subId, checked) => {
    onCheckboxChange(subField, subId, checked);
    if (checked && !formData[mainField]?.includes(mainId)) {
      onCheckboxChange(mainField, mainId, true);
    }
  };

  const sortedMainData = React.useMemo(() => {
    if (!mainData) return [];

    return [...mainData].sort((a, b) => {
      const aHasSubItems = getSubItems(a._id).length > 0;
      const bHasSubItems = getSubItems(b._id).length > 0;

      if (aHasSubItems && !bHasSubItems) return -1;
      if (!aHasSubItems && bHasSubItems) return 1;
      return 0;
    });
  }, [mainData, getSubItems]);

  return (
    <Card className="w-full shadow-none border-none bg-transparent">
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-6">
          <Label className="text-xl font-semibold text-gray-900">{title}</Label>
          {addNewLink && (
            <Link
              to={addNewLink}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add New
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedMainData?.map((item) => {
            const isChecked = formData[mainField]?.includes(item._id);
            const subItems = getSubItems(item._id);
            const hasSubItems = subItems.length > 0;
            const isExpanded = expandedItems[item._id];
            const itemNames = getNameArray(item.name);

            return (
              <div
                key={item._id}
                className="relative group item-dropdown"
                ref={(el) => (dropdownRefs.current[item._id] = el)}
              >
                <div
                  className={`flex items-center gap-3 p-4 rounded-lg 
                    ${
                      isChecked
                        ? "bg-blue-50 border-blue-200"
                        : "bg-gray-50 border-gray-200"
                    } 
                    border hover:bg-blue-50 cursor-pointer transition-all duration-200 ease-in-out
                    ${hasSubItems ? "hover:shadow-md" : ""}`}
                  onClick={() => hasSubItems && toggleItem(item._id)}
                >
                  <Checkbox
                    id={item._id}
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                      onCheckboxChange(mainField, item._id, checked)
                    }
                    className={`border-black data-[state=checked]:bg-accent data-[state=checked]:border-accent
                      ${isChecked ? "text-blue-600" : "text-gray-400"}
                      hover:text-blue-600`}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="flex-1">
                    {itemNames.map((name, idx) => (
                      <Label
                        key={idx}
                        htmlFor={item._id}
                        className={`text-sm cursor-pointer font-medium block
                          ${isChecked ? "text-blue-700" : "text-gray-700"}
                          group-hover:text-blue-700 transition-colors duration-200`}
                      >
                        {name}
                      </Label>
                    ))}
                  </div>
                  {hasSubItems && (
                    <ChevronRight
                      className={`h-4 w-4 transition-all duration-200
                        ${isChecked ? "text-blue-600" : "text-gray-400"}
                        group-hover:text-blue-600
                        ${isExpanded ? "rotate-90" : ""}`}
                    />
                  )}
                </div>

                {isExpanded && hasSubItems && (
                  <div className="absolute z-10 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg animate-in fade-in-0 zoom-in-95 py-2">
                    <div className="max-h-[250px] overflow-y-auto flex flex-col gap-1">
                      {subItems.map((subItem) => {
                        const subItemNames = getNameArray(subItem.name);
                        return subItemNames.map((name, nameIdx) => {
                          const isSubChecked = formData[subField]?.includes(
                            subItem._id
                          );

                          return (
                            <div
                              key={`${subItem._id}-${nameIdx}`}
                              className={`flex items-center gap-3 p-3 mx-1 rounded-md
                                ${isSubChecked ? "bg-blue-50" : "bg-white"}`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Checkbox
                                id={subItem._id}
                                checked={isSubChecked}
                                onCheckedChange={(checked) =>
                                  handleSubItemChange(
                                    item._id,
                                    subItem._id,
                                    checked
                                  )
                                }
                                className={`h-4 w-4 transition-colors duration-200
                                  ${
                                    isSubChecked
                                      ? "text-blue-600"
                                      : "text-gray-400"
                                  }
                                  hover:text-blue-600`}
                              />
                              <Label
                                htmlFor={subItem._id}
                                className={`text-sm cursor-pointer
                                  ${
                                    isSubChecked
                                      ? "text-blue-700 font-medium"
                                      : "text-gray-600"
                                  }
                                  hover:text-blue-700 transition-colors duration-200`}
                              >
                                {name}
                              </Label>
                            </div>
                          );
                        });
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default DropdownSelection;

import { useCreateProductMutation } from "@/redux/api/productApi";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useProductForm = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const [formData, setFormData] = useState({
    // Basic Information
    name: "",
    price: "",
    discount: "",
    stock: "",
    itemID: "",
    partID: "",

    // Descriptions
    description1: "",
    description2: "",
    description3: "",

    // Specifications as array of objects
    specifications: [
      { name: "length", value: "" },
      { name: "width", value: "" },
      { name: "height", value: "" },
      { name: "piece_count", value: "" },
    ],

    // Additional Information
    manufacturer: "",
    seller: "",
    tags: "",

    // New Fields
    productCategories: [],
    productCollections: [],
    productIncludes: [],
    skillLevel: "",
    productDesigner: "",
    isActive: "",
    availability: null,
    preorder: false,
    preorderDate: null, // Add this for pre-order date
    productColors: [], // Add this for color variants
    productCategory: [],
    productSubCategories: [],
    productSubCollections: [],
  });

  // Handle changes to input fields
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Handle specification fields differently
    if (["length", "width", "height", "piece_count"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        specifications: prev.specifications.map((spec) =>
          spec.name === name ? { ...spec, value } : spec
        ),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle checkbox changes for categories, collections, includes
  const handleCheckboxChange = (field, value, isChecked) => {
    setFormData((prev) => {
      if (isChecked) {
        return {
          ...prev,
          [field]: Array.isArray(prev[field])
            ? [...prev[field], value]
            : [value],
        };
      } else {
        return {
          ...prev,
          [field]: Array.isArray(prev[field])
            ? prev[field].filter((item) => item !== value)
            : [],
        };
      }
    });
  };

  // Handle date change for pre-order availability
  const handleDateChange = (field, date) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submission data:", formData);

    if (!formData.name) {
      toast.error("Product name is required");
      return;
    }

    if (!formData.productColors || formData.productColors.length === 0) {
      toast.error("Please select a color for the product");
      return;
    }

    // Clean and validate IDs before submission
    const cleanAndValidateIds = (ids) => {
      if (!Array.isArray(ids)) return [];
      return ids
        .map((id) => (typeof id === "string" ? id.split("-")[0] : id))
        .filter((id) => typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id));
    };

    const newProduct = {
      product_name: formData.name,
      itemID: formData.itemID.toString(),
      partID: formData.partID.toString(),
      price: parseFloat(formData.price) || 0,
      discount: parseFloat(formData.discount) || 0,
      stock: parseInt(formData.stock, 10) || 0,
      product_description_1: formData.description1,
      product_description_2: formData.description2 || "",
      product_description_3: formData.description3 || "",
      product_category: cleanAndValidateIds(formData.productCategory),
      product_collection: cleanAndValidateIds(formData.productCollections),
      product_sub_categories: cleanAndValidateIds(
        formData.productSubCategories
      ),
      product_sub_collections: cleanAndValidateIds(
        formData.productSubCollections
      ),
      product_piece_count: parseInt(
        formData.specifications.find((spec) => spec.name === "piece_count")
          ?.value || 0,
        10
      ),
      product_availability:
        formData.availability === "In Stock"
          ? null
          : formData.preorderDate || new Date().toISOString().split("T")[0],
      product_length: parseFloat(
        formData.specifications.find((spec) => spec.name === "length")?.value ||
          0
      ),
      product_width: parseFloat(
        formData.specifications.find((spec) => spec.name === "width")?.value ||
          0
      ),
      product_height: parseFloat(
        formData.specifications.find((spec) => spec.name === "height")?.value ||
          0
      ),
      product_includes: formData.productIncludes.join(", "),
      product_skill_level: formData.skillLevel || null,
      product_designer: formData.productDesigner || null,
      ratings: 0,
      seller: formData.seller || "Brick Extreme",
      tags: formData.tags.split(",").map((tag) => tag.trim()) || [],
      is_active: formData.isActive === "yes",
      manufacturer: formData.manufacturer || "Unknown",
      is_preorder: formData.preorder,
      preorder_availability_date: formData.preorderDate
        ? new Date(formData.preorderDate).toISOString().split("T")[0]
        : null,
      product_color: formData.productColors[0],
      createdBy: user?._id,
    };

    console.log("Sending to server:", newProduct);

    try {
      const response = await createProduct(newProduct).unwrap();
      console.log("Creation response:", response);
      toast.success("Product created successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Creation error details:", error);
      toast.error(error?.data?.message || "Failed to create product");
    }
  };

  return {
    formData,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
    handleDateChange,
    isLoading,
  };
};

export default useProductForm;

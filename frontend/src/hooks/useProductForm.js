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
    productCollections: "",
    productIncludes: [],
    skillLevel: "",
    productDesigner: "",
    isActive: "",
    availability: null,
    preorder: false,
    preorderDate: null, // Add this for pre-order date
    productColors: [], // Add this for color variants
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

    if (!formData.name || !formData.price) {
      toast.error("Name and price are required fields");
      return;
    }

    if (!formData.productColors || formData.productColors.length === 0) {
      toast.error("Please select a color for the product");
      return;
    }

    const newProduct = {
      product_name: formData.name,
      price: parseFloat(formData.price),
      discount: parseFloat(formData.discount),
      stock: parseInt(formData.stock, 10),
      product_description_1: formData.description1,
      product_description_2: formData.description2 || "",
      product_description_3: formData.description3 || "",
      product_category: formData.productCategories,
      product_collection: formData.productCollections,
      product_piece_count: parseInt(
        formData.specifications.find((spec) => spec.name === "piece_count")
          ?.value || 0,
        10
      ),
      product_availability:
        formData.availability === "In Stock"
          ? null
          : formData.preorder_availability_date ||
            new Date().toISOString().split("T")[0],
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
      product_skill_level: formData.skillLevel,
      product_designer: formData.productDesigner,
      ratings: 0,
      seller: formData.seller || "Brick Extreme",
      tags: formData.tags.split(",").map((tag) => tag.trim()) || [],
      is_active: formData.isActive === "yes" ? true : false,
      manufacturer: formData.manufacturer || "Unknown",
      is_preorder: formData.preorder,
      preorder_date: formData.preorderDate
        ? formData.preorderDate.toISOString().split("T")[0]
        : null,
      createdBy: user?._id,
      product_color: formData.productColors[0],
    };

    try {
      console.log("Submitting product with color:", newProduct.product_color);
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
    handleDateChange, // Return handleDateChange
    isLoading,
  };
};

export default useProductForm;

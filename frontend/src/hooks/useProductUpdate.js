import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "@/redux/api/productApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const useProductUpdate = (id) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

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
    isActive: false,
    availability: null,
    preorder: false,
    preorderDate: null,
    productColors: [],
  });

  const { data, isLoading, isError, error } = useGetProductDetailsQuery(id);
  const [
    updateProduct,
    {
      isLoading: updateProductIsLoading,
      isError: updateProductIsError,
      error: updateProductError,
    },
  ] = useUpdateProductMutation();

  // Populate form data when API data is received
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Failed to fetch product details.");
    }

    if (data) {
      setFormData({
        name: data?.product?.product_name || "",
        price: data?.product?.price || "",
        discount: data?.product?.discount || "",
        stock: data?.product?.stock || "",
        description1: data?.product?.product_description_1 || "",
        description2: data?.product?.product_description_2 || "",
        description3: data?.product?.product_description_3 || "",
        specifications: [
          { name: "length", value: data?.product?.product_length || "" },
          { name: "width", value: data?.product?.product_width || "" },
          { name: "height", value: data?.product?.product_height || "" },
          {
            name: "piece_count",
            value: data?.product?.product_piece_count || "",
          },
        ],
        manufacturer: data?.product?.manufacturer || "",
        seller: data?.product?.seller || "",
        tags: data?.product?.tags?.join(", ") || "",
        productCategories:
          data?.product?.product_category.map((cat) => cat._id) || [],
        productCollections:
          data?.product?.product_collection.map((col) => col._id) || [],
        productIncludes: data?.product?.product_includes?.split(", ") || [],
        skillLevel: data?.product?.product_skill_level?._id || "",
        productDesigner: data?.product?.product_designer?._id || "",
        isActive: data?.product?.is_active || false,
        availability: data?.product?.product_availability || "In Stock",
        preorder: data?.product?.is_preorder || false,
        preorderDate: data?.product?.preorder_date
          ? new Date(data?.product?.preorder_date)
          : null,
        productColors: data?.product?.product_color
          ? [data.product.product_color._id]
          : [],
      });
    }
  }, [isError, error, data]);

  // Handle update errors
  useEffect(() => {
    if (updateProductError) {
      toast.error(
        updateProductError?.data?.message || "Failed to update product"
      );
    }
  }, [updateProductError]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (["length", "width", "height", "piece_count"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        specifications: prevData.specifications.map((spec) =>
          spec.name === name ? { ...spec, value: value } : spec
        ),
      }));
    } else if (type === "radio") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (fieldName, value, checked) => {
    setFormData((prevData) => {
      if (Array.isArray(prevData[fieldName])) {
        return {
          ...prevData,
          [fieldName]: checked
            ? [...prevData[fieldName], value]
            : prevData[fieldName].filter((item) => item !== value),
        };
      } else {
        return {
          ...prevData,
          [fieldName]: checked,
        };
      }
    });
  };

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

    const productData = {
      product_name: formData.name,
      price: parseFloat(formData.price),
      discount: parseFloat(formData.discount) || 0,
      stock: parseInt(formData.stock, 10) || 0,
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
      is_active: formData.isActive,
      manufacturer: formData.manufacturer || "Unknown",
      is_preorder: formData.preorder,
      preorder_date: formData.preorderDate
        ? formData.preorderDate.toISOString().split("T")[0]
        : null,
      product_color: formData.productColors[0],
      createdBy: user?._id,
    };

    try {
      console.log("Updating product with color:", productData.product_color);
      await updateProduct({ id, productData }).unwrap();
      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error?.data?.message || "Failed to update product");
    }
  };

  return {
    formData,
    isLoading,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
  };
};

export default useProductUpdate;

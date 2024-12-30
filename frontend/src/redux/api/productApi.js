import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),
  endpoints: (builder) => ({
    // --------------------------------- GET PRODUCTS ---------------------------------------

    getProducts: builder.query({
      query: (queryString) => {
        if (typeof queryString === "object") {
          const params = new URLSearchParams();
          Object.entries(queryString).forEach(([key, value]) => {
            params.append(key, Array.isArray(value) ? value.join(",") : value);
          });
          queryString = params.toString();
        }
        return `/products?${queryString}`;
      },
      providesTags: ["Products"],
    }),

    // GET PRODUCT DETAILS

    getProductDetails: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [
        { type: "ProductDetails", id },
        { type: "Product", id },
      ],
    }),

    // ADD A NEW PRODUCT

    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: `/admin/newProduct`,
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),

    // UPDATE A PRODUCT

    updateProduct: builder.mutation({
      query: ({ id, productData }) => ({
        url: `/admin/product/${id}`,
        method: "PUT",
        body: productData,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Products",
        { type: "Product", id },
        { type: "ProductDetails", id },
      ],
    }),

    // DELETE A PRODUCT

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/admin/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    // UPLOAD AN IMAGE

    uploadProductImages: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/products/${id}/upload_images`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),

    // DELETE AN IMAGE

    deleteProductImage: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/products/${id}/delete_images`,
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),

    // --------------------------------- CATEGORIES ---------------------------------------

    getCategory: builder.query({
      query: () => `/categories`,
      providesTags: ["Categories"],
    }),

    // GET CATEGORY BY KEY

    getCategoryByKey: builder.query({
      query: (key) => `/categories/${key}`,
    }),

    // ADD A NEW CATEGORY

    createCategory: builder.mutation({
      query: (data) => ({
        url: "/admin/newCategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    // UPDATE A CATEGORY

    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    // DELETE A CATEGORY

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/admin/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),

    // --------------------------------- COLLECTIONS ---------------------------------------

    // GET ALl COLLECTIONS

    getCollection: builder.query({
      query: () => `/collections`,
      providesTags: ["Collections"],
    }),

    // GET COLLECTION BY KEY

    getCollectionByKey: builder.query({
      query: (key) => `/collections/${key}`,
    }),

    // GET COLLECTION DETAILS
    getCollectionDetails: builder.query({
      query: (id) => `/collections/${id}`,
      providesTags: (result, error, id) => [
        { type: "CollectionDetails", id },
        { type: "Collection", id },
      ],
    }),

    // ADD A NEW COLLECTION

    createCollection: builder.mutation({
      query: (data) => ({
        url: "/admin/newCollection",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Collections"],
    }),

    // UPDATE A COLLECTION

    updateCollection: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/collections/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Collections"],
    }),

    // DELETE A COLLECTION

    deleteCollection: builder.mutation({
      query: (id) => ({
        url: `/admin/collections/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Collections"],
    }),

    //ULOAD COLLECTION IMAGE

    uploadCollectionImage: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/collections/${id}/upload_image`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["Collections"],
    }),

    // --------------------------------- GET SKILL LEVELS ---------------------------------------

    getSkillLevels: builder.query({
      query: () => `/skillLevels`,
      providesTags: ["SkillLevels"],
    }),

    // GET SKILL LEVEL BY KEY

    getSkillLevelByKey: builder.query({
      query: (key) => `/skillLevels/${key}`,
    }),

    // ADD A NEW SKILL LEVEL
    createSkillLevel: builder.mutation({
      query: (data) => ({
        url: "/admin/newSkillLevel",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SkillLevels"],
    }),

    // UPDATE A SKILL LEVEL

    updateSkillLevel: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/skillLevels/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["SkillLevels"],
    }),

    // DELETE A SKILL LEVEL

    deleteSkillLevel: builder.mutation({
      query: (id) => ({
        url: `/admin/skillLevels/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SkillLevels"],
    }),

    // --------------------------------- GET DESIGNERS ---------------------------------------

    getDesigners: builder.query({
      query: () => `/designers`,
      providesTags: ["Designers"],
    }),

    // GET DESIGNER BY KEY

    getDesignerByKey: builder.query({
      query: (key) => `/designers/${key}`,
    }),

    // ADD A NEW DESIGNER
    createDesigner: builder.mutation({
      query: (data) => ({
        url: "/admin/newDesigner",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Designers"],
    }),

    // UPDATE A DESIGNER
    updateDesigner: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/designers/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Designers"],
    }),

    // DELETE A DESIGNER

    deleteDesigner: builder.mutation({
      query: (id) => ({
        url: `/admin/designers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Designers"],
    }),

    // --------------------------------- GET COLORS ---------------------------------------

    getColors: builder.query({
      query: () => `/admin/colors`,
      providesTags: ["Colors"],
    }),

    // ADD A NEW COLOR
    createColor: builder.mutation({
      query: (data) => ({
        url: "/admin/newColor",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Colors"],
    }),

    // UPDATE A COLOR
    updateColor: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/colors/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Colors"],
    }),

    // DELETE A COLOR
    deleteColor: builder.mutation({
      query: (id) => ({
        url: `/admin/colors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Colors"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetCategoryQuery,
  useGetCollectionQuery,
  useGetSkillLevelsQuery,
  useGetDesignersQuery,
  useGetCategoryByKeyQuery,
  useDeleteProductMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateCollectionMutation,
  useCreateSkillLevelMutation,
  useCreateDesignerMutation,
  useUpdateCollectionMutation,
  useDeleteCollectionMutation,
  useUpdateSkillLevelMutation,
  useDeleteSkillLevelMutation,
  useUpdateDesignerMutation,
  useDeleteDesignerMutation,
  useUploadProductImagesMutation,
  useDeleteProductImageMutation,
  useGetCollectionDetailsQuery,
  useUploadCollectionImageMutation,
  useGetColorsQuery,
  useCreateColorMutation,
  useUpdateColorMutation,
  useDeleteColorMutation,
} = productApi;

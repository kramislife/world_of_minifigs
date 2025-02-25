import Collection from "../models/collection.model.js";
import SubCollection from "../models/subCollection.model.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../Utills/customErrorHandler.js";
import { upload_single_image } from "../Utills/cloudinary.js";

//------------------------------------ GET ALL COLLECTIONS => GET /collections ------------------------------------

export const getAllCollections = catchAsyncErrors(async (req, res, next) => {
  const collections = await Collection.find().sort({ popularityId: 1 });

  if (!collections) {
    return next(new ErrorHandler("Failed to retrieve all collections", 404));
  }

  res.status(200).json({
    message: `${collections.length} collections retrieved`,
    collections,
  });
});

//------------------------------------ GET COLLECTION BY ID => GET /collections/:id ------------------------------------

export const getCollectionById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  // console.log("ID:", id);

  const collection = await Collection.findById(id);
  if (!collection) {
    return next(new ErrorHandler("Failed to retrive all collections", 404));
  }
  res.status(200).json({
    message: "Collection retrived",
    collection,
  });
});

// --------------------------------------------------- ADMIN ----------------------------------------------------------

//------------------------------------ CREATE NEW COLLECTION => admin/newCollection ------------------------------------

export const createCollection = catchAsyncErrors(async (req, res, next) => {
  // Check if we already have 2 featured collections when trying to add another
  if (req.body.isFeatured) {
    const featuredCount = await Collection.countDocuments({ isFeatured: true });
    if (featuredCount >= 2) {
      const featuredCollections = await Collection.find({ isFeatured: true })
        .select("name")
        .limit(2);

      const collectionNames = featuredCollections
        .map((c) => c.name)
        .join(" and ");
      return next(
        new ErrorHandler(
          `You can only feature up to 2 collections at a time. Try removing one of the existing featured collections first.`,
          400
        )
      );
    }
  }

  const newCollection = await Collection.create(req?.body);

  if (!newCollection) {
    return next(new ErrorHandler("Failed to create new collection", 404));
  }

  res.status(201).json({
    message: "Collection created successfully",
    newCollection,
  });
});

//------------------------------------ UPDATE COLLECTION => admin/collections/:id ------------------------------------

export const updateCollection = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const updatedData = { ...req.body };

  // Get the existing collection first
  const existingCollection = await Collection.findById(id);
  if (!existingCollection) {
    return next(new ErrorHandler("Collection not found", 404));
  }

  // Check featured collection limit only if isFeatured is being changed to true
  if (updatedData.isFeatured && !existingCollection.isFeatured) {
    const featuredCount = await Collection.countDocuments({ isFeatured: true });
    if (featuredCount >= 2) {
      const featuredCollections = await Collection.find({ isFeatured: true })
        .select("name")
        .limit(2);

      const collectionNames = featuredCollections
        .map((c) => c.name)
        .join(" and ");
      return next(
        new ErrorHandler(
          `You can only feature up to 2 collections at a time. Try removing one of the existing featured collections first.`,
          400
        )
      );
    }
  }

  // Preserve the image if it's not being updated
  if (!updatedData.image && existingCollection.image) {
    updatedData.image = existingCollection.image;
  }

  const updatedCollection = await Collection.findByIdAndUpdate(
    id,
    updatedData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedCollection) {
    return next(new ErrorHandler("Failed to update collection", 404));
  }

  res.status(200).json({
    updatedCollection,
    message: "Collection updated successfully",
  });
});

//------------------------------------ DELETE COLLECTION => admin/collection/:id ------------------------------------

export const deleteCollectionByID = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  // First check if collection exists
  const collection = await Collection.findById(id);
  if (!collection) {
    return next(new ErrorHandler("Collection not found", 404));
  }

  // Check if there are any subcollections linked to this collection
  const subCollections = await SubCollection.find({ collection: id });

  if (subCollections && subCollections.length > 0) {
    return next(
      new ErrorHandler(
        `'${collection.name}' cannot be deleted. Please delete all subcollections first.`,
        400
      )
    );
  }

  // If no subcollections exist, proceed with deletion
  const deletedCollection = await Collection.findByIdAndDelete(id);

  res.status(200).json({
    deletedCollection,
    message: "Collection deleted successfully",
  });
});

//------------------------------------ UPLOAD COLLECTION => admin/collection/:id/upload_image ------------------------------------

export const uploadCollectionImage = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const { image } = req.body; // Get the single image from the request body

      if (!image) {
        return next(new ErrorHandler("No image provided", 400));
      }

      // Assuming `uploadImage` is a helper function to handle the image upload
      const url = await upload_single_image(
        image,
        "world_of_minifigs//collections"
      );

      console.log("Uploaded URL:", url);

      // Update the product by pushing the single image URL to the `product_images` array
      const collection = await Collection.findByIdAndUpdate(
        req.params.id,
        { image: url }, // Update operation
        { new: true, runValidators: true } // Options
      );

      if (!collection) {
        return next(new ErrorHandler("Collection not found", 404));
      }

      res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        data: collection,
      });
    } catch (error) {
      return next(
        new ErrorHandler(error.message || "Image upload failed", 500)
      );
    }
  }
);

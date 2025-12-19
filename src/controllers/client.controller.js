import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ClientManagement } from "../models/clientManagement.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// get all clients
const getAllClients = asyncHandler(async (req, res) => {
  const allClients = await ClientManagement.find();

  if (allClients.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No clients available at the moment"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, allClients, "All Clients fetched successfully"));
});

// create client
const createClient = asyncHandler(async (req, res) => {
  // get client data from the frontend
  // check all fields is not empty
  // check for image
  // upload them to cloudinary
  // check image uploaded or not
  // create a client in db
  // check for client creation
  // send res

  const { clientName, clientDescription, clientDesignation } = req.body;

  if (!clientDescription || !clientDesignation || !clientName) {
    throw new ApiError(400, "All fields are required");
  }

  const clientImageLocalPath = req.file?.path;

  if (!clientImageLocalPath) {
    throw new ApiError(400, "Client Image file is required");
  }

  const newClientImage = await uploadOnCloudinary(clientImageLocalPath);

  if (!newClientImage) {
    throw new ApiError(400, "client image file is required");
  }

  const client = await ClientManagement.create({
    clientName,
    clientDescription,
    clientDesignation,
    clientImage: newClientImage.url,
  });

  const createdClient = await ClientManagement.findById(client._id);

  if (!createdClient) {
    throw new ApiError(500, "Something went wrong while creating the client");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        createdClient,
      },
      "Client Create successfully"
    )
  );
});

export { createClient, getAllClients };

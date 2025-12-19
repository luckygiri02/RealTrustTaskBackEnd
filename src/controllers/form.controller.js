import { ContactForm } from "../models/contactForm.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// get all form data
const getAllFormData = asyncHandler(async (req, res) => {
  // get all form data to db
  const allFormData = await ContactForm.find();

  if (allFormData.length === 0) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, [], "No form details available at the moment")
      );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        allFormData,
      },
      "All forms fetched successfully"
    )
  );
});

// store form data in db
const createContactForm = asyncHandler(async (req, res) => {
  // get all data from the front end
  // check all fileds is not empty
  // store the form details in db
  // check for creation
  // send res
  console.log(req.body);

  const { fullName, email, mobileNumber, city } = req.body;

  if (!fullName || !email || !mobileNumber || !city) {
    throw new ApiError(400, "All fields are required");
  }

  if (mobileNumber.length !== 10) {
    throw new ApiError(400, "mobile number should be only 10 digit");
  }

  const form = await ContactForm.create({
    fullName,
    email,
    mobileNumber,
    city,
  });

  console.log(`form details : ${form}`);

  const createdForm = await ContactForm.findById(form._id);

  if (!createdForm) {
    throw new ApiError(
      500,
      "Something went wrong while submiting the form details"
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        createdForm,
      },
      "form Create successfully"
    )
  );
});

export { createContactForm, getAllFormData };

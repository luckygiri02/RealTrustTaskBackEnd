import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ProjectManagement } from "../models/projectManagement.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// get all project
const getAllProjects = asyncHandler(async (req, res) => {
  // make a db call for fetch the all projects
  const allProjects = await ProjectManagement.find();

  //   console.log(`All Projects : ${allProjects}`);

  if (allProjects.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No projects available at the moment"));
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        allProjects,
      },
      "All Projects fetched successfully"
    )
  );
});

// create project
const createProject = asyncHandler(async (req, res) => {
  // get all data from the frontend
  // check all field is not empty
  // check project is not already exist
  // check for image
  // upload them to cloudinary
  // check image uploaded or not
  // create a project in db
  // check for project creation
  // send res

  const { projectName, projectDescription } = req.body;

  if (!projectName || !projectDescription) {
    throw new ApiError(400, "All fields are required");
  }

  const existedProject = await ProjectManagement.findOne({ projectName });

  if (existedProject) {
    throw new ApiError(409, "Project with ProjectName already exists");
  }

  const projectImageLocalPath = req.file?.path;
  // const projectImageLocalPath = req.files?.projectImage?.path;

  // console.log(req);

  //   console.log(`projectImageLocalPath : ${projectImageLocalPath}`);

  if (!projectImageLocalPath) {
    throw new ApiError(400, "project Image file is required");
  }

  const projectImage = await uploadOnCloudinary(projectImageLocalPath);

  if (!projectImage) {
    throw new ApiError(400, "projectImage file is required");
  }

  const project = await ProjectManagement.create({
    projectName,
    projectDescription,
    projectImage: projectImage.url,
  });

  const createdProject = await ProjectManagement.findById(project._id);

  if (!createdProject) {
    throw new ApiError(500, "Something went wrong while creating the Project");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdProject, "Project created Successfully"));
});

export { getAllProjects, createProject };

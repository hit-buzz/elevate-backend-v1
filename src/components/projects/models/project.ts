import ZOD_TYPE from "../../../data-types/zod-types";
import zod from "zod";

export const projectSchema = zod.object({
  //   id: ZOD_TYPE.String().nullable(),
  projectName: ZOD_TYPE.String({
    required_error: "Project Name cannot be empty",
    invalid_type_error: "Type doesnot match",
  }).nonempty(),

  projectDescription: ZOD_TYPE.String({
    invalid_type_error: "Type doesnot match",
  })
    .min(1, "minimum length is 1")
    .max(1500, "maximum length is 1500"),
  author: ZOD_TYPE.String().min(1).max(30).nonempty(),
});

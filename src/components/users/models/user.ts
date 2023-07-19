import ZOD_TYPE from "../../../data-types/zod-types";
import zod from "zod";

 const userSchema = zod.object({
  email: ZOD_TYPE.String({
    required_error: "email field is mandatory",
  })
    .email({ message: "email is invalid" })
    .nonempty(),
  password: ZOD_TYPE.String().nonempty({ message: "password cannot be empty" }),
});

export default userSchema
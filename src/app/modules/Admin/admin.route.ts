import express from "express";
import { AdminController } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidationSchemas } from "./admin.validation";
const router = express.Router();

// const update = z.object({
//   body: z.object({
//     name: z.string().optional(),
//     contactNumber: z.string().optional(),
//   }),
// });

// const validateRequest = (schema: AnyZodObject) => async (req, res, next) => {
//   try {
//     await schema.parseAsync({
//       body: req.body,
//     });
//     next();
//   } catch (err) {
//     next(err);
//   }
// };

router.get("/", AdminController.getAllFromDB);

router.get("/:id", AdminController.getByIdFromDB);

router.patch(
  "/:id",
  validateRequest(adminValidationSchemas.update),
  AdminController.updateIntoDB
);

router.delete("/:id", AdminController.deleteFromDB);

router.delete("/soft/:id", AdminController.softDeleteFromDB);

export const AdminRoutes = router;

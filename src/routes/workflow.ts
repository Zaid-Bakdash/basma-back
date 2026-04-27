import { Router } from "express";
import * as workflowController from "../controller/WorkflowController";

const router = Router();

router.post("/", workflowController.create);
router.get("/", workflowController.getAll);
router.get("/:id", workflowController.getById);
router.patch("/:id", workflowController.update);
router.delete("/:id", workflowController.destroy);
router.post("/run", workflowController.run);

export default router;

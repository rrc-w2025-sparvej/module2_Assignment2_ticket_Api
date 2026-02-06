import { Router } from "express";
import * as controller from "../controllers/ticketController";

const router = Router();

// get all support tickets
router.get("/", controller.getAll);

// get a single ticket by ID
router.get("/:id", controller.getById);

// get a new support ticket
router.post("/", controller.create);

// update an existing ticket by ID
router.put("/:id", controller.update);

// Delete a ticket by ID
router.delete("/:id", controller.remove);

// Get urgency information
router.get("/:id/urgency", controller.urgency);

export default router;

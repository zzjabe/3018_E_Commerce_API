import express, { Router } from "express";
import { setCustomClaims } from "../controllers/adminController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize"

const router: Router = express.Router();

/**
 * @openapi
 * /admin/setCustomClaims:
 *   post:
 *     summary: Set custom claims for a specific user
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     description: >
 *       This endpoint allows an admin to assign custom claims (roles or permissions)  
 *       to a Firebase Authentication user. Only users with an "admin" role can access this route.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - uid
 *               - claims
 *             properties:
 *               uid:
 *                 type: string
 *                 example: "aBcD1234EfGhIj"
 *                 description: The Firebase user UID to update.
 *               claims:
 *                 type: object
 *                 example:
 *                   role: "manager"
 *                 description: Custom claims object to assign to the user.
 *     responses:
 *       200:
 *         description: Custom claims were successfully set.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Custom claims set for user: aBcD1234EfGhIj"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Invalid request body.
 *       401:
 *         description: Unauthorized — missing or invalid token.
 *       403:
 *         description: Forbidden — user does not have admin privileges.
 *       500:
 *         description: Internal server error.
 */
router.post("/setCustomClaims", authenticate, isAuthorized({ hasRole: ["admin"]}), setCustomClaims);

export default router;
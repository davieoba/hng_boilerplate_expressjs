import { Request, Response } from "express";
import { AdminOrganisationService, AdminUserService } from "../services";
import { HttpError } from "../middleware";

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin Related Routes
 */

/**
 * @swagger
 * /api/v1/admin/organisation/:id:
 *   patch:
 *     summary: Admin-Update an existing organisation
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               slug:
 *                 type: string
 *               type:
 *                 type: string
 *               industry:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Organisation Updated Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     slug:
 *                       type: string
 *                     type:
 *                       type: string
 *                     industry:
 *                       type: string
 *                     state:
 *                       type: string
 *                     country:
 *                       type: string
 *                     address:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                 status_code:
 *                   type: integer
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

class AdminOrganisationController {
  private adminService: AdminOrganisationService;

  constructor() {
    this.adminService = new AdminOrganisationService();
  }

  async updateOrg(req: Request, res: Response): Promise<void> {
    try {
      const org = await this.adminService.update(req);
      res.status(200).json({
        success: true,
        message: "Organisation Updated Successfully",
        data: {
          id: org.id,
          name: org.name,
          email: org.email,
          slug: org.slug,
          type: org.type,
          industry: org.industry,
          state: org.state,
          country: org.country,
          address: org.address,
          created_at: org.created_at,
          updated_at: org.updated_at,
        },
        status_code: 200,
      });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status_code).json({ message: error.message });
      } else {
        res
          .status(500)
          .json({ message: error.message || "Internal Server Error" });
      }
    }
  }
}

class AdminUserController {
  private adminUserService: AdminUserService;

  constructor() {
    this.adminUserService = new AdminUserService();
  }

  /**
   * @swagger
   * /api/v1/admin/users/:id:
   *   patch:
   *     summary: Admin-Update an existing user
   *     tags: [Admin]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The ID of the user to update
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *               role:
   *                 type: string
   *               isverified:
   *                 type: boolean
   *     responses:
   *       200:
   *         description: User Updated Successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 message:
   *                   type: string
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: string
   *                     name:
   *                       type: string
   *                     email:
   *                       type: string
   *                     role:
   *                       type: string
   *                     isverified:
   *                       type: boolean
   *                     createdAt:
   *                       type: string
   *                       format: date-time
   *                     updatedAt:
   *                       type: string
   *                       format: date-time
   *                 status_code:
   *                   type: integer
   *       400:
   *         description: Bad Request
   *       404:
   *         description: User Not Found
   *       500:
   *         description: Internal Server Error
   */

  //Update Single User
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.adminUserService.updateUser(req);
      res.status(200).json({
        success: true,
        message: "User Updated Successfully",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          isverified: user.isverified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        status_code: 200,
      });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status_code).json({ message: error.message });
      } else {
        res
          .status(500)
          .json({ message: error.message || "Internal Server Error" });
      }
    }
  }

  /**
   * @swagger
   * /api/v1/admin/users:
   *   get:
   *     summary: Admin-List users with pagination
   *     tags: [Admin]
   *     parameters:
   *       - in: query
   *         name: page
   *         required: false
   *         description: Page number for pagination
   *         schema:
   *           type: integer
   *           default: 1
   *       - in: query
   *         name: limit
   *         required: false
   *         description: Number of users per page
   *         schema:
   *           type: integer
   *           default: 5
   *     responses:
   *       200:
   *         description: Users retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 message:
   *                   type: string
   *                 users:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       name:
   *                         type: string
   *                       email:
   *                         type: string
   *                       createdAt:
   *                         type: string
   *                         format: date-time
   *                       updatedAt:
   *                         type: string
   *                         format: date-time
   *                 pagination:
   *                   type: object
   *                   properties:
   *                     totalUsers:
   *                       type: integer
   *                     totalPages:
   *                       type: integer
   *                     currentPage:
   *                       type: integer
   *                 status_code:
   *                   type: integer
   *       400:
   *         description: Bad Request
   *       500:
   *         description: Internal Server Error
   */

  async listUsers(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;

      if (page <= 0 || limit <= 0) {
        res.status(400).json({
          status: "bad request",
          message: "Invalid query params passed",
          status_code: 400,
        });
        return;
      }

      const { users, totalUsers } =
        await this.adminUserService.getPaginatedUsers(page, limit);
      const pages = Math.ceil(totalUsers / limit);

      if (page > pages) {
        res.status(400).json({
          status: "bad request",
          message: `last page reached page: ${pages}`,
          status_code: 400,
        });
        return;
      }

      res.json({
        success: true,
        message: "Users retrieved successfully",
        users: users.map((user) => ({
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        })),
        pagination: {
          totalUsers,
          totalPages: pages,
          currentPage: page,
        },
        status_code: 200,
      });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status_code).json({ message: error.message });
      } else {
        res
          .status(500)
          .json({ message: error.message || "Internal Server Error" });
      }
    }
  }
}

export default { AdminOrganisationController, AdminUserController };

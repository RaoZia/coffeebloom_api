const express = require("express");
const router = express.Router();
const protected = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");
const {
  getSingleuser,
  getAllUsers,
  updateById,
} = require("../controllers/usersController");

router.get(
  "/profile/:id",
  protected,
  /*
    #swagger.tags = ['users']
    #swagger.summary = 'Get sigle user'
    #swagger.description = 'Fetch single user'
    #swagger.responses[200] = {
      description: 'User fetched successfully',
      content: {
        "application/json": {
          example: {
            rescode: 1,
            message: "Users fetched successfully",
            data: [
              {
                user_id: 1,
                name: "Name1",
                email: "test@example.com",
                address: "Your Address"
              }
            ]
          }
        }
      }
    }
  */
  getSingleuser,
);
router.get(
  "/",
  protected,
  /*
    #swagger.tags = ['users']
    #swagger.summary = 'Get all users'
    #swagger.description = 'Fetch list of all active users'
   
    #swagger.responses[200] = {
      description: 'Users fetched successfully',
      content: {
        "application/json": {
          example: {
            rescode: 1,
            message: "Users fetched successfully",
            data: [
              {
                user_id: 1,
                name: "Name1",
                email: "test@example.com",
                address: "Your Address"
              },
              {
                user_id: 2,
                name: "Name2",
                email: "test@example.com",
                address: "Your Address"
              }
            ]
          }
        }
      }
    }
  */
  getAllUsers,
);

router.put(
  "/:id",
  protected,
  upload.single("image"),
  /*
    #swagger.tags = ['users']
    #swagger.summary = 'Update user'
    #swagger.description = 'Update user profile with image'

    #swagger.security = [{
      "BearerAuth": []
    }]

    #swagger.consumes = ['multipart/form-data']

    #swagger.requestBody = {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            required: ["name", "email", "address"],
            properties: {
              name: {
                type: "string",
                example: "Ali Khan"
              },
              email: {
                type: "string",
                example: "user@test.com"
              },
              address: {
                type: "string",
                example: "Lahore"
              },
              image: {
                type: "string",
                format: "binary"
              }
            }
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: 'User updated successfully',
      content: {
        "application/json": {
          example: {
            rescode: 1,
            message: "User updated",
            data: {
              id: 1,
              name: "Ali Khan",
              email: "user@test.com",
              address: "Lahore",
              image_url: "/uploads/images/profile.jpg"
            }
          }
        }
      }
    }
  */
  updateById,
);
module.exports = router;

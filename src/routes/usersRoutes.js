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
    #swagger.summary = 'Get sigle user'
    #swagger.description = 'Fetch single user'
    #swagger.responses[200] = {
      description: 'User fetched successfully',
      #swagger.requestBody = {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            required: [ "name","email", "password","confirm_password", "address"],
            properties: {
              name: { type: "string", example: "Ali Khan" },
              email: { type: "string", format: "email", example: "user@test.com" },
              password: { type: "string", format: "password", example: "123456" },
              address: { type: "string", example: "Lahore" },
              image: {type: "string", format: "binary"}
            }
          }
        }
      }
    }

    #swagger.responses[201] = {
      description: 'User updated successfully',
      content: {
        "application/json": {
          example: {
            rescode: 1,
            message: "User updated",
            data: {
              id: 1,
              name: "Name",
              email: "test@gmail.com",
              address: "Address",
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

const express = require("express");
const router = express.Router();
const protected = require("../middlewares/authMiddleware");
const { getAllUsers } = require("../controllers/usersController");

router.get(
  "/users",
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

module.exports = router;

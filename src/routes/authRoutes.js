const express = require("express");
const router = express.Router();
// const protected = require("../middlewares/authMiddleware");
const {
  signup,
  login,
  refreshToken,
} = require("../controllers/authController");

router.post(
  "/signup",
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'User Signup'
    #swagger.description = 'Create a new user account'
    #swagger.security = []
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: [ "name","email", "password","confirm_password", "address"],
            properties: {
              name: { type: "string", example: "Ali Khan" },
              email: { type: "string", format: "email", example: "user@test.com" },
              password: { type: "string", format: "password", example: "123456" },
              confirm_password: { type: "string", format: "password", example: "123456" },
              address: { type: "string", example: "Lahore" }
            }
          }
        }
      }
    }

    #swagger.responses[201] = {
      description: 'User registered successfully',
      content: {
        "application/json": {
          example: {
            rescode: 1,
            message: "User registered",
            data: {
              id: 1,
              name: "Name",
              email: "test@gmail.com",
              address: "Address",
              token: "jwt-token"
            }
          }
        }
      }
    }
  */
  signup,
);
router.post(
  "/login",
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'User Login'
    #swagger.description = 'Login with email and password'
    #swagger.security = []
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["email", "password"],
            properties: {
              email: { type: "string", format: "email", example: "user@test.com" },
              password: { type: "string", format: "password", example: "123456" }
            }
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: 'Login successful',
      content: {
        "application/json": {
          example: {
            rescode: 1,
            message: "Login successful",
            data: {
              accessToken:"token",
              refreshToken: "token"
            }
          
          }
        }
      }
    }

    
  */
  login,
);

router.post(
  "/refresh",
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'New Access Token'
    #swagger.description = 'Generate new access token by refresh token'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: 'object',
              properties: {
                  refresh_token: { type: 'string' }
            }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: 'Generate new access token',
      content: {
        "application/json": {
          example: {
            rescode: 1,
            message: "Access token generated successfully",
            data: {
            accessToken: "token",
            }
          }
        }
      }
    }
  */
  refreshToken,
);

module.exports = router;

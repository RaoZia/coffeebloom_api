const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  forgotPassword,
  resetPass,
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

router.post(
  "/forgotPass",
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Forgot Password'
    #swagger.description = 'Send OTP to registered email for password reset'

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["email"],
            properties: {
              email: {
                type: "string",
                format: "email",
                example: "user@test.com"
              }
            }
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: 'OTP sent to email successfully',
      content: {
        "application/json": {
          example: {
            rescode: 1,
            message: "OTP sent to your email",
            data: []
          }
        }
      }
    }

    #swagger.responses[404] = {
      description: 'User not found'
    }
  */
  forgotPassword,
);
router.post(
  "/resetPass",
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Reset Password'
    #swagger.description = 'Reset user password using valid OTP'

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["email", "otp", "password"],
            properties: {
              email: {
                type: "string",
                format: "email",
                example: "user@test.com"
              },
              otp: {
                type: "string",
                example: "123456"
              },
              password: {
                type: "string",
                format: "password",
                example: "12345"
              }
            }
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: 'Password reset successfully',
      content: {
        "application/json": {
          example: {
            rescode: 1,
            message: "Password changed successfully",
            data: []
          }
        }
      }
    }

    #swagger.responses[400] = {
      description: 'Invalid or expired OTP'
    }
  */
  resetPass,
);
module.exports = router;

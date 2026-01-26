const swaggerAutogen = require("swagger-autogen")({
  openapi: "3.0.0",
});

const doc = {
  openapi: "3.0.0",
  info: {
    title: "Coffee_Bloom  Node + MySQL API",
    description: "Coffee Bloom API Documentation",
    version: "1.0.0",
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],

  // host: `localhost:${process.env.PORT || 3000}`,
  host: process.env.BASE_URL,

  schemes: ["http"],
};
const outputFile = "./swagger_output.json";
// const endpointsFiles = ["../routes/*.js"];
const endpointsFiles = ["../server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);

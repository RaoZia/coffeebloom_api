require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./config/swagger_output.json");
const { success, error } = require("./constants/messages");
const response = require("./constants/responses");
const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");
const coffeeRoutes = require("./routes/coffeeRoutes");
const catagoriesRoutes = require("./routes/catagoriesRoutes");
const sizeRoutes = require("./routes/coffeeSizeRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const coffeeoptionRoutes = require("./routes/coffeeoptionRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const locationRoutes = require("./routes/locationRoutes");
const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: "*",
    credentials: "false",
  }),
);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/coffees", coffeeRoutes);
app.use("/catagory", catagoriesRoutes);
app.use("/sizes", sizeRoutes);
app.use("/orders", ordersRoutes);
app.use("/Options", coffeeoptionRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/locations", locationRoutes);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, {
    customCssUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js",
    ],
  }),
);

app.use((req, res) => {
  return res.status(404).json(response.errorRes(error.PAGE_NOT_FOUND));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}   `);
});

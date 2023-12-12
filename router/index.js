module.exports = (app) => {
  //all routes
  app.use("/user", require("./routes/userRoutes")());
  app.use("/posts", require("./routes/postsRoutes")());
  app.use("/products", require("./routes/productsRoutes")());
  app.use("/refresh", require("./routes/refreshRoutes")());
};

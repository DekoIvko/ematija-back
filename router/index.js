module.exports = (app) => {
  //all routes
  app.use("/auth", require("./routes/authRoutes")());
  app.use("/user", require("./routes/userRoutes")());
  app.use("/users", require("./routes/usersRoutes")());
  app.use("/posts", require("./routes/postsRoutes")());
  app.use("/comments", require("./routes/commentsRoutes")());
  app.use("/products", require("./routes/productsRoutes")());
  app.use("/quotes", require("./routes/quotesRoutes")());
};

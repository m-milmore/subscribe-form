const proxy = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    proxy("/functions-build/", {
      target: "http:localhost:9000",
      pathRewrite: {
        "/.netlify/functions/": "",
      },
    })
  );
};
const proxy = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    proxy("http://localhost:3000/.netlify/functions/", {
      target: "http://127.0.0.1:9000/",
      pathRewrite: {
        "^\\.netlify/functions": "",
      },
      headers: {
        Connection: "keep-alive",
      },
      changeOrigin: true,
      secure: false,
    })
  );
};

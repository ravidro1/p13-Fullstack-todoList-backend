require("dotenv").config();
const app = require("./app");
const PORT = 8000;

const { connect } = require("./db");

connect().then(() => {
  app.listen(PORT, () => console.log("listen: " + PORT));
});

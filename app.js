const express = require("express");
const cors = require("cors");
const { urlencoded } = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models/");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    // Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false.

    // useFindAndModify: true,
  })
  .then(() => {
    console.log(`Database connected!`);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to My first testing",
  });
});

require("./app/routes/post.routes")(app);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

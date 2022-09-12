import express from "express";

const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/", (req, resp) => {
  console.log("Hello, World!");

  return resp.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log("Running on port: http://localhost:" + PORT);
});

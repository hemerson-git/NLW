import express from "express";

import { feedbackRoutes } from "./routes/feedbacks";

const PORT = 3333;

const app = express();
app.use(express.json());
app.use(feedbackRoutes);

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});

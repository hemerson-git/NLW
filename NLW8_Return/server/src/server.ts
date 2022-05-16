import express from "express";
import cors from "cors";

import { feedbackRoutes } from "./routes/feedbacks";

const PORT = 3333;

const app = express();

app.use(cors());
app.use(express.json());
app.use(feedbackRoutes);

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});

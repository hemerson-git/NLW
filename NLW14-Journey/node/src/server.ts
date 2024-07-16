import cors from "@fastify/cors";
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { confirmParticipant } from "./routes/confirm-participant";
import { confirmTrip } from "./routes/confirm-trip";
import { createTrip } from "./routes/create-trip";
import { createActivity } from "./routes/create-activity";
import { getActivities } from "./routes/get-activities";

const app = fastify();

const PORT = 3333;

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTrip);
app.register(confirmTrip);
app.register(confirmParticipant);
app.register(createActivity);
app.register(getActivities);

app.register(cors, {
  origin: "*",
});

app.get("/test", (req, res) => {
  return res.send({ message: "server is working!" });
});

app.listen({ port: PORT }).then(() => {
  console.log(`server running on http://localhost:${PORT}`);
});

import fastify from "fastify";
import { createTrip } from "./routes/create-trip";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

const app = fastify();

const PORT = 3333;

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTrip);

app.get("/test", (req, res) => {
  return res.send({ message: "server is working!" });
});

app.listen({ port: PORT }).then(() => {
  console.log(`server running on http://localhost:${PORT}`);
});

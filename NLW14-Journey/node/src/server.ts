import fastify from "fastify";

const app = fastify();

const PORT = 3333;

app.get("/test", (req, res) => {
  return res.send({ message: "server is working!" });
});

app.listen({ port: PORT }).then(() => {
  console.log(`server running on http://localhost:${PORT}`);
});

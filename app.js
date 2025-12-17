import server from "./src/server.js";
import { config } from "./src/config/config.js";
import { connectMongo } from "./src/databases/mongo.cnx.js";

const runServer = async () => {
  await connectMongo();

  server.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`);
  });
};

runServer().catch((err) => {
  console.error("Error al iniciar el servidor:", err);
  process.exit(1);
});


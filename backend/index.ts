import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app";

const server: http.Server = http.createServer(app);
const port: number = parseInt(process.env.APPLICATION_PORT || "5000", 10);


import initializeSocket from "./socket";
initializeSocket(server);

server.listen(port, () => {
  console.info(`Serveur en cours d'exécution sur http://localhost:${port}`);
});

import express from "express";
import { WebSocketServer } from "ws";
import { parse } from "url";

import { Flow } from "@businessflow/types";
import { runFlow } from "./logic";

function listen(flows: { [key: string]: Flow }) {
  const app = express();

  app.get("/flows", async (req, res) => {
    res.json(flows);
  });

  app.get("/transactions", (req, res) => {
    res.json([]);
  });

  app.get("/logs/:transactionId", (req, res) => {
    res.json([]);
  });

  app.post("/file", (req, res) => {});

  const wss = new WebSocketServer({ noServer: true });
  const server = app.listen(8080, () => {
    console.log("BusinessFlow listening on 0.0.0.0:8080");
  });

  server.on("upgrade", function upgrade(req, socket, head) {
    // TODO: Authenticate
    // const cookies = cookie.parse(req.headers.cookie ?? "");

    const { pathname } = parse(req.url ?? "");
    const [path, flowName] = pathname!.slice(1).split("/")!;
    if (path !== "transaction" || !flows[flowName]) {
      return void socket.destroy();
    }

    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req);
      runFlow(flows[flowName], ws);
    });
  });
}

export default { listen };

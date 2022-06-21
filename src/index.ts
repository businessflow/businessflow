import { WebSocketServer } from "ws";

import exampleFlow from "../example/main";
import { runFlow } from "./logic";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  runFlow(exampleFlow, ws);
});

import { v4 as uuid } from "uuid";
import { WebSocket } from "ws";
import { Context, Flow } from "./types";

interface OutgoingMessage {
  type: "requestForInput" | "output";
  payload: { [key: string]: unknown };
}

type BooleanInputResponse = {
  value: boolean;
};

type StringInputResponse = {
  value: string;
};

type Response = BooleanInputResponse | StringInputResponse;

async function runFlow(flow: Flow, ws: WebSocket) {
  const transactionId = uuid();

  const ctx: Context = {
    transactionId,
    async log(text) {},
    async notify(props) {},
    loading: {
      async start() {},
      async complete() {},
      async completeOne() {},
    },
    input: {
      async text(props) {
        const msg: OutgoingMessage = {
          type: "requestForInput",
          payload: {
            type: "string",
          },
        };
        const data = await waitForResponse(msg, ws);
        if (typeof data.value !== "string") {
          throw new Error("Expected string as value");
        }
        return data.value;
      },
      async boolean(props) {
        const msg: OutgoingMessage = {
          type: "requestForInput",
          payload: {
            type: "boolean",
          },
        };
        const data = await waitForResponse(msg, ws);
        if (typeof data.value !== "boolean") {
          throw new Error("Expected boolean as value");
        }
        return data.value;
      },
      async number(props) {
        return -1;
      },
      async file(props) {
        return "";
      },
      async select(props) {
        return "";
      },
      async search(props) {
        return "";
      },
    },
    output: {
      async download(url) {},
      async table(text) {},
      async text(text) {},
    },
  };
  await flow.run(ctx);
}

function waitForResponse(msg: OutgoingMessage, ws: WebSocket) {
  return new Promise<Response>((resolve, reject) => {
    const returnId = uuid();
    const onMessage = (data: any) => {
      if (data.returnId === returnId) {
        // Unsubscribe
        ws.removeEventListener("message", onMessage);

        // Return response
        resolve({ value: true });
      }
    };

    // Subscribe before sending message
    ws.addEventListener("message", onMessage);

    // Send message
    ws.send({
      ...msg,
      returnId,
    });

    // TODO: Add timeout
  });
}

export { runFlow };

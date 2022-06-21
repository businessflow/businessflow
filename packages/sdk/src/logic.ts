import { v4 as uuid } from "uuid";
import { WebSocket } from "ws";

import {
  CompletionOutgoingMessage,
  Context,
  Flow,
  InputRequestOutgoingMessage,
  LoadingOutgoingMessage,
  OutgoingMessage,
  Response,
} from "@businessflow/types";

async function runFlow(flow: Flow, ws: WebSocket) {
  const transactionId = uuid();

  // Create context
  const ctx: Context = {
    transactionId,
    async log(text) {
      console.log(text);
    },
    async notify(props) {},
    loading: {
      async start(items?: number) {
        const msg: LoadingOutgoingMessage = {
          action: "start",
          items: items ?? 1,
          __typeName: "LoadingStateChange",
        };
        await waitForResponse(msg, ws);
      },
      async complete() {
        const msg: LoadingOutgoingMessage = {
          action: "complete",
          __typeName: "LoadingStateChange",
        };
        await waitForResponse(msg, ws);
      },
      async completeNext() {
        const msg: LoadingOutgoingMessage = {
          action: "completeNext",
          __typeName: "LoadingStateChange",
        };
        await waitForResponse(msg, ws);
      },
    },
    input: {
      async text(props) {
        const returnId = uuid();
        const msg: InputRequestOutgoingMessage = {
          returnId,
          props,
          type: "text",
          __typeName: "InputRequest",
        };
        const data = await waitForResponse(msg, ws, returnId);
        if (typeof data.value !== "string") {
          throw new Error("Expected string as value");
        }
        return data.value;
      },
      async boolean(props) {
        return false;
      },
      async number(props) {
        const returnId = uuid();
        const msg: InputRequestOutgoingMessage = {
          returnId,
          props,
          type: "number",
          __typeName: "InputRequest",
        };
        const data = await waitForResponse(msg, ws, returnId);
        if (typeof data.value !== "number") {
          throw new Error("Expected string as value");
        }
        return data.value;
      },
      async date(props) {
        return new Date();
      },
      async dateRange(props) {
        return [new Date(), new Date()];
      },
      async slider(props) {
        return -1;
      },
      async sliderRange(props) {
        return [-1, -1];
      },
      async select(props) {
        return "";
      },
      async table(props) {
        return "";
      },
      async search(props) {
        return "";
      },
      async file(props) {
        return "";
      },
    },
    output: {
      async download(url) {},
      async table(text) {},
      async text(text) {},
    },
  };

  // Run flow
  await flow.run(ctx);

  // Send completion message
  const msg: CompletionOutgoingMessage = {
    success: true,
    __typeName: "CompletionOutgoingMessage",
  };
  await waitForResponse(msg, ws);
}

function waitForResponse(
  msg: OutgoingMessage,
  ws: WebSocket,
  returnId = uuid()
) {
  return new Promise<Response>((resolve, reject) => {
    const onMessage = ({ data: rawData }: any) => {
      const data: Response = JSON.parse(rawData);
      if (data.returnId === returnId) {
        // Unsubscribe
        ws.removeEventListener("message", onMessage);

        if (data.__typeName === "StringInputResponse") {
          // Return response
          resolve(data);
        } else {
          throw new Error("Expected StringInputResponse");
        }
      }
    };

    // Subscribe before sending message
    ws.addEventListener("message", onMessage);

    // Send message
    ws.send(
      JSON.stringify({
        returnId,
        ...msg,
      })
    );

    // TODO: Add timeout
  });
}

export { runFlow };

import { v4 as uuid } from "uuid";
import { WebSocket } from "ws";

import { Context, Flow } from "./types";

type LoadingOutgoingMessage = {
  action: "start" | "complete" | "completeNext";
  items?: number;
  __typeName: "LoadingStateChange";
};

type InputRequestOutgoingMessage = {
  type:
    | "string"
    | "number"
    | "boolean"
    | "select"
    | "table"
    | "search"
    | "file";
  props: Record<string, unknown>;
  __typeName: "RequestForInput";
};

type CompletionOutgoingMessage = {
  success: boolean;
  __typeName: "CompletionOutgoingMessage";
};

type OutgoingMessage =
  | LoadingOutgoingMessage
  | InputRequestOutgoingMessage
  | CompletionOutgoingMessage;

type BooleanInputResponse = {
  returnId: string;
  value: boolean;
  __typeName: "BooleanInputResponse";
};

type StringInputResponse = {
  returnId: string;
  value: string;
  __typeName: "StringInputResponse";
};

type Response = BooleanInputResponse | StringInputResponse;

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
        const msg: InputRequestOutgoingMessage = {
          props,
          type: "string",
          __typeName: "RequestForInput",
        };
        const data = await waitForResponse(msg, ws);
        if (typeof data.value !== "string") {
          throw new Error("Expected string as value");
        }
        return data.value;
      },
      async boolean(props) {
        const msg: InputRequestOutgoingMessage = {
          props,
          type: "boolean",
          __typeName: "RequestForInput",
        };
        const data = await waitForResponse(msg, ws);
        if (typeof data.value !== "boolean") {
          throw new Error("Expected boolean as value");
        }
        return data.value;
      },
      async number(props) {
        const msg: InputRequestOutgoingMessage = {
          props,
          type: "number",
          __typeName: "RequestForInput",
        };
        const data = await waitForResponse(msg, ws);
        if (typeof data.value !== "number") {
          throw new Error("Expected boolean as value");
        }
        return data.value;
      },
      async select(props) {
        const msg: InputRequestOutgoingMessage = {
          props,
          type: "select",
          __typeName: "RequestForInput",
        };
        const data = await waitForResponse(msg, ws);
        if (typeof data.value !== "string") {
          throw new Error("Expected string as value");
        }

        return data.value;
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

function waitForResponse(msg: OutgoingMessage, ws: WebSocket) {
  return new Promise<Response>((resolve, reject) => {
    const returnId = uuid();
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

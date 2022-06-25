import { v4 as uuid } from "uuid";
import { WebSocket, MessageEvent } from "ws";

import {
  CompletionOutgoingMessage,
  Context,
  Flow,
  LoadingOutgoingMessage,
  OutgoingMessage,
  InputResponse,
  TextInput,
  NumberInput,
  BooleanInput,
  FileInput,
  OptionalTextProps,
  OptionalFileProps,
  RequiredFileProps,
  MultipleFilesProps,
  RequiredTextProps,
  Input,
  OptionalBooleanProps,
  OptionalNumberProps,
  RequiredBooleanProps,
  RequiredNumberProps,
  InputRequest,
} from "@businessflow/types";

class DefaultInput implements Input {
  private ws: WebSocket;

  constructor(ws: WebSocket) {
    this.ws = ws;
  }

  text(props: OptionalTextProps): Promise<string | null>;
  text(props: RequiredTextProps): Promise<string>;
  async text(
    props: OptionalTextProps | RequiredTextProps
  ): Promise<string | null> {
    const returnId = uuid();
    const msg: TextInput = {
      returnId,
      props,
      type: "text",
      __typeName: "InputRequest",
    };
    const value = await waitForResponse(msg, this.ws, returnId);
    return value;
  }
  boolean(props: OptionalBooleanProps): Promise<boolean | null>;
  boolean(props: RequiredBooleanProps): Promise<boolean>;
  async boolean(
    props: OptionalBooleanProps | RequiredBooleanProps
  ): Promise<boolean | null | boolean> {
    const returnId = uuid();
    const msg: BooleanInput = {
      returnId,
      props,
      type: "boolean",
      __typeName: "InputRequest",
    };
    const value = await waitForResponse(msg, this.ws, returnId);
    return value;
  }
  number(props: OptionalNumberProps): Promise<number | null>;
  number(props: RequiredNumberProps): Promise<number>;
  async number(
    props: OptionalNumberProps | RequiredNumberProps
  ): Promise<number | null> {
    const returnId = uuid();
    const msg: NumberInput = {
      returnId,
      props,
      type: "number",
      __typeName: "InputRequest",
    };
    const value = await waitForResponse(msg, this.ws, returnId);
    return value;
  }
  file(props: OptionalFileProps): Promise<string | null>;
  file(props: RequiredFileProps): Promise<string>;
  file(props: MultipleFilesProps): Promise<string[]>;
  async file(
    props: OptionalFileProps | RequiredFileProps | MultipleFilesProps
  ): Promise<string | null | string[]> {
    const returnId = uuid();
    const msg: InputRequest = {
      returnId,
      props,
      type: "file",
      __typeName: "InputRequest",
    };
    const value = await waitForResponse(msg, this.ws, returnId);
    return value;
  }
}

async function runFlow(flow: Flow, ws: WebSocket) {
  const transactionId = uuid();

  // Create context
  const ctx: Context = {
    transactionId,
    async log(args) {
      console.log(args);
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
    input: new DefaultInput(ws),
    output: {
      async download(url) {},
      async table(text) {},
      async text(text) {},
    },
  };

  // Run flow
  const resultMessage = await flow.run(ctx);

  // Send completion message
  const msg: CompletionOutgoingMessage = {
    success: true,
    message: typeof resultMessage === "string" ? resultMessage : undefined,
    __typeName: "CompletionOutgoingMessage",
  };
  await waitForResponse(msg, ws);
}

function waitForResponse(
  msg: TextInput,
  ws: WebSocket,
  returnId?: string
): Promise<string>;

function waitForResponse(
  msg: BooleanInput,
  ws: WebSocket,
  returnId?: string
): Promise<boolean>;

function waitForResponse(
  msg: NumberInput,
  ws: WebSocket,
  returnId?: string
): Promise<number>;

function waitForResponse(
  msg: FileInput,
  ws: WebSocket,
  returnId?: string
): Promise<string>;

function waitForResponse(
  msg: LoadingOutgoingMessage,
  ws: WebSocket,
  returnId?: string
): Promise<void>;

function waitForResponse(
  msg: CompletionOutgoingMessage,
  ws: WebSocket,
  returnId?: string
): Promise<void>;

function waitForResponse(
  msg: OutgoingMessage,
  ws: WebSocket,
  returnId = uuid()
) {
  return new Promise<unknown>((resolve, reject) => {
    const onMessage = ({ data: rawData }: MessageEvent) => {
      if (typeof rawData === "string") {
        const data: InputResponse = JSON.parse(rawData);
        if (data.returnId === returnId) {
          // Unsubscribe
          ws.removeEventListener("message", onMessage);
          resolve(data.value);
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

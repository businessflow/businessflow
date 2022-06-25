import { ReactNode, useEffect, useState } from "react";
import { Alert } from "@mantine/core";
import { Check, X } from "tabler-icons-react";

import { OutgoingMessage, InputResponse } from "@businessflow/types";
import Text from "../form/Text";
import Number from "../form/Number";
import File from "../form/File";

type Step = {
  id: string;
  element: ReactNode;
};

function useFlowMessageHandler(flowName: string) {
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/transaction/${flowName}`);

    ws.addEventListener("message", async ({ data: rawData }) => {
      const msg: OutgoingMessage = JSON.parse(rawData);
      const response = await handleMessage(msg, setSteps, setLoading);
      ws.send(JSON.stringify(response));
    });

    return () => ws.close();
  }, [flowName]);

  return { steps, loading };
}

function handleMessage(
  msg: OutgoingMessage,
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>,
  setLoading: React.Dispatch<React.SetStateAction<number>>
) {
  return new Promise<InputResponse>((resolve, reject) => {
    if (msg.__typeName === "InputRequest") {
      let step: Step | null = null;

      if (msg.type === "text") {
        step = {
          id: msg.returnId,
          element: (
            <Text returnId={msg.returnId} onContinue={resolve} {...msg.props} />
          ),
        };
      }

      if (msg.type === "number") {
        step = {
          id: msg.returnId,
          element: (
            <Number
              returnId={msg.returnId}
              onContinue={resolve}
              {...msg.props}
            />
          ),
        };
      }

      if (msg.type === "file") {
        step = {
          id: msg.returnId,
          element: (
            <File
              type="png"
              returnId={msg.returnId}
              onContinue={resolve}
              {...msg.props}
            />
          ),
        };
      }

      if (step !== null) {
        setSteps((steps) => [...steps, step!]);
      }
    }

    if (msg.__typeName === "LoadingStateChange") {
      if (msg.action === "start") {
        setLoading(msg.items ?? 1);
      }
    }

    if (msg.__typeName === "CompletionOutgoingMessage") {
      const step = {
        id: "msg.returnId",
        element: msg.success ? (
          <Alert title="Success" icon={<Check size={18} />} color="green">
            {msg.message}
          </Alert>
        ) : (
          <Alert title="Failure" icon={<X size={18} />} color="red">
            {msg.message}
          </Alert>
        ),
      };
      setSteps((steps) => [...steps, step!]);
    }
  });
}

export default useFlowMessageHandler;

import { InputResponse } from "@businessflow/types";

type ElementProps = {
  returnId: string;
  onContinue: (response: InputResponse) => void;
};

export default ElementProps;

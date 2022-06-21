import { Response } from "@businessflow/types";

type ElementProps = {
  returnId: string;
  onContinue: (response: Response) => void;
};

export default ElementProps;

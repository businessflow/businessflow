import { Evt } from "evt";
import { v4 as uuid } from "uuid";

abstract class Input {
  private stepId = uuid();

  constructor(evt: Evt<StepMessage>) {
    evt.attachExtract(
      (m) => this.stepId === m.stepId,
      (m) => this.onMessage(m)
    );
  }

  abstract onMessage(m: StepMessage): void;
}

type StepMessage = {
  stepId: string;
};

export default Input;

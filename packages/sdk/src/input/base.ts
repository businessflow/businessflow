import { Evt } from "evt";
import { v4 as uuid } from "uuid";

type Response = {};

abstract class InputBase<T> {
  resultEvent = new Evt<T>();
  stepId = uuid();
  result: T | null = null;

  getResult(): Promise<T> {
    return new Promise((resolve, reject) => {
      if (this.result) {
        resolve(this.result);
      }

      this.resultEvent.attachOnce((value) => {
        resolve(value);
      });
    });
  }

  setResult(value: T) {
    this.result = value;
    this.resultEvent.post(value);
  }

  // TODO: Set type
  sendMessage(message: any): Promise<Response> {
    return new Promise((resolve, reject) => {
      resolve({});
    });
  }

  // TODO: Set type
  protected abstract onMessage(message: any): void;
}

export default InputBase;

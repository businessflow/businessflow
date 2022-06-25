import InputBase from "./base";

class TextInput extends InputBase<string | null> {
  constructor() {
    super();
    this.sendMessage({
      type: "text",
      __typeName: "InputRequest",
    });
  }

  protected onMessage(msg) {
    const result = msg.value;
    this.setResult(result);
  }
}

export default TextInput;

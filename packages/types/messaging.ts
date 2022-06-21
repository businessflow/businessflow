type TextProps = {
  label: string;
  placeholder?: string;
  required?: boolean;
};

type LoadingOutgoingMessage = {
  action: "start" | "complete" | "completeNext";
  items?: number;
  __typeName: "LoadingStateChange";
};

type InputRequest = {
  returnId: string;
  __typeName: "InputRequest";
};

type TextInput = InputRequest & {
  type: "text";
  props: TextProps;
};

type NumberInput = InputRequest & {
  type: "number";
  props: TextProps;
};

type BooleanInput = InputRequest & {
  type: "boolean";
  props: TextProps;
};

type SelectInput = InputRequest & {
  type: "select";
  props: TextProps;
};

type TableInput = InputRequest & {
  type: "table";
  props: TextProps;
};

type SearchInput = InputRequest & {
  type: "search";
  props: TextProps;
};

type FileInput = InputRequest & {
  type: "file";
  props: TextProps;
};

type InputRequestOutgoingMessage =
  | TextInput
  | NumberInput
  | BooleanInput
  | SelectInput
  | TableInput
  | SearchInput
  | FileInput;

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

type NumberInputResponse = {
  returnId: string;
  value?: number;
  __typeName: "NumberInputResponse";
};

type Response =
  | BooleanInputResponse
  | StringInputResponse
  | NumberInputResponse;

export type {
  Response,
  OutgoingMessage,
  LoadingOutgoingMessage,
  InputRequestOutgoingMessage,
  CompletionOutgoingMessage,
  TextProps,
};

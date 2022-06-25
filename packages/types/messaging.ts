import { TextProps } from "./input/text";

type LoadingOutgoingMessage = {
  action: "start" | "complete" | "completeNext";
  items?: number;
  __typeName: "LoadingStateChange";
};

type InputRequestBase = {
  returnId: string;
  __typeName: "InputRequest";
};

type TextInput = InputRequestBase & {
  type: "text";
  props: TextProps;
};

type NumberInput = InputRequestBase & {
  type: "number";
  props: TextProps;
};

type BooleanInput = InputRequestBase & {
  type: "boolean";
  props: TextProps;
};

type SelectInput = InputRequestBase & {
  type: "select";
  props: TextProps;
};

type TableInput = InputRequestBase & {
  type: "table";
  props: TextProps;
};

type SearchInput = InputRequestBase & {
  type: "search";
  props: TextProps;
};

type FileInput = InputRequestBase & {
  type: "file";
  props: TextProps;
};

type InputRequest =
  | TextInput
  | NumberInput
  | BooleanInput
  | SelectInput
  | TableInput
  | SearchInput
  | FileInput;

type CompletionOutgoingMessage = {
  success: boolean;
  message?: string;
  __typeName: "CompletionOutgoingMessage";
};

type OutgoingMessage =
  | InputRequest
  | LoadingOutgoingMessage
  | CompletionOutgoingMessage;

// Response
type InputResponseBase = {
  returnId: string;
  __typeName: "InputResponse";
};

type TextResponse = InputResponseBase & {
  value?: string;
  type: "text";
};

type NumberResponse = InputResponseBase & {
  value?: number;
  type: "number";
};

type BooleanResponse = InputResponseBase & {
  value?: boolean;
  type: "boolean";
};

type FileResponse = InputResponseBase & {
  value?: string;
  type: "file";
};

type InputResponse =
  | TextResponse
  | NumberResponse
  | BooleanResponse
  | FileResponse;

export type {
  InputResponse,
  InputRequest,
  OutgoingMessage,
  LoadingOutgoingMessage,
  CompletionOutgoingMessage,
  TextInput,
  NumberInput,
  BooleanInput,
  FileInput,
};

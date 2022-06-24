type BaseProps = {
  label: string;
};

type OptionalProps = {
  required?: false;
};

type RequiredProps = {
  required: true;
};

type SingleProps = {
  multiple?: false;
};

type MultipleProps = {
  multiple: true;
};

export type {
  BaseProps,
  OptionalProps,
  RequiredProps,
  SingleProps,
  MultipleProps,
};

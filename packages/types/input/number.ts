import { BaseProps, OptionalProps, RequiredProps } from "./base";

type NumberProps = BaseProps & {
  placeholder?: string;
};

type OptionalNumberProps = NumberProps & OptionalProps;
type RequiredNumberProps = NumberProps & RequiredProps;

export type { NumberProps, OptionalNumberProps, RequiredNumberProps };

import { BaseProps, OptionalProps, RequiredProps } from "./base";

type BooleanProps = BaseProps & {
  placeholder?: string;
};

type OptionalBooleanProps = BooleanProps & OptionalProps;
type RequiredBooleanProps = BooleanProps & RequiredProps;

export type { BooleanProps, OptionalBooleanProps, RequiredBooleanProps };

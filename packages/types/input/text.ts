import { BaseProps, OptionalProps, RequiredProps } from "./base";

type TextProps = BaseProps & {
  placeholder?: string;
};

type OptionalTextProps = TextProps & OptionalProps;
type RequiredTextProps = TextProps & RequiredProps;

export type { TextProps, OptionalTextProps, RequiredTextProps };

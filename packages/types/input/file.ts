import {
  BaseProps,
  MultipleProps,
  OptionalProps,
  RequiredProps,
  SingleProps,
} from "./base";

type FileProps = BaseProps & {
  type?: "png" | "*";
};

type OptionalFileProps = FileProps & OptionalProps & SingleProps;
type RequiredFileProps = FileProps & RequiredProps & SingleProps;
type MultipleFilesProps = FileProps & MultipleProps;

export type {
  FileProps,
  OptionalFileProps,
  RequiredFileProps,
  MultipleFilesProps,
};

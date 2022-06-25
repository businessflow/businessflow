import {
  MultipleFilesProps,
  OptionalFileProps,
  RequiredFileProps,
} from "./input/file";
import { OptionalBooleanProps, RequiredBooleanProps } from "./input/boolean";
import { OptionalNumberProps, RequiredNumberProps } from "./input/number";
import { OptionalTextProps, RequiredTextProps } from "./input/text";

interface Flow {
  name: string;
  emoji: string;
  permission: string;
  description?: string;
  run: (ctx: Context) => Promise<string | undefined | void>;
}

interface Context {
  transactionId: string;
  input: Input;
  output: Output;
  loading: Loading;
  notify: (props: { title: string; description: string }) => Promise<void>;
  log: (...args: any[]) => Promise<void>;
}

interface Loading {
  start: (items?: number) => Promise<void>;
  complete: () => Promise<void>;
  completeNext: () => Promise<void>;
}

interface Input {
  text(props: OptionalTextProps): Promise<string | null>;
  text(props: RequiredTextProps): Promise<string>;
  boolean(props: OptionalBooleanProps): Promise<boolean | null>;
  boolean(props: RequiredBooleanProps): Promise<boolean>;
  number(props: OptionalNumberProps): Promise<number | null>;
  number(props: RequiredNumberProps): Promise<number>;
  file(props: OptionalFileProps): Promise<string | null>;
  file(props: RequiredFileProps): Promise<string>;
  file(props: MultipleFilesProps): Promise<string[]>;

  /*
  date: (props: { label: string; placeholder?: string }) => Promise<Date>;
  dateRange: (props: {
    label: string;
    placeholder?: string;
  }) => Promise<[Date, Date]>;
  slider: (props: { label: string; placeholder?: string }) => Promise<number>;
  sliderRange: (props: {
    label: string;
    placeholder?: string;
  }) => Promise<[number, number]>;
  select: (props: {
    label: string;
    placeholder?: string;
    multiple: boolean;
    options: { key: string; label: string }[];
  }) => Promise<string>;
  table: (props: {
    label: string;
    placeholder?: string;
    multiple: boolean;
    options: { key: string; label: string }[];
  }) => Promise<string>;
  search: (props: {
    label: string;
    placeholder?: string;
    allowOther?: boolean;
    onSearch: (value: string) => Promise<{ key: string; label: string }[]>;
  }) => Promise<string>;
  */
}

interface Output {
  text: (text: string) => Promise<void>;
  table: (text: string) => Promise<void>;
  download: (url: string) => Promise<void>;
}

export type { Flow, Context, Input, Output, Loading };

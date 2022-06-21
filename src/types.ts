interface Flow {
  name: string;
  description?: string;
  run: (ctx: Context) => Promise<void>;
}

interface Context {
  transactionId: string;
  input: Input;
  output: Output;
  loading: Loading;
  notify: (props: { title: string; description: string }) => Promise<void>;
  log: (text: string) => Promise<void>;
}

interface Loading {
  start: (items?: number) => Promise<void>;
  complete: () => Promise<void>;
  completeNext: () => Promise<void>;
}

interface Input {
  text: (props: { label: string; placeholder?: string }) => Promise<string>;
  number: (props: { label: string; placeholder?: string }) => Promise<number>;
  boolean: (props: { label: string; placeholder?: string }) => Promise<boolean>;
  file: (props: { label: string; placeholder?: string }) => Promise<string>;
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
}

interface Output {
  text: (text: string) => Promise<void>;
  table: (text: string) => Promise<void>;
  download: (url: string) => Promise<void>;
}

export { Flow, Context };

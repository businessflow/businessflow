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
  start: () => Promise<void>;
  complete: () => Promise<void>;
  completeOne: () => Promise<void>;
}

interface Input {
  file: (props: { label: string; placeholder?: string }) => Promise<string>;
  text: (props: { label: string; placeholder?: string }) => Promise<string>;
  number: (props: { label: string; placeholder?: string }) => Promise<number>;
  boolean: (props: { label: string; placeholder?: string }) => Promise<boolean>;
  select: (props: {
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

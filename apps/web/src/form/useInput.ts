import { useState } from "react";

function useInput<T>(initialValue?: T) {
  const [value, setValue] = useState<T | undefined>(initialValue);
  const [isComplete, setComplete] = useState(false);

  return { value, setValue, isComplete, setComplete };
}

export default useInput;

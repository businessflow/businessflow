import { useQuery } from "react-query";

import { Flow } from "@businessflow/types";

function useFlows() {
  const { data } = useQuery<{ [key: string]: Flow }>("flowsData", () =>
    fetch("/flows").then((res) => res.json())
  );
  return data!;
}

export default useFlows;

import { useQuery } from "react-query";
import { Flow } from "@businessflow/types";

import config from "../config";

function useFlows() {
  const { data } = useQuery<{ [key: string]: Flow }>("flowsData", () =>
    fetch(`${config.apiUrl}/flows`).then((res) => res.json())
  );
  return data!;
}

export default useFlows;

import { AppShell, Center, Loader } from "@mantine/core";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shell from "./layout/Shell";

import FlowPage from "./pages/Flow";
import FlowsPage from "./pages/Flows";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense
          fallback={
            <AppShell>
              <Center>
                <Loader />
              </Center>
            </AppShell>
          }
        >
          <Routes>
            <Route path="/flow/:flowName" element={<FlowPage />} />
            <Route path="/" element={<Shell />}>
              <Route path="/" element={<FlowsPage />} />
              <Route path="*" element={<div>Not found</div>} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

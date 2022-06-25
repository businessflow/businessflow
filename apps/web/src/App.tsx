import { AppShell, Center, Loader } from "@mantine/core";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AccountPage from "./pages/Account";
import Protected from "./auth/Protected";
import Shell from "./layout/Shell";

import FlowPage from "./pages/Flow";
import FlowsPage from "./pages/Flows";
import LoginPage from "./pages/Login";
import UsersPage from "./pages/Users";

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
            <Route path="/signin" element={<LoginPage />} />
            <Route
              path="/flow/:flowName"
              element={
                <Protected>
                  <FlowPage />
                </Protected>
              }
            />
            <Route
              path="/"
              element={
                <Protected>
                  <Shell />
                </Protected>
              }
            >
              <Route path="/" element={<FlowsPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="*" element={<div>Not found</div>} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

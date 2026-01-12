import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "react-quill/dist/quill.snow.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 🔥 KEY FIXES
      staleTime: 5 * 60 * 1000,      // 5 minutes
      cacheTime: 10 * 60 * 1000,     // 10 minutes
      refetchOnWindowFocus: false,  // ❌ disable refetch on tab switch
      refetchOnReconnect: false,    // ❌ disable refetch on internet reconnect
      retry: 1,                     // don’t spam retries
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { TokenContextProvider } from "./Context/tokenContext.jsx";
 import{ QueryClientProvider, QueryClient
} from '@tanstack/react-query'
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <TokenContextProvider>
      <App />
    </TokenContextProvider>
      
 </QueryClientProvider>
    <ToastContainer />
  </StrictMode>,
);

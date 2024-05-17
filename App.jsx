import "./App.css";
import Router from "./routes/routes";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

function App() {
  return (
    <>
      <BrowserRouter>
      <QueryClientProvider client={queryClient}>
          <Router />
          </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
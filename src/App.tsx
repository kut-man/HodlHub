import { ThemeProvider } from "./layout/Header/ThemeProvider";
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "portfolio",
    element: <Portfolio />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Header />
        <RouterProvider router={router} />
        <Footer />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

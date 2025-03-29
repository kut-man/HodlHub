import { ThemeProvider } from "./layout/Header/ThemeProvider";
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./lib/AuthContextProvider";
import ProtectedRoute from "./lib/ProtectedRoute";
import { Toaster } from "./components/ui/sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "portfolio",
    element: (
      <ProtectedRoute>
        <Portfolio />
      </ProtectedRoute>
    ),
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Header />
          <RouterProvider router={router} />
          <Footer />
          <Toaster position="bottom-left" />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

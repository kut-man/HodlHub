import { ThemeProvider } from "./layout/header/theme-provider";
import Header from "./layout/header/header";
import Footer from "./layout/footer/footer";
import Home from "./pages/home";
import Portfolio from "./pages/portfolio";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./lib/auth-context-provider";
import ProtectedRoute from "./lib/protected-route";
import { Toaster } from "./components/ui/sonner";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    ),
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
    <GoogleReCaptchaProvider
      reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
    >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
            <Toaster position="bottom-left" />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </GoogleReCaptchaProvider>
  );
}

export default App;

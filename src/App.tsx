import { ThemeProvider } from "./layout/Header/ThemeProvider";
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </ThemeProvider>
  );
}

export default App;

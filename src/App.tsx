import { ThemeProvider } from "./components/Header/ThemeProvider";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <Home />
      <Footer />
    </ThemeProvider>
  );
}

export default App;

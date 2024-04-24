import { ThemeProvider } from "./layout/Header/ThemeProvider";
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import Home from "./pages/Home";
// import Portfolio from "./pages/Portfolio";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      {/* <Portfolio/> */}
      <Home/>
      <Footer />
    </ThemeProvider>
  );
}

export default App;

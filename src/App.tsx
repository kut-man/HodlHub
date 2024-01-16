import { ThemeProvider } from "./components/Header/ThemeProvider"
import Header from "./components/Header/Header"
import Home from "./pages/Home"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header/>
      <Home/>
    </ThemeProvider>
  )
}

export default App

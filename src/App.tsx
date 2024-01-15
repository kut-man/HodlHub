import { ThemeProvider } from "./components/Header/ThemeProvider"
import Header from "./components/Header/Header"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header/>
    </ThemeProvider>
  )
}

export default App

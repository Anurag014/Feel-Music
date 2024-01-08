import Navbar from "./components/Navbar"
import { Toaster } from "@/components/ui/sonner"
import Sidebar from "./components/Sidebar"
import { Outlet } from "react-router-dom"
import { SearchProvider } from "./context/SearchContext"
import { ControlProvider } from "./context/ControlContext"
import ControlFooter from "./components/ControlFooter"
function App() {

  return (
    <>
      <ControlProvider>
        <SearchProvider>
          <div className="flex">
          <Sidebar/>
            <main className="flex-1 w-5/6">
              <Navbar />
              <Outlet/>
          <div className="mb-28"></div>
            </main>
            <Toaster position="top-right" richColors />
          </div>
          <ControlFooter/>
        </SearchProvider>
      </ControlProvider>
    </>
  )
}

export default App

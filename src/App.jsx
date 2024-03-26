import Navbar from "./components/Navbar"
import { Toaster } from "@/components/ui/sonner"
import Sidebar from "./components/Sidebar"
import { Outlet } from "react-router-dom"
import { SearchProvider } from "./context/SearchContext"
import { ControlProvider } from "./context/ControlContext"
import ControlFooter from "./components/ControlFooter"
import MusicPlayer from "./components/MusicPlayer"
function App() {

  return (
    <>
      <ControlProvider>
        <SearchProvider>
          <div className="flex">
            <Sidebar />
            <main className="flex-1 w-5/6 bg-[#060606]">
              <Navbar />
              <div className="flex justify-between">
                <div className="w-full lg:w-[70%] h-screen overflow-y-scroll no-scrollbar mx-3">
                  <Outlet />
                </div>
                <div className="hidden lg:block w-[30%]">
                  <MusicPlayer/>
                </div>
              </div>
            </main>
            <Toaster position="top-right" richColors />
          </div>
          {/* <div className="lg:hidden">
            <ControlFooter/>
          </div> */}
        </SearchProvider>
      </ControlProvider>
    </>
  )
}

export default App

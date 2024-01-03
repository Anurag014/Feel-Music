import Navbar from "./components/Navbar"
import { Toaster } from "@/components/ui/sonner"
import Sidebar from "./components/Sidebar"
function App() {

  return (
    <>
      <div className="flex">
      <Sidebar/>
        <main className="flex-1 w-5/6">
          <Navbar />
        </main>
        <Toaster position="top-right" richColors />
      </div>
    </>
  )
}

export default App

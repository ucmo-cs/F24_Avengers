import { useState } from 'react'
import {Button} from "@/components/ui/button.tsx";
import "@/index.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={"flex m-auto w-1/2 h-screen justify-center flex-col items-center"}>
      <h1>Vite + React</h1>
        <Button onClick={() => setCount((count) => count + 1)} variant={"destructive"}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-trainwise-lightpink">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-trainwise-darktext mb-4">
          TrainWise
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-trainwise-coral mb-2">
              Tréninkové plány
            </h2>
            <p className="text-trainwise-darktext">
              Vytvořte si vlastní tréninkový plán na míru.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-trainwise-sage mb-2">
              Sledování pokroku
            </h2>
            <p className="text-trainwise-darktext">
              Sledujte svůj pokrok a dosažené výsledky.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

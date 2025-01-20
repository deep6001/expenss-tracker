
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Expenss from './page/Expenss'
import Auth from './page/Auth'

function App() {

  return (
    <div className=' h-screen w-full'>
      <Routes>
        <Route path='/' element={<Auth/>} />
        <Route path='/expenss' element={<Expenss />} />
      </Routes>
    </div>
  )
}

export default App

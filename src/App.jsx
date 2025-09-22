import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './components/HomePage'
import Publications from './components/Publications/Publications'
import People from './components/People'
import Research from './components/Research/Research'
import Projects from './components/Projects/Projects'
import Events from './components/Events'

function App() {
  return (
    <BrowserRouter basename={`${import.meta.env.VITE_PUBLIC_URL}`}>
      <Routes>
        <Route path="/" element={<Layout />} >
        <Route index element={<HomePage />} />
        <Route path='/publications' element={<Publications />} />
        <Route path='/people' element={<People />} />
        <Route path='/research' element={<Research/>} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/events' element={<Events />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

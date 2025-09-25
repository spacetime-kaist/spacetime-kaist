import { Routes, Route, HashRouter } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './components/HomePage'
import Publications from './components/Publications/Publications'
import People from './components/People'
import Research from './components/Research/Research'
import Projects from './components/Projects/Projects'
import Events from './components/Events'
import Conference from './components/Publications/Conference'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
        <Route index element={<HomePage />} />
        <Route path='/publications' element={<Publications />} />
        <Route path='/conference' element={<Conference />} />
        <Route path='/people' element={<People />} />
        <Route path='/research' element={<Research/>} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/events' element={<Events />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App

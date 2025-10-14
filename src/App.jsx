import { Routes, Route, HashRouter } from 'react-router-dom'

// Pages
import Layout from './Layout'
import HomePage from './components/HomePage'
import Publications from './components/Publications/Publications'
import People from './components/People'
import Research from './components/Research/Research'
import ResearchDetail from './components/Research/ResearchDetail'
import Projects from './components/Projects/Projects'
import GSECUAM from './components/Projects/GSECUAM'
import Events from './components/Events'
import Conference from './components/Publications/Conference'

// Utility
import ScrolltoAnchor from './utility/ScrolltoAnchor'






function App() {
  return (
    <HashRouter>
      <ScrolltoAnchor />
      <Routes>
        <Route path="/" element={<Layout />} >
        <Route index element={<HomePage />} />
        <Route path='/publications' element={<Publications />} />
        <Route path='/conference' element={<Conference />} />
        <Route path='/people' element={<People />} />
        <Route path='/research' element={<Research/>} />
        <Route path='/research/:slug' element={<ResearchDetail/>} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/projects/gs-ec-uam' element={<GSECUAM />} />
        <Route path='/events' element={<Events />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App

import { Routes, Route, HashRouter } from 'react-router-dom'

// Pages
import Layout from './Layout'
import HomePage from './components/HomePage'
import Publications from './components/Publications/Publications'
import Conference from './components/Publications/Conference'
import People from './components/People'
import Research from './components/Research/Research'
import ResearchDetail from './components/Research/ResearchDetail'
import Projects from './components/Projects/Projects'
import GSECUAM from './components/Projects/GSECUAM'
import ProjectsDetail from './components/Projects/ProjectsDetail'
import Events from './components/Events'
// import Press from './components/Press'

// Utility
import ScrolltoAnchor from './utility/ScrolltoAnchor'


function App() {
  return (
    <HashRouter>
      <ScrolltoAnchor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Under Layout */}
        <Route element={<Layout />} >
        <Route path='/publications' element={<Publications />} />
        <Route path='/conference' element={<Conference />} />
        <Route path='/people' element={<People />} />
        <Route path='/research' element={<Research/>} />
        <Route path='/research/:slug' element={<ResearchDetail/>} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/projects/:slug' element={<ProjectsDetail />} />
        <Route path='/projects/gs-ec-uam' element={<GSECUAM />} />
        <Route path='/events' element={<Events />} />
        {/* <Route path='/press' element={<Press />} /> */}
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App

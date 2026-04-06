import { Routes, Route, HashRouter } from 'react-router-dom'

// Pages
import Layout from './Layout'
import LandingPageAgg from './components/LandingPageAgg'
import PaperOverview from './components/PaperOverview'
import People from './components/People'
import PeopleDetail from './components/PeopleDetail'
import Research from './components/Research/Research'
import ResearchDetail from './components/Research/ResearchDetail'
import Projects from './components/Projects/Projects'
import GSECUAM from './components/Projects/GSECUAM'
import ProjectsDetail from './components/Projects/ProjectsDetail'
import Events from './components/Events'
import Press from './components/Press'
import Apply from './components/Apply/Apply'
import ApplyDetail from './components/Apply/ApplyDetail'

// Utility
import ScrolltoAnchor from './utility/ScrolltoAnchor'
import Test from './components/Test'
import PubCon from './components/Publications/PubCon'
import PubConDetails from './components/Publications/PubConDetails'




function App() {
  return (
    <HashRouter>
      <ScrolltoAnchor />
      <Routes>
        <Route path="/" element={<LandingPageAgg />} />
        <Route path="/paper-overview" element={<PaperOverview />} />
        <Route path='/test' element={<Test />} />
        {/* Under Layout */}
        <Route element={<Layout />} >
        <Route path='/publications/:slug' element={<PubConDetails />} />
        <Route path='/publications' element={<PubCon />} />'
        <Route path='/people' element={<People />} />
        <Route path='/:slug' element={<PeopleDetail />} />
        <Route path='/research' element={<Research/>} />
        <Route path='/research/:slug' element={<ResearchDetail/>} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/projects/:slug' element={<ProjectsDetail />} />
        <Route path='/projects/gs-ec-uam' element={<GSECUAM />} />
        <Route path='/events' element={<Events />} />
        <Route path='/press' element={<Press />} />
        {/* <Route path='/apply' element={<Apply />} /> */}
        {/* <Route path='/apply/:slug' element={<ApplyDetail />} /> */}
        {/* 개인페이지 Redirection */}
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App

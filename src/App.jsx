import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './components/HomePage'

function App() {
  return (
    <BrowserRouter basename={`${import.meta.env.VITE_PUBLIC_URL}`}>
      <Routes>
        <Route path="/" element={<Layout />} >
        <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Overview from './pages/Overview'
import UserInsight from './pages/UserInsight'
import MediaAnalysis from './pages/MediaAnalysis'
import AIRecommend from './pages/AIRecommend'
import BusinessAlert from './pages/BusinessAlert'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Overview />} />
          <Route path="/user-insight" element={<UserInsight />} />
          <Route path="/media-analysis" element={<MediaAnalysis />} />
          <Route path="/ai-recommend" element={<AIRecommend />} />
          <Route path="/business-alert" element={<BusinessAlert />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

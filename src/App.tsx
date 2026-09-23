import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ScissorCursor } from '@/components/cursor/ScissorCursor'
import { LandingPage } from '@/pages/LandingPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ContentProvider } from '@/context/ContentContext'

export default function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <ScissorCursor />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<DashboardPage />} />
          <Route path="/admin/*" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </ContentProvider>
  )
}

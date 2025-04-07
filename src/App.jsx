import { useState, createContext } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import UploadComponent from './components/UploadComponent'
import ScenariosComponent from './components/ScenariosComponent'
import BirthdayPage from './pages/BirthdayPage'
import WeddingPage from './pages/WeddingPage'
import HomePage from './pages/HomePage'

// 创建上传材料的Context
export const MaterialsContext = createContext([])

function App() {
  const [uploadedMaterials, setUploadedMaterials] = useState([])
  const [scenarios] = useState([
    {
      id: 1,
      title: '生日祝福场景',
      description: '温馨的生日祝福模板',
      thumbnail: './birthday-thumbnail.jpg'
    },
    {
      id: 2,
      title: '婚礼祝福场景',
      description: '浪漫的婚礼祝福模板',
      thumbnail: './wedding-thumbnail.jpg'
    }
  ])

  const handleUpload = (acceptedFiles) => {
    const materials = acceptedFiles.map(file => ({
      id: Date.now(),
      file: Object.assign(file, {
        preview: URL.createObjectURL(file)
      }),
      type: file.type.startsWith('video/') ? 'video' : 'image',
      timestamp: new Date().toISOString()
    }));
    setUploadedMaterials(prev => [...prev, ...materials]);
  }

  return (
    <MaterialsContext.Provider value={uploadedMaterials}>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={
              <HomePage>
                <h1>祝福场景生成器</h1>
                <div className="upload-section">
                  <UploadComponent onUpload={handleUpload} />
                </div>
                <div className="scenarios-section">
                  <ScenariosComponent scenarios={scenarios} />
                </div>
              </HomePage>
            } />
            <Route path="/birthday" element={<BirthdayPage />} />
            <Route path="/wedding" element={<WeddingPage />} />
          </Routes>
        </div>
      </Router>
    </MaterialsContext.Provider>
  )
}

export default App

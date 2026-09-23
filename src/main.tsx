import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // import Tailwind CSS เข้ามาใช้ทั้งแอป
import App from './App.tsx'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'

// จุดเริ่มต้นของแอป (entry point) - หา <div id="root"> ใน index.html แล้ว render React ลงไป
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* ครอบ App ด้วย Provider 2 ชั้น เพื่อให้ทุก component ข้างในเรียกใช้
        useTheme() และ useLanguage() ได้ โดยไม่ต้องส่ง props ผ่านหลายชั้น (prop drilling) */}
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)

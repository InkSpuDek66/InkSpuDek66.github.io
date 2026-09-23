import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ui, type Lang } from '../data/translations'
import { LanguageContext } from './language-context'

// เช็ค localStorage ตอนเปิดแอปครั้งแรกว่าเคยเลือกภาษาไว้ไหม ถ้าไม่เคย/ค่าไม่ใช่ 'en' ให้ใช้ไทยเป็นค่าเริ่มต้น
function getInitialLang(): Lang {
  const saved = localStorage.getItem('language')
  return saved === 'en' ? 'en' : 'th'
}

// Provider component - ครอบทั้งแอปไว้ (ดูใน main.tsx) เพื่อแจกจ่าย state ภาษา
// ให้ component ไหนก็ได้ในแอปเรียกใช้ผ่าน useLanguage()
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang)

  // ทำงานทุกครั้งที่ lang เปลี่ยน: อัปเดต attribute lang ของ <html> (ดีต่อ SEO/accessibility)
  // และบันทึกค่าไว้ใน localStorage เพื่อจำภาษาไว้ใช้ครั้งหน้า
  useEffect(() => {
    document.documentElement.lang = lang
    localStorage.setItem('language', lang)
  }, [lang])

  // สลับภาษา: ไทย <-> อังกฤษ
  const toggleLanguage = () => {
    setLang((current) => (current === 'th' ? 'en' : 'th'))
  }

  return (
    // ส่ง lang, toggleLanguage และฟังก์ชัน t() ลงไปให้ทุก component ที่อยู่ข้างใน
    // t(key) คือฟังก์ชันแปลข้อความ - ไปหาใน object `ui` (จาก translations.ts) ตามภาษาปัจจุบัน
    // เช่น t('navAbout') จะคืนค่า 'แนะนำตัว' ตอนภาษาไทย หรือ 'About' ตอนภาษาอังกฤษ
    <LanguageContext.Provider value={{ lang, toggleLanguage, t: (key) => ui[lang][key] }}>
      {children}
    </LanguageContext.Provider>
  )
}

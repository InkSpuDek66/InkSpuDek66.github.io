import { useContext } from 'react'
import { LanguageContext } from './language-context'

// Hook สั้นๆ ให้ component เรียกใช้แทนการเขียน useContext(LanguageContext) ตรงๆ ทุกที่
// เช่น const { lang, t } = useLanguage()
export function useLanguage() {
  const context = useContext(LanguageContext)
  // ถ้าเป็น undefined แปลว่ามีคนเรียก useLanguage() นอก <LanguageProvider> - โยน error ทันที
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

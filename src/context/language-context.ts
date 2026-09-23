import { createContext } from 'react'
import type { Lang, UiKey } from '../data/translations'

// รูปแบบข้อมูลที่ Context นี้จะแจกจ่ายให้ component ลูกๆ
export interface LanguageContextValue {
  lang: Lang               // ภาษาปัจจุบัน ('th' หรือ 'en')
  toggleLanguage: () => void // ฟังก์ชันไว้สลับภาษา (เรียกจากปุ่ม EN/TH ใน Header)
  t: (key: UiKey) => string  // ฟังก์ชันแปลข้อความ: ส่ง key เข้าไปแล้วได้ข้อความตามภาษาปัจจุบันกลับมา
}

// สร้าง Context ไว้ก่อน ค่าจริงจะถูกใส่โดย <LanguageContext.Provider> ใน LanguageContext.tsx
// (แยกไฟล์จาก Provider component ด้วยเหตุผลเดียวกับ theme-context.ts)
export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

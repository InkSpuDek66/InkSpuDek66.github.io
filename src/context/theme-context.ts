import { createContext } from 'react'

// ธีมมีได้แค่ 2 ค่า: สว่าง หรือ มืด
export type Theme = 'light' | 'dark'

// รูปแบบข้อมูลที่ Context นี้จะแจกจ่ายให้ component ลูกๆ
export interface ThemeContextValue {
  theme: Theme          // ธีมปัจจุบัน
  toggleTheme: () => void // ฟังก์ชันไว้สลับธีม (เรียกจากปุ่มใน Header)
}

// createContext สร้าง "ท่อ" สำหรับส่งข้อมูลข้ามหลาย component โดยไม่ต้องส่ง props ทีละชั้น
// ตั้งต้นเป็น undefined ไว้ก่อน เพราะค่าจริงจะถูกใส่โดย <ThemeContext.Provider> ใน ThemeContext.tsx
// ไฟล์นี้แยกออกมาต่างหาก (ไม่รวมกับ ThemeProvider component) เพราะกฎ ESLint ของ Vite
// (react-refresh) ไม่ยอมให้ไฟล์เดียวกัน export ทั้ง component และ non-component ปนกัน
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

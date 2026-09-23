import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ThemeContext, type Theme } from './theme-context'

// ตอนแอปเปิดขึ้นมาครั้งแรก ให้เช็คว่าเคยมีการบันทึกธีมไว้ใน localStorage ของเบราว์เซอร์ไหม
// (localStorage คือที่เก็บข้อมูลฝั่งเบราว์เซอร์ ข้อมูลจะอยู่ถาวรแม้ปิดแท็บ/รีเฟรชหน้า)
// ถ้าไม่เคยบันทึกไว้ หรือค่าที่บันทึกไม่ใช่ 'dark' ให้ใช้โหมดสว่างเป็นค่าเริ่มต้น
function getInitialTheme(): Theme {
  const saved = localStorage.getItem('theme')
  return saved === 'dark' ? 'dark' : 'light'
}

// Provider component - ตัวนี้ครอบทั้งแอปไว้ (ดูใน main.tsx) เพื่อแจกจ่าย state ธีม
// ให้ component ไหนก็ได้ในแอปเรียกใช้ผ่าน useTheme()
export function ThemeProvider({ children }: { children: ReactNode }) {
  // useState เก็บค่าธีมปัจจุบัน โดยตั้งค่าเริ่มต้นจากฟังก์ชันด้านบน (ทำงานแค่ครั้งแรกที่ mount)
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  // useEffect ตัวนี้จะทำงานทุกครั้งที่ theme เปลี่ยนค่า (ดูจาก dependency array [theme])
  useEffect(() => {
    // เพิ่ม/ลบ class "dark" ที่ <html> เพื่อให้ Tailwind ใช้ dark: variant ได้ทั่วทั้งเว็บ
    document.documentElement.classList.toggle('dark', theme === 'dark')
    // จำค่าไว้ใน localStorage เพื่อให้เปิดเว็บครั้งหน้ายังเป็นธีมเดิม
    localStorage.setItem('theme', theme)
  }, [theme])

  // ฟังก์ชันสลับธีม: ถ้าตอนนี้มืดอยู่ให้สลับเป็นสว่าง และในทางกลับกัน
  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  // ส่งค่า { theme, toggleTheme } ลงไปให้ทุก component ที่อยู่ใต้ <ThemeContext.Provider>
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

import { useContext } from 'react'
import { ThemeContext } from './theme-context'

// Hook สั้นๆ ให้ component เรียกใช้แทนการเขียน useContext(ThemeContext) ตรงๆ ทุกที่
// เช่น const { theme, toggleTheme } = useTheme()
export function useTheme() {
  const context = useContext(ThemeContext)
  // ถ้า context เป็น undefined แปลว่ามีคนเรียก useTheme() นอก <ThemeProvider>
  // โยน error ทันทีเพื่อจับบั๊กแต่เนิ่นๆ (ดีกว่าปล่อยให้ theme เป็น undefined เงียบๆ)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

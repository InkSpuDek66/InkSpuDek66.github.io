import { useEffect, useState } from 'react'

// คำนวณอายุ ณ วันนี้ จากวันเกิดที่ส่งเข้ามา
function calculateAge(birthDate: Date): number {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear() // ลบปีตรงๆ ก่อน
  const monthDiff = today.getMonth() - birthDate.getMonth()

  // ถ้ายังไม่ถึงวันเกิดของปีนี้ (เดือนน้อยกว่า หรือเดือนเท่ากันแต่วันยังไม่ถึง)
  // ให้ลบอายุออก 1 ปี เพราะยังนับเป็นวันเกิดปีที่แล้วอยู่
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

// Custom hook: รับวันเกิด (string เช่น '2005-02-18') แล้วคืนอายุปัจจุบันแบบ auto-update
// เอาไปใช้ใน About.tsx: const age = useAge(personal.birthDate)
export function useAge(birthDateString: string): number {
  // ตั้งค่าเริ่มต้นด้วยการคำนวณครั้งแรกตอน component mount
  const [age, setAge] = useState(() => calculateAge(new Date(birthDateString)))

  useEffect(() => {
    // ตั้งเวลาให้คำนวณอายุใหม่ทุก 24 ชั่วโมง เผื่อมีคนเปิดเว็บทิ้งไว้ข้ามวันเกิด
    // อายุจะได้อัปเดตเองโดยไม่ต้องรีเฟรชหน้า
    const interval = setInterval(() => {
      setAge(calculateAge(new Date(birthDateString)))
    }, 24 * 60 * 60 * 1000)

    // cleanup function: เคลียร์ตัวจับเวลาทิ้งตอน component ถูก unmount กัน memory leak
    return () => clearInterval(interval)
  }, [birthDateString])

  return age
}

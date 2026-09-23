import { useEffect, useRef, useState } from 'react'

// สังเกตว่า element เข้ามาอยู่ในจอ (viewport) หรือยัง - ใช้ทำอนิเมชั่น "เลื่อนขึ้น + จางเข้า" ตอนสกรอลล์ผ่าน
// เล่นแค่ครั้งเดียว (unobserve ทันทีที่เข้าจอ) ไม่สลับกลับไปกลับมาเวลาสกรอลล์ขึ้นลงซ้ำๆ
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(node)
        }
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView } as const
}

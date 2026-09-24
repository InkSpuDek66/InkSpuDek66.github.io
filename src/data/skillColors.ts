import { Bot, Code2, Database, Languages as LanguagesIcon, Server, TestTube2, Wrench } from 'lucide-react'
import type { ComponentType } from 'react'
import { skillGroups } from './profile'

// ไฟล์นี้คือ "แหล่งความจริงเดียว" ของสีประจำหมวดทักษะ ใช้ร่วมกันทั้งใน Skills.tsx (การ์ดทักษะ)
// และ Projects.tsx (ป้ายเทคโนโลยีในแต่ละโปรเจกต์) เพื่อให้เทคโนโลยีเดียวกันได้สีเดียวกันเสมอไม่ว่าจะโผล่ที่ไหนในเว็บ
// (เช่น "React" เป็นสีฟ้าทั้งใน Skills และในป้ายเทคของ Projects) คนดูจะได้จำสี = หมวดหมู่ได้ง่ายขึ้น

// ตารางจับคู่ "ชื่อหมวดทักษะ (ภาษาอังกฤษ)" กับ "ไอคอนที่จะใช้แสดง" - ใช้ title.en เป็น key เพราะเป็นค่าคงที่
export const iconByCategory: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  'Front-end': Code2,
  'Back-end': Server,
  'AI & Automation': Bot,
  Databases: Database,
  Tools: Wrench,
  Testing: TestTube2,
  Languages: LanguagesIcon,
}

export interface CategoryStyle {
  icon: string
  iconBg: string
  pill: string
  hoverBorder: string
}

// สีประจำหมวด - เขียนเป็น class เต็มๆ (ไม่ใช้ template string ต่อชื่อสี) เพราะ Tailwind ต้อง scan เจอ class ตรงๆ ถึงจะ build ให้
export const categoryStyles: Record<string, CategoryStyle> = {
  'Front-end': {
    icon: 'text-sky-600 dark:text-sky-400',
    iconBg: 'bg-sky-100 dark:bg-sky-950/60',
    pill: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-300',
    hoverBorder: 'hover:border-sky-300 dark:hover:border-sky-800',
  },
  'Back-end': {
    icon: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    pill: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300',
    hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-800',
  },
  'AI & Automation': {
    icon: 'text-indigo-600 dark:text-indigo-400',
    iconBg: 'bg-indigo-100 dark:bg-indigo-950/60',
    pill: 'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300',
    hoverBorder: 'hover:border-indigo-300 dark:hover:border-indigo-800',
  },
  Databases: {
    icon: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-100 dark:bg-amber-950/60',
    pill: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300',
    hoverBorder: 'hover:border-amber-300 dark:hover:border-amber-800',
  },
  Tools: {
    icon: 'text-violet-600 dark:text-violet-400',
    iconBg: 'bg-violet-100 dark:bg-violet-950/60',
    pill: 'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-300',
    hoverBorder: 'hover:border-violet-300 dark:hover:border-violet-800',
  },
  Testing: {
    icon: 'text-rose-600 dark:text-rose-400',
    iconBg: 'bg-rose-100 dark:bg-rose-950/60',
    pill: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300',
    hoverBorder: 'hover:border-rose-300 dark:hover:border-rose-800',
  },
  Languages: {
    icon: 'text-teal-600 dark:text-teal-400',
    iconBg: 'bg-teal-100 dark:bg-teal-950/60',
    pill: 'border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-900 dark:bg-teal-950/40 dark:text-teal-300',
    hoverBorder: 'hover:border-teal-300 dark:hover:border-teal-800',
  },
}

// ป้ายสีเทากลางๆ สำรองไว้เผื่อมีชื่อเทคโนโลยีในอนาคตที่ยังไม่ได้จับคู่หมวดไว้ (กันพัง ไม่ใช่ error)
export const neutralPill =
  'border-gray-200 bg-gray-50 text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400'

// เทคโนโลยีบางตัวที่ใช้ในหน้าโปรเจกต์ไม่ได้อยู่ใน skillGroups ตรงๆ (เช่น SignalR/JWT เป็นรายละเอียดปลีกย่อยของฝั่ง Back-end)
// เลยต้องจับคู่หมวดให้เองตรงนี้เพิ่มเติม
const techCategoryOverrides: Record<string, string> = {
  SignalR: 'Back-end',
  'Session Auth': 'Back-end',
  JWT: 'Back-end',
}

// จับคู่ "ชื่อเทคโนโลยี" -> "หมวดทักษะ" โดย derive จาก skillGroups อัตโนมัติ (เฉพาะ item ที่เป็น string ธรรมดา
// ไม่เอา Bilingual เพราะหมวดภาษาไม่เกี่ยวกับป้ายเทคโนโลยีในหน้าโปรเจกต์) รวมกับรายการที่เติมเองด้านบน
export const techCategory: Record<string, string> = skillGroups.reduce(
  (acc, group) => {
    for (const item of group.items) {
      if (typeof item === 'string') acc[item] = group.title.en
    }
    return acc
  },
  { ...techCategoryOverrides } as Record<string, string>,
)

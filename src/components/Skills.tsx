import { Code2, Database, Languages as LanguagesIcon, Server, TestTube2, Wrench } from 'lucide-react'
import type { ComponentType } from 'react'
import { useLanguage } from '../context/useLanguage'
import { skillGroups } from '../data/profile'

// ตารางจับคู่ "ชื่อหมวดทักษะ (ภาษาอังกฤษ)" กับ "ไอคอนที่จะใช้แสดง"
// ใช้ title.en เป็น key เพราะเป็นค่าคงที่ ไม่เปลี่ยนตามภาษาที่ผู้ใช้เลือก (title.th จะเปลี่ยนได้)
// ComponentType<...> คือ type ของ React component ไอคอนจาก lucide-react ทุกตัวมีรูปแบบ props เดียวกัน
const iconByCategory: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  'Front-end': Code2,
  'Back-end': Server,
  Databases: Database,
  Tools: Wrench,
  Testing: TestTube2,
  Languages: LanguagesIcon,
}

// Section "ทักษะความสามารถ" - แสดงเป็นการ์ดตามหมวด (Front-end/Back-end/Databases/...)
// ข้อมูลหมวดและรายการทักษะทั้งหมดมาจาก skillGroups ใน data/profile.ts
export default function Skills() {
  const { lang, t } = useLanguage()

  return (
    <section id="skills" className="border-t border-gray-100 dark:border-gray-900">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <h2 className="mb-10 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {t('skillsTitle')}
        </h2>

        {/* grid ปรับจำนวนคอลัมน์ตามขนาดจอ: มือถือ 1 คอลัมน์, จอกลาง 2, จอใหญ่ 3 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => {
            // หาไอคอนที่ตรงกับหมวดนี้จากตารางด้านบน แล้วตั้งชื่อตัวแปรขึ้นต้นด้วยตัวใหญ่
            // (จำเป็นต้องขึ้นต้นตัวใหญ่ ไม่งั้น React จะเข้าใจว่า <Icon /> เป็น HTML tag ธรรมดา)
            const Icon = iconByCategory[group.title.en]
            return (
              <div key={group.title.en} className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  <Icon size={16} className="text-indigo-500 dark:text-indigo-400" />
                  {group.title[lang]}
                </h3>
                {/* วนลูปรายการทักษะในหมวดนี้ แสดงเป็น pill/badge เล็กๆ
                    item บางตัวเป็น string ธรรมดา (React, MySQL) บางตัวเป็น Bilingual (หมวดภาษา)
                    เลยต้องเช็คก่อนว่าจะแสดงตรงๆ หรือต้องหยิบค่าตามภาษาปัจจุบัน */}
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => {
                    const label = typeof item === 'string' ? item : item[lang]
                    return (
                      <span
                        key={label}
                        className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      >
                        {label}
                      </span>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

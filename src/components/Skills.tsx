import { useLanguage } from '../context/useLanguage'
import { useInView } from '../hooks/useInView'
import { categoryStyles, iconByCategory } from '../data/skillColors'
import { skillGroups } from '../data/profile'

// Section "ทักษะความสามารถ" - แสดงเป็นการ์ดตามหมวด (Front-end/Back-end/Databases/...)
// ข้อมูลหมวดและรายการทักษะทั้งหมดมาจาก skillGroups ใน data/profile.ts
export default function Skills() {
  const { lang, t } = useLanguage()
  // fade-in ทั้ง section ตอนสกรอลล์เข้ามาในจอ, การ์ดแต่ละใบใน grid ไล่โผล่ทีละใบด้วย transitionDelay
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section id="skills">
      <div
        ref={ref}
        className={`mx-auto max-w-5xl px-6 py-14 transition-opacity duration-700 ease-out sm:py-20 ${
          inView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {t('skillsTitle')}
        </h2>

        {/* grid ปรับจำนวนคอลัมน์ตามขนาดจอ: มือถือ 1 คอลัมน์, จอกลาง 2, จอใหญ่ 3 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => {
            // หาไอคอนที่ตรงกับหมวดนี้จากตารางด้านบน แล้วตั้งชื่อตัวแปรขึ้นต้นด้วยตัวใหญ่
            // (จำเป็นต้องขึ้นต้นตัวใหญ่ ไม่งั้น React จะเข้าใจว่า <Icon /> เป็น HTML tag ธรรมดา)
            const Icon = iconByCategory[group.title.en]
            const style = categoryStyles[group.title.en]
            return (
              <div
                key={group.title.en}
                style={{ transitionDelay: inView ? `${index * 70}ms` : '0ms' }}
                className={`rounded-xl border border-gray-200 bg-white p-4 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-black/30 ${style.hoverBorder} ${
                  inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${style.iconBg}`}>
                    <Icon size={15} className={style.icon} />
                  </span>
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
                        className={`rounded-md px-2.5 py-1 text-xs font-medium ${style.pill}`}
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

import { ChevronDown, Code2, ExternalLink, Star } from 'lucide-react'
import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { useLanguage } from '../context/useLanguage'
import { useInView } from '../hooks/useInView'
import { categoryStyles, neutralPill, techCategory } from '../data/skillColors'
import { projects, type Project } from '../data/profile'

// แถวลิงก์ GitHub/Demo ที่ใช้ซ้ำได้ในทุกการ์ด
// แสดงเฉพาะลิงก์ที่มีข้อมูลจริง (บางโปรเจกต์มีแค่ GitHub, บางอันมีแค่ Demo)
function ProjectLinks({ project }: { project: Project }) {
  const { t } = useLanguage()
  return (
    <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-gray-600 transition-all duration-200 hover:translate-x-0.5 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <FaGithub size={16} />
          {t('projectGithub')}
        </a>
      )}
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-gray-600 transition-all duration-200 hover:translate-x-0.5 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <ExternalLink size={16} />
          {t('projectDemo')}
        </a>
      )}
    </div>
  )
}

// แถวป้ายเทคโนโลยีที่ใช้ในโปรเจกต์ (React, Node.js, MongoDB, ...) แสดงเป็น pill เล็กๆ ฟอนต์ monospace
// สีของแต่ละป้ายอิงจาก "หมวดทักษะ" เดียวกับที่ใช้ใน Skills.tsx (ผ่าน techCategory ใน data/skillColors.ts)
// เพื่อให้คนดูจำได้ว่าสีเดียวกัน = ประเภทเดียวกัน เช่น React (Front-end) กับ Node.js (Back-end) จะได้สีต่างกันเสมอ
// ไม่ว่าจะไปโผล่ใน section ไหนของเว็บก็ตาม
function TechList({ tech }: { tech: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tech.map((item) => {
        const category = techCategory[item]
        const style = (category && categoryStyles[category]?.pill) || neutralPill
        return (
          <span key={item} className={`rounded-md border px-2 py-1 font-mono text-xs ${style}`}>
            {item}
          </span>
        )
      })}
    </div>
  )
}

// พื้นที่รูปของการ์ด - ถ้ามี project.image จริงก็แสดงรูป ถ้ายังไม่มี (ยังไม่ได้ใส่สกรีนช็อตจริง)
// ให้ใช้กล่อง gradient สี indigo อ่อนๆ พร้อมไอคอนแทน กันไม่ให้การ์ดดูมีช่องว่างโหว่ๆ
// aspect-video (16:9) คงที่ทุกขนาดจอ ใกล้เคียงสัดส่วนจริงของภาพสกรีนช็อต (ประมาณ 1.85:1) มาก
// (ไม่ใช้ h-full ยืดตามความสูงคอลัมน์ข้อความฝั่งขวา เพราะแต่ละโปรเจกต์มีข้อความยาวไม่เท่ากัน จะได้กรอบรูปเพี้ยนไปเรื่อยๆ
// object-cover เลยต้องซูม/ตัดขอบซ้ายขวาเยอะจนตัดโดนเนื้อหาในภาพ - aspect-video คงที่แก้ปัญหานั้นได้)
function ProjectMedia({ project }: { project: Project }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.name}
        className="aspect-video w-full object-cover"
      />
    )
  }
  return (
    <div className="flex aspect-video w-full items-center justify-center bg-linear-to-br from-indigo-50 to-violet-100 dark:from-indigo-950 dark:to-violet-950">
      <Code2 size={40} className="text-indigo-300 dark:text-indigo-700" />
    </div>
  )
}

// การ์ดโปรเจกต์เดียว - เลย์เอาต์แนวนอน: รูปอยู่ซ้าย (md:w-2/5), เนื้อหาอยู่ขวา (md:w-3/5)
// ใช้กับทุกโปรเจกต์เหมือนกัน (ไม่แยก component สำหรับ featured อีกต่อไป) ต่างกันแค่ตรงที่
// โปรเจกต์ featured จะมีไอคอนดาว (hover ดู tooltip) หน้าชื่อโปรเจกต์เพิ่มมา
function ProjectCard({ project }: { project: Project }) {
  const { lang, t } = useLanguage()
  // การ์ดแต่ละใบสังเกตการสกรอลล์ของตัวเอง (แยกจาก section) เพราะรายการโปรเจกต์เรียงต่อกันยาว
  // ใบที่อยู่ล่างๆ ควรเลื่อนขึ้นตอนที่ตัวมันเข้าจอจริงๆ ไม่ใช่พร้อมกับหัวข้อด้านบนสุด
  const { ref, inView } = useInView<HTMLDivElement>()
  // พารากราฟยาวๆ (ปัญหา/แนวทาง/บทบาท/ผลลัพธ์/description) ซ่อนไว้ก่อนเป็นค่าเริ่มต้น กดปุ่ม "ดูเพิ่มเติม" ค่อยขยาย
  // กันไม่ให้การ์ดสูงเทอะทะ โดยที่หัวข้อ/แท็กเทคโนโลยี/ลิงก์ยังโชว์ตลอดอยู่แล้ว ไม่ต้องกดก็ยังเห็นข้อมูลสำคัญ
  const [expanded, setExpanded] = useState(false)

  const detailFields = [
    project.problem && { key: 'problem', label: t('projectProblem'), text: project.problem[lang] },
    project.solution && { key: 'solution', label: t('projectSolution'), text: project.solution[lang] },
    project.role && { key: 'role', label: t('projectRole'), text: project.role[lang] },
    project.outcome && { key: 'outcome', label: t('projectOutcome'), text: project.outcome[lang] },
  ].filter((field): field is { key: string; label: string; text: string } => Boolean(field))
  // description ใช้แทน problem/solution สำหรับโปรเจกต์ที่ไม่มีข้อมูลละเอียดขนาดนั้น
  const showDescription = Boolean(project.description && !project.problem)
  const hasDetails = detailFields.length > 0 || showDescription

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-black/30 md:flex ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      {/* min-w-0 จำเป็นมาก: ปกติ flex item จะมี min-width เริ่มต้นเป็น "ขนาดเนื้อหาข้างใน" (auto) ไม่ใช่ 0
          พอเนื้อหาข้างในเป็นรูปที่ไฟล์ต้นฉบับใหญ่ (เช่น 2800px+) โดยไม่มี min-w-0 คอลัมน์นี้จะไม่ยอมหด
          เหลือแค่ md:w-2/5 ตามที่ตั้งไว้ แต่จะดันกว้างตามขนาดรูปจริงแทน ทำให้การ์ดบวมล้นขอบจอ
          self-start ปิด flex stretch เริ่มต้น กันไม่ให้คอลัมน์นี้ถูกยืดสูงเท่าคอลัมน์ข้อความฝั่งขวา (ซึ่งจะทำให้ aspect-video
          ด้านบนเพี้ยนไป) ปล่อยให้สูงเท่าที่ aspect-video กำหนดไว้เท่านั้น ถ้าข้อความยาวกว่ารูปก็ปล่อยว่างใต้รูปได้ ไม่ใช่ปัญหา */}
      <div className="min-w-0 shrink-0 self-start md:w-2/5">
        <ProjectMedia project={project} />
      </div>

      <div className="p-6 sm:p-8 md:w-3/5">
        <h3 className="flex items-center gap-1.5 text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {project.featured && (
            // ไอคอนดาว + tooltip โผล่ตอน hover แทนป้าย "Featured Project" แบบเดิมที่แปะถาวรอยู่บนการ์ด
            // ให้ความหมายเดิมแต่ไม่แย่งพื้นที่/ไม่ทำให้การ์ดดูรก
            <span className="group relative inline-flex shrink-0">
              <Star size={16} className="fill-indigo-500 text-indigo-500 dark:fill-indigo-400 dark:text-indigo-400" />
              <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 rounded-md bg-slate-900 px-2 py-1 text-xs font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 dark:bg-slate-700">
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-slate-900 dark:border-b-slate-700" />
                {t('featuredBadge')}
              </span>
            </span>
          )}
          {project.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">{project.meta[lang]}</p>

        {hasDetails && (
          <>
            {/* grid-rows 0fr -> 1fr คือเทคนิคเดียวกับเมนูมือถือใน Header.tsx ทำ "height: auto" ให้ animate ได้
                เนื้อหาละเอียดอยู่ใน DOM ตลอด แค่ยุบ/ขยายด้วย transition แทนการโผล่/หายทันที */}
            <div
              className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
                expanded ? 'mt-4 grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="min-h-0 grid gap-4 sm:grid-cols-2">
                {detailFields.map((field) => (
                  <div key={field.key}>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">{field.label}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{field.text}</p>
                  </div>
                ))}
                {showDescription && (
                  <div className="sm:col-span-2">
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{project.description![lang]}</p>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="mt-3 flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              {expanded ? t('showLess') : t('showMore')}
              <ChevronDown size={16} className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </>
        )}

        <div className="mt-4">
          <TechList tech={project.tech} />
        </div>

        <ProjectLinks project={project} />
      </div>
    </div>
  )
}

// Section "ผลงานและโปรเจกต์" - แสดงตามลำดับที่เขียนไว้ใน projects array ของ data/profile.ts ตรงๆ
// (array นั้นเรียงจากโปรเจกต์ล่าสุดไปเก่าสุดอยู่แล้ว ไม่ได้ sort ซ้ำตรงนี้)
// featured ใช้แค่ทำไอคอนดาวหน้าชื่อ ไม่ได้มีผลกับลำดับการแสดงผล
export default function Projects() {
  const { t } = useLanguage()
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section id="projects">
      <div
        ref={ref}
        className={`mx-auto max-w-5xl px-6 py-14 transition-opacity duration-700 ease-out sm:py-20 ${
          inView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {t('projectsTitle')}
        </h2>

        <div className="space-y-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

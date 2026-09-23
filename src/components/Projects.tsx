import { Code2, ExternalLink } from 'lucide-react'
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
function ProjectMedia({ project }: { project: Project }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.name}
        className="h-56 w-full object-cover md:h-full"
      />
    )
  }
  return (
    <div className="flex h-56 w-full items-center justify-center bg-linear-to-br from-indigo-50 to-violet-100 md:h-full dark:from-indigo-950 dark:to-violet-950">
      <Code2 size={40} className="text-indigo-300 dark:text-indigo-700" />
    </div>
  )
}

// การ์ดโปรเจกต์เดียว - เลย์เอาต์แนวนอน: รูป/placeholder อยู่ซ้าย (md:w-2/5), เนื้อหาอยู่ขวา
// ใช้กับทุกโปรเจกต์เหมือนกัน (ไม่แยก component สำหรับ featured อีกต่อไป) ต่างกันแค่ตรงที่
// โปรเจกต์ featured จะมี badge สีและ field "ผลลัพธ์" เพิ่มมา
function ProjectCard({ project }: { project: Project }) {
  const { lang, t } = useLanguage()
  // การ์ดแต่ละใบสังเกตการสกรอลล์ของตัวเอง (แยกจาก section) เพราะรายการโปรเจกต์เรียงต่อกันยาว
  // ใบที่อยู่ล่างๆ ควรเลื่อนขึ้นตอนที่ตัวมันเข้าจอจริงๆ ไม่ใช่พร้อมกับหัวข้อด้านบนสุด
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-black/30 md:flex ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div className="shrink-0 md:w-2/5">
        <ProjectMedia project={project} />
      </div>

      <div className="p-6 sm:p-8 md:w-3/5">
        {project.featured && (
          <span className="mb-3 inline-block rounded-md bg-linear-to-r from-indigo-600 to-violet-600 px-2.5 py-1 text-xs font-semibold text-white">
            {t('featuredBadge')}
          </span>
        )}
        <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">{project.name}</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">{project.meta[lang]}</p>

        {/* แต่ละ field (problem/solution/role/outcome/description) เป็น optional ในข้อมูล
            เลยเช็ค && ก่อนทุกอัน กันไม่ให้ขึ้นหัวข้อเปล่าๆ ถ้าโปรเจกต์ไหนไม่มีข้อมูลนั้น */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {project.problem && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">{t('projectProblem')}</h4>
              <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{project.problem[lang]}</p>
            </div>
          )}
          {project.solution && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">{t('projectSolution')}</h4>
              <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{project.solution[lang]}</p>
            </div>
          )}
          {project.role && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">{t('projectRole')}</h4>
              <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{project.role[lang]}</p>
            </div>
          )}
          {project.outcome && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">{t('projectOutcome')}</h4>
              <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{project.outcome[lang]}</p>
            </div>
          )}
          {/* description ใช้แทน problem/solution สำหรับโปรเจกต์ที่ไม่มีข้อมูลละเอียดขนาดนั้น */}
          {project.description && !project.problem && (
            <div className="sm:col-span-2">
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{project.description[lang]}</p>
            </div>
          )}
        </div>

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
// featured ใช้แค่ทำ badge สีเด่นๆ ไม่ได้มีผลกับลำดับการแสดงผล
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

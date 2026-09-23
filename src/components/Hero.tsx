import meImg from '../assets/me.png'
import { useLanguage } from '../context/useLanguage'
import { personal, resumeFile } from '../data/profile'

// ส่วนแรกสุดของหน้าเว็บที่คนเห็น (มี id="top" ไว้ให้ Header กระโดดกลับมาได้)
// ประกอบด้วย: รูปโปรไฟล์, ชื่อ, headline อาชีพ, คำแนะนำตัวสั้นๆ, ปุ่ม CTA 3 ปุ่ม
// ดีไซน์แบบ Notion/Linear: ไม่มีกล่องพื้นหลังสีทึบ ปล่อยให้ whitespace เว้นระยะเยอะๆ ทำหน้าที่แบ่ง section แทน
export default function Hero() {
  const { lang, t } = useLanguage()

  return (
    <section id="top">
      {/* flex-col บนจอเล็ก (รูปอยู่บน ข้อความอยู่ล่าง), flex-row บนจอ md ขึ้นไป (เรียงข้างกัน) */}
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-6 py-20 text-center sm:py-28 md:flex-row md:text-left">
        <img
          src={meImg}
          alt={personal.name[lang]}
          className="h-40 w-40 shrink-0 rounded-full object-cover ring-1 ring-gray-200 md:h-48 md:w-48 dark:ring-gray-800"
        />
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl dark:text-slate-100">
            {personal.name[lang]}
          </h1>
          <p className="mt-2 text-lg font-medium text-indigo-600 dark:text-indigo-400">
            {personal.headline[lang]}
          </p>
          {/* ย้ายคำแนะนำตัวยาวๆ (personal.intro) ไปอยู่ใน section "แนะนำตัว" (About.tsx) แทน
              Hero เหลือแค่ชื่อ + headline + ปุ่ม CTA ให้กระชับ ไม่ซ้ำเนื้อหากับ About */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            {/* ปุ่มที่ 1: กระโดดไปดู section ผลงาน (ปุ่มเด่นสุด สี indigo ตามสีแบรนด์หลัก) */}
            <a
              href="#projects"
              className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              {t('heroCtaProjects')}
            </a>
            {/* ปุ่มที่ 2: เปิดไฟล์ Resume PDF จริงในแท็บใหม่ */}
            <a
              href={resumeFile}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-900"
            >
              {t('heroCtaCv')}
            </a>
            {/* ปุ่มที่ 3: กระโดดไปดู section ช่องทางติดต่อ */}
            <a
              href="#contact"
              className="rounded-md border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-900"
            >
              {t('heroCtaContact')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

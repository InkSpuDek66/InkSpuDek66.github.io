import { useLanguage } from '../context/useLanguage'
import { useAge } from '../hooks/useAge'
import { about, currentEducation, personal } from '../data/profile'

// Section "แนะนำตัว" - แบ่งเป็น 2 คอลัมน์บนจอใหญ่:
// ซ้าย (กว้าง 2 ส่วน) = career target, จุดแข็ง
// ขวา (กว้าง 1 ส่วน) = กล่อง "ข้อมูลทั่วไป" (อายุ/สถานศึกษา/วันจบ)
// (งานอดิเรกและกิจกรรมชมรมย้ายไปอยู่ใน Experience.tsx, ประวัติการศึกษาเต็มอยู่ใน Education.tsx แยกต่างหาก)
export default function About() {
  const { lang, t } = useLanguage()
  // อายุคำนวณสดจากวันเกิดจริง ไม่ได้ hardcode ตัวเลขไว้ - จะโตขึ้นเองทุกปีโดยไม่ต้องแก้โค้ด
  const age = useAge(personal.birthDate)

  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        {t('aboutTitle')}
      </h2>

      {/* คำแนะนำตัวยาวๆ (ย้ายมาจาก Hero.tsx เดิม) ให้ครบตรงนี้แทน เพราะเป็นเนื้อหาระดับ "แนะนำตัว" โดยตรง */}
      <p className="mb-10 max-w-3xl leading-relaxed text-gray-600 dark:text-gray-400">
        {personal.intro[lang]}
      </p>

      {/* grid-cols-3: คอลัมน์ซ้ายกิน 2 ส่วน (md:col-span-2), คอลัมน์ขวากิน 1 ส่วนที่เหลือ */}
      <div className="grid gap-10 md:grid-cols-3">
        <div className="space-y-8 md:col-span-2">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
              {t('aboutCareerTitle')}
            </h3>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">{about.career[lang]}</p>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
              {t('aboutStrengthsTitle')}
            </h3>
            {/* วนลูป array ของจุดแข็งจาก data/profile.ts มาแสดงเป็น bullet list */}
            <ul className="list-inside list-disc space-y-1 leading-relaxed text-gray-600 dark:text-gray-400">
              {about.strengths.map((strength) => (
                <li key={strength.th}>{strength[lang]}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* กล่องข้อมูลทั่วไป - ใช้ <dl>/<dt>/<dd> เพราะเป็นรูปแบบ "ชื่อหัวข้อ: ค่า" ตามหลัก semantic HTML
            เส้นขอบบางๆ + ไม่มีพื้นหลังสีทึบ ให้ความรู้สึกเป็นการ์ดที่เบา ไม่หนัก */}
        <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
          <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
            {t('aboutFactsTitle')}
          </h3>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-gray-500 dark:text-gray-500">{t('factAge')}</dt>
              <dd className="text-slate-900 dark:text-slate-100">{age} {t('factAgeYears')}</dd>
            </div>
            <div>
              <dt className="text-gray-500 dark:text-gray-500">{t('factUniversity')}</dt>
              <dd className="text-slate-900 dark:text-slate-100">{currentEducation.name[lang]}</dd>
            </div>
            <div>
              <dt className="text-gray-500 dark:text-gray-500">{t('factGrad')}</dt>
              <dd className="text-slate-900 dark:text-slate-100">{currentEducation.expectedGraduation?.[lang]}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}

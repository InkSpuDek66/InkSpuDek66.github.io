import { useLanguage } from '../context/useLanguage'
import { useAge } from '../hooks/useAge'
import { useInView } from '../hooks/useInView'
import { about, currentEducation, personal } from '../data/profile'

// Section "แนะนำตัว" - แบ่งเป็น 2 คอลัมน์บนจอใหญ่:
// ซ้าย (กว้าง 2 ส่วน) = career target, จุดแข็ง
// ขวา (กว้าง 1 ส่วน) = กล่อง "ข้อมูลทั่วไป" (อายุ/สถานศึกษา/วันจบ)
// (งานอดิเรกและกิจกรรมชมรมย้ายไปอยู่ใน Experience.tsx, ประวัติการศึกษาเต็มอยู่ใน Education.tsx แยกต่างหาก)
export default function About() {
  const { lang, t } = useLanguage()
  // อายุคำนวณสดจากวันเกิดจริง ไม่ได้ hardcode ตัวเลขไว้ - จะโตขึ้นเองทุกปีโดยไม่ต้องแก้โค้ด
  const age = useAge(personal.birthDate)
  // ทั้ง section fade-in + เลื่อนขึ้นเบาๆ ตอนสกรอลล์เข้ามาในจอ (เล่นครั้งเดียว)
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    // เดิมทุก section คั่นด้วยเส้นขอบบางๆ (border-t) ล้วนๆ - เปลี่ยนมาใช้พื้นหลังสีอ่อนๆ ไล่กันไปแต่ละ section แทน
    // ให้ความรู้สึกแบ่งขอบเขตชัดเจนกว่าแค่เส้นบางๆ และเพิ่มสีสันให้หน้าเว็บไปในตัว
    <section id="about" className="bg-indigo-50/50 dark:bg-indigo-500/4">
      <div
        ref={ref}
        className={`mx-auto max-w-5xl px-6 py-14 transition-all duration-700 ease-out sm:py-20 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        <h2 className="mb-5 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {t('aboutTitle')}
        </h2>

        {/* คำแนะนำตัวยาวๆ (ย้ายมาจาก Hero.tsx เดิม) ให้ครบตรงนี้แทน เพราะเป็นเนื้อหาระดับ "แนะนำตัว" โดยตรง */}
        <p className="mb-5 max-w-3xl leading-relaxed text-gray-600 dark:text-gray-400">
          {personal.intro[lang]}
        </p>

        {/* แถบเน้นจุดแข็งที่สุด (ประสบการณ์ TA) - ดันขึ้นมาให้เห็นตั้งแต่ section ที่ 2 (จอแรก)
            ใช้เส้นขอบซ้าย + พื้นหลัง indigo อ่อนๆ ให้สะดุดตากว่าย่อหน้าปกติ */}
        <p className="mb-8 max-w-3xl rounded-r-md border-l-4 border-indigo-400 bg-indigo-50/70 py-3 pl-4 leading-relaxed font-medium text-slate-700 dark:border-indigo-500 dark:bg-indigo-500/10 dark:text-slate-200">
          {about.highlight[lang]}
        </p>

        {/* grid-cols-3: คอลัมน์ซ้ายกิน 2 ส่วน (md:col-span-2), คอลัมน์ขวากิน 1 ส่วนที่เหลือ */}
        <div className="grid gap-8 md:grid-cols-3">
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
              พื้นหลังขาว/เข้มทึบตัดกับ wash สีของ section ด้านหลัง ให้ดูเป็นการ์ดลอยขึ้นมาชัดเจน */}
          <div className="rounded-xl border border-indigo-100 bg-white p-5 shadow-sm dark:border-indigo-950 dark:bg-gray-900">
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
      </div>
    </section>
  )
}

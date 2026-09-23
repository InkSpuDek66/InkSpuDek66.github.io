import meImg from '../assets/me.png'
import { useLanguage } from '../context/useLanguage'
import { useInView } from '../hooks/useInView'
import { personal, resumeFile } from '../data/profile'

// ส่วนแรกสุดของหน้าเว็บที่คนเห็น (มี id="top" ไว้ให้ Header กระโดดกลับมาได้)
// ประกอบด้วย: รูปโปรไฟล์, ชื่อ, headline อาชีพ, คำแนะนำตัวสั้นๆ, ปุ่ม CTA 3 ปุ่ม
// ดีไซน์แบบ Notion/Linear: ไม่มีกล่องพื้นหลังสีทึบ ปล่อยให้ whitespace เว้นระยะเยอะๆ ทำหน้าที่แบ่ง section แทน
export default function Hero() {
  const { lang, t } = useLanguage()
  // Hero อยู่บนสุดอยู่แล้ว เข้าจอเกือบจะทันทีตอนโหลดหน้า เลยได้ผลเหมือนอนิเมชั่น "เข้าฉาก" ตอนเปิดเว็บ
  const { ref, inView } = useInView<HTMLElement>()

  return (
    // isolate สร้าง stacking context ใหม่ให้ section นี้ กัน -z-10 ของบล็อบด้านล่างไปหลุดไปอยู่หลังพื้นหลังขาว/ดำของ <App> ทั้งหน้า
    <section id="top" ref={ref} className="relative isolate overflow-hidden">
      {/* บล็อบสีไล่เฉดเบลอๆ ด้านหลัง หลายเฉดสีผสมกัน ให้ Hero ดูมีชีวิตชีวาตั้งแต่แรกเห็น (ปุ่ม CTA ด้านล่างเป็นกระจกฝ้า
          โปร่งแสง ยิ่งเห็นสีเบลอๆ นี้ทะลุออกมาชัดเจน) pointer-events-none + -z-10 กันไม่ให้บังหรือรับคลิกแทนเนื้อหาจริง */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-indigo-300/40 blur-3xl dark:bg-indigo-600/20" />
        <div className="absolute -top-10 right-0 h-72 w-72 rounded-full bg-pink-300/30 blur-3xl dark:bg-pink-600/15" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl dark:bg-sky-600/15" />
      </div>

      {/* flex-col บนจอเล็ก (รูปอยู่บน ข้อความอยู่ล่าง), flex-row บนจอ md ขึ้นไป (เรียงข้างกัน) */}
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 py-16 text-center sm:py-20 md:flex-row md:text-left">
        <img
          src={meImg}
          alt={personal.name[lang]}
          className={`h-40 w-40 shrink-0 rounded-full object-cover ring-4 ring-white shadow-lg shadow-indigo-200/50 transition-all duration-700 ease-out md:h-48 md:w-48 dark:ring-gray-900 dark:shadow-indigo-950/50 ${
            inView ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
        />
        <div
          className={`transition-all duration-700 ease-out ${inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          style={{ transitionDelay: inView ? '150ms' : '0ms' }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl dark:text-slate-100">
            {personal.name[lang]}
          </h1>
          <p className="mt-2 text-lg font-medium text-indigo-600 dark:text-indigo-400">
            {personal.headline[lang]}
          </p>
          {/* ย้ายคำแนะนำตัวยาวๆ (personal.intro) ไปอยู่ใน section "แนะนำตัว" (About.tsx) แทน
              Hero เหลือแค่ชื่อ + headline + ปุ่ม CTA ให้กระชับ ไม่ซ้ำเนื้อหากับ About */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            {/* ปุ่มที่ 1: กระโดดไปดู section ผลงาน (ปุ่มเด่นสุด) - กระจกฝ้าเหมือนอีก 2 ปุ่ม แต่ทึบกว่า/ขอบเข้มกว่า/
                ตัวหนังสือสีเข้ม (indigo) ให้ยังรู้สึกว่าเป็น action หลักแม้จะเป็นสไตล์กระจกเหมือนกัน */}
            <a
              href="#projects"
              className="rounded-md border border-white/60 bg-white/40 px-5 py-2.5 text-sm font-semibold text-indigo-700 shadow-lg shadow-indigo-500/10 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/60 hover:shadow-xl active:translate-y-0 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            >
              {t('heroCtaProjects')}
            </a>
            {/* ปุ่มที่ 2: เปิดไฟล์ Resume PDF จริงในแท็บใหม่ - กระจกฝ้าเวอร์ชันบางกว่า (ปุ่มรอง) */}
            <a
              href={resumeFile}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-white/40 bg-white/15 px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/30 hover:shadow-md active:translate-y-0 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10"
            >
              {t('heroCtaCv')}
            </a>
            {/* ปุ่มที่ 3: กระโดดไปดู section ช่องทางติดต่อ - ปุ่มรองเหมือนปุ่มที่ 2 */}
            <a
              href="#contact"
              className="rounded-md border border-white/40 bg-white/15 px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/30 hover:shadow-md active:translate-y-0 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10"
            >
              {t('heroCtaContact')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

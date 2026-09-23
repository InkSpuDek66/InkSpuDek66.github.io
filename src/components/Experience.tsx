import { useLanguage } from '../context/useLanguage'
import { useInView } from '../hooks/useInView'
import { activities, experience, hobbies } from '../data/profile'

// Section "ประสบการณ์" - แสดงเป็นเส้นเวลา (timeline) ด้วยเส้นบางๆ ทางซ้าย (border-l)
// แบ่งเป็น 3 บล็อกที่แยกกันชัดเจนด้วยหัวข้อย่อยของตัวเอง เรียงลำดับ:
// ประสบการณ์ทำงาน (TA) -> กิจกรรม (ชมรม/ค่าย) -> งานอดิเรก
// (ประวัติการศึกษาแยกไปอยู่ section Education.tsx ของตัวเองแล้ว)
export default function Experience() {
  const { lang, t } = useLanguage()
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section id="experience">
      <div
        ref={ref}
        className={`mx-auto max-w-5xl px-6 py-14 transition-opacity duration-700 ease-out sm:py-20 ${
          inView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {t('experienceTitle')}
        </h2>

        {/* border-l คือเส้นแนวตั้งด้านซ้าย ทำให้ดูเหมือนเส้นเวลาที่แต่ละบล็อกเรียงต่อกัน */}
        <div className="space-y-10 border-l-2 border-indigo-200 pl-6 dark:border-indigo-900">
          {/* บล็อกประสบการณ์ทำงาน - วนลูปจาก experience array ตามลำดับที่เขียนไว้ใน data/profile.ts ตรงๆ
              (ตอนนี้มีแค่ TA รายการเดียว ถ้าเพิ่มในอนาคตให้เรียงรายการใหม่สุดไว้บนสุดของ array) */}
          <div
            style={{ transitionDelay: inView ? '80ms' : '0ms' }}
            className={`relative transition-all duration-500 ease-out ${inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            {/* จุดกลมบนเส้นเวลา ชี้ตำแหน่งของแต่ละบล็อก */}
            <span className="absolute top-1 -left-6.75 h-2.5 w-2.5 rounded-full bg-indigo-500 dark:bg-indigo-400" />
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
              {t('experienceWorkTitle')}
            </h3>
            <div className="mt-3 space-y-6">
              {experience.map((item) => (
                <div key={item.title.en}>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{item.period[lang]}</p>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">{item.title[lang]}</h4>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">{item.org[lang]}</p>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {item.bullets.map((bullet) => (
                      <li key={bullet.th}>{bullet[lang]}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* บล็อกกิจกรรม (ชมรม/ค่าย) - แยกออกจากงานอดิเรกแล้ว */}
          <div
            style={{ transitionDelay: inView ? '160ms' : '0ms' }}
            className={`relative transition-all duration-500 ease-out ${inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            <span className="absolute top-1 -left-6.75 h-2.5 w-2.5 rounded-full bg-indigo-500 dark:bg-indigo-400" />
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
              {t('activitiesTitle')}
            </h3>
            <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-400">{activities.club[lang]}</p>
          </div>

          {/* บล็อกงานอดิเรก */}
          <div
            style={{ transitionDelay: inView ? '240ms' : '0ms' }}
            className={`relative transition-all duration-500 ease-out ${inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            <span className="absolute top-1 -left-6.75 h-2.5 w-2.5 rounded-full bg-indigo-500 dark:bg-indigo-400" />
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
              {t('hobbiesTitle')}
            </h3>
            <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-400">{hobbies[lang]}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

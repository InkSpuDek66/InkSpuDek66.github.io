import { useLanguage } from '../context/useLanguage'
import { educationHistory } from '../data/profile'

// Section "ประวัติการศึกษา" - แสดงเป็นการ์ด 2 คอลัมน์ (มัธยม/มหาวิทยาลัย) เรียงจากล่าสุดไปเก่าสุด
// (ลำดับตรงตาม educationHistory ใน data/profile.ts ตรงๆ ไม่ได้ sort เพิ่มในนี้)
// แยกออกมาเป็น section ของตัวเอง (ไม่รวมกับ Experience.tsx เหมือนก่อนหน้า) ตามแบบที่อ้างอิงมา
export default function Education() {
  const { lang, t } = useLanguage()

  return (
    <section id="education" className="border-t border-gray-100 dark:border-gray-900">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <h2 className="mb-10 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {t('educationTitle')}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {educationHistory.map((item) => (
            <div key={item.id} className="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
              <div className="flex items-start gap-3">
                {/* โลโก้สถานศึกษา - ถ้ามีไฟล์จริงก็แสดงรูป ถ้าไม่มีก็ fallback เป็น badge ตัวย่อ (เช่น "SPU")
                    กันไม่ให้การ์ดดูขาดๆ หายๆ ตอนยังไม่มีโลโก้ */}
                {item.logo ? (
                  // object-contain (ไม่ใช่ object-cover) กันไม่ให้โลโก้ที่ไม่ได้เป็นสี่เหลี่ยมจัตุรัสถูกครอบตัด
                  // ใส่พื้นหลังขาว + padding เล็กน้อย ให้โลโก้ที่มีพื้นหลังโปร่งใส/ตัวอักษรเข้มยังอ่านออกชัดแม้อยู่ในโหมดมืด
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white p-1 ring-1 ring-gray-200 dark:ring-gray-800">
                    <img src={item.logo} alt={item.name[lang]} className="h-full w-full object-contain" />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-xs font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    {item.abbreviation}
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">{item.program[lang]}</h3>
                  <p className="mt-1 font-medium text-indigo-600 dark:text-indigo-400">{item.name[lang]}</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">{item.period[lang]}</p>
                </div>
              </div>
              {/* Badge GPAX - แสดงเฉพาะสถานศึกษาที่มีข้อมูลจริง (ไม่ fabricate ตัวเลขให้ที่ไม่มี) */}
              {item.gpa && (
                <span className="mt-4 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  {t('gpaLabel')}: <span className="font-bold">{item.gpa}</span> / 4.00
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

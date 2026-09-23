import { Award, ExternalLink } from 'lucide-react'
import { useLanguage } from '../context/useLanguage'
import { useInView } from '../hooks/useInView'
import { certificates, certificatesProfile } from '../data/profile'

// Section "ใบเซอร์ / เกียรติบัตร" - ถ้า certificates array ใน data/profile.ts ว่างเปล่า
// จะ return null คือ "ไม่ render section นี้เลย" กัน section โล่งๆ ไม่มีเนื้อหาไปโผล่ให้ผู้เข้าชมเห็น
// ตอนนี้มีข้อมูล badge จริงจาก Microsoft Learn แล้ว เลยขึ้นแสดงตามปกติ
export default function Certificates() {
  const { lang, t } = useLanguage()
  const { ref, inView } = useInView<HTMLDivElement>()

  if (certificates.length === 0) {
    return null
  }

  return (
    <section id="certificates" className="bg-indigo-50/50 dark:bg-indigo-500/4">
      <div
        ref={ref}
        className={`mx-auto max-w-5xl px-6 py-14 transition-opacity duration-700 ease-out sm:py-20 ${
          inView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* หัวข้อ + ลิงก์ไปหน้าโปรไฟล์ Microsoft Learn ตัวจริง อยู่แถวเดียวกัน (ชิดซ้าย/ชิดขวา) */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {t('certificatesTitle')}
          </h2>
          <a
            href={certificatesProfile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            {certificatesProfile.label[lang]}
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, index) => (
            <div
              key={cert.id}
              style={{ transitionDelay: inView ? `${index * 70}ms` : '0ms' }}
              className={`flex gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-black/30 ${
                inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              {/* ถ้ามีรูปใบเซอร์จริงก็แสดง ถ้าไม่มีก็ใช้ badge ไอคอนเหรียญรางวัลแทน */}
              {cert.image ? (
                <img src={cert.image} alt={cert.name[lang]} className="h-10 w-10 shrink-0 rounded-md object-cover" />
              ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-indigo-50 dark:bg-indigo-950">
                  <Award size={18} className="text-indigo-600 dark:text-indigo-400" />
                </div>
              )}
              <div className="min-w-0">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{cert.name[lang]}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer[lang]}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">{cert.date[lang]}</p>
                {/* credentialUrl เป็น optional ต่อใบ - badge ชุดนี้ยังไม่มีลิงก์แยกรายตัว
                    ให้ตรวจสอบผ่านลิงก์โปรไฟล์รวมด้านบนแทน */}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    <ExternalLink size={14} />
                    {t('certificateView')}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

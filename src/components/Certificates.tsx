import { Award, ChevronDown, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../context/useLanguage'
import { useInView } from '../hooks/useInView'
import { certificates, certificatesProfile } from '../data/profile'

// จำนวนใบที่โชว์ตอนแรก ก่อนกดปุ่ม "ดูเพิ่มเติม" - เลือก 6 เพราะพอดีกับ grid 2 คอลัมน์ (3 แถว)
// ไม่ยาวจนต้องเลื่อนเยอะ แต่ก็ไม่สั้นจนดูเหมือนมีของนิดเดียว
const VISIBLE_COUNT = 6

// Section "ใบประกาศนียบัตร" - ถ้า certificates array ใน data/profile.ts ว่างเปล่า
// จะ return null คือ "ไม่ render section นี้เลย" กัน section โล่งๆ ไม่มีเนื้อหาไปโผล่ให้ผู้เข้าชมเห็น
export default function Certificates() {
  const { lang, t } = useLanguage()
  const { ref, inView } = useInView<HTMLDivElement>()
  // ควบคุมว่าจะโชว์ครบทุกใบหรือแค่ VISIBLE_COUNT ใบแรก - ปิดไว้ก่อนตอนเริ่ม (false) กันไม่ให้ section ยาวเทอะทะ
  // ตั้งแต่แรกตอนมีใบเยอะๆ
  const [showAll, setShowAll] = useState(false)

  if (certificates.length === 0) {
    return null
  }

  const visibleCertificates = showAll ? certificates : certificates.slice(0, VISIBLE_COUNT)
  const hiddenCount = certificates.length - VISIBLE_COUNT

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

        {/* แถวกะทัดรัด 2 คอลัมน์ (ไอคอนเล็ก + ชื่อบรรทัดเดียว + วันที่) แทนการ์ดใหญ่เดิม
            เพื่อไม่ให้ section บวมตอนมีใบเยอะๆ พร้อมจำกัดจำนวนที่โชว์แล้วซ่อนที่เหลือไว้หลังปุ่มด้านล่าง */}
        <div className="grid gap-2 sm:grid-cols-2">
          {visibleCertificates.map((cert, index) => {
            const row = (
              <>
                {/* ถ้ามีรูปใบเซอร์จริงก็แสดง ถ้าไม่มีก็ใช้ไอคอนเหรียญรางวัลแทน */}
                {cert.image ? (
                  <img src={cert.image} alt={cert.name[lang]} className="h-8 w-8 shrink-0 rounded-md object-cover" />
                ) : (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-indigo-50 dark:bg-indigo-950">
                    <Award size={15} className="text-indigo-600 dark:text-indigo-400" />
                  </span>
                )}
                {/* min-w-0 ให้ truncate ทำงานได้จริง (ไม่งั้น flex item จะไม่ยอมหดตามข้อความยาวๆ) */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">{cert.name[lang]}</p>
                  <p className="truncate text-xs text-gray-500 dark:text-gray-500">
                    {cert.issuer[lang]} · {cert.date[lang]}
                  </p>
                </div>
                {cert.credentialUrl && (
                  <ExternalLink
                    size={14}
                    className="shrink-0 text-gray-300 transition-colors group-hover:text-indigo-500 dark:text-gray-600 dark:group-hover:text-indigo-400"
                  />
                )}
              </>
            )
            const rowClassName = `group flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2.5 transition-all duration-500 ease-out dark:border-gray-800 dark:bg-gray-900 ${
              cert.credentialUrl ? 'hover:border-indigo-200 hover:bg-indigo-50/60 dark:hover:border-indigo-900 dark:hover:bg-indigo-500/5' : ''
            } ${inView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`
            const rowStyle = { transitionDelay: inView ? `${(index % VISIBLE_COUNT) * 40}ms` : '0ms' }

            // ใบที่มีลิงก์ตรวจสอบ (credentialUrl) ทั้งแถวคลิกได้เลย ไม่ต้องหาปุ่มลิงก์เล็กๆ ข้างใน
            // ใบที่ไม่มีลิงก์ (ยังไม่เคยมีในข้อมูลตอนนี้ แต่เผื่ออนาคต) แสดงเป็น div เฉยๆ กดไม่ได้
            return cert.credentialUrl ? (
              <a
                key={cert.id}
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={rowStyle}
                className={rowClassName}
              >
                {row}
              </a>
            ) : (
              <div key={cert.id} style={rowStyle} className={rowClassName}>
                {row}
              </div>
            )
          })}
        </div>

        {/* ปุ่มขยาย/ย่อ - โชว์เฉพาะตอนมีใบมากกว่า VISIBLE_COUNT เท่านั้น */}
        {certificates.length > VISIBLE_COUNT && (
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            className="mt-4 flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            {showAll ? t('showLess') : `${t('showMore')} (+${hiddenCount})`}
            <ChevronDown size={16} className={`transition-transform duration-200 ${showAll ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>
    </section>
  )
}

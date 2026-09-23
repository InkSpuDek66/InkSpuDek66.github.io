import { Mail, MapPin, Phone } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useLanguage } from '../context/useLanguage'
import { personal, resumeFile } from '../data/profile'

// Section สุดท้าย "ติดต่อ / Resume" - มีปุ่มดาวน์โหลด Resume เด่นๆ ด้านบน
// ตามด้วยรายการช่องทางติดต่อทั้งหมด (แต่ละอันมีไอคอนกำกับแทนคำว่า "Email:"/"Tel:" แบบเดิม)
export default function Contact() {
  const { lang, t } = useLanguage()

  // รวมลิงก์ติดต่อทั้งหมดไว้เป็น array เดียว จับคู่ label/href/icon ของแต่ละช่องทาง
  // ทำแบบนี้แทนการเขียน <a> ซ้ำ 4 รอบ เพื่อลดโค้ดซ้ำซ้อน (DRY)
  const links = [
    { label: 'GitHub', href: personal.github, icon: FaGithub },
    { label: 'LinkedIn', href: personal.linkedin, icon: FaLinkedin },
    { label: personal.email, href: `mailto:${personal.email}`, icon: Mail },
    { label: personal.phone, href: `tel:${personal.phone.replace(/-/g, '')}`, icon: Phone },
  ]

  return (
    <section id="contact" className="border-t border-gray-100 dark:border-gray-900">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {t('contactTitle')}
        </h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">{t('contactSubtitle')}</p>

        <div className="flex flex-wrap items-center gap-4">
          {/* ปุ่มดาวน์โหลด/เปิดดู Resume PDF ตัวจริง (ไฟล์อยู่ใน public/ ดู resumeFile ใน data/profile.ts) */}
          <a
            href={resumeFile}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            {t('contactDownloadCv')}
          </a>
        </div>

        <ul className="mt-8 space-y-3 text-gray-700 dark:text-gray-300">
          {links.map((link) => (
            <li key={link.label} className="flex items-center gap-3">
              {/* link.icon คือ component ไอคอน (FaGithub/FaLinkedin/Mail/Phone) เรียกใช้แบบ <link.icon /> ได้เลย */}
              <link.icon size={18} className="shrink-0 text-gray-400 dark:text-gray-500" />
              <a
                href={link.href}
                // ลิงก์ที่ขึ้นต้นด้วย http (GitHub/LinkedIn) เปิดแท็บใหม่ ส่วน mailto:/tel: เปิดในแท็บเดิม
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="transition-colors hover:text-gray-900 dark:hover:text-gray-100"
              >
                {link.label}
              </a>
            </li>
          ))}
          {/* ที่อยู่ไม่ใช่ลิงก์ เลยแยกเขียนต่างหาก ไม่ได้อยู่ใน links array ด้านบน */}
          <li className="flex items-center gap-3">
            <MapPin size={18} className="shrink-0 text-gray-400 dark:text-gray-500" />
            {personal.location[lang]}
          </li>
        </ul>
      </div>
    </section>
  )
}

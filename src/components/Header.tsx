import { Menu, Moon, Sun, X } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../context/useLanguage'
import { useTheme } from '../context/useTheme'
import { certificates, personal } from '../data/profile'

// แถบบนสุดของเว็บ: logo badge + ชื่อเว็บ, เมนูไปแต่ละ section, ปุ่มสลับภาษา, ปุ่มสลับธีม, ปุ่ม Contact (CTA)
export default function Header() {
  // ดึงค่า/ฟังก์ชันจาก context ทั้งสองตัวมาใช้
  const { lang, toggleLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  // สถานะเปิด/ปิดเมนูมือถือ - เริ่มต้นปิดไว้ก่อน (false) ไม่กินพื้นที่จอตอนโหลดหน้าแรก
  const [mobileOpen, setMobileOpen] = useState(false)

  // รายการเมนู - ใช้ anchor link (#id) กระโดดไปยัง section ที่มี id ตรงกันในหน้าเดียวกัน
  // label ดึงจาก t() เพื่อให้เปลี่ยนภาษาแล้วข้อความเมนูเปลี่ยนตามทันที
  // navCertificates ใส่เฉพาะตอนมีข้อมูลจริงใน certificates array เท่านั้น (section นั้นไม่ render ถ้าไม่มีข้อมูล
  // เลยไม่ควรมีเมนูชี้ไปหา anchor ที่ไม่มีอยู่จริง)
  const navItems: { href: string; label: string }[] = [
    { href: '#about', label: t('navAbout') },
    { href: '#skills', label: t('navSkills') },
    { href: '#education', label: t('navEducation') },
    { href: '#experience', label: t('navExperience') },
    ...(certificates.length > 0 ? [{ href: '#certificates', label: t('navCertificates') }] : []),
    { href: '#projects', label: t('navProjects') },
  ]

  return (
    // sticky top-0 = แถบนี้จะลอยค้างอยู่บนสุดตลอดเวลาที่เลื่อนหน้าจอ (ไม่เลื่อนหายไปกับเนื้อหา)
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur transition-colors duration-300 dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        {/* คลิกแล้วเด้งกลับไปบนสุดของหน้า (section id="top" อยู่ใน Hero.tsx)
            logo badge สี่เหลี่ยมมนใส่ตัวย่อชื่อ (personal.initials) สีเดียวกับ favicon เพื่อความสอดคล้องของแบรนด์ */}
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            {personal.initials}
          </span>
          <span className="text-base font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            {t('siteTitle')}
          </span>
        </a>

        {/* เมนูเวอร์ชันจอใหญ่ - ซ่อนไว้บนจอมือถือ (hidden) แล้วโชว์ตอนจอ >= md ด้วย md:flex */}
        <nav className="hidden gap-8 text-sm text-gray-600 md:flex dark:text-gray-400">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-gray-900 dark:hover:text-gray-100">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          {/* ปุ่มสลับภาษา - โชว์ตัวย่อของภาษาที่ "จะ" สลับไป (ตอนนี้ th อยู่ ก็โชว์ EN ชวนกดสลับเป็น EN) */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
          >
            {lang === 'th' ? 'EN' : 'TH'}
          </button>
          {/* ปุ่มสลับธีม - โชว์ไอคอนพระอาทิตย์ตอนอยู่โหมดมืด (กดแล้วจะสว่าง)
              และไอคอนพระจันทร์ตอนอยู่โหมดสว่าง (กดแล้วจะมืด) */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {/* ปุ่ม Contact - ต่างจากเมนูอื่นตรงที่เป็นปุ่มทึบสี indigo (call-to-action) ไม่ใช่แค่ text link เฉยๆ
              ซ่อนบนจอเล็กมาก (ให้ hamburger ดูแลแทน) โชว์ตั้งแต่จอ sm ขึ้นไป */}
          <a
            href="#contact"
            className="hidden rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 sm:inline-block"
          >
            {t('navContact')}
          </a>
          {/* ปุ่ม hamburger - โชว์เฉพาะจอมือถือ (md:hidden ซ่อนตอนจอใหญ่ เพราะจอใหญ่มีเมนูเต็มอยู่แล้วด้านบน)
              กดแล้วสลับ mobileOpen เปิด/ปิด พร้อมสลับไอคอน Menu <-> X ให้รู้สถานะปัจจุบัน */}
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 md:hidden dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* เมนูมือถือแบบ dropdown - ไม่กินพื้นที่จอเลยตอนปิด (mobileOpen === false ไม่ render อะไรออกมาเลย)
          พอกดเมนูค่อยโผล่ลงมาเป็นแถบใต้ header, กดลิงก์ไหนก็ปิดเมนูอัตโนมัติ (onClick ปิด mobileOpen)
          รวม Contact ไว้ในนี้ด้วยสำหรับจอที่แคบมากจนปุ่ม Contact หลักถูกซ่อน (ต่ำกว่า sm) */}
      {mobileOpen && (
        <nav className="flex flex-col gap-0.5 border-t border-gray-200 px-4 py-3 text-sm text-gray-600 md:hidden dark:border-gray-800 dark:text-gray-400">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2.5 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="rounded-md px-3 py-2.5 font-medium text-indigo-600 transition-colors hover:bg-gray-100 dark:text-indigo-400 dark:hover:bg-gray-800"
          >
            {t('navContact')}
          </a>
        </nav>
      )}
    </header>
  )
}

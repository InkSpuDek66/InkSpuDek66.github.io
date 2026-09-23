import { useLanguage } from '../context/useLanguage'
import { personal } from '../data/profile'

// แถบล่างสุดของหน้าเว็บ - แสดงแค่บรรทัดลิขสิทธิ์ ปีจะอัปเดตเองทุกปีเพราะดึงจาก new Date() สดๆ
export default function Footer() {
  const { lang, t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <p className="text-center text-sm text-gray-400 dark:text-gray-600">
          Copyright © {year} {personal.name[lang]} {t('footerRights')}
        </p>
      </div>
    </footer>
  )
}

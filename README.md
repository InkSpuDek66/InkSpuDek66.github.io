# Portfolio - Saphondanai Chueachan

เว็บไซต์ portfolio ส่วนตัวของ สพณดณัย เชื้อชาญ นักศึกษาสาขาวิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์ มหาวิทยาลัยศรีปทุม
พัฒนาด้วย React, TypeScript, Vite และ Tailwind CSS

เว็บไซต์จริง: https://inkspudek66.github.io

## จุดเด่นของเว็บ

- **สองภาษา (ไทย/อังกฤษ)** — สลับได้ทุก section ผ่านปุ่มในเมนู จำภาษาที่เลือกไว้ใน `localStorage`
- **โหมดสว่าง/มืด** — สลับได้จากปุ่มในเมนู จำธีมที่เลือกไว้ใน `localStorage` เช่นกัน
- **ดีไซน์แบบมินิมอล** แนว Notion/Linear เน้น whitespace, เส้นบางๆ, สีเน้น indigo ใช้เฉพาะจุดสำคัญ
- **โครงสร้างเนื้อหาที่ HR อ่านง่าย** — Hero, แนะนำตัว, ทักษะ, การศึกษา (พร้อมโลโก้สถานศึกษา + GPAX), ประสบการณ์, ใบเซอร์/เกียรติบัตร (ดึงจาก Microsoft Learn จริง), ผลงาน (มี 1 โปรเจกต์เด่นที่แจกแจง Problem/Solution/Role/Tech/Outcome ครบ), และช่องทางติดต่อพร้อมปุ่มดาวน์โหลด Resume

## เทคโนโลยีที่ใช้

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) เป็นเครื่องมือ build
- [Tailwind CSS](https://tailwindcss.com/) (ผ่าน `@tailwindcss/vite`) สำหรับจัดสไตล์
- React Context สำหรับ state ธีมและภาษา (ไม่ต้องพึ่ง state management library จากภายนอก)

## โครงสร้างโปรเจกต์

```
src/
  components/       # component แยกทีละ section (Header, Hero, About, Skills, Education, Experience, Certificates, Projects, Contact, Footer)
  context/          # ThemeContext / LanguageContext และ hook ของแต่ละตัว
  data/             # profile.ts (เนื้อหา resume จริง) และ translations.ts (ข้อความ UI ทั้งสองภาษา)
  hooks/            # useAge (คำนวณอายุสดจากวันเกิด อัปเดตเองทุกวัน)
  assets/           # รูปโปรไฟล์ + โลโก้สถานศึกษา
public/
  resume-saphondanai-chueachan.pdf   # ไฟล์ Resume จริงที่ปุ่มดาวน์โหลดชี้ไปหา
old/                # เว็บเวอร์ชันเก่า (HTML/CSS/JS ธรรมดา) เก็บไว้อ้างอิงเฉยๆ ไม่ได้ใช้งานจริงแล้ว
```

เนื้อหาทั้งหมดอยู่ใน `src/data/profile.ts` (ข้อมูล resume) และ `src/data/translations.ts` (ข้อความ UI เช่น หัวข้อ/ปุ่ม)
component ไม่มีการ hardcode ข้อความไว้เลย — ถ้าจะแก้เนื้อหา (ทักษะ, โปรเจกต์, ประสบการณ์, ช่องทางติดต่อ, ใบเซอร์ ฯลฯ) แก้ที่ `profile.ts` ไฟล์เดียวพอ

## เริ่มต้นใช้งาน

```bash
npm install
npm run dev       # เปิด dev server
npm run build     # type-check แล้ว build สำหรับ production
npm run lint      # รัน ESLint
npm run preview   # เปิดดูตัว production build บนเครื่อง
```

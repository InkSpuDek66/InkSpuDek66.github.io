// ไฟล์นี้คือ "คลังข้อมูล" ของเว็บทั้งหมด (ข้อมูลจาก resume ตัวจริง)
// component ทุกตัวใน src/components/ จะ import ค่าจากไฟล์นี้ไปแสดงผล
// ไม่มี component ไหน hardcode ข้อความ resume ไว้ในตัวเอง - ถ้าจะแก้เนื้อหา (เพิ่มโปรเจกต์,
// แก้ทักษะ, เปลี่ยนอีเมล ฯลฯ) แก้ที่ไฟล์นี้ไฟล์เดียวพอ

import highSchoolLogo from '../assets/logo_CW.jpg'
import spuLogo from '../assets/new_logo_spu01.png'

// รูปแบบข้อความ 2 ภาษา ใช้ทุกที่ที่มีข้อความยาวๆ ที่ต้องแปล (ต่างจาก UI label ที่อยู่ใน translations.ts)
export interface Bilingual {
  th: string
  en: string
}

// ข้อมูลส่วนตัว + ช่องทางติดต่อ - ใช้ใน Header, Hero, About, Contact
export const personal = {
  name: { th: 'สพณดณัย เชื้อชาญ', en: 'Saphondanai Chueachan' } satisfies Bilingual,
  initials: 'SC', // ตัวย่อชื่อ ใช้ทำ logo badge ใน Header และ favicon
  nickname: { th: 'อิง', en: 'Ink' } satisfies Bilingual,
  headline: { th: 'Full-Stack Developer', en: 'Full-Stack Developer' } satisfies Bilingual,
  birthDate: '2005-02-18', // ใช้คำนวณอายุแบบสดๆ ผ่าน hooks/useAge.ts (ดูใน About.tsx)
  intro: {
    th: 'นักศึกษาชั้นปีที่ 4 สาขาวิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์ มหาวิทยาลัยศรีปทุม มีประสบการณ์พัฒนาเว็บแอปพลิเคชันฟูลสแตกทั้งฝั่ง Node.js/React และ ASP.NET Core จากโปรเจกต์กลุ่มและงานเรียนหลายรูปแบบ เคยทำหน้าที่ผู้ช่วยสอนให้กับคณะ ทำงานร่วมกับผู้อื่นได้ดีและอธิบายเรื่องทางเทคนิคให้เข้าใจง่าย',
    en: "4th-year Computer Science and Software Development Innovation student at Sripatum University, with hands-on experience building full-stack web applications on both Node.js/React and ASP.NET Core across group projects and coursework. Previously worked as a faculty teaching assistant, collaborates well with others, and explains technical topics clearly.",
  } satisfies Bilingual,
  location: { th: 'กรุงเทพมหานคร ประเทศไทย', en: 'Bangkok, Thailand' } satisfies Bilingual,
  email: 'saphondanai.chueachan@gmail.com',
  phone: '094-251-0936',
  github: 'https://github.com/InkSpuDek66',
  linkedin: 'https://www.linkedin.com/in/saphondanai-chueachan',
  portfolio: 'https://inkspudek66.github.io',
}

// ข้อมูลการศึกษา 1 ระดับ (มัธยม/มหาวิทยาลัย ฯลฯ) - แสดงเป็นการ์ดใน Education.tsx
export interface EducationItem {
  id: string
  name: Bilingual // ชื่อสถานศึกษา
  program: Bilingual // สาขา/แผนการเรียน
  period: Bilingual // ช่วงเวลาเรียน หรือปีที่จบ
  expectedGraduation?: Bilingual // ใส่เฉพาะสถานศึกษาที่ยังเรียนอยู่ (ใช้โชว์ในกล่อง "ข้อมูลทั่วไป" ของ About.tsx ด้วย)
  gpa?: string // เกรดเฉลี่ยสะสม (GPAX) - ใส่เฉพาะที่มีข้อมูลจริง ไม่ fabricate ตัวเลข
  logo?: string // path โลโก้สถานศึกษา (ถ้ามีไฟล์จริง)
  abbreviation?: string // ตัวย่อสำหรับทำ badge สำรองตอนไม่มีไฟล์โลโก้ เช่น 'SPU'
}

// ประวัติการศึกษาทั้งหมด เรียงจากล่าสุดไปเก่าสุด - Education.tsx จะ .map() แสดงเป็นการ์ดเรียงกันตามลำดับนี้ตรงๆ
export const educationHistory: EducationItem[] = [
  {
    id: 'spu',
    name: { th: 'มหาวิทยาลัยศรีปทุม', en: 'Sripatum University' },
    program: {
      th: 'ปริญญาตรี คณะเทคโนโลยีสารสนเทศ สาขาวิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์',
      en: 'B.Sc. in Computer Science and Software Development Innovation, Faculty of Information Technology',
    },
    period: { th: '2566 - ปัจจุบัน (ชั้นปีที่ 4)', en: '2023 - Present (Year 4)' },
    expectedGraduation: { th: 'พ.ศ. 2570', en: '2027' },
    gpa: '3.74',
    logo: spuLogo,
    abbreviation: 'SPU',
  },
  {
    id: 'high-school',
    name: { th: 'โรงเรียนชัยบาดาลวิทยา', en: 'Chaibadanwittaya School' },
    program: { th: 'มัธยมศึกษาตอนปลาย', en: 'High School' },
    period: { th: 'สำเร็จการศึกษา พ.ศ. 2566', en: 'Graduated 2023' },
    logo: highSchoolLogo,
  },
]

// สถานศึกษาปัจจุบัน - ใช้ในกล่อง "ข้อมูลทั่วไป" ของ About.tsx (หาโดยอ้าง id ตรงๆ กันพัง
// ถ้ามีคนสลับลำดับ educationHistory ทีหลัง)
export const currentEducation = educationHistory.find((item) => item.id === 'spu')!

// เนื้อหา section "แนะนำตัว" (About.tsx): สายงานที่อยากทำ, จุดแข็ง
// (ไม่มี "สิ่งที่สนใจ" ในนี้แล้ว - ย้ายไปเป็น "งานอดิเรก" แยกก้อนอยู่ใน Experience.tsx แทน
// เพื่อไม่ให้ปนกับเนื้อหาที่เกี่ยวกับสายอาชีพโดยตรง)
export const about = {
  career: {
    th: 'อยากเติบโตในสายงาน Full-Stack Developer ที่ได้ลงมือพัฒนาโปรแกรมตั้งแต่ต้นจนจบ ทั้งฝั่ง Frontend ด้วย React และฝั่ง Backend ด้วย Node.js หรือ ASP.NET Core โดยเฉพาะงานที่ได้แก้ปัญหาจริงให้ผู้ใช้งาน และได้ทำงานร่วมกับทีมที่ใส่ใจคุณภาพของซอฟต์แวร์',
    en: 'Looking to grow as a Full-Stack Developer, building software end-to-end — from the frontend with React to the backend with Node.js or ASP.NET Core — ideally solving real problems for real users, alongside a team that cares about software quality.',
  } satisfies Bilingual,
  // เป็น array เพราะจุดแข็งมีได้หลายข้อ - About.tsx จะ .map() แสดงเป็น bullet list
  strengths: [
    {
      th: 'ทำงานร่วมกันเป็นทีมและการสื่อสาร',
      en: 'Teamwork and communication',
    },
    {
      th: 'การเรียนรู้อย่างต่อเนื่องและความสามารถในการปรับตัว',
      en: 'Continuous learning and adaptability',
    },
  ] satisfies Bilingual[],
}

// 1 หมวดทักษะ = 1 หัวข้อ (เช่น "Front-end") + รายการเทคโนโลยีในหมวดนั้น
// item แต่ละตัวเป็นได้ทั้ง string ธรรมดา (ชื่อเทคโนโลยีที่เหมือนกันทั้งสองภาษา เช่น React, MySQL)
// หรือ Bilingual (สำหรับรายการที่ต้องแปล เช่น หมวดภาษา ที่ต้องมีข้อความคนละแบบระหว่างไทย/อังกฤษ)
export interface SkillGroup {
  title: Bilingual
  items: (string | Bilingual)[]
}

// ทักษะทั้งหมด แบ่งเป็น 6 หมวด - Skills.tsx จะ .map() วนแสดงทีละหมวด พร้อมจับคู่ไอคอนตาม title.en
export const skillGroups: SkillGroup[] = [
  {
    title: { th: 'Front-end', en: 'Front-end' },
    items: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    title: { th: 'Back-end', en: 'Back-end' },
    items: ['Node.js', 'Express.js', 'ASP.NET Core (C#)', 'RESTful API'],
  },
  {
    title: { th: 'ฐานข้อมูล', en: 'Databases' },
    items: ['MySQL', 'Microsoft SQL Server', 'MongoDB'],
  },
  {
    title: { th: 'เครื่องมือ', en: 'Tools' },
    items: ['Git / GitHub', 'Docker', 'Postman', 'Figma'],
  },
  {
    title: { th: 'การทดสอบซอฟต์แวร์', en: 'Testing' },
    items: ['Mocha', 'Chai', 'Supertest'],
  },
  {
    title: { th: 'ภาษา', en: 'Languages' },
    items: [
      { th: 'ภาษาไทย (ภาษาแม่)', en: 'Thai (Native)' },
      { th: 'ภาษาอังกฤษ (สื่อสารได้ในงานเทคนิค)', en: 'English (Technical Communication)' },
    ],
  },
]

// โครงสร้างข้อมูล 1 โปรเจกต์ - หลายฟิลด์เป็น optional (มี ? ต่อท้าย) เพราะไม่ใช่ทุกโปรเจกต์
// จะมีข้อมูลครบทุกด้าน (เช่น โปรเจกต์เล็กๆ อาจมีแค่ description ไม่ต้องมี problem/solution/outcome)
export interface Project {
  id: string // ใช้เป็น React key ตอน .map() ใน Projects.tsx
  featured: boolean // true = ให้ขึ้นเป็นการ์ดเด่นด้านบนสุด พร้อมโครงสร้าง Problem/Solution/Role/Outcome
  name: string
  meta: Bilingual // บรรทัดบอกบริบท เช่น "งานเดี่ยว | วิชา CSI403 ..."
  problem?: Bilingual
  solution?: Bilingual
  role?: Bilingual
  description?: Bilingual // ใช้แทน problem/solution/role สำหรับโปรเจกต์ที่ไม่ได้เป็น featured
  outcome?: Bilingual
  tech: string[]
  github?: string
  demo?: string
  // path รูปภาพ/สกรีนช็อตของโปรเจกต์ (เตรียมฟิลด์ไว้ก่อน ยังไม่มีข้อมูลจริง)
  // วิธีใช้ทีหลัง: เอารูปไปวางไว้ที่ src/assets/projects/ แล้วเพิ่ม
  //   import smartCafeShot from '../assets/projects/smart-cafe.png'
  // ไว้บนสุดของไฟล์นี้ แล้วใส่ image: smartCafeShot ในโปรเจกต์ที่ต้องการ
  // Projects.tsx จะแสดงรูปให้อัตโนมัติทันทีที่มีค่านี้ ไม่ต้องแก้โค้ด component เพิ่ม
  image?: string
}

// รายการโปรเจกต์ทั้งหมด เรียงจากล่าสุดไปเก่าสุด - Projects.tsx แสดงตามลำดับนี้ตรงๆ
// (featured: true แค่ทำให้ขึ้น badge สีเด่น ไม่ได้เปลี่ยนลำดับการแสดงผล)
export const projects: Project[] = [
  {
    id: 'smart-cafe',
    featured: true, // โปรเจกต์เด่น: งานเดี่ยวที่ทำครบวงจรที่สุด เลยเลือกมาเป็นตัวโชว์หลัก
    name: 'Smart Cafe Management System',
    meta: {
      th: 'งานเดี่ยว | วิชา CSI403 การพัฒนาโปรแกรมแบบฟูลสแตก ปีที่ 3 เทอม 2/2568',
      en: 'Solo project | CSI403 Full-Stack Development, Year 3, Semester 2/2025',
    },
    problem: {
      th: 'ร้านกาแฟต้องการระบบสั่งอาหารที่ลดคิวหน้าเคาน์เตอร์ พร้อมระบบสมาชิกและการจัดการหลังบ้านที่ครบวงจร',
      en: 'A cafe needed an ordering system that reduces counter queues, along with a full membership and back-office management system.',
    },
    solution: {
      th: 'ออกแบบและพัฒนาระบบสั่งอาหารผ่าน QR Code สำหรับลูกค้าและสมาชิก พร้อมระบบคิวและจอแสดงผลสำหรับบาริสต้า (Kitchen Display System) ระบบตรวจสอบสลิปการชำระเงิน ระบบสต็อกวัตถุดิบ และระบบสะสมแต้ม/แสตมป์สำหรับสมาชิก',
      en: 'Designed and built a QR-code ordering system for customers and members, with a queue system and Kitchen Display System (KDS) for baristas, payment-slip verification, an ingredient stock system, and a points/stamp loyalty system for members.',
    },
    role: {
      th: 'รับผิดชอบทั้งโปรเจกต์คนเดียว ตั้งแต่ออกแบบฐานข้อมูล 23 ตาราง (พร้อม ER Diagram, State Diagram, Use Case Diagram) ไปจนถึงพัฒนา Backend, Frontend และระบบเรียลไทม์',
      en: 'Owned the entire project solo, from designing a 23-table database (with ER, State, and Use Case diagrams) to building the backend, frontend, and realtime features.',
    },
    outcome: {
      th: 'ได้ฝึกออกแบบฐานข้อมูลขนาดใหญ่และระบบที่ต้องอัปเดตสถานะแบบเรียลไทม์ด้วย SignalR รวมถึงการจัดการ authentication แบบ session-based ตั้งแต่ต้นจนจบด้วยตัวเอง',
      en: 'Gained hands-on experience designing a large relational database and building realtime status updates with SignalR, plus implementing session-based authentication end to end on my own.',
    },
    tech: ['ASP.NET Core (C#)', 'MySQL', 'SignalR', 'Session Auth'],
    github: 'https://github.com/InkSpuDek66/smart-cafe-management.git',
  },
  {
    id: 'complaint-system',
    featured: false,
    name: 'University Complaint Reporting System',
    meta: {
      th: 'งานกลุ่ม 3 คน | วิชา CSI400 เว็บเซอร์วิส ปีที่ 3 เทอม 1/2568',
      en: 'Group project (3 members) | CSI400 Web Services, Year 3, Semester 1/2025',
    },
    description: {
      th: 'ระบบรับเรื่องร้องเรียนในสถาบันอุดมศึกษา รองรับการอัปโหลดรูปภาพ การจัดการสถานะ (รอดำเนินการ → กำลังดำเนินการ → เสร็จสิ้น/ยกเลิก) การแสดงความเห็นและประวัติการเปลี่ยนสถานะ พร้อมระบบค้นหาและกรองข้อมูล',
      en: 'A complaint-reporting system for higher-education institutions, supporting image uploads, status workflow (pending → in progress → done/cancelled), comments and status history, plus search and filtering.',
    },
    role: {
      th: 'รับผิดชอบโมดูลรับเรื่องร้องเรียน ฟังก์ชัน CRUD ระบบอัปโหลดรูปภาพ และการจัดการสถานะ รวมถึงเขียน automated test ด้วย Mocha/Chai',
      en: 'Owned the complaint-intake module: CRUD functionality, image upload, and status management, plus wrote automated tests with Mocha/Chai.',
    },
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    github: 'https://github.com/InkSpuDek66/MyUsafe-ReportProject.git',
  },
  {
    id: 'csi205-frontend',
    featured: false,
    name: 'CSI205: Frontend Development Coursework',
    meta: {
      th: 'วิชา CSI205 การพัฒนาโปรแกรมส่วนหน้า',
      en: 'CSI205 Frontend Development coursework',
    },
    description: {
      th: 'ชุดโปรเจกต์ฝึกฝนการพัฒนาโปรแกรมส่วนหน้าจากรายวิชา CSI205',
      en: 'A set of frontend-development practice projects from the CSI205 coursework.',
    },
    tech: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://inkspudek66.github.io/_mutipages', // โปรเจกต์นี้ไม่มี GitHub แยก มีแต่หน้า demo
  },
]

// 1 ตำแหน่งงาน/ประสบการณ์ = ชื่อตำแหน่ง + องค์กร + ช่วงเวลา + รายการหน้าที่ (bullets)
export interface ExperienceItem {
  title: Bilingual
  org: Bilingual
  period: Bilingual
  bullets: Bilingual[]
}

// ประวัติการทำงาน - Experience.tsx จะ .map() วนแสดงต่อจากบล็อกการศึกษา
// ตอนนี้มีแค่ตำแหน่งเดียว (TA) แต่เขียนเป็น array ไว้เผื่ออนาคตมีเพิ่ม ไม่ต้องแก้โครงสร้าง component
export const experience: ExperienceItem[] = [
  {
    title: { th: 'ผู้ช่วยสอน (Teaching Assistant)', en: 'Teaching Assistant' },
    org: { th: 'คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม', en: 'Faculty of Information Technology, Sripatum University' },
    period: { th: 'ก.ย. 2568 – เม.ย. 2569', en: 'Sep 2025 – Apr 2026' },
    bullets: [
      {
        th: 'ผู้ช่วยสอนวิชา CSI101 การโปรแกรมดิจิทัล และ CSI205 การพัฒนาโปรแกรมส่วนหน้า (เทอม 1/2568) และวิชา CSI401 การพัฒนาโปรแกรมส่วนหลัง (เทอม 2/2568)',
        en: 'TA for CSI101 Digital Programming and CSI205 Frontend Development (Semester 1/2025), and CSI401 Backend Development (Semester 2/2025)',
      },
      {
        th: 'ช่วยเหลืออาจารย์ผู้สอนในการดูแลห้องปฏิบัติการและตอบคำถามเชิงเทคนิคแก่นักศึกษากว่า 40 คน ในแต่ละรายวิชา',
        en: 'Supported the instructor by managing the lab and answering technical questions for 40+ students per course',
      },
      {
        th: 'ทำ Code Review และให้คำปรึกษาการแก้ไข Bug ฝั่ง Frontend (React) และ Backend (Node.js) แก่นักศึกษาเป็นรายบุคคล',
        en: 'Performed code reviews and gave one-on-one debugging guidance on Frontend (React) and Backend (Node.js) issues',
      },
    ],
  },
]

// กิจกรรม (ชมรม/ค่าย ฯลฯ) และงานอดิเรก - แยกกันคนละก้อนตามที่ต้องการ
// ทั้งคู่แสดงเป็นบล็อกแยกกันใน Experience.tsx ต่อจากบล็อกประสบการณ์ทำงาน
export const activities = {
  club: {
    th: 'สมาชิกชมรม Software Developer Club มหาวิทยาลัยศรีปทุม (พ.ศ. 2566 – ปัจจุบัน) เคยทำหน้าที่ทีมงานในงาน SPU Coding Bootcamp 2025',
    en: 'Member of the Software Developer Club, Sripatum University (2023 – present); worked as staff for SPU Coding Bootcamp 2025',
  } satisfies Bilingual,
}

// งานอดิเรก - ย้ายมาจาก about.interests เดิม เพื่อแยกออกจากเนื้อหาสายอาชีพใน About.tsx ให้ชัดเจน
export const hobbies = {
  th: 'ชิมอาหารร้านใหม่ๆ และทำอาหารในเวลาว่าง ปั่นจักรยานเป็นประจำ ติดตามสื่อบันเทิงประเภทอนิเมะและมังงะ และติดตามเทคโนโลยีใหม่ๆ ในวงการพัฒนาซอฟต์แวร์',
  en: 'Trying out new restaurants and cooking in free time, cycling regularly, following anime/manga, and keeping up with new technology in the software development world.',
} satisfies Bilingual

// path ของไฟล์ Resume PDF ตัวจริง (วางไว้ใน public/ - Vite จะเสิร์ฟไฟล์ใน public/ ที่ path root ตรงๆ)
// ใช้ในปุ่ม "ดาวน์โหลด Resume" ทั้งใน Hero.tsx และ Contact.tsx
export const resumeFile = '/resume-saphondanai-chueachan.pdf'

// โครงสร้างข้อมูล 1 ใบเซอร์ติฟิเคต/เกียรติบัตร
export interface Certificate {
  id: string
  name: Bilingual // ชื่อใบเซอร์/เกียรติบัตร
  issuer: Bilingual // หน่วยงานที่ออกให้
  date: Bilingual // เดือน-ปีที่ได้รับ (เก็บเป็น Bilingual เผื่ออยากเขียนรูปแบบวันที่ต่างกันระหว่างไทย/อังกฤษ)
  credentialUrl?: string // ลิงก์ตรวจสอบใบเซอร์ (ถ้ามี เช่นจาก Coursera/Microsoft)
  image?: string // path รูปใบเซอร์ (ถ้าอยากโชว์ภาพ)
}

// Badge จาก Microsoft Learn - ชื่อโมดูลเป็นชื่อทางการภาษาอังกฤษ เลยใช้ข้อความเดียวกันทั้ง th/en
// (แปลชื่อคอร์สเป็นไทยเองอาจคลาดเคลื่อนจากชื่อทางการ) เรียงจากล่าสุดไปเก่าสุดตามวันที่ทำสำเร็จ
// credentialUrl แต่ละใบเป็นลิงก์ share ตัวจริงจากหน้า achievement ของ Microsoft Learn
export const certificates: Certificate[] = [
  {
    id: 'ms-learn-fusion-development-teams',
    name: { th: 'Transform business software authoring with fusion development teams', en: 'Transform business software authoring with fusion development teams' },
    issuer: { th: 'Microsoft Learn', en: 'Microsoft Learn' },
    date: { th: 'ก.ย. 2569', en: 'Sep 2026' },
    credentialUrl: 'https://learn.microsoft.com/api/achievements/share/en-us/MrSAPHONDANAICHUEACHAN-3029/4LP32RVK?sharingId=8C2B9564903662D',
  },
  {
    id: 'ms-learn-intro-machine-learning',
    name: { th: 'Introduction to machine learning concepts', en: 'Introduction to machine learning concepts' },
    issuer: { th: 'Microsoft Learn', en: 'Microsoft Learn' },
    date: { th: 'ก.ย. 2569', en: 'Sep 2026' },
    credentialUrl: 'https://learn.microsoft.com/api/achievements/share/en-us/MrSAPHONDANAICHUEACHAN-3029/H2SPYD98?sharingId=8C2B9564903662D',
  },
  {
    id: 'ms-learn-publish-api-azure-static-web-apps',
    name: { th: 'Publish an API to Azure Static Web Apps', en: 'Publish an API to Azure Static Web Apps' },
    issuer: { th: 'Microsoft Learn', en: 'Microsoft Learn' },
    date: { th: 'มี.ค. 2568', en: 'Mar 2025' },
    credentialUrl: 'https://learn.microsoft.com/api/achievements/share/en-us/MrSAPHONDANAICHUEACHAN-3029/BCJYF7MD?sharingId=8C2B9564903662D',
  },
  {
    id: 'ms-learn-publish-js-app-azure-static-web-apps',
    name: { th: 'Publish an Angular, React, Svelte, or Vue JavaScript app with Azure Static Web Apps', en: 'Publish an Angular, React, Svelte, or Vue JavaScript app with Azure Static Web Apps' },
    issuer: { th: 'Microsoft Learn', en: 'Microsoft Learn' },
    date: { th: 'มี.ค. 2568', en: 'Mar 2025' },
    credentialUrl: 'https://learn.microsoft.com/api/achievements/share/en-us/MrSAPHONDANAICHUEACHAN-3029/4GBFH52K?sharingId=8C2B9564903662D',
  },
  {
    id: 'ms-learn-integrate-openapi-apim-visual-studio',
    name: { th: 'Integrate OpenAPI-enabled Web APIs with Azure API Management through Visual Studio', en: 'Integrate OpenAPI-enabled Web APIs with Azure API Management through Visual Studio' },
    issuer: { th: 'Microsoft Learn', en: 'Microsoft Learn' },
    date: { th: 'มี.ค. 2568', en: 'Mar 2025' },
    credentialUrl: 'https://learn.microsoft.com/api/achievements/share/en-us/MrSAPHONDANAICHUEACHAN-3029/BCJT4NZD?sharingId=8C2B9564903662D',
  },
  {
    id: 'ms-learn-discover-web-apis-power-apps',
    name: { th: 'Discover and use Web APIs with Power Apps', en: 'Discover and use Web APIs with Power Apps' },
    issuer: { th: 'Microsoft Learn', en: 'Microsoft Learn' },
    date: { th: 'มี.ค. 2568', en: 'Mar 2025' },
    credentialUrl: 'https://learn.microsoft.com/api/achievements/share/en-us/MrSAPHONDANAICHUEACHAN-3029/URHWN8L3?sharingId=8C2B9564903662D',
  },
  {
    id: 'ms-learn-build-power-apps-component',
    name: { th: 'Build a Power Apps component', en: 'Build a Power Apps component' },
    issuer: { th: 'Microsoft Learn', en: 'Microsoft Learn' },
    date: { th: 'มี.ค. 2568', en: 'Mar 2025' },
    credentialUrl: 'https://learn.microsoft.com/api/achievements/share/en-us/MrSAPHONDANAICHUEACHAN-3029/2DMMQCRV?sharingId=8C2B9564903662D',
  },
  {
    id: 'ms-learn-low-code-traditional-developer',
    name: { th: 'Understanding Low Code as a Traditional Developer', en: 'Understanding Low Code as a Traditional Developer' },
    issuer: { th: 'Microsoft Learn', en: 'Microsoft Learn' },
    date: { th: 'มี.ค. 2568', en: 'Mar 2025' },
    credentialUrl: 'https://learn.microsoft.com/api/achievements/share/en-us/MrSAPHONDANAICHUEACHAN-3029/9Y333C9U?sharingId=8C2B9564903662D',
  },
  {
    id: 'ms-learn-react-state-events',
    name: { th: 'React state and events', en: 'React state and events' },
    issuer: { th: 'Microsoft Learn', en: 'Microsoft Learn' },
    date: { th: 'มี.ค. 2568', en: 'Mar 2025' },
    credentialUrl: 'https://learn.microsoft.com/api/achievements/share/en-us/MrSAPHONDANAICHUEACHAN-3029/WZ8P62EN?sharingId=8C2B9564903662D',
  },
  {
    id: 'ms-learn-react-data-properties',
    name: { th: 'Working with data and properties in React components', en: 'Working with data and properties in React components' },
    issuer: { th: 'Microsoft Learn', en: 'Microsoft Learn' },
    date: { th: 'มี.ค. 2568', en: 'Mar 2025' },
    credentialUrl: 'https://learn.microsoft.com/api/achievements/share/en-us/MrSAPHONDANAICHUEACHAN-3029/QTMCY73E?sharingId=8C2B9564903662D',
  },
  {
    id: 'ms-learn-get-started-react',
    name: { th: 'Get started with React', en: 'Get started with React' },
    issuer: { th: 'Microsoft Learn', en: 'Microsoft Learn' },
    date: { th: 'มี.ค. 2568', en: 'Mar 2025' },
    credentialUrl: 'https://learn.microsoft.com/api/achievements/share/en-us/MrSAPHONDANAICHUEACHAN-3029/3RUMJXDH?sharingId=8C2B9564903662D',
  },
]

// ลิงก์ไปหน้าโปรไฟล์ Microsoft Learn ตัวจริง (แสดงเป็นลิงก์เดียวมุมบนของ section Certificates)
// เสริมจาก credentialUrl รายใบด้านบน - อันนี้ไว้ดู badge ทั้งหมดพร้อมกันในที่เดียว
export const certificatesProfile = {
  label: { th: 'ดูโปรไฟล์ Microsoft Learn', en: 'Microsoft Learn Profile' } satisfies Bilingual,
  url: 'https://learn.microsoft.com/en-us/users/mrsaphondanaichueachan-3029/achievements',
}

// ไฟล์นี้เก็บ "ข้อความส่วนติดต่อผู้ใช้ (UI)" ที่ไม่ใช่เนื้อหา resume โดยตรง
// เช่น หัวข้อ section, label ปุ่ม, ข้อความคงที่ต่างๆ
// ต่างจาก data/profile.ts ที่เก็บ "เนื้อหา" (ชื่อ, ทักษะ, โปรเจกต์ ฯลฯ)
// แยกสองไฟล์นี้ออกจากกันเพื่อให้แก้ไขง่าย: อยากแก้ถ้อยคำปุ่ม -> มาที่นี่, อยากแก้ข้อมูล resume -> ไปที่ profile.ts

export type Lang = 'th' | 'en'

// object เดียวเก็บคำแปลทั้งสองภาษา โครงสร้างเหมือนกันทุก key แค่ค่าเป็นคนละภาษา
// การใช้งาน: useLanguage().t('navAbout') จะไปหยิบค่าจาก ui[lang]['navAbout']
export const ui = {
  th: {
    // ชื่อเว็บ/โลโก้ข้อความใน Header (เหมือนกันทั้งสองภาษา แต่เก็บไว้ในนี้เพื่อให้แก้ที่เดียวได้)
    siteTitle: 'Portfolio',
    // เมนูใน Header
    navAbout: 'แนะนำตัว',
    navSkills: 'ทักษะ',
    navEducation: 'การศึกษา',
    navExperience: 'ประสบการณ์',
    navCertificates: 'ใบเซอร์',
    navProjects: 'ผลงาน',
    navContact: 'ติดต่อ',
    // ข้อความและปุ่มใน Hero
    heroCtaProjects: 'ดูผลงาน',
    heroCtaCv: 'ดาวน์โหลด Resume',
    heroCtaContact: 'ช่องทางติดต่อ',
    aboutTitle: 'แนะนำตัว',
    aboutCareerTitle: 'สายงานที่อยากทำ',
    aboutStrengthsTitle: 'จุดแข็ง',
    aboutFactsTitle: 'ข้อมูลทั่วไป',
    factAge: 'อายุ',
    factAgeYears: 'ปี',
    factUniversity: 'สถานศึกษา',
    factGrad: 'คาดว่าจะสำเร็จการศึกษา',
    skillsTitle: 'ทักษะความสามารถ',
    educationTitle: 'การศึกษา',
    gpaLabel: 'เกรดเฉลี่ย (GPAX)',
    experienceTitle: 'ประสบการณ์',
    experienceWorkTitle: 'ประสบการณ์ทำงาน',
    activitiesTitle: 'กิจกรรม',
    hobbiesTitle: 'งานอดิเรก',
    // หัวข้อ Certificates (แสดงเฉพาะตอนมีข้อมูลใน certificates array ของ profile.ts)
    certificatesTitle: 'ใบเซอร์ / เกียรติบัตร',
    certificateView: 'ดูใบรับรอง',
    // หัวข้อย่อยใน Projects (การ์ดโปรเจกต์เด่น)
    projectsTitle: 'ผลงานและโปรเจกต์',
    featuredBadge: 'Featured Project',
    projectProblem: 'ปัญหา',
    projectSolution: 'แนวทางแก้ไข',
    projectRole: 'บทบาทของผม',
    projectTech: 'เทคโนโลยี',
    projectOutcome: 'ผลลัพธ์ / สิ่งที่ได้เรียนรู้',
    projectGithub: 'GitHub Repository',
    projectDemo: 'Demo',
    // หัวข้อและปุ่มใน Contact
    contactTitle: 'ติดต่อ / Resume',
    contactSubtitle: 'สนใจร่วมงานหรืออยากพูดคุยกัน ติดต่อผมได้ทางช่องทางด้านล่างนี้',
    contactDownloadCv: 'ดาวน์โหลด / ดู Resume (PDF)',
    // Footer
    footerRights: 'All rights reserved',
  },
  en: {
    siteTitle: 'Portfolio',
    navAbout: 'About',
    navSkills: 'Skills',
    navEducation: 'Education',
    navExperience: 'Experience',
    navCertificates: 'Certificates',
    navProjects: 'Projects',
    navContact: 'Contact',
    heroCtaProjects: 'View Projects',
    heroCtaCv: 'Download Resume',
    heroCtaContact: 'Get in Touch',
    aboutTitle: 'About Me',
    aboutCareerTitle: 'Career Target',
    aboutStrengthsTitle: 'Strengths',
    aboutFactsTitle: 'Quick Facts',
    factAge: 'Age',
    factAgeYears: 'years old',
    factUniversity: 'University',
    factGrad: 'Expected Graduation',
    skillsTitle: 'Skills',
    educationTitle: 'Education',
    gpaLabel: 'GPAX',
    experienceTitle: 'Experience',
    experienceWorkTitle: 'Work Experience',
    activitiesTitle: 'Activities',
    hobbiesTitle: 'Hobbies',
    certificatesTitle: 'Certificates',
    certificateView: 'View Credential',
    projectsTitle: 'Projects',
    featuredBadge: 'Featured Project',
    projectProblem: 'Problem',
    projectSolution: 'Solution',
    projectRole: 'My Role',
    projectTech: 'Tech Stack',
    projectOutcome: 'Outcome / What I Learned',
    projectGithub: 'GitHub Repository',
    projectDemo: 'Demo',
    contactTitle: 'Contact / Resume',
    contactSubtitle: "Interested in working together or just want to chat? Reach out below.",
    contactDownloadCv: 'Download / View Resume (PDF)',
    footerRights: 'All rights reserved',
  },
} as const // as const ล็อกทุกค่าให้เป็น literal type แม่นๆ ไม่ใช่แค่ "string" เฉยๆ

// ดึง type ของ key ทั้งหมดออกมาจากฝั่ง th (เช่น 'navAbout' | 'navSkills' | ...)
// ใช้เป็น type ของ argument ที่ t() รับได้ ป้องกันการพิมพ์ key ผิด (TypeScript จะฟ้องทันทีตอน compile)
export type UiKey = keyof (typeof ui)['th']

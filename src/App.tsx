import About from './components/About'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Education from './components/Education'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'

// Component หลักของเว็บ - หน้าที่เดียวคือ "ประกอบร่าง" section ต่างๆ เรียงกันตามลำดับ
// (Header ลอยด้านบนแบบ sticky, ที่เหลือคือเนื้อหาไล่ลงมาทีละ section)
// ลำดับ section ต้องตรงกับลำดับเมนูใน Header.tsx (navItems) เสมอ
function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100">
      <Header />
      <main className="grow">
        <Hero />         {/* รูป + ชื่อ + headline + ปุ่ม CTA */}
        <About />        {/* แนะนำตัว, career target, จุดแข็ง */}
        <Skills />       {/* ทักษะแบ่งเป็นหมวด */}
        <Education />    {/* ประวัติการศึกษา (ม.ปลาย + มหาวิทยาลัย) พร้อม GPAX */}
        <Experience />   {/* ประสบการณ์ทำงาน + กิจกรรม + งานอดิเรก */}
        <Certificates /> {/* ใบเซอร์/เกียรติบัตร - ไม่ render ถ้ายังไม่มีข้อมูล */}
        <Projects />     {/* ผลงาน/โปรเจกต์ */}
        <Contact />      {/* ช่องทางติดต่อ + ปุ่มดาวน์โหลด Resume */}
      </main>
      <Footer />
    </div>
  )
}

export default App

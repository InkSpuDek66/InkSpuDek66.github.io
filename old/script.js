// ==================== Configuration ====================
const BIRTHDATE = new Date('2005-02-18'); // เปลี่ยนเป็นวันเกิดจริงของคุณ (ปี-เดือน-วัน)

// ==================== Translations ====================
const translations = {
    th: {
        portfolio: 'Portfolio',
        introduce: 'แนะนำตัว',
        name: 'ชื่อ',
        name_me: 'นายสพณดณัย เชื้อชาญ',
        nickname: 'ชื่อเล่น',
        nickname_me: 'อิง',
        age: 'อายุ',
        years: 'ปี',
        university: 'สถานศึกษา',
        university_name: 'มหาวิทยาลัยศรีปทุม',
        faculty: 'คณะ',
        faculty_name: 'เทคโนโลยีสารสนเทศ',
        major: 'สาขา',
        major_name: 'วิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์',
        mywork: 'ผลงาน',
        frontend: 'การพัฒนาโปรแกรมส่วนหน้า',
        contact: 'ติดต่อ'
    },
    en: {
        portfolio: 'Portfolio',
        introduce: 'Introduction',
        name: 'Name',
        name_me: 'Saphondanai Chueachan',
        nickname: 'Nickname',
        nickname_me: 'Ink',
        age: 'Age',
        years: 'years old',
        university: 'University',
        university_name: 'Sripatum University',
        faculty: 'Faculty',
        faculty_name: 'Information Technology',
        major: 'Major',
        major_name: 'Computer Science and Software Development Innovation',
        mywork: 'My Work',
        frontend: 'Frontend Development',
        contact: 'Contact'
    }
};

// ==================== Age Calculator ====================
function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // ถ้ายังไม่ถึงวันเกิดในปีนี้ให้ลบอายุออก 1 ปี
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

function updateAge() {
    const ageElement = document.getElementById('age');
    if (ageElement) {
        const currentAge = calculateAge(BIRTHDATE);
        ageElement.textContent = currentAge;
    }
}

// ==================== Theme Toggle ====================
function initTheme() {
    // ตรวจสอบ theme ที่บันทึกไว้ใน localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

function setTheme(theme) {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    if (theme === 'dark') {
        // Dark mode styles
        body.classList.add('dark-mode');
        body.classList.remove('bg-white', 'text-gray-900');
        body.classList.add('bg-gray-900', 'text-gray-100');
        
        // Update header
        const header = document.querySelector('header');
        header.classList.remove('bg-gray-50', 'border-gray-300');
        header.classList.add('bg-gray-800', 'border-gray-700');
        
        // Update sections
        const sections = document.querySelectorAll('.bg-gray-50');
        sections.forEach(section => {
            section.classList.remove('bg-gray-50', 'border-gray-300');
            section.classList.add('bg-gray-800', 'border-gray-700');
        });
        
        // Update text colors
        const textElements = document.querySelectorAll('.text-gray-800, .text-gray-900');
        textElements.forEach(el => {
            el.classList.remove('text-gray-800', 'text-gray-900');
            el.classList.add('text-gray-100');
        });
        
        // Update borders
        const borders = document.querySelectorAll('.border-gray-300');
        borders.forEach(border => {
            border.classList.remove('border-gray-300');
            border.classList.add('border-gray-700');
        });
        
        // Update buttons
        const buttons = document.querySelectorAll('#themeToggle, #languageToggle');
        buttons.forEach(btn => {
            btn.classList.remove('bg-gray-200', 'hover:bg-gray-300');
            btn.classList.add('bg-gray-700', 'hover:bg-gray-600', 'text-white');
        });
        
        themeToggle.textContent = '☀️';
    } else {
        // Light mode styles
        body.classList.remove('dark-mode');
        body.classList.remove('bg-gray-900', 'text-gray-100');
        body.classList.add('bg-white', 'text-gray-900');
        
        // Update header
        const header = document.querySelector('header');
        header.classList.remove('bg-gray-800', 'border-gray-700');
        header.classList.add('bg-gray-50', 'border-gray-300');
        
        // Update sections
        const sections = document.querySelectorAll('.bg-gray-800');
        sections.forEach(section => {
            section.classList.remove('bg-gray-800', 'border-gray-700');
            section.classList.add('bg-gray-50', 'border-gray-300');
        });
        
        // Update text colors
        const textElements = document.querySelectorAll('.text-gray-100');
        textElements.forEach(el => {
            if (!el.classList.contains('text-gray-400')) {
                el.classList.remove('text-gray-100');
                el.classList.add('text-gray-800');
            }
        });
        
        // Update borders
        const borders = document.querySelectorAll('.border-gray-700');
        borders.forEach(border => {
            border.classList.remove('border-gray-700');
            border.classList.add('border-gray-300');
        });
        
        // Update buttons
        const buttons = document.querySelectorAll('#themeToggle, #languageToggle');
        buttons.forEach(btn => {
            btn.classList.remove('bg-gray-700', 'hover:bg-gray-600', 'text-white');
            btn.classList.add('bg-gray-200', 'hover:bg-gray-300');
        });
        
        themeToggle.textContent = '🌙';
    }
    
    // บันทึก theme ลง localStorage
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// ==================== Language Switcher ====================
function initLanguage() {
    // ตรวจสอบภาษาที่บันทึกไว้ใน localStorage
    const savedLang = localStorage.getItem('language') || 'th';
    setLanguage(savedLang);
}

function setLanguage(lang) {
    const languageToggle = document.getElementById('languageToggle');
    
    // อัพเดตข้อความทั้งหมดที่มี data-lang attribute
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // อัพเดตปุ่มเปลี่ยนภาษา
    languageToggle.textContent = lang === 'th' ? 'EN' : 'TH';
    
    // อัพเดต lang attribute ของ html
    document.documentElement.lang = lang;
    
    // บันทึกภาษาลง localStorage
    localStorage.setItem('language', lang);
}

function toggleLanguage() {
    const currentLang = localStorage.getItem('language') || 'th';
    const newLang = currentLang === 'th' ? 'en' : 'th';
    setLanguage(newLang);
}

// ==================== Event Listeners ====================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize age
    updateAge();
    
    // Initialize theme
    initTheme();
    
    // Initialize language
    initLanguage();
    
    // Theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Language toggle button
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
    }
    
    // อัพเดตอายุทุกๆ วัน (เช็คทุกๆ 1 วัน)
    setInterval(updateAge, 24 * 60 * 60 * 1000); // 24 ชั่วโมง
});

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        <div className="text-xl font-semibold invisible">.</div>
        <button
          className="text-gray-800 text-2xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-white border-t px-4 py-4">
          <ul className="space-y-4 text-gray-800 font-medium text-base">
            <li><a href="#">หน้าแรก</a></li>
            <li><a href="#">โปรไฟล์</a></li>
            <li><a href="#">สมัครสมาชิก</a></li>
            <li><a href="#">เข้าสู่ระบบ</a></li>
          </ul>
        </nav>
        
      )}
      
      <Link to="/">
  <img
    src="/logo project.jpeg"
    alt="Logo"
    className="h-12 sm:h-14 object-contain"
  />
</Link>

    </header>
    
  );
}

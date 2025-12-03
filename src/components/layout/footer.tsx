import Link from "next/link";
import { Building2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Building2 className="h-6 w-6" />
              <span className="text-xl font-bold">TechLeet</span>
            </Link>
            <p className="text-gray-400">
              Công ty công nghệ hàng đầu Việt Nam, chuyên phát triển các giải pháp 
              số hóa doanh nghiệp.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Công ty</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="/culture" className="hover:text-white transition-colors">
                  Văn hóa
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link href="/leadership" className="hover:text-white transition-colors">
                  Ban lãnh đạo
                </Link>
              </li>
            </ul>
          </div>

          {/* Career Links */}
          <div>
            <h3 className="font-semibold mb-4">Nghề nghiệp</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/jobs" className="hover:text-white transition-colors">
                  Việc làm
                </Link>
              </li>
              <li>
                <Link href="/internship" className="hover:text-white transition-colors">
                  Thực tập
                </Link>
              </li>
              <li>
                <Link href="/benefits" className="hover:text-white transition-colors">
                  Phúc lợi
                </Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-white transition-colors">
                  Quy trình tuyển dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a 
                  href="mailto:careers@techleet.com" 
                  className="hover:text-white transition-colors"
                >
                  careers@techleet.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+842838221234" 
                  className="hover:text-white transition-colors"
                >
                  +84-28-3822-1234
                </a>
              </li>
              <li>123 Nguyễn Huệ, Q1, TP.HCM</li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Liên hệ với chúng tôi
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left">
              &copy; 2024 TechLeet. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-6 text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors text-sm">
                Chính sách bảo mật
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors text-sm">
                Điều khoản sử dụng
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors text-sm">
                Chính sách Cookie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

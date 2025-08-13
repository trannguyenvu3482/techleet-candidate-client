import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto text-center px-4">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-gray-200 mb-4">404</div>
          <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <Search className="h-12 w-12 text-blue-600" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Trang không tìm thấy
        </h1>
        <p className="text-gray-600 mb-8">
          Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm. 
          Có thể trang đã được di chuyển hoặc không còn tồn tại.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button asChild size="lg" className="w-full">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Về trang chủ
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="/jobs">
              <Search className="mr-2 h-5 w-5" />
              Tìm việc làm
            </Link>
          </Button>

          
        </div>

        {/* Help Text */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Cần hỗ trợ? Liên hệ với chúng tôi:
          </p>
          <div className="space-y-2 text-sm">
            <p>
              <a 
                href="mailto:careers@techleet.com" 
                className="text-blue-600 hover:text-blue-800"
              >
                careers@techleet.com
              </a>
            </p>
            <p>
              <a 
                href="tel:+842838221234" 
                className="text-blue-600 hover:text-blue-800"
              >
                +84-28-3822-1234
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

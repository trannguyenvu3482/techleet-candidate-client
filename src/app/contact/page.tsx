"use client";

import { Button } from "@/components/ui/button";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
      console.error(error);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Liên hệ với <span className="text-blue-600">chúng tôi</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với
            chúng tôi để được tư vấn về cơ hội nghề nghiệp hoặc bất kỳ câu hỏi
            nào khác.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Thông tin liên hệ
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Địa chỉ văn phòng chính
                    </h3>
                    <p className="text-gray-600">
                      123 Nguyễn Huệ, Phường Bến Nghé
                      <br />
                      Quận 1, TP. Hồ Chí Minh
                      <br />
                      Việt Nam
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Điện thoại
                    </h3>
                    <p className="text-gray-600">
                      Hotline: +84-28-3822-1234
                      <br />
                      HR Department: +84-28-3822-1235
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">
                      Tuyển dụng: careers@techleet.com
                      <br />
                      Hỗ trợ chung: info@techleet.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Giờ làm việc
                    </h3>
                    <p className="text-gray-600">
                      Thứ 2 - Thứ 6: 8:00 - 17:30
                      <br />
                      Thứ 7: 8:00 - 12:00
                      <br />
                      Chủ nhật: Nghỉ
                    </p>
                  </div>
                </div>
              </div>

              {/* Other Offices */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Văn phòng khác
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h4 className="font-medium text-gray-900">Hà Nội</h4>
                    <p className="text-sm text-gray-600">
                      456 Hoàng Diệu, Ba Đình, Hà Nội
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h4 className="font-medium text-gray-900">Đà Nẵng</h4>
                    <p className="text-sm text-gray-600">
                      789 Trần Phú, Hải Châu, Đà Nẵng
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h4 className="font-medium text-gray-900">Cần Thơ</h4>
                    <p className="text-sm text-gray-600">
                      321 Nguyễn Văn Cừ, Ninh Kiều, Cần Thơ
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Gửi tin nhắn cho chúng tôi
              </h2>

              {submitStatus === "success" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-800">
                    Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24
                    giờ.
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800">
                    Có lỗi xảy ra. Vui lòng thử lại sau hoặc liên hệ trực tiếp
                    qua email.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nhập họ và tên của bạn"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0901 234 567"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Chủ đề *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Chọn chủ đề</option>
                      <option value="career">Cơ hội nghề nghiệp</option>
                      <option value="internship">Chương trình thực tập</option>
                      <option value="partnership">Hợp tác kinh doanh</option>
                      <option value="general">Câu hỏi chung</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tin nhắn *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập tin nhắn của bạn..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    "Đang gửi..."
                  ) : (
                    <>
                      Gửi tin nhắn
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Vị trí văn phòng chính
          </h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4326002932!2d106.70204731533414!3d10.776530192318146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3332a4d9%3A0x6d1b4c0b0b0b0b0b!2zMTIzIE5ndXnhu4VuIEh1w6osIELhur9uIE5naOG6vywgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TechLeet Office Location"
            />
          </div>
          <div className="text-center mt-6">
            <p className="text-gray-600 mb-4">
              Văn phòng chính của chúng tôi tọa lạc tại trung tâm Quận 1, TP. Hồ
              Chí Minh
            </p>
            <Button asChild variant="outline">
              <a
                href="https://maps.google.com/?q=123+Nguyen+Hue+Ben+Nghe+District+1+Ho+Chi+Minh+City"
                target="_blank"
                rel="noopener noreferrer"
              >
                Xem trên Google Maps
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const timeSlots = [
  "06:00", "06:15", "06:30", "06:45", "07:00",
  "07:15", "07:30", "07:45", "08:00", "08:15",
  "08:30", "08:45", "09:00", "09:15", "09:30",
  "09:45", "10:00", "10:15", "10:30", "10:45",
  "11:00", "11:15", "11:30", "11:45", "12:00",
  "12:15", "12:30", "12:45", "13:00", "13:15",
  "13:30", "13:45", "14:00", "14:15", "14:30",
  "14:45", "15:00", "15:15", "15:30", "15:45",
  "16:00", "16:15", "16:30", "16:45", "17:00",
  "17:15", "17:30", "17:45", "18:00",
];

const reservedTimes = [
  "06:00", "06:45", "07:00", "07:30", "07:45", "08:00",
  "09:00", "09:15", "09:30", "11:00", "12:15", "14:00",
  "14:45", "15:00", "17:00", "18:00"
];

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-white">
      <Navbar />

      <main className="pt-24">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo project.jpeg"
            alt="Logo"
            className="w-36 sm:w-44 md:w-52"
          />
        </div>

        {/* Hero Section */}
        <div className="relative">
          <img
            src="/backgound.jpg"
            alt="hero"
            className="w-full h-60 object-cover md:h-96"
          />
          <Link
            to="/booking"
            className="absolute bottom-4 right-4 bg-white px-4 py-2 text-sm rounded-full shadow font-medium"
          >
            จองเวลาตอนนี้
          </Link>
        </div>

        {/* Time Slots */}
        <div className="text-center mt-10">
          <h2 className="text-lg font-semibold mb-4">ไทม์ไลน์เวลาวันนี้</h2>
          <div className="max-w-md mx-auto grid grid-cols-5 gap-2 px-4">
            {timeSlots.map((time) => (
              <div
                key={time}
                className={`px-3 py-1 text-sm rounded-full text-white ${
                  reservedTimes.includes(time) ? "bg-red-500" : "bg-green-600"
                }`}
              >
                {time}
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 max-w-md mx-auto my-12 px-4"
        >
          <img
            src="/slide 1.avif"
            alt="golf"
            className="w-full aspect-[3/2] object-cover transform transition-transform duration-500 hover:-translate-y-2 hover:scale-105 rotate-[-3deg]"
          />
          <img
            src="/slide 2.jpg"
            alt="course"
            className="w-11/12 aspect-[3/2] object-cover transform transition-transform duration-500 hover:-translate-y-2 hover:scale-105 rotate-[2deg] mx-auto"
          />
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-12 px-4"
        >
          <h3 className="text-sm uppercase tracking-wider text-gray-600">
            Experience the Perfect Blend
          </h3>
          <p className="italic text-lg mt-1 text-gray-900 font-medium">
            Swing, Savor, and Unwind
          </p>
        </motion.div>

        {/* Bottom Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-12 px-4"
        >
          <img
            src="/slide 3.avif"
            alt="golfer"
            className="w-11/12 aspect-[3/2] object-cover transform transition-transform duration-500 hover:-translate-y-2 hover:scale-105 rotate-[-2deg] mx-auto"
          />
          <img
            src="/slide 4.avif"
            alt="relax"
            className="w-full aspect-[3/2] object-cover transform transition-transform duration-500 hover:-translate-y-2 hover:scale-105 rotate-[3deg]"
          />
        </motion.div>

        {/* Golf Course Menu */}
        <div className="max-w-4xl mx-auto mb-20 px-4">
          <details className="border rounded-xl p-4 shadow-md cursor-pointer">
            <summary className="font-semibold text-lg text-center">
              สนามกอล์ฟ
            </summary>
            <p className="mt-4 text-gray-700 leading-relaxed text-center">
              The Eden Golf Club เป็นหนึ่งในสนามกอล์ฟที่เก่าแก่และโดดเด่นที่สุดของนครชัยศรี
              <br />
              สนามกอล์ฟ 18 หลุม พาร์ 72 แห่งนี้ มาพร้อมกับเลย์เอาต์ที่ท้าทาย ท่ามกลางความงดงามของธรรมชาติ
            </p>

            {/* Slider */}
            <div className="mt-8">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={16}
                slidesPerView={1.5}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                loop={true}
                breakpoints={{
                  640: { slidesPerView: 2.5 },
                  768: { slidesPerView: 3.5 },
                }}
              >
                {Array.from({ length: 18 }, (_, i) => (
                  <SwiperSlide key={i}>
                    <div className="flex flex-col items-center">
                      <img
                        src={`/Hole${i + 1}.avif`}
                        alt={`PAR ${i + 1}`}
                        className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-2xl shadow mb-2"
                      />
                      <span className="text-sm font-medium">PAR {i + 1}</span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Map */}
            <div className="mt-8">
              <img
                src="/map golf.jpg"
                alt="full golf course"
                className="w-full h-auto rounded-xl shadow-xl object-cover"
              />
            </div>
          </details>
        </div>

        {/* Visit & Map Section (ล่างสุด) */}
        <section className="max-w-4xl mx-auto px-4 mb-20">
          <h2 className="text-center text-2xl font-semibold mb-4">Visit Us</h2>
          <p className="text-center mb-6 text-gray-700">
            Eden Golf Club ตั้งอยู่ใกล้มหาวิทยาลัยราชภัฏนครปฐม
            <br />
            50 ถนนเพชรเกษม ตำบลนครปฐม อำเภอเมือง จังหวัดนครปฐม 73000
          </p>
          <div className="w-full h-72 rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Nakhon Pathom Rajabhat University Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.344727973501!2d100.0653118153113!3d13.819183490356382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2a2f041a7ee39%3A0x456bd50b23e87c0f!2sNakhon%20Pathom%20Rajabhat%20University!5e0!3m2!1sen!2sth!4v1687628393531!5m2!1sen!2sth"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

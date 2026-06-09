import  { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    title: "Book Flights Easily",
    desc: "Find domestic and international flights at best prices.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1400",
  },

  {
    id: 2,
    title: "Luxury Hotel Booking",
    desc: "Explore premium hotels and resorts worldwide.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1400",
  },

  {
    id: 3,
    title: "Travel By Train",
    desc: "Fast and secure railway ticket booking platform.",
    image:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1400",
  },

  {
    id: 4,
    title: "Bike & Cab Rentals",
    desc: "Affordable cabs and bike rentals for your trips.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400",
  },
];

function TourismCarousel() {
  const [current, setCurrent] = useState(0);
  const nextSlide = () => {
  setCurrent((prev) => (prev + 1) % slides.length);
};

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [current]);


  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-3xl">


      <AnimatePresence mode="wait">

        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >

       
          <img
            src={slides[current].image}
            alt=""
            className="w-full h-full object-cover"
          />

          
          <div className="absolute inset-0 bg-black/50" />

         
          <div className="absolute inset-0 flex items-center px-10 md:px-24">

            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl"
            >

              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                {slides[current].title}
              </h1>

              <p className="text-gray-200 text-lg mt-6">
                {slides[current].desc}
              </p>

              

            </motion.div>

          </div>

        </motion.div>

      </AnimatePresence>

      {/* LEFT BUTTON */}
      <button
        onClick={prevSlide}
        className="
          absolute
          left-5
          top-1/2
          -translate-y-1/2
          w-12
          h-12
          rounded-full
          bg-white/20
          backdrop-blur-md
          text-white
          flex
          items-center
          justify-center
          hover:bg-cyan-500
          transition
        "
      >
        <FaArrowLeft />
      </button>

      
      <button
        onClick={nextSlide}
        className="
          absolute
          right-5
          top-1/2
          -translate-y-1/2
          w-12
          h-12
          rounded-full
          bg-white/20
          backdrop-blur-md
          text-white
          flex
          items-center
          justify-center
          hover:bg-cyan-500
          transition
        "
      >
        <FaArrowRight />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">

        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`
              transition-all
              duration-300
              rounded-full
              ${
                current === index
                  ? "w-10 h-3 bg-cyan-400"
                  : "w-3 h-3 bg-white/60"
              }
            `}
          />
        ))}

      </div>

    </div>
  );
}

export default TourismCarousel;
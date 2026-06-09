
import { motion } from "framer-motion";
import {
  Plane,
 
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
} from "lucide-react";

function FooterComponent() {
    return (
        <footer className="relative overflow-hidden bg-[#020817] text-white pt-28">

           
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop"
                    alt=""
                    className="w-full h-full object-cover opacity-10"
                />
            </div>

          
            <div className="absolute inset-0 bg-gradient-to-b from-[#020817] via-[#041225]/95 to-[#020817]" />

          
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full"></div>

            <div className="relative z-10 px-6 md:px-14">

             
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 border-b border-cyan-500/10 pb-16">

                    
                    <motion.div
                        initial={{ opacity: 0, y: 70 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="flex items-center gap-3 mb-6">

                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                                <Plane size={28} />
                            </div>

                            <h1 className="text-4xl font-bold">
                                Tour
                                <span className="text-cyan-400">X</span>
                            </h1>
                        </div>

                        <p className="text-gray-400 leading-relaxed">
                            Explore flights, hotels, buses, luxury holidays and unforgettable
                            destinations around the world with premium booking experience.
                        </p>

                        
                        <div className="flex gap-4 mt-8">
                            {[ ].map((Icon, index) => (
                                <motion.div
                                    whileHover={{
                                        y: -6,
                                        scale: 1.1,
                                    }}
                                    key={index}
                                    className="w-12 h-12 rounded-2xl bg-white/5 border border-cyan-500/10 flex items-center justify-center cursor-pointer hover:bg-cyan-500 hover:text-black transition duration-300"
                                >
                                    <Icon size={20} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    
                    <motion.div
                        initial={{ opacity: 0, y: 70 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h2 className="text-2xl font-semibold mb-7 text-cyan-400">
                            Quick Links
                        </h2>

                        <div className="space-y-4">
                            {[
                                "Home",
                                "Destinations",
                                "Flights",
                                "Hotels",
                                "Bus Booking",
                                "Holiday Packages",
                            ].map((item, index) => (
                                <motion.div
                                    whileHover={{ x: 8 }}
                                    key={index}
                                    className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 cursor-pointer transition duration-300"
                                >
                                    <ArrowUpRight size={18} />
                                    {item}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    
                    <motion.div
                        initial={{ opacity: 0, y: 70 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-semibold mb-7 text-cyan-400">
                            Top Destinations
                        </h2>

                        <div className="space-y-4">
                            {[
                                "Maldives",
                                "Dubai",
                                "Kashmir",
                                "Thailand",
                                "Singapore",
                                "Goa",
                            ].map((item, index) => (
                                <motion.div
                                    whileHover={{ x: 8 }}
                                    key={index}
                                    className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 cursor-pointer transition duration-300"
                                >
                                    <MapPin size={18} />
                                    {item}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                  
                    <motion.div
                        initial={{ opacity: 0, y: 70 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-2xl font-semibold mb-7 text-cyan-400">
                            Contact Us
                        </h2>

                        <div className="space-y-6">

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                                    <MapPin className="text-cyan-400" size={20} />
                                </div>

                                <div>
                                    <p className="text-gray-300 font-medium">
                                        Prayagraj, India
                                    </p>

                                    <p className="text-gray-500 text-sm">
                                        Premium Travel Office
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                                    <Mail className="text-cyan-400" size={20} />
                                </div>

                                <div>
                                    <p className="text-gray-300 font-medium">
                                        support@tourx.com
                                    </p>

                                    <p className="text-gray-500 text-sm">
                                        24/7 Support
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                                    <Phone className="text-cyan-400" size={20} />
                                </div>

                                <div>
                                    <p className="text-gray-300 font-medium">
                                        +91 8382044282
                                    </p>

                                    <p className="text-gray-500 text-sm">
                                        Customer Helpline
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="py-16"
                >
                    <div className="relative overflow-hidden rounded-[35px] border border-cyan-500/10 bg-white/5 backdrop-blur-2xl p-10">

                        <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">

                            <div>
                                <h2 className="text-4xl font-bold mb-4">
                                    Get Travel Updates
                                </h2>

                                <p className="text-gray-400 max-w-xl">
                                    Subscribe to receive latest destination offers, luxury travel
                                    deals and exciting holiday packages.
                                </p>
                            </div>

                            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-[#07111f] border border-cyan-500/10 px-6 py-4 rounded-2xl outline-none min-w-[300px]"
                                />

                                <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 font-semibold hover:scale-105 transition duration-300">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="border-t border-cyan-500/10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">

                    <p className="text-gray-500 text-sm">
                        © 2026 TourX. All Rights Reserved.
                    </p>

                    <div className="flex gap-8 text-sm text-gray-500">
                        <p className="hover:text-cyan-400 cursor-pointer transition">
                            Privacy Policy
                        </p>

                        <p className="hover:text-cyan-400 cursor-pointer transition">
                            Terms & Conditions
                        </p>

                        <p className="hover:text-cyan-400 cursor-pointer transition">
                            Support
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default FooterComponent;
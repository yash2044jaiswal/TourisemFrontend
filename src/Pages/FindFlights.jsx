import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    Plane,
    ArrowRightLeft,
    X,
    CheckCircle,
    User,
    CreditCard,
    Clock3,
    MapPin,
    Luggage,
    AlertCircle,
    ChevronRight,
    Search,
    FileText,
    Activity,
} from "lucide-react";


const DEMO_FLIGHTS = [
    { id: 1, airline: "IndiGo", logo: "6E", flightNo: "6E-2341", from: "Delhi", fromCode: "DEL", to: "Mumbai", toCode: "BOM", departure: "06:15 AM", arrival: "08:25 AM", duration: "2h 10m", price: 4299, status: "On Time", stops: "Non-stop", aircraft: "Airbus A320", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1400&auto=format&fit=crop", seats: 42 },
    { id: 2, airline: "Air India", logo: "AI", flightNo: "AI-865", from: "Mumbai", fromCode: "BOM", to: "Dubai", toCode: "DXB", departure: "02:30 AM", arrival: "04:45 AM", duration: "3h 15m", price: 12500, status: "On Time", stops: "Non-stop", aircraft: "Boeing 787", image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=1400&auto=format&fit=crop", seats: 18 },
    { id: 3, airline: "Vistara", logo: "UK", flightNo: "UK-995", from: "Delhi", fromCode: "DEL", to: "Singapore", toCode: "SIN", departure: "10:00 PM", arrival: "06:30 AM", duration: "5h 30m", price: 18900, status: "Boarding", stops: "Non-stop", aircraft: "Boeing 787-9", image: "https://images.unsplash.com/photo-1540339832862-474599807836?q=80&w=1400&auto=format&fit=crop", seats: 7 },
    { id: 4, airline: "SpiceJet", logo: "SG", flightNo: "SG-158", from: "Bangalore", fromCode: "BLR", to: "Goa", toCode: "GOI", departure: "07:45 AM", arrival: "09:00 AM", duration: "1h 15m", price: 2899, status: "On Time", stops: "Non-stop", aircraft: "Boeing 737", image: "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?q=80&w=1400&auto=format&fit=crop", seats: 55 },
    { id: 5, airline: "IndiGo", logo: "6E", flightNo: "6E-444", from: "Chennai", fromCode: "MAA", to: "Bangkok", toCode: "BKK", departure: "11:30 PM", arrival: "04:00 AM", duration: "3h 30m", price: 9800, status: "On Time", stops: "Non-stop", aircraft: "Airbus A321", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1400&auto=format&fit=crop", seats: 30 },
    { id: 6, airline: "Akasa Air", logo: "QP", flightNo: "QP-1301", from: "Hyderabad", fromCode: "HYD", to: "Delhi", toCode: "DEL", departure: "05:20 AM", arrival: "07:45 AM", duration: "2h 25m", price: 3750, status: "Delayed", stops: "Non-stop", aircraft: "Boeing 737 MAX", image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=1400&auto=format&fit=crop", seats: 22 },
    { id: 7, airline: "Air India", logo: "AI", flightNo: "AI-131", from: "Delhi", fromCode: "DEL", to: "Paris", toCode: "CDG", departure: "01:45 AM", arrival: "08:30 AM", duration: "9h 45m", price: 45000, status: "On Time", stops: "Non-stop", aircraft: "Boeing 777-300ER", image: "https://images.unsplash.com/photo-1540339832862-474599807836?q=80&w=1400&auto=format&fit=crop", seats: 12 },
    { id: 8, airline: "Vistara", logo: "UK", flightNo: "UK-821", from: "Mumbai", fromCode: "BOM", to: "Lucknow", toCode: "LKO", departure: "03:10 PM", arrival: "04:55 PM", duration: "1h 45m", price: 5200, status: "On Time", stops: "Non-stop", aircraft: "Airbus A320neo", image: "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?q=80&w=1400&auto=format&fit=crop", seats: 38 },
    { id: 9, airline: "IndiGo", logo: "6E", flightNo: "6E-2071", from: "Varanasi", fromCode: "VNS", to: "Mumbai", toCode: "BOM", departure: "08:00 AM", arrival: "10:10 AM", duration: "2h 10m", price: 4899, status: "On Time", stops: "Non-stop", aircraft: "Airbus A320", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1400&auto=format&fit=crop", seats: 60 },
    { id: 10, airline: "SpiceJet", logo: "SG", flightNo: "SG-8709", from: "Bangalore", fromCode: "BLR", to: "Chennai", toCode: "MAA", departure: "09:30 AM", arrival: "10:35 AM", duration: "1h 05m", price: 1999, status: "Boarding", stops: "Non-stop", aircraft: "De Havilland Q400", image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=1400&auto=format&fit=crop", seats: 14 },
    { id: 11, airline: "Air India", logo: "AI", flightNo: "AI-30", from: "Delhi", fromCode: "DEL", to: "Bangkok", toCode: "BKK", departure: "11:00 AM", arrival: "04:30 PM", duration: "4h 30m", price: 14200, status: "On Time", stops: "Non-stop", aircraft: "Boeing 787 Dreamliner", image: "https://images.unsplash.com/photo-1540339832862-474599807836?q=80&w=1400&auto=format&fit=crop", seats: 25 },
    { id: 12, airline: "Akasa Air", logo: "QP", flightNo: "QP-505", from: "Goa", fromCode: "GOI", to: "Mumbai", toCode: "BOM", departure: "06:55 PM", arrival: "08:15 PM", duration: "1h 20m", price: 3100, status: "On Time", stops: "Non-stop", aircraft: "Boeing 737 MAX 8", image: "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?q=80&w=1400&auto=format&fit=crop", seats: 47 },
];

const cities = [
    { name: "Delhi", code: "DEL" },
    { name: "Mumbai", code: "BOM" },
    { name: "Goa", code: "GOI" },
    { name: "Lucknow", code: "LKO" },
    { name: "Varanasi", code: "VNS" },
    { name: "Dubai", code: "DXB" },
    { name: "Singapore", code: "SIN" },
    { name: "Paris", code: "CDG" },
    { name: "Bangkok", code: "BKK" },
    { name: "Hyderabad", code: "HYD" },
    { name: "Bangalore", code: "BLR" },
    { name: "Chennai", code: "MAA" },
];

const statusColor = (s) => {
    if (s === "On Time") return "text-emerald-400 bg-emerald-400/10";
    if (s === "Boarding") return "text-amber-400 bg-amber-400/10";
    return "text-red-400 bg-red-400/10";
};


// ==========================================
// BOOKING MODAL
// ==========================================
function BookingModal({ flight, passengers, onClose, onConfirm }) {
    const [step, setStep] = useState(1); // 1=details, 2=payment, 3=confirmed
    const [passengerForms, setPassengerForms] = useState(
        Array.from({ length: passengers }, (_, i) => ({
            name: "", age: "", gender: "Male", meal: "Veg", seat: ""
        }))
    );
    const [payment, setPayment] = useState({ card: "", expiry: "", cvv: "", name: "" });
    const [loading, setLoading] = useState(false);
    const [bookingId] = useState(`BK${Math.floor(1000000+ Math.random() * 9000000) }`);

    const totalPrice = flight.price * passengers;

    const updatePassenger = (i, field, val) => {
        setPassengerForms(prev => prev.map((p, idx) => idx === i ? { ...p, [field]: val } : p));
    };

    const handleConfirmPayment = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:3000/api/book-flight", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    bookingId,
                    flight,
                    passengers: passengerForms,
                    payment,
                    total: Math.floor(totalPrice * 1.12)
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Booking failed");
            }

            setStep(3);

        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#0a1628] border border-cyan-500/20 rounded-[30px] w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="sticky top-0 bg-[#0a1628] z-10 px-8 pt-8 pb-4 border-b border-white/5 flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold">
                            {step === 3 ? "🎉 Booking Confirmed!" : step === 2 ? "Payment" : "Passenger Details"}
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">{flight.airline} · {flight.flightNo} · {flight.from} → {flight.to}</p>
                    </div>
                    {step !== 3 && (
                        <button onClick={onClose} className="text-gray-400 hover:text-white transition">
                            <X size={22} />
                        </button>
                    )}
                </div>

                {/* Steps indicator */}
                {step !== 3 && (
                    <div className="px-8 py-4 flex gap-3">
                        {[1, 2].map(s => (
                            <div key={s} className={`flex-1 h-1 rounded-full transition-all ${step >= s ? "bg-cyan-500" : "bg-white/10"}`} />
                        ))}
                    </div>
                )}

                <div className="px-8 pb-8">

                    {/* STEP 1 - Passenger Details */}
                    {step === 1 && (
                        <>
                            {passengerForms.map((p, i) => (
                                <div key={i} className="mb-6 p-6 bg-white/5 rounded-2xl border border-white/5">
                                    <h3 className="font-semibold mb-4 text-cyan-400 flex items-center gap-2">
                                        <User size={16} /> Passenger {i + 1}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                            <label className="text-gray-400 text-xs mb-1 block">FULL NAME (as on ID)</label>
                                            <input
                                                value={p.name}
                                                onChange={e => updatePassenger(i, "name", e.target.value)}
                                                placeholder="e.g. Rahul Sharma"
                                                className="w-full bg-[#0f172a] border border-cyan-500/10 rounded-xl px-4 py-3 outline-none text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-gray-400 text-xs mb-1 block">AGE</label>
                                            <input
                                                value={p.age}
                                                onChange={e => updatePassenger(i, "age", e.target.value)}
                                                type="number" placeholder="25"
                                                className="w-full bg-[#0f172a] border border-cyan-500/10 rounded-xl px-4 py-3 outline-none text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-gray-400 text-xs mb-1 block">GENDER</label>
                                            <select
                                                value={p.gender}
                                                onChange={e => updatePassenger(i, "gender", e.target.value)}
                                                className="w-full bg-[#0f172a] border border-cyan-500/10 rounded-xl px-4 py-3 outline-none text-sm"
                                            >
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-gray-400 text-xs mb-1 block">MEAL PREFERENCE</label>
                                            <select
                                                value={p.meal}
                                                onChange={e => updatePassenger(i, "meal", e.target.value)}
                                                className="w-full bg-[#0f172a] border border-cyan-500/10 rounded-xl px-4 py-3 outline-none text-sm"
                                            >
                                                <option>Veg</option>
                                                <option>Non-Veg</option>
                                                <option>Jain</option>
                                                <option>No Meal</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-gray-400 text-xs mb-1 block">SEAT PREFERENCE</label>
                                            <select
                                                value={p.seat}
                                                onChange={e => updatePassenger(i, "seat", e.target.value)}
                                                className="w-full bg-[#0f172a] border border-cyan-500/10 rounded-xl px-4 py-3 outline-none text-sm"
                                            >
                                                <option value="">No Preference</option>
                                                <option>Window</option>
                                                <option>Aisle</option>
                                                <option>Middle</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Summary */}
                            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-5 mb-6">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-400">Base fare × {passengers}</span>
                                    <span>₹{(flight.price * passengers).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-400">Taxes & Fees</span>
                                    <span>₹{Math.floor(totalPrice * 0.12).toLocaleString()}</span>
                                </div>
                                <div className="border-t border-white/10 mt-3 pt-3 flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span className="text-cyan-400">₹{Math.floor(totalPrice * 1.12).toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setStep(2)}
                                disabled={passengerForms.some(p => !p.name || !p.age)}
                                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold disabled:opacity-40 flex items-center justify-center gap-2"
                            >
                                Proceed to Payment <ChevronRight size={18} />
                            </button>
                        </>
                    )}

                    {/* STEP 2 - Payment */}
                    {step === 2 && (
                        <>
                            <div className="mb-6 p-6 bg-white/5 rounded-2xl border border-white/5">
                                <h3 className="font-semibold mb-4 text-cyan-400 flex items-center gap-2">
                                    <CreditCard size={16} /> Card Details
                                </h3>
                                <div className="grid gap-4">
                                    <div>
                                        <label className="text-gray-400 text-xs mb-1 block">CARD NUMBER</label>
                                        <input
                                            value={payment.card}
                                            onChange={e => setPayment(p => ({ ...p, card: e.target.value.replace(/\D/g, "").slice(0, 16) }))}
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full bg-[#0f172a] border border-cyan-500/10 rounded-xl px-4 py-3 outline-none text-sm tracking-widest"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-gray-400 text-xs mb-1 block">CARDHOLDER NAME</label>
                                        <input
                                            value={payment.name}
                                            onChange={e => setPayment(p => ({ ...p, name: e.target.value }))}
                                            placeholder="Name on card"
                                            className="w-full bg-[#0f172a] border border-cyan-500/10 rounded-xl px-4 py-3 outline-none text-sm"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-gray-400 text-xs mb-1 block">EXPIRY</label>
                                            <input
                                                value={payment.expiry}
                                                onChange={e => setPayment(p => ({ ...p, expiry: e.target.value }))}
                                                placeholder="MM/YY"
                                                className="w-full bg-[#0f172a] border border-cyan-500/10 rounded-xl px-4 py-3 outline-none text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-gray-400 text-xs mb-1 block">CVV</label>
                                            <input
                                                value={payment.cvv}
                                                onChange={e => setPayment(p => ({ ...p, cvv: e.target.value.slice(0, 3) }))}
                                                type="password" placeholder="•••"
                                                className="w-full bg-[#0f172a] border border-cyan-500/10 rounded-xl px-4 py-3 outline-none text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-5 mb-6">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Amount to Pay</span>
                                    <span className="text-cyan-400">₹{Math.floor(totalPrice * 1.12).toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep(1)}
                                    className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleConfirmPayment}
                                    disabled={!payment.card || !payment.name || !payment.expiry || !payment.cvv || loading}
                                    className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold disabled:opacity-40 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 rounded-full border-2 border-white border-t-transparent" />
                                    ) : (
                                        <><CreditCard size={16} /> Pay & Confirm</>
                                    )}
                                </button>
                            </div>
                        </>
                    )}


                    {step === 3 && (
                        <div className="text-center py-6">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
                                <CheckCircle size={72} className="text-emerald-400 mx-auto mb-6" />
                            </motion.div>
                            <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
                            <p className="text-gray-400 mb-8">Your e-ticket has been sent to your email.</p>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 text-left grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-500 text-xs">BOOKING ID</p>
                                    <p className="font-bold text-cyan-400 text-lg">{bookingId}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">FLIGHT</p>
                                    <p className="font-bold">{flight.flightNo}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">ROUTE</p>
                                    <p className="font-bold">{flight.from} → {flight.to}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">DEPARTURE</p>
                                    <p className="font-bold">{flight.departure}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">PASSENGERS</p>
                                    <p className="font-bold">{passengers}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">TOTAL PAID</p>
                                    <p className="font-bold text-emerald-400">₹{Math.floor(totalPrice * 1.12).toLocaleString()}</p>
                                </div>
                            </div>

                            {passengerForms.map((p, i) => (
                                <div key={i} className="bg-white/5 rounded-xl p-4 mb-3 flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                        <User size={14} className="text-cyan-400" />
                                        <span className="font-medium">{p.name}</span>
                                    </div>
                                    <span className="text-gray-400">Seat: {p.seat || "Auto Assign"} · {p.meal}</span>
                                </div>
                            ))}

                            <button
                                onClick={() => { onConfirm({ bookingId, flight, passengers: passengerForms, total: Math.floor(totalPrice * 1.12) }); onClose(); }}
                                className="w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold"
                            >
                                Done
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

// ==========================================
// MAIN COMPONENT
// ==========================================
function FindFlights() {
    
    const [loading, setLoading] = useState(true);
    const [tripType, setTripType] = useState("round");
    const [activeTab, setActiveTab] = useState("search");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [departDate, setDepartDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [showPassengerBox, setShowPassengerBox] = useState(false);
    const [adults, setAdults] = useState(1);
    const [child, setChild] = useState(0);
    const [infant, setInfant] = useState(0);
    const [flightNumber, setFlightNumber] = useState("");
    const [bookingId, setbookingId] = useState("");
    const [results, setResults] = useState([]);
    const [statusResult, setStatusResult] = useState(null);
    const [pnrResult, setPnrResult] = useState(null);
    const [showFromSuggestion, setShowFromSuggestion] = useState(false);
    const [showToSuggestion, setShowToSuggestion] = useState(false);
    const [allFlights, setAllFlights] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [sortBy, setSortBy] = useState("price");
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
   



    useEffect(() => {
      
        

        const fetchFlights = async () => {
            try {
                // Try real API first
                const res = await fetch("https://aviation-edge.com/v2/public/routes?key=demo&airlineIata=AI");
                if (!res.ok) throw new Error("API failed");
                const data = await res.json();
                if (!data || !Array.isArray(data) || data.length === 0) throw new Error("No data");
                // Map real API data if it works
                const mapped = data.slice(0, 12).map((item, i) => ({
                    id: i + 1,
                    airline: item.airlineIata || "Air India",
                    logo: item.airlineIata || "AI",
                    flightNo: `${item.airlineIata}-${item.flightNumber || 1000 + i}`,
                    from: item.departureIata || cities[i % cities.length].name,
                    fromCode: item.departureIata || cities[i % cities.length].code,
                    to: item.arrivalIata || cities[(i + 3) % cities.length].name,
                    toCode: item.arrivalIata || cities[(i + 3) % cities.length].code,
                    departure: "08:00 AM",
                    arrival: "10:30 AM",
                    duration: "2h 30m",
                    price: Math.floor(Math.random() * 10000) + 3000,
                    status: ["On Time", "Delayed", "Boarding"][i % 3],
                    stops: "Non-stop",
                    aircraft: "Boeing 737",
                    image: DEMO_FLIGHTS[i % DEMO_FLIGHTS.length].image,
                    seats: Math.floor(Math.random() * 60) + 5,
                }));
                setAllFlights(mapped);
                setApiError(false);
            } catch {
                // Fall back to rich demo data
                setAllFlights(DEMO_FLIGHTS);
                setApiError(true);
            } finally {
                setTimeout(() => setLoading(false), 1400);
            }
        };
        fetchFlights();
    }, []);

    const handleSearch = () => {
        let filtered = allFlights.filter(f =>
            f.from.toLowerCase().includes(from.toLowerCase()) &&
            f.to.toLowerCase().includes(to.toLowerCase())
        );
        if (sortBy === "price") filtered.sort((a, b) => a.price - b.price);
        else if (sortBy === "duration") filtered.sort((a, b) => a.duration.localeCompare(b.duration));
        else if (sortBy === "departure") filtered.sort((a, b) => a.departure.localeCompare(b.departure));
        setResults(filtered);
    };

    const handlePNR = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:3000/api/pnr/${bookingId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            console.log(data);

            if (!response.ok) {
                throw new Error(data.message || "PNR not found");
            }

            const found = data;

            setPnrResult({
                passenger: found.passengers?.[0]?.name || "N/A",

                pnr: found.bookingId,

                seat: found.passengers?.[0]?.seat || "Auto Assign",

                status: found.paymentStatus,

                flight: found.flight?.flightNo,

                airline: found.flight?.airline,

                route: `${found.flight?.from} → ${found.flight?.to}`,

                total: found.flight?.price || 0,
            });

        } catch (error) {

            console.log(error);

            setPnrResult(null);
        }
    };

    const handleStatus = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:3000/api/flight-status/${flightNumber}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setStatusResult(data);

        } catch (error) {

            console.log(error);
            setStatusResult(null);

        }
    };

    const handleBookingConfirmed = (booking) => {
        setBookings(prev => [...prev, booking]);
    };
    const handleBookNow = (flight) => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/join"); // apna login route
    return;
  }
  setSelectedFlight(flight);
};

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020817] flex flex-col items-center justify-center gap-6">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-20 h-20 rounded-full border-4 border-cyan-500 border-t-transparent"
                />
                <h1 className="text-white text-3xl font-bold">Loading Flights...</h1>
                <p className="text-gray-500 text-sm">Fetching live data from airlines</p>
            </div>
        );
    }

    const tabs = [
        { id: "search", label: "Search Flights", icon: Search },
        { id: "pnr", label: "Manage Booking", icon: FileText },
        { id: "status", label: "Flight Status", icon: Activity },
    ];

    return (
        <>
            <section className="min-h-screen bg-[#020817] text-white overflow-visible relative">
                {/* BG GLOW */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full pointer-events-none" />

                <div className="relative z-10 px-6 md:px-14 py-20">
                    {/* HERO */}
                    <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                        <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="flex justify-center mb-8">
                            <div className="w-28 h-28 rounded-[30px] bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30">
                                <Plane size={55} />
                            </div>
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl font-bold">
                            Smart Flight
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Booking</span>
                        </h1>
                        <p className="text-gray-400 max-w-3xl mx-auto mt-8 text-lg">
                            Search flights, manage bookings, check flight status and explore destinations.
                        </p>
                        {apiError && (
                            <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm">
                                <AlertCircle size={14} /> Live API unavailable — showing demo flight data
                            </div>
                        )}
                    </motion.div>

                    {/* TABS */}
                    <div className="flex flex-wrap gap-3 mb-8">
                        {tabs.map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={`px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all ${activeTab === id ? "bg-cyan-500 text-black" : "bg-white/5 hover:bg-white/10"}`}
                            >
                                <Icon size={16} />{label}
                            </button>
                        ))}
                    </div>

                    {/* MAIN CARD */}
                    <div className="bg-white/5 border border-cyan-500/10 backdrop-blur-2xl rounded-[40px] p-8 relative overflow-visible">

                        {/* SEARCH TAB */}
                        {activeTab === "search" && (
                            <>
                                <div className="flex gap-6 mb-8">
                                    {["round", "oneway"].map(t => (
                                        <button key={t} onClick={() => setTripType(t)} className={`${tripType === t ? "text-cyan-400" : "text-gray-400"} transition`}>
                                            ● {t === "round" ? "Round Trip" : "One Way"}
                                        </button>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                                    {/* FROM */}
                                    <div className="relative">
                                        <label className="text-gray-400 text-xs">FROM</label>
                                        <input
                                            type="text" value={from}
                                            onChange={e => { setFrom(e.target.value); setShowFromSuggestion(true); }}
                                            placeholder="Origin"
                                            className="w-full mt-2 bg-[#0f172a] border border-cyan-500/10 rounded-2xl px-4 py-4 outline-none text-sm"
                                        />
                                        {showFromSuggestion && from && (
                                            <div className="absolute top-full left-0 w-full bg-[#0f172a] border border-cyan-500/10 rounded-2xl mt-1 z-50 max-h-48 overflow-y-auto shadow-xl">
                                                {cities.filter(c => c.name.toLowerCase().includes(from.toLowerCase())).map((c, i) => (
                                                    <div key={i} onClick={() => { setFrom(c.name); setShowFromSuggestion(false); }} className="px-4 py-3 hover:bg-cyan-500/10 cursor-pointer flex justify-between text-sm">
                                                        <span>{c.name}</span><span className="text-cyan-400">{c.code}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* TO */}
                                    <div className="relative">
                                        <label className="text-gray-400 text-xs">TO</label>
                                        <input
                                            type="text" value={to}
                                            onChange={e => { setTo(e.target.value); setShowToSuggestion(true); }}
                                            placeholder="Destination"
                                            className="w-full mt-2 bg-[#0f172a] border border-cyan-500/10 rounded-2xl px-4 py-4 outline-none text-sm"
                                        />
                                        {showToSuggestion && to && (
                                            <div className="absolute top-full left-0 w-full bg-[#0f172a] border border-cyan-500/10 rounded-2xl mt-1 z-50 max-h-48 overflow-y-auto shadow-xl">
                                                {cities.filter(c => c.name.toLowerCase().includes(to.toLowerCase())).map((c, i) => (
                                                    <div key={i} onClick={() => { setTo(c.name); setShowToSuggestion(false); }} className="px-4 py-3 hover:bg-cyan-500/10 cursor-pointer flex justify-between text-sm">
                                                        <span>{c.name}</span><span className="text-cyan-400">{c.code}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* DEPART */}
                                    <div>
                                        <label className="text-gray-400 text-xs">DEPART DATE</label>
                                        <input type="date" value={departDate} onChange={e => setDepartDate(e.target.value)}
                                            className="w-full mt-2 bg-[#0f172a] border border-cyan-500/10 rounded-2xl px-4 py-4 outline-none text-sm" />
                                    </div>

                                    {/* RETURN */}
                                    {tripType === "round" && (
                                        <div>
                                            <label className="text-gray-400 text-xs">RETURN DATE</label>
                                            <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)}
                                                className="w-full mt-2 bg-[#0f172a] border border-cyan-500/10 rounded-2xl px-4 py-4 outline-none text-sm" />
                                        </div>
                                    )}

                                    {/* PASSENGERS */}
                                    <div className="relative z-50">
                                        <label className="text-gray-400 text-xs">PASSENGERS</label>
                                        <div onClick={() => setShowPassengerBox(!showPassengerBox)}
                                            className="w-full mt-2 bg-[#0f172a] border border-cyan-500/10 rounded-2xl px-4 py-4 cursor-pointer flex items-center justify-between">
                                            <div>
                                                <p className="font-semibold text-sm">{adults + child + infant} Passenger(s)</p>
                                                <p className="text-gray-500 text-xs">{adults}A · {child}C · {infant}I</p>
                                            </div>
                                            <span className="text-cyan-400 text-sm">{showPassengerBox ? "▲" : "▼"}</span>
                                        </div>
                                        {showPassengerBox && (
                                            <div className="absolute top-full left-0 w-full mt-2 bg-[#111827] border border-cyan-500/10 rounded-[24px] p-5 z-50 shadow-2xl">
                                                {[
                                                    { label: "Adults", sub: "12+ yrs", val: adults, set: setAdults, min: 1 },
                                                    { label: "Children", sub: "2-11 yrs", val: child, set: setChild, min: 0 },
                                                    { label: "Infants", sub: "0-2 yrs", val: infant, set: setInfant, min: 0 },
                                                ].map(({ label, sub, val, set, min }) => (
                                                    <div key={label} className="flex items-center justify-between mb-4 last:mb-0">
                                                        <div>
                                                            <p className="font-medium text-sm">{label}</p>
                                                            <p className="text-gray-500 text-xs">{sub}</p>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <button onClick={() => val > min && set(val - 1)} className="w-9 h-9 rounded-xl bg-white/5 border border-cyan-500/10">-</button>
                                                            <span className="w-5 text-center font-bold">{val}</span>
                                                            <button onClick={() => set(val + 1)} className="w-9 h-9 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600">+</button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* SEARCH BTN */}
                                    <div className="flex items-end">
                                        <motion.button whileHover={{ scale: 1.04 }} onClick={handleSearch}
                                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-sm">
                                            Search Flights
                                        </motion.button>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* PNR TAB */}
                        {activeTab === "pnr" && (
                            <div>
                                <p className="text-gray-400 text-sm mb-6">Enter your Booking ID to retrieve booking details.</p>
                                <div className="grid md:grid-cols-4 gap-4">
                                    <div className="md:col-span-3">
                                        <label className="text-gray-400 text-xs">BOOKING REFERENCE / PNR</label>
                                        <input type="text" value={bookingId} onChange={e => setbookingId(e.target.value)} placeholder="e.g. BK7654321"
                                            className="w-full mt-2 bg-[#0f172a] border border-cyan-500/10 rounded-2xl px-5 py-4 outline-none" />
                                    </div>
                                    <div className="flex items-end">
                                        <button onClick={handlePNR} className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold">Check</button>
                                    </div>
                                </div>
                                {bookings.length > 0 && (
                                    <div className="mt-6 p-4 bg-white/5 rounded-2xl">
                                        <p className="text-xs text-gray-500 mb-3">YOUR RECENT BOOKINGS</p>
                                        {bookings.map((b, i) => (
                                            <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0 text-sm cursor-pointer hover:text-cyan-400" onClick={() => setbookingId(b.bookingId)}>
                                                <span className="font-mono text-cyan-400">{b.bookingId}</span>
                                                <div>

                                                    <h3>Passengers</h3>

                                                    {pnrResult.passenger?.map((p, i) => (

                                                        <div
                                                            key={i}
                                                            style={{
                                                                padding: "10px",
                                                                marginBottom: "8px",
                                                                background: "rgba(255,255,255,0.05)",
                                                                borderRadius: "10px"
                                                            }}
                                                        >

                                                            <div>
                                                                {p.name}
                                                            </div>

                                                            <div
                                                                style={{
                                                                    fontSize: "12px",
                                                                    color: "#94a3b8"
                                                                }}
                                                            >
                                                                Seat: {p.seat || "Auto Assign"}
                                                            </div>

                                                        </div>

                                                    ))}

                                                </div>
                                                <span>{b.flight.from} → {b.flight.to}</span>
                                                <span className="text-emerald-400">✓ Confirmed</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}


                        {activeTab === "status" && (
                            <div className="grid md:grid-cols-4 gap-4">
                                <div className="md:col-span-3">
                                    <label className="text-gray-400 text-xs">FLIGHT NUMBER</label>
                                    <input type="text" value={flightNumber} onChange={e => setFlightNumber(e.target.value)} placeholder="e.g. AI-865 or 6E-2341"
                                        className="w-full mt-2 bg-[#0f172a] border border-cyan-500/10 rounded-2xl px-5 py-4 outline-none" />
                                </div>
                                <div className="flex items-end">
                                    <button onClick={handleStatus} className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold">Check Status</button>
                                </div>
                            </div>
                        )}
                    </div>
                    {results.length > 0 && (
                        <div className="mt-20">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                                <h1 className="text-4xl font-bold">{results.length} Flights Found</h1>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-400 text-sm">Sort:</span>
                                    {["price", "duration", "departure"].map(s => (
                                        <button key={s} onClick={() => { setSortBy(s); handleSearch(); }}
                                            className={`px-4 py-2 rounded-full text-sm capitalize transition ${sortBy === s ? "bg-cyan-500 text-black font-semibold" : "bg-white/5"}`}>
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                {results.map((flight, index) => (
                                    <motion.div key={flight.id} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                                        whileHover={{ y: -8, scale: 1.015 }}
                                        className="relative overflow-hidden rounded-[30px] group bg-white/5 border border-cyan-500/10">
                                        <div className="h-[220px] overflow-hidden">
                                            <img src={flight.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/60 to-transparent" />

                                        <div className="relative z-10 p-7">
                                            <div className="flex justify-between items-center mb-5">
                                                <div>
                                                    <h2 className="text-2xl font-bold">{flight.airline}</h2>
                                                    <p className="text-cyan-400 text-sm mt-1">{flight.flightNo} · {flight.aircraft}</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(flight.status)}`}>{flight.status}</span>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center mb-5">
                                                <div>
                                                    <h3 className="text-3xl font-bold">{flight.fromCode}</h3>
                                                    <p className="text-gray-400 text-sm mt-1">{flight.from}</p>
                                                    <p className="text-cyan-400 font-medium mt-1">{flight.departure}</p>
                                                </div>
                                                <div className="flex flex-col items-center gap-1">
                                                    <ArrowRightLeft size={22} className="text-cyan-400" />
                                                    <span className="text-xs text-gray-500">{flight.duration}</span>
                                                    <span className="text-xs text-gray-600">{flight.stops}</span>
                                                </div>
                                                <div className="text-right">
                                                    <h3 className="text-3xl font-bold">{flight.toCode}</h3>
                                                    <p className="text-gray-400 text-sm mt-1">{flight.to}</p>
                                                    <p className="text-cyan-400 font-medium mt-1">{flight.arrival}</p>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center pt-4 border-t border-white/5">
                                                <div>
                                                    <p className="text-3xl font-bold">₹{flight.price.toLocaleString()}</p>
                                                    <p className="text-gray-500 text-xs mt-1">{flight.seats} seats left</p>
                                                </div>
                                                <motion.button whileHover={{ scale: 1.04 }} onClick={() => handleBookNow(flight)}
                                                    className="px-8 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-sm">
                                                    Book Now
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {pnrResult && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-16 bg-white/5 border border-cyan-500/10 rounded-[30px] p-8"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <h1 className="text-3xl font-bold">Booking Details</h1>

                                <span className="px-4 py-2 rounded-full bg-emerald-400/10 text-emerald-400 text-sm font-medium flex items-center gap-2">
                                    <CheckCircle size={14} />
                                    {pnrResult.paymentStatus}
                                </span>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    {
                                        label: "Passenger",
                                        value: pnrResult.passenger || "N/A",
                                        icon: User,
                                    },
                                    {
                                        label: "PNR / Booking ID",
                                        value: pnrResult.pnr,
                                        icon: FileText,
                                    },
                                    {
                                        label: "Seat",
                                        value: pnrResult.seat,
                                        icon: Luggage,
                                    },
                                    {
                                        label: "Flight",
                                        value: `${pnrResult.airline} (${pnrResult.flight})`,
                                        icon: Plane,
                                    },
                                    {
                                        label: "Route",
                                        value: pnrResult.route,
                                        icon: MapPin,
                                    },
                                    {
                                        label: "Total Paid",
                                        value: `₹${pnrResult.total?.toLocaleString()}`,
                                        icon: CreditCard,
                                    },
                                ].map(({ label, value, icon: Icon }) => (
                                    <div key={label} className="bg-white/5 rounded-2xl p-5">
                                        <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                                            <Icon size={12} />
                                            {label}
                                        </div>

                                        <p className="text-xl font-bold">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    {statusResult && (
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mt-16 bg-white/5 border border-cyan-500/10 rounded-[30px] p-8">
                            <h1 className="text-3xl font-bold mb-8">Flight Status</h1>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    {
                                        label: "Flight Number",
                                        value: statusResult.flight?.flightNo,
                                        icon: Plane,
                                    },
                                    {
                                        label: "Airline",
                                        value: statusResult.flight?.airline,
                                        icon: Plane,
                                    },
                                    {
                                        label: "Route",
                                        value: `${statusResult.flight?.from} → ${statusResult.flight?.to}`,
                                        icon: MapPin,
                                    },
                                    {
                                        label: "Departure",
                                        value: statusResult.flight?.departure,
                                        icon: Clock3,
                                    },
                                    {
                                        label: "Arrival",
                                        value: statusResult.flight?.arrival,
                                        icon: Clock3,
                                    },
                                    {
                                        label: "Status",
                                        value: statusResult.flight?.status,
                                        icon: CheckCircle,
                                        highlight: true,
                                    },
                                ].map(({ label, value, icon: Icon, highlight }) => (
                                    <div key={label} className="bg-white/5 rounded-2xl p-5">
                                        <div className="flex items-center gap-2 text-gray-500 text-xs mb-2"><Icon size={12} />{label}</div>
                                        <p className={`text-xl font-bold ${highlight ? statusResult.status === "On Time" ? "text-emerald-400" : statusResult.status === "Boarding" ? "text-amber-400" : "text-red-400" : ""}`}>{value}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {statusResult === null && activeTab === "status" && flightNumber && (
                        <div className="mt-8 text-center text-gray-400">No flight found for "{flightNumber}". Try "AI-865" or "6E-2341".</div>
                    )}
                </div>
            </section>
            <AnimatePresence>
                {selectedFlight && (
                    <BookingModal
                        flight={selectedFlight}
                        passengers={adults + child}
                        onClose={() => setSelectedFlight(null)}
                        onConfirm={handleBookingConfirmed}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

export default FindFlights;



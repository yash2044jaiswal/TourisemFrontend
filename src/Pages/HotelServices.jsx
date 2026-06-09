import { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import FooterComponent from "../Components/FooterComponent";


const HOTEL_IMAGES = [
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80",
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
  "https://images.unsplash.com/photo-1506059612708-99d6c258160e?w=600&q=80",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
];

const VILLA_IMAGES = [
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
];

const BEACH_IMAGES = [
  "https://images.unsplash.com/photo-1540541338537-49cbc9c5a3e5?w=600&q=80",
  "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80",
  "https://images.unsplash.com/photo-1439130490301-25e322d88054?w=600&q=80",
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
];

const NATURE_IMAGES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
  "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=600&q=80",
];

const makeHotels = (imgs, baseNames, locs, priceBase) => imgs.map((img, i) => ({
  id: i + 1,
  name: baseNames[i % baseNames.length],
  location: locs[i % locs.length],
  country: ["Maldives", "Dubai", "Switzerland", "Goa", "Bali", "Paris", "Tokyo", "New York"][i % 8],
  image: img,
  rating: (4.2 + Math.random() * 0.7).toFixed(1),
  reviews: Math.floor(120 + Math.random() * 800),
  price: Math.floor(priceBase + Math.random() * priceBase),
  tags: [["Pool", "Spa", "WiFi"], ["Gym", "Bar", "WiFi"], ["Beach", "Pool", "Spa"], ["Mountain View", "Fireplace", "WiFi"]][i % 4],
  rooms: Math.floor(2 + Math.random() * 8),
  type: ["Deluxe", "Suite", "Premium", "Standard"][i % 4],
}));

const HOTELS = makeHotels(HOTEL_IMAGES,
  ["The Grand Meridian", "Azure Sky Hotel", "Celestia Palace", "Nova Grand", "Ivory Crown", "The Elysian", "Pinnacle Resort", "Serenity Towers"],
  ["Downtown", "Marina Bay", "City Centre", "Old Town", "Waterfront", "Midtown", "Hilltop", "Lakeside"],
  4800
);

const VILLAS = makeHotels(VILLA_IMAGES,
  ["Sunset Villa", "Azure Palms Villa", "Cliffside Manor", "Lagoon Estate"],
  ["Beachfront", "Hilltop", "Cliffside", "Jungle"],
  12000
);

const BEACH_HOTELS = makeHotels(BEACH_IMAGES,
  ["Coral Bay Resort", "Oceana Hotel", "Tide & Palms", "The Blue Horizon"],
  ["Beachfront", "Oceanfront", "Shoreline", "Coastline"],
  6500
);

const NATURE_RETREATS = makeHotels(NATURE_IMAGES,
  ["Pine Ridge Lodge", "Misty Valley Retreat", "Canopy Eco Lodge", "Summit Wilderness"],
  ["Forest Edge", "Valley", "Treeline", "Summit"],
  3800
);



const ROOMS_DEMO = [
  { id: 1, name: "Deluxe King Room", size: "38 sqm", bed: "1 King Bed", guests: 2, image: HOTEL_IMAGES[3], price: 5200, amenities: ["AC", "WiFi", "TV", "Safe", "Minibar", "City View"], available: 3 },
  { id: 2, name: "Superior Twin Room", size: "32 sqm", bed: "2 Twin Beds", guests: 2, image: HOTEL_IMAGES[5], price: 4100, amenities: ["AC", "WiFi", "TV", "Safe", "Pool View"], available: 5 },
  { id: 3, name: "Junior Suite", size: "55 sqm", bed: "1 King Bed + Sofa", guests: 3, image: HOTEL_IMAGES[7], price: 8900, amenities: ["AC", "WiFi", "TV", "Safe", "Jacuzzi", "Butler", "Sea View"], available: 2 },
  { id: 4, name: "Presidential Suite", size: "110 sqm", bed: "2 Kings + Living Room", guests: 4, image: HOTEL_IMAGES[1], price: 22000, amenities: ["AC", "WiFi", "TV", "Safe", "Private Pool", "Butler", "Panoramic View", "Dining Room"], available: 1 },
];




const SERVICES = [
  { id: "find", label: "Find Hotels", desc: "Search luxury hotels and stays worldwide.", icon: "🔍", gradient: "from-blue-500 to-cyan-400", data: HOTELS },
  { id: "booking", label: "Room Booking", desc: "Book premium hotel rooms instantly.", icon: "🛏️", gradient: "from-cyan-400 to-blue-500", data: HOTELS, highlight: true },
  { id: "villas", label: "Luxury Villas", desc: "Explore private villas and resorts.", icon: "🏡", gradient: "from-blue-600 to-indigo-500", data: VILLAS },
  { id: "safe", label: "Safe Stays", desc: "Verified and secure accommodations.", icon: "🛡️", gradient: "from-teal-500 to-cyan-500", data: HOTELS },
  { id: "nearby", label: "Nearby Hotels", desc: "Discover hotels near your destination.", icon: "📍", gradient: "from-blue-500 to-blue-700", data: HOTELS },
  { id: "premium", label: "Premium Resorts", desc: "Top-rated beach and mountain resorts.", icon: "⭐", gradient: "from-cyan-500 to-blue-400", data: [...BEACH_HOTELS, ...VILLAS] },
  { id: "nature", label: "Nature Retreats", desc: "Peaceful forest and eco stays.", icon: "🌿", gradient: "from-emerald-500 to-teal-500", data: NATURE_RETREATS },
  { id: "beach", label: "Beach Hotels", desc: "Ocean-view hotels and villas.", icon: "🌊", gradient: "from-blue-400 to-cyan-300", data: BEACH_HOTELS },
];

/* ═══════════════════════════════════════════════════════════════════
   SHARED UTILS
═══════════════════════════════════════════════════════════════════ */
function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-1">
      <span className="text-yellow-400 text-sm">★</span>
      <span className="text-white font-semibold text-sm">{rating}</span>
    </span>
  );
}

function PriceTag({ price, suffix = "/night" }) {
  return (
    <div>
      <span className="text-xs text-slate-400">from </span>
      <span className="text-cyan-400 font-bold text-lg">₹{price.toLocaleString("en-IN")}</span>
      <span className="text-slate-400 text-xs">{suffix}</span>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="text-xs bg-white/10 text-slate-300 px-2 py-0.5 rounded-full border border-white/10">{children}</span>
  );
}

function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div className="w-10 h-10 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
      <span className="text-slate-400 text-sm">Loading results…</span>
    </div>
  );
}

function SectionHeader({ title, subtitle, action, onAction }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {subtitle && <p className="text-slate-400 text-sm mt-1">{subtitle}</p>}
      </div>
      {action && (
        <button onClick={onAction} className="text-cyan-400 text-sm font-semibold hover:text-cyan-300 transition-colors">{action}</button>
      )}
    </div>
  );
}

function BackBtn({ onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm mb-6 group">
      <span className="group-hover:-translate-x-1 transition-transform">←</span>
      Back
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HOTEL CARD (matches Image 1 style)
═══════════════════════════════════════════════════════════════════ */
function HotelCard({ hotel, onExplore, onBook, delay = 0 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.2)",
        animationDelay: `${delay}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden" style={{ height: 220 }}>
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={e => { e.target.src = "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-3 right-3">
          <span className="bg-cyan-500/90 text-white text-xs font-bold px-2 py-1 rounded-lg backdrop-blur-sm">{hotel.type}</span>
        </div>
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center gap-1 text-cyan-400 text-xs font-semibold mb-1">
            <span>📍</span>
            <span>{hotel.country}</span>
          </div>
          <h3 className="text-white font-bold text-xl leading-tight">{hotel.name}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <StarRating rating={hotel.rating} />
          <span className="text-slate-400 text-xs">{hotel.reviews} reviews</span>
        </div>
        <div className="flex gap-1 flex-wrap mb-3">
          {hotel.tags.map(t => <Tag key={t}>{t}</Tag>)}
        </div>
        <div className="flex items-center justify-between mb-3">
          <PriceTag price={hotel.price} />
          <span className="text-xs text-slate-400">{hotel.rooms} rooms left</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onExplore(hotel)}
            className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
              color: "#001a2e",
              border: "none",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Explore Stay
          </button>
          {onBook && (
            <button
              onClick={() => onBook(hotel)}
              className="px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "#e2e8f0",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.14)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
            >
              Book
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SEARCH BAR
═══════════════════════════════════════════════════════════════════ */
function SearchBar({ onSearch, placeholder = "Search destination, hotel name…" }) {
  const [q, setQ] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const inputCls = "w-full bg-white/7 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/10 transition-all placeholder-slate-500";

  return (
    <div className="rounded-2xl p-5 mb-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Destination</label>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder={placeholder} className={inputCls} onKeyDown={e => e.key === "Enter" && onSearch({ q, checkIn, checkOut, guests })} />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Check In</label>
          <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className={inputCls} style={{ colorScheme: "dark" }} />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Check Out</label>
          <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className={inputCls} style={{ colorScheme: "dark" }} />
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2.5 border border-white/10">
          <span className="text-slate-400 text-sm">Guests:</span>
          <button onClick={() => setGuests(g => Math.max(1, g - 1))} className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm hover:bg-cyan-500/40 transition-colors">−</button>
          <span className="text-white font-semibold w-4 text-center">{guests}</span>
          <button onClick={() => setGuests(g => g + 1)} className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm hover:bg-cyan-500/40 transition-colors">+</button>
        </div>
        <button
          onClick={() => onSearch({ q, checkIn, checkOut, guests })}
          className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all"
          style={{ background: "linear-gradient(135deg, #0284c7, #06b6d4)", color: "#001520" }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          🔍 Search Hotels
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BOOKING MODAL / PAGE
═══════════════════════════════════════════════════════════════════ */
function BookingPage({ hotel, room, onBack, serviceType }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", checkIn: "", checkOut: "", requests: "" });
  const [confirmed, setConfirmed] = useState(false);

  const nights = form.checkIn && form.checkOut
    ? Math.max(1, Math.ceil((new Date(form.checkOut) - new Date(form.checkIn)) / 86400000))
    : 1;
  const total = (room || hotel) ? (room ? room.price : hotel.price) * nights : 0;
  const [booking, setBooking] = useState(null);
  const handleConfirm = async () => {
    try {

      const token = localStorage.getItem("token");
      const bookingData = {
        serviceType: "hotel",
        paymentStatus: "Paid",

        hotel: {
          id: hotel.id,
          name: hotel.name,
          location: hotel.location,
          country: hotel.country,
          image: hotel.image,
          rating: hotel.rating,
          price: hotel.price,
          type:  serviceType,
        },

        guestDetails: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          requests: form.requests,
        },

        checkIn: form.checkIn,
        checkOut: form.checkOut,
        nights,
        totalAmount: total,
      };

      const response = await fetch(
        "http://localhost:3000/api/hotel-book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setBooking(data.booking);
        setConfirmed(true);
      }

    } catch (error) {
      console.log(error);
    }
  };

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center" style={{ animation: "fadeIn 0.4s ease" }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6" style={{ background: "rgba(34,197,94,0.15)", border: "2px solid rgba(34,197,94,0.4)" }}>✓</div>
        <h2 className="text-3xl font-bold text-white mb-3">Booking Confirmed!</h2>
        <p className="text-slate-400 mb-2">Your reservation at <span className="text-cyan-400 font-semibold">{hotel?.name}</span> is confirmed.</p>
        <p className="text-slate-500 text-sm">Confirmation email sent to {form.email || "your email"}</p>
        <div className="mt-6 px-6 py-3 rounded-xl text-sm font-semibold" style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80" }}>
          Booking ID: {booking?.bookingId}
        </div>
      </div>
    );
  }

  return (
    <div style={{ animation: "slideUp 0.3s ease" }}>
      <BackBtn onClick={onBack} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          {/* Steps */}
          <div className="flex gap-2 mb-6">
            {["Guest Details", "Room Selection", "Confirm"].map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => step > i + 1 && setStep(i + 1)}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= i + 1 ? "bg-cyan-500 text-white" : "bg-white/10 text-slate-400"}`}>{i + 1}</div>
                  <span className={`text-sm ${step === i + 1 ? "text-white font-semibold" : "text-slate-500"}`}>{s}</span>
                </div>
                {i < 2 && <span className="text-slate-700 mx-1">→</span>}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="rounded-2xl p-6 space-y-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="text-white font-bold text-lg mb-4">Guest Information</h3>
              {[
                { label: "Full Name", key: "name", type: "text", ph: "e.g. Rajesh Kumar" },
                { label: "Email Address", key: "email", type: "email", ph: "your@email.com" },
                { label: "Phone Number", key: "phone", type: "tel", ph: "+91 98765 43210" },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">{f.label}</label>
                  <input type={f.type} placeholder={f.ph} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    className="w-full bg-white/7 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/60 transition-all placeholder-slate-500"
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Check In</label>
                  <input type="date" value={form.checkIn} onChange={e => setForm(p => ({ ...p, checkIn: e.target.value }))} className="w-full bg-white/7 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/60 transition-all" style={{ colorScheme: "dark" }} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Check Out</label>
                  <input type="date" value={form.checkOut} onChange={e => setForm(p => ({ ...p, checkOut: e.target.value }))} className="w-full bg-white/7 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/60 transition-all" style={{ colorScheme: "dark" }} />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Special Requests</label>
                <textarea rows={3} value={form.requests} onChange={e => setForm(p => ({ ...p, requests: e.target.value }))} placeholder="Any special requirements…" className="w-full bg-white/7 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/60 transition-all placeholder-slate-500 resize-none" />
              </div>
              <button onClick={() => setStep(2)} className="w-full py-3 rounded-xl font-bold text-sm" style={{ background: "linear-gradient(135deg, #0284c7, #06b6d4)", color: "#001520" }}>Continue →</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg mb-4">Choose Your Room</h3>
              {ROOMS_DEMO.map(r => (
                <div key={r.id} className="rounded-2xl overflow-hidden flex gap-0 cursor-pointer transition-all duration-200 hover:border-cyan-500/40"
                  style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${room?.id === r.id ? "rgba(6,182,212,0.5)" : "rgba(255,255,255,0.08)"}` }}
                  onClick={() => { /* room selection handled by parent */ }}
                >
                  <img src={r.image} alt={r.name} className="w-36 object-cover flex-shrink-0" style={{ height: 140 }} onError={e => e.target.src = HOTEL_IMAGES[0]} />
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-white font-bold text-base">{r.name}</h4>
                        <div className="text-slate-400 text-xs mt-0.5">{r.size} · {r.bed} · Up to {r.guests} guests</div>
                      </div>
                      <div className="text-right">
                        <div className="text-cyan-400 font-bold text-lg">₹{r.price.toLocaleString("en-IN")}</div>
                        <div className="text-slate-500 text-xs">/night</div>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-wrap mb-3">
                      {r.amenities.slice(0, 5).map(a => <Tag key={a}>{a}</Tag>)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-emerald-400">{r.available} rooms available</span>
                      <button onClick={() => setStep(3)} className="px-4 py-2 rounded-lg text-xs font-bold transition-all" style={{ background: "linear-gradient(135deg, #0284c7, #06b6d4)", color: "#001520" }}>Select Room</button>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={() => setStep(1)} className="text-slate-400 text-sm hover:text-white transition-colors">← Back to details</button>
            </div>
          )}

          {step === 3 && (
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="text-white font-bold text-lg mb-6">Confirm Booking</h3>
              <div className="space-y-3 mb-6">
                {[
                  ["Hotel", hotel?.name],
                  ["Check In", form.checkIn || "Not set"],
                  ["Check Out", form.checkOut || "Not set"],
                  ["Nights", nights],
                  ["Guest", form.name || "Not set"],
                  ["Email", form.email || "Not set"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <span className="text-slate-400 text-sm">{k}</span>
                    <span className="text-white text-sm font-medium">{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center p-4 rounded-xl mb-4" style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)" }}>
                <span className="text-slate-300 font-semibold">Total Amount</span>
                <span className="text-cyan-400 font-bold text-2xl">₹{total.toLocaleString("en-IN")}</span>
              </div>
              <div className="text-xs text-slate-500 mb-4 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                * Free cancellation up to 48h before check-in. GST & service charges included.
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl font-semibold text-sm text-slate-400 hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>← Modify</button>
                <button onClick={handleConfirm} className="flex-1 py-3 rounded-xl font-bold text-sm" style={{ background: "linear-gradient(135deg, #0284c7, #06b6d4)", color: "#001520" }}>Confirm & Pay</button>
              </div>
            </div>
          )}
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-4">
          <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <img src={hotel?.image} alt={hotel?.name} className="w-full object-cover" style={{ height: 160 }} onError={e => e.target.src = HOTEL_IMAGES[0]} />
            <div className="p-4">
              <div className="flex items-center gap-1 text-cyan-400 text-xs font-semibold mb-1">📍 {hotel?.country}</div>
              <h4 className="text-white font-bold text-base mb-2">{hotel?.name}</h4>
              <StarRating rating={hotel?.rating} />
              <div className="mt-3 pt-3 space-y-2" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Price per night</span>
                  <span className="text-white font-semibold">₹{hotel?.price?.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Nights</span>
                  <span className="text-white font-semibold">{nights}</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="text-white">Total</span>
                  <span className="text-cyan-400">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-xl p-4 text-xs space-y-2" style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)" }}>
            {["✓ Free cancellation 48h prior", "✓ Instant confirmation", "✓ Best price guarantee", "✓ 24/7 customer support"].map(t => (
              <div key={t} className="text-emerald-400">{t}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HOTEL DETAIL PAGE
═══════════════════════════════════════════════════════════════════ */
function HotelDetailPage({ hotel, onBack, onBook }) {
  const [tab, setTab] = useState("overview");
  const tabs = ["overview", "rooms", "amenities", "location"];

  return (
    <div style={{ animation: "slideUp 0.3s ease" }}>
      <BackBtn onClick={onBack} />

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-6" style={{ height: 340 }}>
        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" onError={e => e.target.src = HOTEL_IMAGES[0]} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold mb-2">📍 {hotel.country} · {hotel.location}</div>
            <h1 className="text-white font-bold text-3xl mb-2">{hotel.name}</h1>
            <div className="flex items-center gap-3">
              <StarRating rating={hotel.rating} />
              <span className="text-slate-400 text-sm">{hotel.reviews} reviews</span>
              <span className="bg-cyan-500/20 text-cyan-400 text-xs font-bold px-2 py-0.5 rounded-lg border border-cyan-500/30">{hotel.type}</span>
            </div>
          </div>
          <div className="text-right">
            <PriceTag price={hotel.price} />
            <button onClick={() => onBook(hotel)} className="mt-2 px-6 py-2.5 rounded-xl font-bold text-sm" style={{ background: "linear-gradient(135deg, #0284c7, #06b6d4)", color: "#001520" }}>Book Now</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", width: "fit-content" }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all"
            style={{ background: tab === t ? "linear-gradient(135deg, #0284c7, #06b6d4)" : "transparent", color: tab === t ? "#001520" : "#94a3b8" }}
          >{t}</button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="text-white font-bold text-base mb-3">About {hotel.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Experience unparalleled luxury at {hotel.name}, nestled in the heart of {hotel.country}. Our world-class property offers stunning views, exceptional dining, and a range of curated experiences designed to make your stay truly unforgettable. Whether you're here for leisure or business, every detail is crafted to perfection.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[["Check-in", "2:00 PM"], ["Check-out", "12:00 PM"], ["Parking", "Complimentary"], ["Breakfast", "Included"]].map(([k, v]) => (
                <div key={k} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">{k}</div>
                  <div className="text-white font-semibold text-sm">{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="text-white font-bold text-base mb-3">Quick Stats</h3>
              {[["Rating", `${hotel.rating}/5`], ["Reviews", hotel.reviews], ["Rooms Available", hotel.rooms], ["Location", hotel.location]].map(([k, v]) => (
                <div key={k} className="flex justify-between py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="text-slate-400 text-sm">{k}</span>
                  <span className="text-cyan-400 text-sm font-semibold">{v}</span>
                </div>
              ))}
            </div>
            <button onClick={() => onBook(hotel)} className="w-full py-3 rounded-xl font-bold text-sm" style={{ background: "linear-gradient(135deg, #0284c7, #06b6d4)", color: "#001520" }}>Book This Hotel</button>
          </div>
        </div>
      )}

      {tab === "rooms" && (
        <div className="space-y-4">
          {ROOMS_DEMO.map(r => (
            <div key={r.id} className="rounded-2xl overflow-hidden flex gap-0 transition-all hover:border-cyan-500/30" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <img src={r.image} alt={r.name} className="w-48 object-cover flex-shrink-0" style={{ height: 160 }} onError={e => e.target.src = HOTEL_IMAGES[0]} />
              <div className="flex-1 p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-white font-bold text-base">{r.name}</h4>
                    <div className="text-slate-400 text-xs mt-0.5">{r.size} · {r.bed} · Up to {r.guests} guests</div>
                  </div>
                  <div className="text-right">
                    <div className="text-cyan-400 font-bold text-xl">₹{r.price.toLocaleString("en-IN")}</div>
                    <div className="text-slate-500 text-xs">/night</div>
                  </div>
                </div>
                <div className="flex gap-1 flex-wrap mb-3">{r.amenities.map(a => <Tag key={a}>{a}</Tag>)}</div>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 text-xs">{r.available} rooms left</span>
                  <button onClick={() => onBook(hotel)} className="px-5 py-2 rounded-lg font-bold text-xs" style={{ background: "linear-gradient(135deg, #0284c7, #06b6d4)", color: "#001520" }}>Book Room</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "amenities" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["🏊 Swimming Pool", "🧖 Spa & Wellness", "💪 Fitness Center", "🍽️ Fine Dining", "🚗 Valet Parking", "🌐 Free WiFi", "🎭 Entertainment", "🛎️ 24/7 Concierge", "🍳 Breakfast Included", "✈️ Airport Transfer", "🏋️ Gym", "🌿 Garden"].map(a => (
            <div key={a} className="rounded-xl p-4 text-center transition-all hover:border-cyan-500/30" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-2xl mb-2">{a.split(" ")[0]}</div>
              <div className="text-slate-300 text-xs">{a.slice(3)}</div>
            </div>
          ))}
        </div>
      )}

      {tab === "location" && (
        <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📍</span>
            <div>
              <h3 className="text-white font-bold">{hotel.name}</h3>
              <div className="text-slate-400 text-sm">{hotel.location}, {hotel.country}</div>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden mb-4" style={{ height: 240, background: "linear-gradient(135deg, #0f172a, #1e293b)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="text-center">
              <div className="text-4xl mb-3">🗺️</div>
              <div className="text-slate-400 text-sm">Interactive map — replace with Google Maps API</div>
              <div className="text-cyan-400 text-xs mt-1">{hotel.location}, {hotel.country}</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[["🏖️ Beach", "2.1 km"], ["🛒 Market", "0.8 km"], ["✈️ Airport", "24 km"]].map(([k, v]) => (
              <div key={k} className="text-center p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
                <div className="text-lg mb-1">{k.split(" ")[0]}</div>
                <div className="text-slate-400 text-xs">{k.slice(3)}</div>
                <div className="text-cyan-400 text-xs font-semibold">{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SERVICE RESULTS PAGE (generic, used by all 8 services)
═══════════════════════════════════════════════════════════════════ */
function ServiceResultsPage({ service, onBack, onExplore, onBook }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("rating");
  const [searchParams, setSearchParams] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "http://localhost:3000/api/admin/get-tours"
        );

        const tours = await res.json();

        const hotels = tours
          .filter(
            (tour) =>
              tour.category === "Hotel"
          )
          .map((tour) => ({
            id: tour._id,
            name: tour.name,
            location: tour.destination,
            country: tour.destination,
            image: tour.img,
            rating: tour.rating || 4.5,
            reviews: tour.reviews || 0,
            price: tour.price,
            tags: tour.amenities || [],
            rooms: tour.roomsLeft || 0,
            type: tour.roomType || "Hotel",
            driver: tour.driver,
          }));

        setHotels(hotels);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const filtered = hotels
    .filter(h => {
      if (filter === "all") return true;
      if (filter === "budget") return h.price < 5000;
      if (filter === "mid") return h.price >= 5000 && h.price < 12000;
      if (filter === "luxury") return h.price >= 12000;
      return true;
    })
    .sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      return 0;
    });

  const searched = searchParams?.q
    ? filtered.filter(h => h.name.toLowerCase().includes(searchParams.q.toLowerCase()) || h.country.toLowerCase().includes(searchParams.q.toLowerCase()) || h.location.toLowerCase().includes(searchParams.q.toLowerCase()))
    : filtered;

  return (
    <div style={{ animation: "slideUp 0.3s ease" }}>
      <BackBtn onClick={onBack} />

      {/* Service Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-2xl`}>{service.icon}</div>
        <div>
          <h2 className="text-2xl font-bold text-white">{service.label}</h2>
          <p className="text-slate-400 text-sm">{service.desc}</p>
        </div>
        <div className="ml-auto text-right">
          <div className="text-cyan-400 font-bold text-xl">{service.data.length}+</div>
          <div className="text-slate-500 text-xs">properties</div>
        </div>
      </div>

      {/* Search */}
      <SearchBar onSearch={setSearchParams} placeholder={`Search ${service.label.toLowerCase()}…`} />

      {/* Filters + Sort */}
      <div className="flex flex-wrap gap-3 mb-6 items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {[["all", "All"], ["budget", "Budget (<₹5k)"], ["mid", "Mid (₹5k-12k)"], ["luxury", "Luxury (₹12k+)"]].map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: filter === v ? "linear-gradient(135deg, #0284c7, #06b6d4)" : "rgba(255,255,255,0.06)",
                color: filter === v ? "#001520" : "#94a3b8",
                border: filter === v ? "none" : "1px solid rgba(255,255,255,0.1)"
              }}
            >{l}</button>
          ))}
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)} className="bg-white/6 border border-white/10 rounded-xl px-4 py-2 text-slate-300 text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", appearance: "none" }}>
          <option value="rating">Sort: Rating</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {loading ? <Spinner /> : (
        <>
          <div className="text-slate-400 text-sm mb-4">{searched.length} results found</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {searched.map((h, i) => (
              <HotelCard key={h.id} hotel={h} delay={i * 60} onExplore={onExplore} onBook={onBook} />
            ))}
          </div>
          {searched.length === 0 && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <div className="text-white font-semibold text-lg mb-2">No results found</div>
              <div className="text-slate-400 text-sm">Try different keywords or clear filters</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   NEARBY HOTELS — uses geolocation prompt (demo)
═══════════════════════════════════════════════════════════════════ */
function NearbyPage({ service, onBack, onExplore, onBook }) {
  const [detected, setDetected] = useState(false);
  const [location, setLocation] = useState("Detecting…");

  useEffect(() => {
    setTimeout(() => {
      setLocation("Varanasi, Uttar Pradesh");
      setDetected(true);
    }, 1500);
  }, []);

  return (
    <div style={{ animation: "slideUp 0.3s ease" }}>
      <BackBtn onClick={onBack} />
      {!detected ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
          <div className="text-white font-semibold">Detecting your location…</div>
          <div className="text-slate-400 text-sm">Fetching nearby hotels</div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 mb-6 p-4 rounded-xl" style={{ background: "rgba(6,182,212,0.07)", border: "1px solid rgba(6,182,212,0.2)" }}>
            <span className="text-2xl">📍</span>
            <div>
              <div className="text-white font-semibold">Showing hotels near</div>
              <div className="text-cyan-400 font-bold">{location}</div>
            </div>
            <button className="ml-auto text-slate-400 text-sm hover:text-white transition-colors">Change Location</button>
          </div>
          <ServiceResultsPage service={{ ...service, label: `Hotels near ${location}` }} onBack={onBack} onExplore={onExplore} onBook={onBook} />
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SAFE STAYS — adds verification badges
═══════════════════════════════════════════════════════════════════ */
function SafeStaysPage({ service, onBack, onExplore, onBook }) {
  return (
    <div style={{ animation: "slideUp 0.3s ease" }}>
      <BackBtn onClick={onBack} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[["✅", "Verified Properties", "All stays verified by TourX inspectors"], ["🛡️", "Secure Payments", "256-bit encrypted transactions"], ["📞", "24/7 Support", "Round-the-clock assistance"], ["↩️", "Easy Refunds", "Hassle-free cancellation policy"]].map(([icon, title, desc]) => (
          <div key={title} className="rounded-xl p-4 text-center" style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)" }}>
            <div className="text-2xl mb-2">{icon}</div>
            <div className="text-white font-semibold text-sm mb-1">{title}</div>
            <div className="text-slate-400 text-xs">{desc}</div>
          </div>
        ))}
      </div>
      <ServiceResultsPage service={service} onBack={onBack} onExplore={onExplore} onBook={onBook} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HOME / LANDING
═══════════════════════════════════════════════════════════════════ */
function HomePage({ onService }) {
  return (
    <div>
      {/* Services Grid — matches Image 2 */}
      <SectionHeader title="Our Services" subtitle="Everything you need for the perfect stay" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {SERVICES.map((svc, i) => (
          <div
            key={svc.id}
            onClick={() => onService(svc)}
            className="rounded-2xl p-5 cursor-pointer group transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: svc.highlight ? "1px solid rgba(6,182,212,0.4)" : "1px solid rgba(255,255,255,0.08)",
              animationDelay: `${i * 60}ms`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.border = "1px solid rgba(6,182,212,0.45)";
              e.currentTarget.style.background = "rgba(6,182,212,0.05)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.border = svc.highlight ? "1px solid rgba(6,182,212,0.4)" : "1px solid rgba(255,255,255,0.08)";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${svc.gradient} flex items-center justify-center text-2xl mb-4 transition-transform group-hover:scale-110`}>{svc.icon}</div>
            <h3 className={`font-bold text-base mb-2 ${svc.highlight ? "text-cyan-400" : "text-white"}`}>{svc.label}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">{svc.desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-cyan-400 text-sm font-semibold">Explore</span>
              <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:bg-cyan-500" style={{ background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.25)" }}>
                <span className="text-cyan-400 text-sm group-hover:text-white">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════════════ */
export default function HotelServices() {
  const [page, setPage] = useState("home"); // home | service | detail | booking
  const [activeService, setActiveService] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const navigate = useNavigate();
  const go = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const handleService = (svc) => { setActiveService(svc); go("service"); };
  const handleExplore = (hotel) => {

    setSelectedHotel(hotel); go("detail");
  };
  const handleBook = (hotel) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/join");
      return;
    }
    setSelectedHotel(hotel); go("booking");
  };
  const handleBack = () => {
    if (page === "booking") go(selectedHotel ? "detail" : "service");
    else if (page === "detail") go(activeService ? "service" : "home");
    else go("home");
  };


  const renderService = () => {
    if (!activeService) return null;
    const props = { service: activeService, onBack: () => go("home"), onExplore: handleExplore, onBook: handleBook };
    if (activeService.id === "nearby") return <NearbyPage {...props} />;
    if (activeService.id === "safe") return <SafeStaysPage {...props} />;
    return <ServiceResultsPage {...props} />;
  };

  return (

    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #060d18 0%, #0a1628 50%, #06111f 100%)",
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      color: "#e2e8f0",
    }}>
      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(6,182,212,0.25); border-radius: 3px; }
        input:focus, select:focus, textarea:focus { border-color: rgba(6,182,212,0.6) !important; outline: none; box-shadow: 0 0 0 3px rgba(6,182,212,0.1); }
        select option { background: #0a1628; color: #e2e8f0; }
      `}</style>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px 80px" }}>
        {/* Breadcrumb */}
        {page !== "home" && (
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2" style={{ animation: "fadeIn 0.3s ease" }}>
            <span className="cursor-pointer hover:text-cyan-400 transition-colors" onClick={() => go("home")}>Main</span>
            {activeService && <>
              <span>›</span>
              <span className={`cursor-pointer hover:text-cyan-400 transition-colors ${page === "service" ? "text-cyan-400" : ""}`} onClick={() => go("service")}>{activeService.label}</span>
            </>}
            {selectedHotel && page !== "service" && <>
              <span>›</span>
              <span className={page === "detail" ? "text-cyan-400" : "cursor-pointer hover:text-cyan-400 transition-colors"} onClick={() => page === "booking" && go("detail")}>{selectedHotel.name}</span>
            </>}
            {page === "booking" && <><span>›</span><span className="text-cyan-400">Booking</span></>}
          </div>
        )}

        <div key={page} style={{ animation: "slideUp 0.3s ease" }}>
          {page === "home" && <HomePage onService={handleService} onExplore={handleExplore} onBook={handleBook} />}
          {page === "service" && renderService()}
          {page === "detail" && selectedHotel && <HotelDetailPage hotel={selectedHotel} onBack={handleBack} onBook={handleBook} />}
          {page === "booking" && selectedHotel && <BookingPage hotel={selectedHotel} serviceType={activeService?.id} onBack={handleBack} onConfirm={() => { setSelectedHotel(null); go("home"); }} />}
        </div>
      </main>
      <FooterComponent />
    </div>
  );
}
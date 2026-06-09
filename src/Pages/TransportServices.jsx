import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import FooterComponent from "../Components/FooterComponent";



const API_BASE = "http://localhost:3000/api";

function useTours(category) {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await window.fetch(`${API_BASE}/admin/get-tours`);
      const data = await res.json();
      // Filter by category on the client side
      const filtered = data.filter(t =>
        category === "all"
          ? true
          : t.category?.toLowerCase() === category.toLowerCase()
      );
      setTours(filtered);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category]);

  return { tours, loading, error, refetch: fetch };
}

// Pehle ye map function add karo (baaki map functions ke paas)
function mapTourToOutstation(t) {
  return {
    id: t._id,
    name: t.vehicleModel || t.name,
    type: t.vehicleType || "Sedan",
    category: t.category,
    seats: t.available || 4,
    ac: t.amenities?.includes("AC") ?? true,
    image: t.img || CAB_IMAGES[0],
    rating: t.rating || 4.5,
    reviews: t.reviews || 0,
    pricePerKm: t.perHourRate || 12,
    baseFare: t.estimatedFare || 80,
    location: t.destination,
    driver: t.driver?.name || "Driver",
    driverRating: t.driver?.rating || 4.5,
    plate: t.driver?.plate || "—",
    eta: t.eta || "—",
    features: t.amenities || [],
    totalFare: t.estimatedFare || (80 + (t.perHourRate || 12) * 282),
  };
}
// Map Tour model → CabCard-compatible shape
function mapTourToCab(t) {
  return {
    id: t._id,
    name: t.vehicleModels || t.name,
    type: t.vehicleType || "Sedan",
    category: t.category,
    seats: t.available || 4,
    ac: t.amenities?.includes("AC") ?? true,
    image: t.img || CAB_IMAGES[0],
    rating: t.rating || 4,
    reviews: t.status || 0,
    pricePerKm: t.perHourRate || 12,
    baseFare: t.estimatedFare || 80,
    location: t.destination,
    driver: t.driver?.name || "Driver",
    driverRating: t.driver?.rating || 4.5,
    plate: t.driver?.plate || "—",
    eta: t.eta || "—",
    features: t.amenities || [],
  };
}

// Map Tour model → BusCard-compatible shape
function mapTourToBus(t) {
  return {
    id: t._id,
    name: t.name,
    operator: t.name,
    type: t.roomType || "Seater",
    ac: t.amenities?.includes("AC") ?? true,
    image: t.img || BUS_IMAGES[0],
    rating: t.rating || 4.5,
    reviews: t.reviews || 0,
    from: t.destination?.split("→")[0]?.trim() || t.destination,
    to: t.destination?.split("→")[1]?.trim() || "varanasi",
    
    duration: t.distanceKm ? `${Math.round(t.distanceKm / 60)}h` : "—",
    date: "—",
    seats: { total: t.roomsLeft || 40, available: t.seatsLeft || 10 },
    price: t.price,
    amenities: t.amenities || [],
    liveTracking: false,
  };
}

// Map Tour model → BikeCard-compatible shape
function mapTourToBike(t) {
  return {
    id: t._id,
    name: t.vehicleModel || t.name,
    type: t.vehicleType || "Cruiser",
    cc: 350,
    image: t.img || BIKE_IMAGES[0],
    rating: t.rating || 4.5,
    reviews: t.reviews || 0,
    pricePerDay: t.price,
    pricePerHour: t.perHourRate || Math.round(t.price / 8),
    location: t.destination,
    fuel: t.fuelPolicy || "Full-to-Full",
    available: t.available || 1,
    features: t.amenities || [],
  };
}

const CAB_IMAGES = [

  "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80",
  "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80",
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=80",
  "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
];
const BUS_IMAGES = [
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=80",
  "https://images.unsplash.com/photo-1546636889-ba9fdd63583e?w=600&q=80",
];
const BIKE_IMAGES = [
  "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80",
  "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=600&q=80",
  "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80",
  "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80",
  "https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?w=600&q=80",
];


const CITIES = ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Goa", "Manali", "Jaipur", "Agra", "Varanasi", "Pune", "Chennai", "Kolkata", "Ahmedabad", "Surat", "Lucknow"];






const FEATURE_RIDES = [
  { id: "f1", title: "Luxury Cab Ride", location: "Dubai", image: CAB_IMAGES[4], type: "cab", tag: "Premium" },
  { id: "f2", title: "Mountain Bike Tour", location: "Manali", image: BIKE_IMAGES[0], type: "bike", tag: "Adventure" },
  { id: "f3", title: "Premium Bus Journey", location: "Delhi", image: BUS_IMAGES[0], type: "bus", tag: "Comfort" },
  { id: "f4", title: "Beach Road Trip", location: "Goa", image: CAB_IMAGES[1], type: "cab", tag: "Scenic" },
];


const SERVICES = [
  { id: "cab", label: "Cab Booking", desc: "Book local and outstation cabs instantly.", icon: "🚗", svg: "M3 13h1l1-3h10l1 3h1a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm2 0V9h8v4H5zm1 3a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm6 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0z", gradient: "from-blue-500 to-cyan-400" },
  { id: "bus", label: "Bus Tickets", desc: "Reserve luxury and sleeper buses easily.", icon: "🚌", svg: "M4 16V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10m-2 0a2 2 0 1 1-4 0m4 0H8m0 0a2 2 0 1 1-4 0m16-8H4", gradient: "from-cyan-400 to-blue-500" },
  { id: "bike", label: "Bike Rentals", desc: "Rent sports and city bikes nearby.", icon: "🏍️", svg: "M12 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM6 16a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm10 0a4 4 0 1 0 8 0 4 4 0 0 0-8 0zM9 16l3-8 4 4", gradient: "from-blue-600 to-blue-400" },
  { id: "outstation", label: "Outstation Trips", desc: "Comfortable intercity travel options.", icon: "🗺️", svg: "M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 1.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0 0 21 18.382V7.618a1 1 0 0 0-1.447-.894L15 9m0 8V9m0 0L9 7", gradient: "from-cyan-500 to-blue-400" },
  { id: "Provider", label: "Make Provider", desc: "Request to admin to make transport Provider", icon: "👨‍💼", svg: "M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 1.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0 0 21 18.382V7.618a1 1 0 0 0-1.447-.894L15 9m0 8V9m0 0L9 7", gradient: "from-cyan-500 to-blue-400" },
];


const S = {
  card: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16 },
  input: { width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "12px 16px", color: "#e2e8f0", fontSize: 14, outline: "none" },
  btn: { background: "linear-gradient(135deg,#0284c7,#06b6d4)", border: "none", borderRadius: 12, padding: "12px 28px", color: "#001520", fontSize: 14, fontWeight: 700, cursor: "pointer" },
  ghost: { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "10px 18px", color: "#94a3b8", fontSize: 13, cursor: "pointer" },
};

function Tag({ c = "#94a3b8", bg = "rgba(255,255,255,0.07)", children }) {
  return <span style={{ background: bg, color: c, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)", whiteSpace: "nowrap" }}>{children}</span>;
}
function Stars({ r }) {
  return <span style={{ color: "#fbbf24", fontSize: 13 }}>★ <span style={{ color: "#fff", fontWeight: 600 }}>{r}</span></span>;
}
function Pill({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{ background: active ? "linear-gradient(135deg,#0284c7,#06b6d4)" : "rgba(255,255,255,0.06)", color: active ? "#001520" : "#94a3b8", border: active ? "none" : "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "7px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}>
      {children}
    </button>
  );
}
function Back({ onClick }) {
  return (
    <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontSize: 13, cursor: "pointer", background: "none", border: "none", marginBottom: 20, padding: 0 }}
      onMouseEnter={e => e.currentTarget.style.color = "#06b6d4"} onMouseLeave={e => e.currentTarget.style.color = "#64748b"}>
      ← Back
    </button>
  );
}
function Spin() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 0", gap: 12 }}>
      <div style={{ width: 32, height: 32, borderRadius: "50%", border: "3px solid rgba(6,182,212,0.2)", borderTopColor: "#06b6d4", animation: "spin 0.8s linear infinite" }} />
      <span style={{ color: "#64748b", fontSize: 13 }}>Fetching rides…</span>
    </div>
  );
}
function CitySelect({ label, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState(value);
  const filtered = CITIES.filter(c => c.toLowerCase().includes(q.toLowerCase())).slice(0, 7);
  useEffect(() => { setQ(value); }, [value]);
  return (
    <div style={{ position: "relative" }}>
      {label && <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>}
      <input value={q} onChange={e => { setQ(e.target.value); onChange(""); setOpen(true); }} onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 180)} placeholder={placeholder || "Select city"} style={{ ...S.input }} />
      {open && filtered.length > 0 && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: "#0d1b2e", border: "1px solid rgba(6,182,212,0.3)", borderRadius: 12, zIndex: 200, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
          {filtered.map(c => (
            <div key={c} onMouseDown={() => { onChange(c); setQ(c); setOpen(false); }} style={{ padding: "10px 16px", cursor: "pointer", fontSize: 14, color: "#e2e8f0", transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(6,182,212,0.1)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              📍 {c}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CAB CARD
══════════════════════════════════════════════════════════════ */
function CabCard({ cab, onExplore, onBook, delay = 0 }) {
  const [hov, setHov] = useState(false);
  const km = 25;
  const fare = cab.baseFare + (cab.pricePerKm * km);
  return (
    <div style={{ ...S.card, overflow: "hidden", transition: "all 0.3s", transform: hov ? "translateY(-5px)" : "none", boxShadow: hov ? "0 20px 50px rgba(0,0,0,0.5)" : "none", animation: `slideUp 0.35s ease ${delay}ms both` }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <img src={cab.image} alt={cab.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s", transform: hov ? "scale(1.08)" : "scale(1)" }} onError={e => e.target.src = CAB_IMAGES[0]} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)" }} />
        <div style={{ position: "absolute", top: 10, left: 10 }}><Tag bg="rgba(6,182,212,0.8)" c="#001520">{cab.category}</Tag></div>
        <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", borderRadius: 8, padding: "4px 10px", color: "#4ade80", fontSize: 12, fontWeight: 600 }}>ETA {cab.eta}</div>
        <div style={{ position: "absolute", bottom: 12, left: 12 }}>
          <div style={{ color: "#06b6d4", fontSize: 11, fontWeight: 600, marginBottom: 2 }}>📍 {cab.location}</div>
          <div style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>{cab.name}</div>
          <div style={{ color: "#94a3b8", fontSize: 12 }}>{cab.type} · {cab.seats} seats</div>
        </div>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <Stars r={cab.rating} />
          <span style={{ color: "#476954", fontSize: 11 }}>{cab.reviews} rides</span>
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <span style={{ color: "#64748b", fontSize: 11 }}>Est. fare (25km) </span>
            <span style={{ color: "#06b6d4", fontSize: 18, fontWeight: 800 }}>₹{fare}</span>
          </div>
          <span style={{ color: "#64748b", fontSize: 11 }}>₹{cab.pricePerKm}/km</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => onExplore(cab)} style={{ ...S.btn, flex: 1, padding: "10px 0", fontSize: 13 }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            Explore Ride
          </button>
          <button onClick={() => onBook({ type: "cab", item: cab })} style={{ ...S.ghost, padding: "10px 16px" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}>
            Book
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   BUS CARD
══════════════════════════════════════════════════════════════ */
function BusCard({ bus, onExplore, onBook, delay = 0 }) {
  const [hov, setHov] = useState(false);
  const availPct = (bus.seats.available / bus.seats.total) * 100;
  const availColor = availPct > 40 ? "#4ade80" : availPct > 15 ? "#fbbf24" : "#f87171";
  return (
    <div style={{ ...S.card, overflow: "hidden", transition: "all 0.3s", transform: hov ? "translateY(-5px)" : "none", boxShadow: hov ? "0 20px 50px rgba(0,0,0,0.5)" : "none", animation: `slideUp 0.35s ease ${delay}ms both` }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <img src={bus.image} alt={bus.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s", transform: hov ? "scale(1.08)" : "scale(1)" }} onError={e => e.target.src = BUS_IMAGES[0]} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)" }} />
        <div style={{ position: "absolute", top: 10, left: 10 }}><Tag bg={bus.ac ? "rgba(6,182,212,0.8)" : "rgba(255,255,255,0.3)"} c={bus.ac ? "#001520" : "#fff"}>{bus.ac ? "AC" : "Non-AC"}</Tag></div>
        {bus.liveTracking && <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", borderRadius: 8, padding: "4px 10px", color: "#4ade80", fontSize: 11, fontWeight: 600 }}>🟢 LIVE</div>}
        <div style={{ position: "absolute", bottom: 12, left: 12 }}>
          <div style={{ color: "#06b6d4", fontSize: 11, fontWeight: 600, marginBottom: 2 }}>📍 {bus.from} → {bus.to}</div>
          <div style={{ color: "#fff", fontSize: 17, fontWeight: 700 }}>{bus.name}</div>
          <div style={{ color: "#94a3b8", fontSize: 12 }}>{bus.operator}</div>
        </div>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ textAlign: "center" }}>
            
            <div style={{ color: "#64748b", fontSize: 11 }}>{bus.from}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#64748b", fontSize: 11, marginBottom: 3 }}>{bus.duration}</div>
            <div style={{ height: 2, width: 80, background: "linear-gradient(90deg,#06b6d4,rgba(6,182,212,0.2))", margin: "0 auto", position: "relative" }}>
              <div style={{ position: "absolute", right: -3, top: -3, width: 8, height: 8, borderRadius: "50%", background: "#06b6d4" }} />
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#e2e8f0", fontSize: 20, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{bus.arrives}</div>
            <div style={{ color: "#64748b", fontSize: 11 }}>{bus.to}</div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <Stars r={bus.rating} />
          <span style={{ color: availColor, fontSize: 12, fontWeight: 600 }}>{bus.seats.available} seats left</span>
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div><span style={{ color: "#64748b", fontSize: 11 }}>from </span><span style={{ color: "#06b6d4", fontSize: 20, fontWeight: 800 }}>₹{bus.price}</span><span style={{ color: "#64748b", fontSize: 11 }}>/seat</span></div>
          <span style={{ color: "#64748b", fontSize: 11 }}>{bus.type}</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => onExplore(bus)} style={{ ...S.btn, flex: 1, padding: "10px 0", fontSize: 13 }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            Explore Ride
          </button>
          <button onClick={() => onBook({ type: "bus", item: bus })} style={{ ...S.ghost, padding: "10px 16px" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}>
            Book
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   BIKE CARD
══════════════════════════════════════════════════════════════ */
function BikeCard({ bike, onExplore, onBook, delay = 0 }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ ...S.card, overflow: "hidden", transition: "all 0.3s", transform: hov ? "translateY(-5px)" : "none", boxShadow: hov ? "0 20px 50px rgba(0,0,0,0.5)" : "none", animation: `slideUp 0.35s ease ${delay}ms both` }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <img src={bike.image} alt={bike.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s", transform: hov ? "scale(1.08)" : "scale(1)" }} onError={e => e.target.src = BIKE_IMAGES[0]} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />
        <div style={{ position: "absolute", top: 10, left: 10 }}><Tag bg="rgba(6,182,212,0.85)" c="#001520">{bike.type}</Tag></div>
        <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", borderRadius: 8, padding: "4px 10px", color: "#e2e8f0", fontSize: 12, fontWeight: 600 }}>{bike.cc}cc</div>
        <div style={{ position: "absolute", bottom: 12, left: 12 }}>
          <div style={{ color: "#06b6d4", fontSize: 11, fontWeight: 600, marginBottom: 2 }}>📍 {bike.location}</div>
          <div style={{ color: "#fff", fontSize: 17, fontWeight: 700 }}>{bike.name}</div>
        </div>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <Stars r={bike.rating} />
          <span style={{ color: bike.available <= 2 ? "#f87171" : "#4ade80", fontSize: 12, fontWeight: 600 }}>{bike.available} available</span>
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
          {bike.features.map(f => <Tag key={f}>{f}</Tag>)}
        </div>
        <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          <div><div style={{ color: "#64748b", fontSize: 11 }}>Per Hour</div><div style={{ color: "#06b6d4", fontSize: 16, fontWeight: 700 }}>₹{bike.pricePerHour}</div></div>
          <div style={{ width: 1, background: "rgba(255,255,255,0.08)" }} />
          <div><div style={{ color: "#64748b", fontSize: 11 }}>Per Day</div><div style={{ color: "#06b6d4", fontSize: 16, fontWeight: 700 }}>₹{bike.pricePerDay}</div></div>
          <div style={{ width: 1, background: "rgba(255,255,255,0.08)" }} />
          <div><div style={{ color: "#64748b", fontSize: 11 }}>Fuel</div><div style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 600 }}>{bike.fuel}</div></div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => onExplore(bike)} style={{ ...S.btn, flex: 1, padding: "10px 0", fontSize: 13 }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            Explore Ride
          </button>
          <button onClick={() => onBook({ type: "bike", item: bike })} style={{ ...S.ghost, padding: "10px 16px" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}>
            Rent
          </button>
        </div>
      </div>
    </div>
  );
}

function CabSearchPage({ onExplore, onBook }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("2026-05-26");
  const [tripType, setTripType] = useState("oneway");
  const [catFilter, setCatFilter] = useState("All");
  const [sort, setSort] = useState("rating");
  const [searched, setSearched] = useState(false);

  const { tours, loading, refetch } = useTours("cab");

  const search = () => {
    setSearched(true);
    refetch();
  };

  const cabs = tours.map(mapTourToCab);

  const filtered = cabs
    .filter(c => catFilter === "All" || c.category === catFilter)
    .sort((a, b) =>
      sort === "rating" ? b.rating - a.rating
        : sort === "fare_asc" ? a.baseFare - b.baseFare
          : b.baseFare - a.baseFare
    );

  return (
    <div>
      <div style={{ ...S.card, padding: "20px 24px", marginBottom: 20, borderColor: "rgba(6,182,212,0.3)" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {["oneway", "roundtrip", "outstation"].map(t => (
            <Pill key={t} active={tripType === t} onClick={() => setTripType(t)}>
              {t === "oneway" ? "One Way" : t === "roundtrip" ? "Round Trip" : "Outstation"}
            </Pill>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 12, alignItems: "end" }}>
          <CitySelect label="Pickup City" value={from} onChange={setFrom} placeholder="e.g. Delhi" />
          <CitySelect label="Drop City" value={to} onChange={setTo} placeholder="e.g. Manali" />
          <div>
            <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 6 }}>Date</div>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ ...S.input, colorScheme: "dark" }} />
          </div>
          <button onClick={search} style={{ ...S.btn, padding: "12px 24px" }}>🔍 Search Cabs</button>
        </div>
      </div>

      {loading && <Spin />}

      {searched && !loading && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["All", "Economy", "Standard", "Premium", "Luxury"].map(c => (
                <Pill key={c} active={catFilter === c} onClick={() => setCatFilter(c)}>{c}</Pill>
              ))}
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "8px 14px", color: "#94a3b8", fontSize: 13, outline: "none" }}>
              <option value="rating">Top Rated</option>
              <option value="fare_asc">Fare: Low → High</option>
              <option value="fare_desc">Fare: High → Low</option>
            </select>
          </div>
          <div style={{ color: "#475569", fontSize: 13, marginBottom: 12 }}>{filtered.length} cabs available</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {filtered.map((c, i) => (
              <CabCard key={c.id} cab={c} delay={i * 60} onExplore={onExplore} onBook={onBook} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ color: "#64748b", textAlign: "center", padding: "40px 0" }}>No cabs found. Try adjusting your filters.</div>
          )}
        </>
      )}
    </div>
  );
}

function BusSearchPage({ onExplore, onBook }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("2026-05-26");
  const [typeFilter, setTypeFilter] = useState("All");
  const [acFilter, setAcFilter] = useState("All");
  const [searched, setSearched] = useState(false);

  const { tours, loading, refetch } = useTours("bus");

  const search = () => {
    setSearched(true);
    refetch();
  };

  const buses = tours.map(mapTourToBus);

  const filtered = buses.filter(b => {
    if (typeFilter !== "All" && b.type !== typeFilter) return false;
    if (acFilter === "AC" && !b.ac) return false;
    if (acFilter === "Non-AC" && b.ac) return false;
    return true;
  });

  return (
    <div>
      <div style={{ ...S.card, padding: "20px 24px", marginBottom: 20, borderColor: "rgba(6,182,212,0.3)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 12, alignItems: "end" }}>
          <CitySelect label="From" value={from} onChange={setFrom} placeholder="Departure city" />
          <CitySelect label="To" value={to} onChange={setTo} placeholder="Destination city" />
          <div>
            <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 6 }}>Travel Date</div>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ ...S.input, colorScheme: "dark" }} />
          </div>
          <button onClick={search} style={{ ...S.btn, padding: "12px 24px" }}>🔍 Search Buses</button>
        </div>
      </div>

      {loading && <Spin />}

      {searched && !loading && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["All", "Sleeper", "Semi-Sleeper", "Seater"].map(t => (
                <Pill key={t} active={typeFilter === t} onClick={() => setTypeFilter(t)}>{t}</Pill>
              ))}
              <div style={{ width: 1, background: "rgba(255,255,255,0.1)" }} />
              {["All", "AC", "Non-AC"].map(t => (
                <Pill key={t} active={acFilter === t} onClick={() => setAcFilter(t)}>{t}</Pill>
              ))}
            </div>
          </div>
          <div style={{ color: "#475569", fontSize: 13, marginBottom: 12 }}>{filtered.length} buses found</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {filtered.map((b, i) => (
              <BusCard key={b.id} bus={b} delay={i * 60} onExplore={onExplore} onBook={onBook} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ color: "#64748b", textAlign: "center", padding: "40px 0" }}>No buses found. Try adjusting your filters.</div>
          )}
        </>
      )}
    </div>
  );
}

function BikeSearchPage({ onExplore, onBook }) {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("2026-05-26");
  const [days, setDays] = useState(1);
  const [typeFilter, setTypeFilter] = useState("All");
  const [searched, setSearched] = useState(false);

  const { tours, loading, refetch } = useTours("bike");

  const search = () => {
    setSearched(true);
    refetch();
  };

  const bikes = tours.map(mapTourToBike);
  const filtered = bikes.filter(b => typeFilter === "All" || b.type === typeFilter);

  return (
    <div>
      <div style={{ ...S.card, padding: "20px 24px", marginBottom: 20, borderColor: "rgba(6,182,212,0.3)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 12, alignItems: "end" }}>
          <CitySelect label="City" value={city} onChange={setCity} placeholder="Pickup city" />
          <div>
            <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 6 }}>Pickup Date</div>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ ...S.input, colorScheme: "dark" }} />
          </div>
          <div>
            <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 6 }}>Rental Days</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "10px 16px" }}>
              <button onClick={() => setDays(d => Math.max(1, d - 1))} style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(6,182,212,0.2)", color: "#06b6d4", border: "none", cursor: "pointer", fontSize: 16 }}>−</button>
              <span style={{ color: "#e2e8f0", fontWeight: 700, minWidth: 20, textAlign: "center" }}>{days}</span>
              <button onClick={() => setDays(d => d + 1)} style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(6,182,212,0.2)", color: "#06b6d4", border: "none", cursor: "pointer", fontSize: 16 }}>+</button>
              <span style={{ color: "#64748b", fontSize: 12 }}>day{days > 1 ? "s" : ""}</span>
            </div>
          </div>
          <button onClick={search} style={{ ...S.btn, padding: "12px 24px" }}>🔍 Find Bikes</button>
        </div>
      </div>

      {loading && <Spin />}

      {searched && !loading && (
        <>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            {["All", "Cruiser", "Sports", "Adventure", "Scooter"].map(t => (
              <Pill key={t} active={typeFilter === t} onClick={() => setTypeFilter(t)}>{t}</Pill>
            ))}
          </div>
          <div style={{ color: "#475569", fontSize: 13, marginBottom: 12 }}>{filtered.length} bikes available</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {filtered.map((b, i) => (
              <BikeCard key={b.id} bike={b} delay={i * 60} onExplore={onExplore} onBook={onBook} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ color: "#64748b", textAlign: "center", padding: "40px 0" }}>No bikes found for this city.</div>
          )}
        </>
      )}
    </div>
  );
}


function OutstationPage({ onBook }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("2026-05-26");
  const [tripType, setTripType] = useState("oneway");
  const [searched, setSearched] = useState(false);

  const { tours, loading, refetch } = useTours("outstation");

  const ROUTES = [
    { from: "Delhi", to: "Manali", dist: 540, popular: true },
    { from: "Mumbai", to: "Goa", dist: 590, popular: true },
    { from: "Bangalore", to: "Mysuru", dist: 150 },
    { from: "Delhi", to: "Agra", dist: 220 },
    { from: "Delhi", to: "Jaipur", dist: 282 },
    { from: "Mumbai", to: "Pune", dist: 149 },
  ];

  const search = () => {
    setSearched(true);
    refetch();
  };

  const results = tours.map(mapTourToOutstation);

  return (
    <div>
      <div style={{ ...S.card, padding: "20px 24px", marginBottom: 20, borderColor: "rgba(6,182,212,0.3)" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {["oneway", "roundtrip"].map(t => (
            <Pill key={t} active={tripType === t} onClick={() => setTripType(t)}>
              {t === "oneway" ? "One Way" : "Round Trip"}
            </Pill>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 12, alignItems: "end" }}>
          <CitySelect label="From" value={from} onChange={setFrom} placeholder="Departure" />
          <CitySelect label="To" value={to} onChange={setTo} placeholder="Destination" />
          <div>
            <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 6 }}>Date</div>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ ...S.input, colorScheme: "dark" }} />
          </div>
          <button onClick={search} style={{ ...S.btn, padding: "12px 24px" }}>🗺️ Search</button>
        </div>
      </div>

      {/* Popular Routes */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ color: "#64748b", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
          Popular Outstation Routes
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {ROUTES.map(r => (
            <button
              key={r.from + r.to}
              onClick={() => { setFrom(r.from); setTo(r.to); }}
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "8px 14px", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(6,182,212,0.4)"; e.currentTarget.style.background = "rgba(6,182,212,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
            >
              <span style={{ color: "#e2e8f0", fontSize: 13 }}>{r.from} → {r.to}</span>
              <span style={{ color: "#64748b", fontSize: 11, marginLeft: 8 }}>{r.dist} km</span>
              {r.popular && <span style={{ color: "#fbbf24", fontSize: 10, marginLeft: 6 }}>★ Popular</span>}
            </button>
          ))}
        </div>
      </div>

      {loading && <Spin />}

      {searched && !loading && (
        <>
          <div style={{ color: "#475569", fontSize: 13, marginBottom: 12 }}>
            {results.length} outstation cabs available
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {results.map((c, i) => (
              <div key={c.id} style={{ ...S.card, overflow: "hidden", animation: `slideUp 0.35s ease ${i * 60}ms both` }}>
                <div style={{ position: "relative", height: 190, overflow: "hidden" }}>
                  <img src={c.image} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.src = CAB_IMAGES[0]} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)" }} />
                  <div style={{ position: "absolute", top: 10, left: 10 }}>
                    <Tag bg="rgba(6,182,212,0.8)" c="#001520">{c.category}</Tag>
                  </div>
                  <div style={{ position: "absolute", bottom: 10, left: 12 }}>
                    <div style={{ color: "#fff", fontSize: 17, fontWeight: 700 }}>{c.name}</div>
                    <div style={{ color: "#94a3b8", fontSize: 12 }}>{c.type} · {c.seats} seats</div>
                  </div>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <Stars r={c.rating} />
                    <div>
                      <span style={{ color: "#06b6d4", fontSize: 18, fontWeight: 800 }}>
                        ₹{c.totalFare?.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                  <div style={{ color: "#64748b", fontSize: 12, marginBottom: 12 }}>
                    Outstation fare · {from && to ? `${from} → ${to}` : "Select route above"}
                  </div>
                  <button
                    onClick={() => onBook({ type: "cab", item: c, trip: "outstation" })}
                    style={{ ...S.btn, width: "100%", padding: "10px 0" }}
                  >
                    Book Outstation Cab
                  </button>
                </div>
              </div>
            ))}
          </div>
          {results.length === 0 && (
            <div style={{ color: "#64748b", textAlign: "center", padding: "40px 0" }}>
              No outstation cabs found. Admin ne abhi koi outstation vehicle add nahi kiya.
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ProviderRequestForm({ RequestForm }) {

  const [form, setForm] = useState({
    providerName: "",
    ownerName: "",
    email: "",
    phone: "",
    serviceType: "",
    businessName: "",
    location: "",
    website: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    console.log(form);

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:3000/api/provider/request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();


      if (data.success) {
        setSuccess("Your request has been submitted successfully. Our team will reach out to you shortly.");
        setForm({
          providerName: "",
          ownerName: "",
          email: "",
          phone: "",
          serviceType: "",
          businessName: "",
          location: "",
          website: "",
          description: "",
        });
        if (RequestForm) {
          RequestForm(data.request);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-slate-900 rounded-xl p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          Become a Provider
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="providerName"
            value={form.providerName}
            placeholder="Provider Company Name"
            className="w-full p-3 rounded bg-slate-800 text-white"
            onChange={handleChange}
          />

          <input
            type="text"
            name="ownerName"
            value={form.ownerName}
            placeholder="Owner Name"
            className="w-full p-3 rounded bg-slate-800 text-white"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Email"
            className="w-full p-3 rounded bg-slate-800 text-white"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            value={form.phone}
            placeholder="Phone Number"
            className="w-full p-3 rounded bg-slate-800 text-white"
            onChange={handleChange}
          />

          <select
            name="serviceType"
            value={form.serviceType}
            className="w-full p-3 rounded bg-slate-800 text-white"
            onChange={handleChange}
          >
            <option value="">Select Service</option>
            <option value="Bike">Bike</option>
            <option value="Car">Car</option>
            <option value="Bus">Bus</option>

          </select>

          <input
            type="text"
            name="businessName"
            value={form.businessName}
            placeholder="Business Name"
            className="w-full p-3 rounded bg-slate-800 text-white"
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            value={form.location}
            placeholder="Location"
            className="w-full p-3 rounded bg-slate-800 text-white"
            onChange={handleChange}
          />

          <input
            type="text"
            name="website"
            value={form.website}
            placeholder="Website"
            className="w-full p-3 rounded bg-slate-800 text-white"
            onChange={handleChange}
          />

          <textarea
            name="description"
            rows="4"
            value={form.description}
            placeholder="Business Description"
            className="w-full p-3 rounded bg-slate-800 text-white"
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded bg-cyan-500 text-black font-bold"

          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>

          {success && (
            <p className="text-green-400">{success}</p>
          )}
        </form>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   DETAIL PAGE (Cab / Bus / Bike)
══════════════════════════════════════════════════════════════ */
function DetailPage({ item, type, onBack, onBook }) {
  const [tab, setTab] = useState("overview");
  const isCab = type === "cab", isBus = type === "bus", isBike = type === "bike";
  const title = isBus ? item.name : item.name;
  const image = item.image || (isCab ? CAB_IMAGES[0] : isBus ? BUS_IMAGES[0] : BIKE_IMAGES[0]);

  return (
    <div style={{ animation: "slideUp 0.3s ease" }}>
      <Back onClick={onBack} />
      <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", height: 320, marginBottom: 20 }}>
        <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.src = CAB_IMAGES[0]} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
        <div style={{ position: "absolute", bottom: 24, left: 24, right: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            {isBus && <div style={{ color: "#06b6d4", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>📍 {item.from} → {item.to}</div>}
            <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 800, margin: 0, marginBottom: 6 }}>{title}</h1>
            {isBus && <div style={{ color: "#94a3b8", fontSize: 13 }}>{item.operator} · {item.departs} → {item.arrives}</div>}
            {(isCab || isBike) && <div style={{ color: "#94a3b8", fontSize: 13 }}>{item.type || item.category} · 📍 {item.location}</div>}
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#06b6d4", fontSize: 22, fontWeight: 800 }}>
              {isCab ? `₹${item.pricePerKm}/km` : isBus ? `₹${item.price}` : `₹${item.pricePerDay}/day`}
            </div>
            <button onClick={() => onBook({ type, item })} style={{ ...S.btn, marginTop: 8, padding: "10px 24px" }}>Book Now</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, padding: 4, background: "rgba(255,255,255,0.05)", borderRadius: 14, width: "fit-content" }}>
        {["overview", "specs", "reviews"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "9px 20px", borderRadius: 10, fontSize: 13, fontWeight: 600, textTransform: "capitalize", cursor: "pointer", transition: "all 0.2s", border: "none", background: tab === t ? "linear-gradient(135deg,#0284c7,#06b6d4)" : "transparent", color: tab === t ? "#001520" : "#94a3b8" }}>{t}</button>
        ))}
      </div>

      {tab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ ...S.card, padding: "18px 20px" }}>
              <div style={{ color: "#64748b", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Details</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {isCab && [["Driver", item.driver], ["Plate", item.plate], ["ETA", item.eta], ["Seats", item.seats], ["Category", item.category], ["Type", item.type]].map(([k, v]) => (
                  <div key={k} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px" }}>
                    <div style={{ color: "#64748b", fontSize: 11 }}>{k}</div>
                    <div style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600 }}>{v}</div>
                  </div>
                ))}
                {isBus && [["Operator", item.operator], ["Type", item.type], ["Duration", item.duration], ["Date", item.date], ["Seats Left", item.seats.available], ["Total Seats", item.seats.total]].map(([k, v]) => (
                  <div key={k} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px" }}>
                    <div style={{ color: "#64748b", fontSize: 11 }}>{k}</div>
                    <div style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600 }}>{v}</div>
                  </div>
                ))}
                {isBike && [["CC", item.cc], ["Type", item.type], ["Available", item.available], ["Location", item.location], ["Fuel", item.fuel], ["Per Day", `₹${item.pricePerDay}`]].map(([k, v]) => (
                  <div key={k} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px" }}>
                    <div style={{ color: "#64748b", fontSize: 11 }}>{k}</div>
                    <div style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ ...S.card, padding: "18px 20px" }}>
              <div style={{ color: "#64748b", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Features & Amenities</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {(item.features || item.amenities || []).map(f => <Tag key={f}>{f}</Tag>)}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ ...S.card, padding: "16px 18px" }}>
              <div style={{ color: "#06b6d4", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>
                {isCab ? `₹${item.pricePerKm}/km` : isBus ? `₹${item.price}/seat` : `₹${item.pricePerDay}/day`}
              </div>
              <Stars r={item.rating} /><span style={{ color: "#475569", fontSize: 11, marginLeft: 8 }}>{item.reviews} reviews</span>
              <button onClick={() => onBook({ type, item })} style={{ ...S.btn, width: "100%", marginTop: 14, padding: "12px 0" }}>Book This {isCab ? "Cab" : isBus ? "Bus" : "Bike"}</button>
            </div>
            <div style={{ ...S.card, padding: "14px 16px", borderColor: "rgba(34,197,94,0.25)", background: "rgba(34,197,94,0.04)" }}>
              {["✓ Instant confirmation", "✓ Free cancellation", "✓ 24/7 support"].map(t => (
                <div key={t} style={{ color: "#4ade80", fontSize: 12, marginBottom: 6 }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "specs" && (
        <div style={{ ...S.card, padding: "20px 24px" }}>
          <div style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Full Specifications</div>
          {isBike && [["Engine", "Single cylinder, 4-stroke"], ["Power", `${item.cc}cc · 20–35 BHP`], ["Transmission", "5-speed manual"], ["Fuel Tank", "13-15 litres"], ["Mileage", "25-35 km/l"], ["Weight", "~170 kg"], ["Type", item.type], ["Fuel Policy", "Full to Full"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ color: "#64748b", fontSize: 13 }}>{k}</span><span style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600 }}>{v}</span>
            </div>
          ))}
          {isCab && [["Make/Model", item.name], ["Category", item.category], ["Capacity", `${item.seats} passengers`], ["AC", item.ac ? "Yes" : "No"], ["GPS", "Enabled"], ["Insurance", "Covered"], ["Driver Rating", `${item.driverRating}/5`]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ color: "#64748b", fontSize: 13 }}>{k}</span><span style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600 }}>{v}</span>
            </div>
          ))}
          {isBus && [["Bus Type", item.type], ["Operator", item.operator], ["AC", item.ac ? "Yes" : "No"], ["Total Seats", item.seats.total], ["Available", item.seats.available], ["Live Tracking", item.liveTracking ? "Yes" : "No"], ["Journey", `${item.duration}`]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ color: "#64748b", fontSize: 13 }}>{k}</span><span style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600 }}>{String(v)}</span>
            </div>
          ))}
        </div>
      )}

      {tab === "reviews" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[{ user: "Priya S.", rating: 5, date: "2 days ago", comment: "Excellent experience! Driver was punctual and the vehicle was spotless." },
          { user: "Rohan M.", rating: 4, date: "1 week ago", comment: "Good ride overall. AC was perfect, driver was courteous and helpful." },
          { user: "Anjali K.", rating: 5, date: "2 weeks ago", comment: "Highly recommended! Will definitely book again on my next trip." }].map((r, i) => (
            <div key={i} style={{ ...S.card, padding: "16px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(6,182,212,0.15)", border: "1px solid rgba(6,182,212,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#06b6d4", fontWeight: 700, fontSize: 13 }}>{r.user[0]}</div>
                  <div style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 600 }}>{r.user}</div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <Stars r={r.rating} />
                  <span style={{ color: "#475569", fontSize: 12 }}>{r.date}</span>
                </div>
              </div>
              <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   BOOKING PAGE
══════════════════════════════════════════════════════════════ */
function BookingPage({ booking, onBack, onDone }) {
  const { type, item } = booking;
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "2026-05-26", time: "10:00", from: "", to: "", riders: 1 });
  const [done, setDone] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const isBike = type === "bike", isBus = type === "bus";
  const basePrice = isBike ? item.pricePerDay : isBus ? item.price : item.baseFare + item.pricePerKm * 30;

  const confirm = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "http://localhost:3000/api/transport/booking",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            bookingType: type,

            customer: {
              name: form.name,
              email: form.email,
              phone: form.phone,
            },

            journey: {
              from: form.from,
              to: form.to,
              date: form.date,
              time: form.time,
              tripType: form.tripType,
              returnDate: form.returnDate,
            },

            vehicle: {
              name: item.name,
              image: item.image,
              rating: item.rating,
            },

            passengers: [
              {
                name: form.name,
                age: form.age || 0,
                gender: form.gender || "",
              },
            ],

            passengerCount:
              form.passengerCount || form.riders || 1,

            bikeDetails: {
              licenseNumber: form.license,
              aadhaarNumber: form.aadhaar,
              rider1Name: form.name,
              rider2Name: form.rider2Name,
              rider2Phone: form.rider2Phone,
            },

            specialRequest:
              form.specialRequest || form.tripNotes || "",

            amount: basePrice,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setBookingId(data.bookingId);
        console.log(data.booking);

        setDone(true);

        setTimeout(() => {
          onDone();
        }, 2800);

      }

    } catch (error) {

      console.log(error);

    }
  };

  if (done) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 0", textAlign: "center", animation: "fadeIn 0.4s ease" }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(34,197,94,0.12)", border: "2px solid rgba(34,197,94,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, marginBottom: 20 }}>✓</div>
      <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, margin: "0 0 10px" }}>Booking Confirmed!</h2>
      <p style={{ color: "#64748b", margin: "0 0 6px" }}>Your {type} has been booked successfully.</p>
      <div style={{ marginTop: 16, padding: "10px 24px", borderRadius: 12, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80", fontSize: 14, fontWeight: 600 }}>
        Booking ID: {bookingId}
      </div>
    </div>
  );

  return (
    <div style={{ animation: "slideUp 0.3s ease" }}>
      <Back onClick={onBack} />
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        <div>
          {/* Steps */}
          <div style={{ display: "flex", gap: 8, marginBottom: 24, alignItems: "center" }}>
            {["Passenger Details", "Journey Info", "Confirm"].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: step > i + 1 ? "pointer" : "default" }} onClick={() => step > i + 1 && setStep(i + 1)}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, transition: "all 0.2s", background: step >= i + 1 ? "linear-gradient(135deg,#0284c7,#06b6d4)" : "rgba(255,255,255,0.08)", color: step >= i + 1 ? "#001520" : "#64748b" }}>{i + 1}</div>
                  <span style={{ fontSize: 13, color: step === i + 1 ? "#e2e8f0" : "#64748b", fontWeight: step === i + 1 ? 600 : 400 }}>{s}</span>
                </div>
                {i < 2 && <span style={{ color: "#334155", fontSize: 14, margin: "0 4px" }}>›</span>}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div style={{ ...S.card, padding: "20px 24px" }}>
              <h3 style={{ color: "#e2e8f0", fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Passenger Information</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[["Full Name", "name", "text", "Rajesh Kumar"], ["Email", "email", "email", "your@email.com"], ["Phone", "phone", "tel", "+91 98765 43210"]].map(([l, k, t, ph]) => (
                  <div key={k}>
                    <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>{l}</div>
                    <input type={t} placeholder={ph} value={form[k]} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} style={{ ...S.input }} />
                  </div>
                ))}
                {isBike && (
                  <>
                    <input
                      placeholder="Driving License Number"
                      value={form.license || ""}
                      onChange={e =>
                        setForm(p => ({ ...p, license: e.target.value }))
                      }
                      style={S.input}
                    />

                    <input
                      placeholder="Aadhaar Number"
                      value={form.aadhaar || ""}
                      onChange={e =>
                        setForm(p => ({ ...p, aadhaar: e.target.value }))
                      }
                      style={S.input}
                    />

                    <div>
                      <div style={{ color: "#64748b", marginBottom: 6 }}>
                        Riders
                      </div>

                      {[1, 2].map(n => (
                        <button
                          key={n}
                          onClick={() =>
                            setForm(p => ({ ...p, riders: n }))
                          }
                          style={n === form.riders ? S.btn : S.ghost}
                        >
                          {n}
                        </button>
                      ))}
                    </div>

                    {form.riders === 2 && (
                      <>
                        <input
                          placeholder="Second Rider Name"
                          value={form.rider2Name || ""}
                          onChange={(e) =>
                            setForm(p => ({
                              ...p,
                              rider2Name: e.target.value
                            }))
                          }
                          style={S.input}
                        />

                        <input
                          placeholder="Second Rider Phone"
                          value={form.rider2Phone || ""}
                          onChange={(e) =>
                            setForm(p => ({
                              ...p,
                              rider2Phone: e.target.value
                            }))
                          }
                          style={S.input}
                        />
                      </>
                    )}
                  </>
                )}
                {isBus && (
                  <>
                    <input
                      type="number"
                      placeholder="Number of Passengers"
                      value={form.passengerCount || 1}
                      onChange={e =>
                        setForm(p => ({
                          ...p,
                          passengerCount: e.target.value
                        }))
                      }
                      style={S.input}
                    />
                  </>
                )}
                {type === "cab" && (
                  <>
                    <input
                      type="number"
                      placeholder="Passenger Count"
                      value={form.passengerCount || 1}
                      onChange={(e) =>
                        setForm(p => ({
                          ...p,
                          passengerCount: Number(e.target.value)
                        }))
                      }
                      style={S.input}
                    />

                    <textarea
                      placeholder="Special Instructions"
                      value={form.specialRequest || ""}
                      onChange={(e) =>
                        setForm(p => ({
                          ...p,
                          specialRequest: e.target.value
                        }))
                      }
                      style={S.input}
                    />
                  </>
                )}
                {type === "outstation" && (
                  <>
                    <select
                      style={S.input}
                      value={form.tripType || "oneway"}
                      onChange={e =>
                        setForm(p => ({
                          ...p,
                          tripType: e.target.value
                        }))
                      }
                    >
                      <option value="oneway">
                        One Way
                      </option>

                      <option value="roundtrip">
                        Round Trip
                      </option>
                    </select>

                    {form.tripType === "roundtrip" && (
                      <input
                        type="date"
                        style={S.input}
                      />
                    )}

                    <input
                      type="date"
                      value={form.returnDate || ""}
                      onChange={(e) =>
                        setForm(p => ({
                          ...p,
                          returnDate: e.target.value
                        }))
                      }
                      style={S.input}
                    />

                    <textarea
                      placeholder="Trip Notes"
                      value={form.tripNotes || ""}
                      onChange={(e) =>
                        setForm(p => ({
                          ...p,
                          tripNotes: e.target.value
                        }))
                      }
                      style={S.input}
                    />
                  </>
                )}
                <button onClick={() => setStep(2)} style={{ ...S.btn, padding: "12px 0", fontSize: 14 }}>Continue →</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ ...S.card, padding: "20px 24px" }}>
              <h3 style={{ color: "#e2e8f0", fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Journey Details</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Date</div>
                    <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} style={{ ...S.input, colorScheme: "dark" }} />
                  </div>
                  {!isBus && (
                    <div>
                      <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Time</div>
                      <input type="time" value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} style={{ ...S.input, colorScheme: "dark" }} />
                    </div>
                  )}
                </div>
                {!isBike && (
                  <>
                    <CitySelect label="Pickup Location" value={form.from} onChange={v => setForm(p => ({ ...p, from: v }))} placeholder="Where to pick up?" />
                    <CitySelect label="Drop Location" value={form.to} onChange={v => setForm(p => ({ ...p, to: v }))} placeholder="Where to drop?" />
                  </>
                )}

                {isBike && (
                  <div>
                    <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Pickup City</div>
                    <CitySelect value={form.from} onChange={v => setForm(p => ({ ...p, from: v }))} placeholder="e.g. Manali" />
                    <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Drop City</div>
                    <CitySelect value={form.from} onChange={v => setForm(p => ({ ...p, from: v }))} placeholder="e.g. Manali" />
                  </div>
                )}
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setStep(1)} style={{ ...S.ghost, flex: "0 0 auto", padding: "12px 20px" }}>← Back</button>
                  <button onClick={() => setStep(3)} style={{ ...S.btn, flex: 1, padding: "12px 0" }}>Review Booking →</button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ ...S.card, padding: "20px 24px" }}>
              <h3 style={{ color: "#e2e8f0", fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Confirm Booking</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[["Vehicle", item.name], ["Type", type.toUpperCase()], ["Date", form.date], ["Passenger", form.name || "—"], ["Contact", form.phone || "—"], ["Pickup", form.from || "—"], ["Drop", form.to || isBike ? "N/A" : "—"]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <span style={{ color: "#64748b", fontSize: 13 }}>{k}</span>
                    <span style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderRadius: 12, marginTop: 12, background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.2)" }}>
                <span style={{ color: "#94a3b8", fontWeight: 600 }}>Total Fare</span>
                <span style={{ color: "#06b6d4", fontSize: 24, fontWeight: 800 }}>₹{basePrice.toLocaleString("en-IN")}</span>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                <button onClick={() => setStep(2)} style={{ ...S.ghost, flex: "0 0 auto", padding: "12px 20px" }}>← Modify</button>
                <button onClick={confirm} style={{ ...S.btn, flex: 1, padding: "12px 0", fontSize: 15 }}>Confirm & Pay ₹{basePrice.toLocaleString("en-IN")}</button>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ ...S.card, overflow: "hidden" }}>
            <img src={item.image} alt={item.name} style={{ width: "100%", height: 150, objectFit: "cover" }} onError={e => e.target.src = CAB_IMAGES[0]} />
            <div style={{ padding: "14px 16px" }}>
              <div style={{ color: "#e2e8f0", fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{item.name}</div>
              <Stars r={item.rating} />
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "#64748b" }}>Base Fare</span>
                  <span style={{ color: "#e2e8f0", fontWeight: 600 }}>₹{basePrice.toLocaleString("en-IN")}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "#64748b" }}>Taxes & Fees</span>
                  <span style={{ color: "#e2e8f0", fontWeight: 600 }}>Included</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <span style={{ color: "#fff" }}>Total</span>
                  <span style={{ color: "#06b6d4" }}>₹{basePrice.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ ...S.card, padding: "14px 16px", borderColor: "rgba(34,197,94,0.2)", background: "rgba(34,197,94,0.04)" }}>
            {["✓ Instant confirmation", "✓ Free cancellation 2h prior", "✓ 24/7 helpline", "✓ Driver details shared"].map(t => (
              <div key={t} style={{ color: "#4ade80", fontSize: 12, marginBottom: 6 }}>{t}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════════════════ */
function HomePage({ onService }) {
  return (
    <div>
      {/* Services Grid — matches Image 1 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: 0 }}>Transport Services</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
        {SERVICES.map((svc, i) => (
          <div key={svc.id} onClick={() => onService(svc)} style={{ ...S.card, padding: "22px 20px", cursor: "pointer", transition: "all 0.3s", animationDelay: `${i * 50}ms`, animation: "slideUp 0.4s ease both" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = "rgba(6,182,212,0.4)"; e.currentTarget.style.background = "rgba(6,182,212,0.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
            <div style={{ width: 56, height: 56, borderRadius: 18, background: `linear-gradient(135deg, ${svc.gradient.replace("from-", "").replace(" to-", ",")} )`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 18, boxShadow: "0 4px 16px rgba(6,182,212,0.2)" }}
              className={`bg-gradient-to-br ${svc.gradient}`}>
              {svc.icon}
            </div>
            <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 800, margin: "0 0 8px" }}>{svc.label}</h3>
            <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.5, margin: "0 0 18px" }}>{svc.desc}</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: "#06b6d4", fontSize: 13, fontWeight: 600 }}>Explore</span>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#06b6d4", fontSize: 14, transition: "all 0.2s" }}>→</div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Rides — matches Image 2 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: 0 }}>Explore Travel Experiences</h2>
        <span style={{ color: "#06b6d4", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Premium Transport</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
        {FEATURE_RIDES.map((ride, i) => (
          <div key={ride.id} onClick={() => onService(SERVICES.find(s => s.id === ride.type) || SERVICES[0])} style={{ borderRadius: 20, overflow: "hidden", cursor: "pointer", position: "relative", height: 360, transition: "all 0.3s", animationDelay: `${i * 70}ms`, animation: "slideUp 0.4s ease both" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 24px 60px rgba(0,0,0,0.6)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
            <img src={ride.image} alt={ride.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} onError={e => e.target.src = CAB_IMAGES[0]}
              onMouseEnter={e => e.target.style.transform = "scale(1.08)"} onMouseLeave={e => e.target.style.transform = "scale(1)"} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }} />
            <div style={{ position: "absolute", bottom: 60, left: 16, right: 16 }}>
              <div style={{ color: "#06b6d4", fontSize: 11, fontWeight: 600, marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}><span>📍</span>{ride.location}</div>
              <h3 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: 0, lineHeight: 1.2 }}>{ride.title}</h3>
            </div>
            <div style={{ position: "absolute", bottom: 12, left: 16, right: 16 }}>
              <button style={{ ...S.btn, width: "100%", padding: "11px 0", fontSize: 13 }}>Explore Ride</button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {[["50K+", "Happy Riders"], ["200+", "Cities Covered"], ["99%", "On-time Rate"], ["24/7", "Live Support"]].map(([n, l]) => (
          <div key={l} style={{ ...S.card, padding: "20px", textAlign: "center" }}>
            <div style={{ color: "#06b6d4", fontSize: 28, fontWeight: 800, marginBottom: 4 }}>{n}</div>
            <div style={{ color: "#64748b", fontSize: 13 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════════════ */
export default function TransportServices() {
  const [page, setPage] = useState("home");
  const [activeService, setActiveService] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const navigate=useNavigate();
  const go = (p) => { setPage(p); setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 10); };

  const handleService = (svc) => { const token = localStorage.getItem("token");
    if (!token) { navigate("/join"); return; }  setActiveService(svc); go("service"); };
  const handleExplore = (item, type) => { setSelectedItem(item); setSelectedType(type); go("detail"); };
  const handleBook = (data) => {
      const token = localStorage.getItem("token");
    if (!token) { navigate("/join"); return; } 
     setBookingData(data); go("booking"); };
  const handleBack = () => {
    if (page === "booking") go(selectedItem ? "detail" : "service");
    else if (page === "detail") go(activeService ? "service" : "home");
    else go("home");
  };
  const [providerRequests, setProviderRequests] = useState([]);

  const handleForm = (newRequest) => {
    setProviderRequests(prev => [...prev, newRequest]);
  };

  const onExplore = (item) => handleExplore(item, activeService?.id || "cab");

  const serviceContent = () => {
    if (!activeService) return null;
    const p = { onExplore, onBook: handleBook };
    switch (activeService.id) {
      case "cab": return <CabSearchPage {...p} />;
      case "bus": return <BusSearchPage onExplore={onExplore} onBook={handleBook} />;
      case "bike": return <BikeSearchPage onExplore={onExplore} onBook={handleBook} />;
      case "outstation": return <OutstationPage onBook={handleBook} />;
      case "Provider": return <ProviderRequestForm RequestForm={handleForm} />
      default: return <CabSearchPage {...p} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(140deg,#060d18 0%,#0a1628 55%,#060d18 100%)", fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", color: "#e2e8f0" }}>
      <style>{`
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes slideUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        @keyframes float { 0%,100% { transform:translateY(-50%) translateX(0); } 50% { transform:translateY(-50%) translateX(4px); } }
        * { box-sizing:border-box; }
        ::-webkit-scrollbar { width:6px; height:6px; }
        ::-webkit-scrollbar-thumb { background:rgba(6,182,212,0.25); border-radius:3px; }
        input:focus, select:focus, textarea:focus { border-color:rgba(6,182,212,0.6) !important; box-shadow:0 0 0 3px rgba(6,182,212,0.1); }
        select option { background:#0a1628; }
      `}</style>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px 80px" }}>
        {/* Breadcrumb */}
        {page !== "home" && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#475569", marginBottom: 6, animation: "fadeIn 0.3s ease" }}>
            <span style={{ cursor: "pointer" }} onMouseEnter={e => e.target.style.color = "#06b6d4"} onMouseLeave={e => e.target.style.color = "#475569"} onClick={() => go("home")}>Main</span>
            {activeService && <><span>›</span><span style={{ cursor: "pointer", color: page === "service" ? "#06b6d4" : "#475569" }} onClick={() => go("service")}>{activeService.label}</span></>}
            {selectedItem && page !== "service" && <><span>›</span><span style={{ color: page === "detail" ? "#06b6d4" : "#475569", cursor: page === "booking" ? "pointer" : "default" }} onClick={() => page === "booking" && go("detail")}>{selectedItem.name}</span></>}
            {page === "booking" && <><span>›</span><span style={{ color: "#06b6d4" }}>Booking</span></>}
          </div>
        )}

        <div key={page} style={{ animation: "slideUp 0.28s ease" }}>
          {page === "home" && <HomePage onService={handleService} onExplore={handleExplore} onBook={handleBook} />}
          {page === "service" && (
            <div>
              <Back onClick={() => go("home")} />
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <div style={{ width: 52, height: 52, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, background: `linear-gradient(135deg, #0284c7, #06b6d4)` }}>{activeService?.icon}</div>
                <div>
                  <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: 0 }}>{activeService?.label}</h2>
                  <p style={{ color: "#64748b", margin: 0, fontSize: 13 }}>{activeService?.desc}</p>
                </div>
              </div>
              {serviceContent()}
            </div>
          )}
          {page === "detail" && selectedItem && (
            <DetailPage item={selectedItem} type={selectedType || activeService?.id || "cab"} onBack={handleBack} onBook={handleBook} />
          )}
          {page === "booking" && bookingData && (
            <BookingPage booking={bookingData} onBack={handleBack} onDone={() => { setBookingData(null); setSelectedItem(null); go("home"); }} />
          )}
        </div>
      </main>
      <FooterComponent />
    </div>
  );
}
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// ─── CONFIG ──────────────────────────────────────────────────────────────────
const API_BASE = "http://localhost:3000/api"; 

// ─── DATA ────────────────────────────────────────────────────────────────────
const STATIONS = [
  { code: "NDLS", name: "New Delhi" }, { code: "MMCT", name: "Mumbai Central" },
  { code: "HWH", name: "Howrah Junction" }, { code: "MAS", name: "Chennai Central" },
  { code: "BCT", name: "Bandra Terminus" }, { code: "BZA", name: "Vijayawada Jn" },
  { code: "SBC", name: "KSR Bengaluru" }, { code: "PUNE", name: "Pune Junction" },
  { code: "BPL", name: "Bhopal Junction" }, { code: "ADI", name: "Ahmedabad Jn" },
  { code: "LKO", name: "Lucknow NR" }, { code: "CNB", name: "Kanpur Central" },
  { code: "AGC", name: "Agra Cantt" }, { code: "JP", name: "Jaipur Junction" },
  { code: "VSKP", name: "Visakhapatnam" }, { code: "SC", name: "Secunderabad Jn" },
  { code: "NGP", name: "Nagpur Junction" }, { code: "CSTM", name: "CSMT Mumbai" },
  { code: "BSB", name: "Varanasi Junction" }, { code: "PRYJ", name: "Prayagraj Jn" },
  { code: "GKP", name: "Gorakhpur Jn" }, { code: "DDN", name: "Dehradun" },
  { code: "JAT", name: "Jammu Tawi" }, { code: "CDG", name: "Chandigarh" },
  { code: "UDZ", name: "Udaipur City" }, { code: "JU", name: "Jodhpur Jn" },
  { code: "KOTA", name: "Kota Junction" }, { code: "RTM", name: "Ratlam Jn" },
  { code: "ET", name: "Itarsi Junction" }, { code: "NZM", name: "Hazrat Nizamuddin" },
];

const DEMO_TRAINS = [
  { number: "12301", name: "Howrah Rajdhani", from: "NDLS", to: "HWH", departs: "16:55", arrives: "09:55+1", duration: "17h 00m", days: ["M","T","W","T","F","S","S"], classes: ["1A","2A","3A"], available: { "1A": 3, "2A": 12, "3A": 41 }, fare: { "1A": 4580, "2A": 2645, "3A": 1775 }, type: "Rajdhani" },
  { number: "12302", name: "Howrah Rajdhani (Return)", from: "HWH", to: "NDLS", departs: "13:55", arrives: "10:05+1", duration: "20h 10m", days: ["M","T","W","T","F","S","S"], classes: ["1A","2A","3A"], available: { "1A": 0, "2A": 5, "3A": 18 }, fare: { "1A": 4580, "2A": 2645, "3A": 1775 }, type: "Rajdhani" },
  { number: "12951", name: "Mumbai Rajdhani", from: "NDLS", to: "MMCT", departs: "17:00", arrives: "08:35+1", duration: "15h 35m", days: ["M","T","W","T","F","S","S"], classes: ["1A","2A","3A"], available: { "1A": 0, "2A": 8, "3A": 22 }, fare: { "1A": 4230, "2A": 2390, "3A": 1630 }, type: "Rajdhani" },
  { number: "12952", name: "Mumbai Rajdhani (Return)", from: "MMCT", to: "NDLS", departs: "17:40", arrives: "08:55+1", duration: "15h 15m", days: ["M","T","W","T","F","S","S"], classes: ["1A","2A","3A"], available: { "1A": 2, "2A": 14, "3A": 36 }, fare: { "1A": 4230, "2A": 2390, "3A": 1630 }, type: "Rajdhani" },
  { number: "22691", name: "Rajdhani Express", from: "NDLS", to: "SBC", departs: "20:30", arrives: "06:35+2", duration: "34h 05m", days: ["T","F","S"], classes: ["1A","2A","3A"], available: { "1A": 6, "2A": 29, "3A": 88 }, fare: { "1A": 5120, "2A": 2980, "3A": 2010 }, type: "Rajdhani" },
  { number: "12621", name: "Tamil Nadu Express", from: "NDLS", to: "MAS", departs: "22:30", arrives: "07:00+2", duration: "32h 30m", days: ["M","T","W","T","F","S","S"], classes: ["SL","2A","3A","CC"], available: { "SL": 124, "2A": 15, "3A": 63, "CC": 0 }, fare: { "SL": 605, "2A": 2310, "3A": 1545, "CC": 1245 }, type: "Express" },
  { number: "12909", name: "Garib Rath Express", from: "NDLS", to: "BCT", departs: "15:55", arrives: "11:00+1", duration: "19h 05m", days: ["M","W","F"], classes: ["3A","CC"], available: { "3A": 72, "CC": 11 }, fare: { "3A": 1010, "CC": 895 }, type: "Garib Rath" },
  { number: "15055", name: "Gorakhpur Express", from: "NDLS", to: "LKO", departs: "07:45", arrives: "14:30", duration: "6h 45m", days: ["M","T","W","T","F","S","S"], classes: ["SL","2A","3A","GN"], available: { "SL": 200, "2A": 18, "3A": 54, "GN": 999 }, fare: { "SL": 320, "2A": 1210, "3A": 890, "GN": 165 }, type: "Express" },
  { number: "12001", name: "New Delhi Shatabdi", from: "NDLS", to: "BSB", departs: "06:15", arrives: "14:00", duration: "7h 45m", days: ["M","T","W","T","F","S","S"], classes: ["CC","EC"], available: { "CC": 45, "EC": 12 }, fare: { "CC": 1205, "EC": 2250 }, type: "Shatabdi" },
  { number: "12559", name: "Shiv Ganga Express", from: "NDLS", to: "BSB", departs: "18:40", arrives: "07:50+1", duration: "13h 10m", days: ["M","T","W","T","F","S","S"], classes: ["SL","2A","3A","1A"], available: { "SL": 78, "2A": 22, "3A": 45, "1A": 4 }, fare: { "SL": 445, "2A": 1890, "3A": 1310, "1A": 3240 }, type: "Express" },
  { number: "12275", name: "Duronto Express", from: "NZM", to: "PUNE", departs: "11:05", arrives: "06:05+1", duration: "19h 00m", days: ["T","T","S","S"], classes: ["1A","2A","3A","SL"], available: { "1A": 1, "2A": 9, "3A": 33, "SL": 88 }, fare: { "1A": 4980, "2A": 2760, "3A": 1890, "SL": 720 }, type: "Duronto" },
  { number: "12649", name: "Karnataka Sampark Kranti", from: "NZM", to: "SBC", departs: "21:40", arrives: "07:10+2", duration: "33h 30m", days: ["M","W","F","S"], classes: ["SL","2A","3A"], available: { "SL": 160, "2A": 31, "3A": 72 }, fare: { "SL": 580, "2A": 2140, "3A": 1470 }, type: "Express" },
  { number: "12025", name: "Pune Shatabdi", from: "CSTM", to: "PUNE", departs: "07:10", arrives: "10:30", duration: "3h 20m", days: ["M","T","W","T","F","S","S"], classes: ["CC","EC"], available: { "CC": 88, "EC": 24 }, fare: { "CC": 545, "EC": 995 }, type: "Shatabdi" },
  { number: "12263", name: "Pune Duronto", from: "NZM", to: "PUNE", departs: "23:00", arrives: "17:15+1", duration: "18h 15m", days: ["F","S"], classes: ["1A","2A","3A"], available: { "1A": 5, "2A": 18, "3A": 64 }, fare: { "1A": 4880, "2A": 2700, "3A": 1840 }, type: "Duronto" },
  { number: "12721", name: "Dakshin Express", from: "HWH", to: "SC", departs: "14:30", arrives: "22:10+1", duration: "31h 40m", days: ["M","T","W","T","F","S","S"], classes: ["SL","2A","3A"], available: { "SL": 92, "2A": 20, "3A": 55 }, fare: { "SL": 560, "2A": 2080, "3A": 1430 }, type: "Express" },
  { number: "12839", name: "Chennai Mail", from: "HWH", to: "MAS", departs: "21:45", arrives: "05:15+2", duration: "31h 30m", days: ["M","T","W","T","F","S","S"], classes: ["SL","2A","3A","1A"], available: { "SL": 140, "2A": 25, "3A": 68, "1A": 6 }, fare: { "SL": 595, "2A": 2190, "3A": 1510, "1A": 4120 }, type: "Mail" },
];

const DEMO_PNR = {
  "2846123456": { trainNo: "12301", trainName: "Howrah Rajdhani", from: "NDLS", to: "HWH", date: "26-May-2026", boardingPoint: "New Delhi", reservationUpto: "Howrah Jn", class: "2A", coach: "B4", berth: "42 (Side Lower)", status: "CNF", passengers: [{ name: "RAJESH KUMAR", age: 34, gender: "M", status: "CNF/B4/42" }, { name: "PRIYA KUMAR", age: 29, gender: "F", status: "CNF/B4/43" }] },
  "4521789012": { trainNo: "12951", trainName: "Mumbai Rajdhani", from: "NDLS", to: "MMCT", date: "27-May-2026", boardingPoint: "New Delhi", reservationUpto: "Mumbai Central", class: "3A", coach: "-", berth: "Waiting List", status: "WL 4", passengers: [{ name: "AMIT SHARMA", age: 45, gender: "M", status: "WL#4" }] },
  "7234901234": { trainNo: "12621", trainName: "Tamil Nadu Express", from: "NDLS", to: "MAS", date: "28-May-2026", boardingPoint: "New Delhi", reservationUpto: "Chennai Central", class: "SL", coach: "S6", berth: "RAC", status: "RAC 12", passengers: [{ name: "MEENA IYER", age: 38, gender: "F", status: "RAC/S6/68" }, { name: "KARTHIK IYER", age: 40, gender: "M", status: "RAC/S6/69" }, { name: "ARJUN IYER", age: 12, gender: "M", status: "RAC/S6/69" }] },
  "9876543210": { trainNo: "12001", trainName: "New Delhi Shatabdi", from: "NDLS", to: "BSB", date: "29-May-2026", boardingPoint: "New Delhi", reservationUpto: "Varanasi Jn", class: "CC", coach: "C3", berth: "22", status: "CNF", passengers: [{ name: "SUNITA VERMA", age: 52, gender: "F", status: "CNF/C3/22" }] },
  "1122334455": { trainNo: "12559", trainName: "Shiv Ganga Express", from: "NDLS", to: "BSB", date: "30-May-2026", boardingPoint: "New Delhi", reservationUpto: "Varanasi Jn", class: "3A", coach: "A2", berth: "16 (Lower)", status: "CNF", passengers: [{ name: "VIVEK MISHRA", age: 29, gender: "M", status: "CNF/A2/16" }, { name: "NEHA MISHRA", age: 27, gender: "F", status: "CNF/A2/17" }] },
};

const DEMO_LIVE = {
  "12301": { trainNo: "12301", name: "Howrah Rajdhani", from: "NDLS", to: "HWH", currentStation: "CNB", currentStatus: "Arrived", delay: 12, scheduledArr: "21:15", actualArr: "21:27", nextStation: "MGS", nextScheduled: "23:45", speed: 0, lastUpdated: "2 min ago", stops: [
    { station: "New Delhi", code: "NDLS", arr: "-", dep: "16:55", actual_dep: "16:58", dist: 0, status: "departed", delay: 3 },
    { station: "Kanpur Central", code: "CNB", arr: "21:15", dep: "21:20", actual_arr: "21:27", dist: 440, status: "current", delay: 12 },
    { station: "Mughal Sarai Jn", code: "MGS", arr: "23:45", dep: "23:50", dist: 693, status: "upcoming", delay: null },
    { station: "Dhanbad Jn", code: "DHN", arr: "04:20", dep: "04:25", dist: 1091, status: "upcoming", delay: null },
    { station: "Asansol Jn", code: "ASN", arr: "05:42", dep: "05:44", dist: 1194, status: "upcoming", delay: null },
    { station: "Howrah Jn", code: "HWH", arr: "09:55", dep: "-", dist: 1447, status: "upcoming", delay: null },
  ]},
  "12951": { trainNo: "12951", name: "Mumbai Rajdhani", from: "NDLS", to: "MMCT", currentStation: "BPL", currentStatus: "Departed", delay: 0, scheduledArr: "01:30", actualArr: "01:30", nextStation: "BRC", nextScheduled: "05:45", speed: 110, lastUpdated: "5 min ago", stops: [
    { station: "New Delhi", code: "NDLS", arr: "-", dep: "17:00", actual_dep: "17:00", dist: 0, status: "departed", delay: 0 },
    { station: "Kota Jn", code: "KOTA", arr: "23:15", dep: "23:20", actual_arr: "23:15", dist: 574, status: "departed", delay: 0 },
    { station: "Bhopal Jn", code: "BPL", arr: "01:30", dep: "01:35", actual_arr: "01:30", dist: 707, status: "current", delay: 0 },
    { station: "Vadodara Jn", code: "BRC", arr: "05:45", dep: "05:50", dist: 1093, status: "upcoming", delay: null },
    { station: "Surat", code: "ST", arr: "07:05", dep: "07:08", dist: 1215, status: "upcoming", delay: null },
    { station: "Mumbai Central", code: "MMCT", arr: "08:35", dep: "-", dist: 1384, status: "upcoming", delay: null },
  ]},
  "12001": { trainNo: "12001", name: "New Delhi Shatabdi", from: "NDLS", to: "BSB", currentStation: "PRYJ", currentStatus: "Arrived", delay: 5, scheduledArr: "12:15", actualArr: "12:20", nextStation: "BSB", nextScheduled: "14:00", speed: 0, lastUpdated: "1 min ago", stops: [
    { station: "New Delhi", code: "NDLS", arr: "-", dep: "06:15", actual_dep: "06:18", dist: 0, status: "departed", delay: 3 },
    { station: "Kanpur Central", code: "CNB", arr: "09:30", dep: "09:40", actual_arr: "09:33", dist: 440, status: "departed", delay: 3 },
    { station: "Prayagraj Jn", code: "PRYJ", arr: "12:15", dep: "12:20", actual_arr: "12:20", dist: 639, status: "current", delay: 5 },
    { station: "Varanasi Jn", code: "BSB", arr: "14:00", dep: "-", dist: 764, status: "upcoming", delay: null },
  ]},
};

const SEAT_AVAIL_DEMO = {
  classes: ["SL", "3A", "2A", "1A", "CC", "EC"],
  dates: ["29 May", "30 May", "31 May", "1 Jun", "2 Jun", "3 Jun"],
  data: {
    "SL": ["AVL 48", "AVL 122", "WL 3", "AVL 67", "AVL 89", "AVL 201"],
    "3A": ["WL 12", "AVL 14", "AVL 42", "WL 2", "AVL 31", "AVL 18"],
    "2A": ["AVL 6", "WL 4", "AVL 11", "AVL 8", "WL 1", "AVL 15"],
    "1A": ["AVL 2", "AVL 0", "AVL 4", "AVL 1", "AVL 3", "AVL 2"],
    "CC": ["REGRET", "AVL 5", "AVL 12", "WL 8", "AVL 22", "AVL 9"],
    "EC": ["AVL 3", "AVL 2", "REGRET", "AVL 6", "AVL 1", "AVL 4"],
  }
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
async function apiCall(path, fallback) {
  try {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    return { data, fromApi: true };
  } catch {
    return { data: fallback, fromApi: false };
  }
}



// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
function StationInput({ value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState(value);
  useEffect(() => { setQ(value); }, [value]);
  const filtered = STATIONS.filter(s =>
    s.name.toLowerCase().includes(q.toLowerCase()) ||
    s.code.toLowerCase().includes(q.toLowerCase())
  ).slice(0, 7);
  return (
    <div style={{ position: "relative" }}>
      <input value={q}
    
        onChange={e => { setQ(e.target.value); onChange(""); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 180)}
        placeholder={placeholder}
       
        style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "12px 16px", color: "#e8f4ff", fontSize: 15, outline: "none", transition: "border 0.2s" }}
      />
     
      {open && filtered.length > 0 && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: "#0d1b2e", border: "1px solid rgba(0,200,255,0.3)", borderRadius: 10, zIndex: 100, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
          {filtered.map(s => (
            <div key={s.code}
              onMouseDown={() => { onChange(s.code); setQ(`${s.name} (${s.code})`); setOpen(false); }}
              style={{ padding: "10px 16px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "background 0.15s", fontSize: 14 }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(0,200,255,0.12)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <span style={{ color: "#e8f4ff" }}>{s.name}</span>
              <span style={{ color: "#00c8ff", fontSize: 12, fontWeight: 600 }}>{s.code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Badge({ children, variant = "info" }) {
  const colors = { success: { bg: "rgba(34,197,94,0.15)", color: "#4ade80" }, warning: { bg: "rgba(251,191,36,0.15)", color: "#fbbf24" }, danger: { bg: "rgba(239,68,68,0.15)", color: "#f87171" }, info: { bg: "rgba(0,200,255,0.15)", color: "#00c8ff" }, purple: { bg: "rgba(167,139,250,0.15)", color: "#a78bfa" }, gray: { bg: "rgba(255,255,255,0.08)", color: "#94a3b8" } };
  const c = colors[variant] || colors.info;
  return <span style={{ background: c.bg, color: c.color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, letterSpacing: "0.04em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{children}</span>;
}

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "40px 0" }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", border: "3px solid rgba(0,200,255,0.2)", borderTopColor: "#00c8ff", animation: "spin 0.8s linear infinite" }} />
      <span style={{ color: "#64a0c8", fontSize: 14 }}>Fetching from IRCTC…</span>
    </div>
  );
}

function GlassCard({ children, style = {}, glow }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${glow ? "rgba(0,200,255,0.35)" : "rgba(255,255,255,0.1)"}`, borderRadius: 16, padding: "20px 24px", backdropFilter: "blur(8px)", boxShadow: glow ? "0 0 24px rgba(0,200,255,0.08)" : "none", ...style }}>
      {children}
    </div>
  );
}

function ApiSourceTag({ fromApi }) {
  return (
    <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: fromApi ? "rgba(34,197,94,0.12)" : "rgba(251,191,36,0.12)", color: fromApi ? "#4ade80" : "#fbbf24", fontWeight: 600 }}>
      {fromApi ? "● LIVE API" : "● DEMO DATA"}
    </span>
  );
}

// ─── BOOKING MODAL ───────────────────────────────────────────────────────────
function BookingModal({ train, selectedClass, onClose, travelDate }) {
  const [step, setStep] = useState(1); // 1=passengers, 2=contact, 3=payment, 4=confirm
  const [passengers, setPassengers] = useState([{ name: "", age: "", gender: "M", berth: "LB" }]);
  const [contact, setContact] = useState({ mobile: "", email: "" });
  const [payment, setPayment] = useState({ method: "upi", upiId: "", card: "", cvv: "", expiry: "", netbank: "SBI" });
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(null);

  const cls = selectedClass || train.classes[0];
  const fare = train.fare[cls] || 0;
  const total = fare * passengers.length + 40; // +40 service charge

  const addPassenger = () => {
    if (passengers.length < 6) setPassengers([...passengers, { name: "", age: "", gender: "M", berth: "LB" }]);
  };

  const updatePassenger = (i, key, val) => {
    const updated = [...passengers];
    updated[i] = { ...updated[i], [key]: val };
    setPassengers(updated);
  };

  const removePassenger = (i) => {
    if (passengers.length > 1) setPassengers(passengers.filter((_, idx) => idx !== i));
  };

  const step1Valid = passengers.every(p => p.name.trim() && p.age && parseInt(p.age) > 0 && parseInt(p.age) < 120);
  const step2Valid = /^[6-9]\d{9}$/.test(contact.mobile) && contact.email.includes("@");

  const confirmBooking = async () => {

  setLoading(true);

  try {

    const token = localStorage.getItem("token");

    const payload = {

      trainNo: train.number,
      trainName: train.name,

      from: train.from,
      to: train.to,

      date: travelDate,

      class: cls,

      passengers,

      contact,

      payment: {
        method: payment.method
      },

      total
    };

    const res = await fetch(
      "http://localhost:3000/api/book-train",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify(payload)
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Booking failed");
    }

    setBooking(data.booking);

  } catch (error) {

    console.log(error);

    alert(error.message);

  } finally {

    setLoading(false);

    setStep(4);
  }
};
  const stepStyle = (s) => ({
    display: "flex", alignItems: "center", gap: 8,
    padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600,
    background: step === s ? "rgba(0,200,255,0.15)" : step > s ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.04)",
    color: step === s ? "#00c8ff" : step > s ? "#4ade80" : "#475569",
    border: `1px solid ${step === s ? "rgba(0,200,255,0.4)" : step > s ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.08)"}`,
  });

  const inputSt = { width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 14px", color: "#e8f4ff", fontSize: 14, outline: "none" };
  const labelSt = { color: "#64a0c8", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 5 };
  const selectSt = { ...inputSt, background: "rgba(14,24,42,0.95)" };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, backdropFilter: "blur(4px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: "#0d1b2e", border: "1px solid rgba(0,200,255,0.25)", borderRadius: 20, width: "100%", maxWidth: 640, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 64px rgba(0,0,0,0.6)" }}>
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#e8f4ff" }}>🎫 Book Ticket</div>
            <div style={{ fontSize: 13, color: "#64a0c8", marginTop: 2 }}>{train.number} · {train.name} · {cls} Class</div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 8, width: 32, height: 32, color: "#94a3b8", fontSize: 18, cursor: "pointer" }}>×</button>
        </div>

        {/* Steps */}
        {step < 4 && (
          <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 8, overflowX: "auto" }}>
            {[[1,"👥 Passengers"],[2,"📱 Contact"],[3,"💳 Payment"]].map(([s,l]) => (
              <div key={s} style={stepStyle(s)}>{step > s ? "✓" : s} {l}</div>
            ))}
          </div>
        )}

        <div style={{ padding: "24px" }}>

          {/* STEP 1: Passengers */}
          {step === 1 && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ color: "#e8f4ff", fontWeight: 600 }}>Passenger Details</div>
                <button onClick={addPassenger} style={{ background: "rgba(0,200,255,0.12)", border: "1px solid rgba(0,200,255,0.3)", borderRadius: 8, padding: "6px 14px", color: "#00c8ff", fontSize: 13, cursor: "pointer" }}>+ Add Passenger</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {passengers.map((p, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                      <span style={{ color: "#64a0c8", fontSize: 12, fontWeight: 600 }}>PASSENGER {i + 1}</span>
                      {i > 0 && <button onClick={() => removePassenger(i)} style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: 12 }}>✕ Remove</button>}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 90px 100px", gap: 10 }}>
                      <div>
                        <label style={labelSt}>Full Name</label>
                        <input value={p.name} onChange={e => updatePassenger(i, "name", e.target.value.toUpperCase())} placeholder="As per ID" style={inputSt} />
                      </div>
                      <div>
                        <label style={labelSt}>Age</label>
                        <input type="number" value={p.age} onChange={e => updatePassenger(i, "age", e.target.value)} min="1" max="119" placeholder="00" style={inputSt} />
                      </div>
                      <div>
                        <label style={labelSt}>Gender</label>
                        <select value={p.gender} onChange={e => updatePassenger(i, "gender", e.target.value)} style={selectSt}>
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                          <option value="T">Other</option>
                        </select>
                      </div>
                      <div>
                        <label style={labelSt}>Berth Pref</label>
                        <select value={p.berth} onChange={e => updatePassenger(i, "berth", e.target.value)} style={selectSt}>
                          <option value="LB">Lower</option>
                          <option value="MB">Middle</option>
                          <option value="UB">Upper</option>
                          <option value="SL">Side Lower</option>
                          <option value="SU">Side Upper</option>
                          <option value="NO">No Pref</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 20, padding: 14, background: "rgba(0,200,255,0.06)", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ color: "#64a0c8", fontSize: 13 }}>Fare: ₹{fare} × {passengers.length} + ₹40 service = </span>
                  <span style={{ color: "#00c8ff", fontSize: 18, fontWeight: 800 }}> ₹{total.toLocaleString("en-IN")}</span>
                </div>
                <button onClick={() => setStep(2)} disabled={!step1Valid} style={{ background: step1Valid ? "linear-gradient(135deg,#0099cc,#00c8ff)" : "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, padding: "10px 24px", color: step1Valid ? "#001a2e" : "#475569", fontWeight: 700, cursor: step1Valid ? "pointer" : "not-allowed", fontSize: 14 }}>Next →</button>
              </div>
            </div>
          )}

          {/* STEP 2: Contact */}
          {step === 2 && (
            <div>
              <div style={{ color: "#e8f4ff", fontWeight: 600, marginBottom: 20 }}>Contact Information</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={labelSt}>Mobile Number</label>
                  <div style={{ display: "flex", gap: 10 }}>
                    <span style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 14px", color: "#94a3b8", fontSize: 14, whiteSpace: "nowrap" }}>+91</span>
                    <input value={contact.mobile} onChange={e => setContact({ ...contact, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })} placeholder="10-digit mobile" style={{ ...inputSt, flex: 1 }} />
                  </div>
                  <div style={{ fontSize: 11, color: "#475569", marginTop: 4 }}>OTP and booking confirmation will be sent to this number</div>
                </div>
                <div>
                  <label style={labelSt}>Email Address</label>
                  <input value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} placeholder="your@email.com" type="email" style={inputSt} />
                </div>
                <div style={{ padding: 14, background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 10, fontSize: 12, color: "#fbbf24" }}>
                  ⓘ A booking confirmation with PNR will be sent to the above contact details.
                </div>
              </div>
              <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
                <button onClick={() => setStep(1)} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 20px", color: "#94a3b8", cursor: "pointer", fontSize: 14 }}>← Back</button>
                <button onClick={() => setStep(3)} disabled={!step2Valid} style={{ flex: 1, background: step2Valid ? "linear-gradient(135deg,#0099cc,#00c8ff)" : "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, padding: "10px 24px", color: step2Valid ? "#001a2e" : "#475569", fontWeight: 700, cursor: step2Valid ? "pointer" : "not-allowed", fontSize: 14 }}>Continue to Payment →</button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment */}
          {step === 3 && (
            <div>
              <div style={{ color: "#e8f4ff", fontWeight: 600, marginBottom: 4 }}>Payment</div>
              <div style={{ color: "#64a0c8", fontSize: 13, marginBottom: 20 }}>Total Amount: <strong style={{ color: "#00c8ff", fontSize: 18 }}>₹{total.toLocaleString("en-IN")}</strong></div>

              {/* Payment Method Tabs */}
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {[["upi","📲 UPI"],["card","💳 Card"],["netbanking","🏦 Net Banking"],["wallet","👛 Wallet"]].map(([m, l]) => (
                  <button key={m} onClick={() => setPayment({ ...payment, method: m })} style={{ flex: 1, padding: "10px 8px", borderRadius: 10, border: `1px solid ${payment.method === m ? "rgba(0,200,255,0.5)" : "rgba(255,255,255,0.1)"}`, background: payment.method === m ? "rgba(0,200,255,0.12)" : "rgba(255,255,255,0.04)", color: payment.method === m ? "#00c8ff" : "#64a0c8", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>{l}</button>
                ))}
              </div>

              {payment.method === "upi" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={labelSt}>UPI ID</label>
                    <input value={payment.upiId} onChange={e => setPayment({ ...payment, upiId: e.target.value })} placeholder="yourname@upi" style={inputSt} />
                  </div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {["GPay", "PhonePe", "Paytm", "BHIM"].map(app => (
                      <button key={app} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "8px 16px", color: "#94a3b8", cursor: "pointer", fontSize: 13 }}>{app}</button>
                    ))}
                  </div>
                </div>
              )}

              {payment.method === "card" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={labelSt}>Card Number</label>
                    <input value={payment.card} onChange={e => setPayment({ ...payment, card: e.target.value.replace(/\D/g,"").slice(0,16) })} placeholder="1234 5678 9012 3456" style={inputSt} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div>
                      <label style={labelSt}>Expiry (MM/YY)</label>
                      <input value={payment.expiry} onChange={e => setPayment({ ...payment, expiry: e.target.value })} placeholder="12/28" style={inputSt} />
                    </div>
                    <div>
                      <label style={labelSt}>CVV</label>
                      <input value={payment.cvv} onChange={e => setPayment({ ...payment, cvv: e.target.value.slice(0,4) })} placeholder="***" type="password" style={inputSt} />
                    </div>
                  </div>
                </div>
              )}

              {payment.method === "netbanking" && (
                <div>
                  <label style={labelSt}>Select Bank</label>
                  <select value={payment.netbank} onChange={e => setPayment({ ...payment, netbank: e.target.value })} style={selectSt}>
                    {["SBI","HDFC","ICICI","Axis","Kotak","PNB","Bank of Baroda","Union Bank","Canara Bank"].map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              )}

              {payment.method === "wallet" && (
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {["Paytm Wallet","Amazon Pay","PhonePe Wallet","Freecharge","Mobikwik"].map(w => (
                    <button key={w} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 16px", color: "#94a3b8", cursor: "pointer", fontSize: 13 }}>{w}</button>
                  ))}
                </div>
              )}

              <div style={{ marginTop: 24, padding: 14, background: "rgba(255,255,255,0.03)", borderRadius: 12, marginBottom: 20 }}>
                <div style={{ color: "#64a0c8", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Order Summary</div>
                {passengers.map((p, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#94a3b8", marginBottom: 4 }}><span>{p.name || `Passenger ${i+1}`} ({cls})</span><span>₹{fare}</span></div>)}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#64a0c8", marginBottom: 4, marginTop: 6, paddingTop: 6, borderTop: "1px solid rgba(255,255,255,0.06)" }}><span>Service Charge</span><span>₹40</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, color: "#e8f4ff", fontWeight: 700, marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.1)" }}><span>Total</span><span style={{ color: "#00c8ff" }}>₹{total.toLocaleString("en-IN")}</span></div>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(2)} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 20px", color: "#94a3b8", cursor: "pointer", fontSize: 14 }}>← Back</button>
                <button onClick={confirmBooking} style={{ flex: 1, background: "linear-gradient(135deg,#00aa44,#00dd66)", border: "none", borderRadius: 10, padding: "12px 24px", color: "#001a2e", fontWeight: 800, cursor: "pointer", fontSize: 15 }}>🔒 Pay ₹{total.toLocaleString("en-IN")} & Confirm</button>
              </div>
            </div>
          )}

          {/* STEP 4: Confirmation */}
          {step === 4 && loading && <Spinner />}
          {step === 4 && booking && (
            <div style={{ textAlign: "center", animation: "slideIn 0.4s ease both" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#4ade80", marginBottom: 6 }}>Booking Confirmed!</div>
              <div style={{ color: "#64a0c8", fontSize: 14, marginBottom: 24 }}>Your ticket has been booked successfully</div>
              {/* <ApiSourceTag fromApi={booking.fromApi} /> */}

              <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 14, padding: 20, marginTop: 20, marginBottom: 20 }}>
                <div style={{ fontSize: 13, color: "#64a0c8", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>PNR Number</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#4ade80", letterSpacing: "0.12em", fontVariantNumeric: "tabular-nums" }}>{booking.pnr}</div>
                <div style={{ fontSize: 11, color: "#475569", marginTop: 4 }}>Booking ID: {booking.bookingId}</div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20, textAlign: "left" }}>
                {[
                  ["Train", `${booking.trainNo} · ${booking.trainName}`],
                  ["Date", booking.date || travelDate],
                  ["Route", `${booking.from} → ${booking.to}`],
                  ["Class", booking.class],
                  ["Passengers", `${booking.passengers.length} passenger(s)`],
                  ["Amount Paid", `₹${booking.total.toLocaleString("en-IN")}`],
                ].map(([k, v]) => (
                  <div key={k} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px" }}>
                    <div style={{ color: "#475569", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>{k}</div>
                    <div style={{ color: "#e8f4ff", fontSize: 13, fontWeight: 600 }}>{v}</div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 12, color: "#475569", marginBottom: 20 }}>
                Confirmation sent to {booking.contact?.mobile ? `+91 ${booking.contact.mobile}` : ""} or {booking.contact?.email || ""}
              </div>

              <button onClick={onClose} style={{ background: "linear-gradient(135deg,#0099cc,#00c8ff)", border: "none", borderRadius: 10, padding: "12px 32px", color: "#001a2e", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>Done ✓</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── TABS ────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "search", label: "Train Search", icon: "🔍" },
  { id: "pnr", label: "PNR Status", icon: "🎫" },
  { id: "live", label: "Live Train", icon: "📍" },
  { id: "seat", label: "Seat Availability", icon: "💺" },
  { id: "fare", label: "Fare Enquiry", icon: "💰" },
  { id: "schedule", label: "Train Schedule", icon: "📅" },
];

// ─── TRAIN SEARCH ─────────────────────────────────────────────────────────────
function TrainSearchTab() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("2026-05-29");
  const [quota, setQuota] = useState("GN");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fromApi, setFromApi] = useState(false);
  const [selectedClass, setSelectedClass] = useState({});
  const [bookingTrain, setBookingTrain] = useState(null);
  const [sortBy, setSortBy] = useState("departure");
  const navigate = useNavigate();
  const handleBookNow = (train, cls) => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/join"); // apna login route
    return;
  }
  setBookingTrain({ train, cls });
};

  const swap = () => { const t = from; setFrom(to); setTo(t); };

  const search = async () => {
    if (!from || !to) return;
    setLoading(true); setResults(null);
    const { data, fromApi: fa } = await apiCall(
      `/trains/search?from=${from}&to=${to}&date=${date}&quota=${quota}`,
      null
    );
    setFromApi(fa);
    if (fa && data?.trains?.length > 0) {
      setResults(data.trains);
    } else {
      const filtered = DEMO_TRAINS.filter(t => t.from === from && t.to === to);
      setResults(filtered.length ? filtered : DEMO_TRAINS.slice(0, 6));
    }
    setLoading(false);
  };

  const sorted = results ? [...results].sort((a, b) => {
    if (sortBy === "departure") return a.departs.localeCompare(b.departs);
    if (sortBy === "duration") return a.duration.localeCompare(b.duration);
    if (sortBy === "arrival") return a.arrives.localeCompare(b.arrives);
    return 0;
  }) : [];

  const availColor = (n) => n === 0 ? "#f87171" : n <= 5 ? "#fbbf24" : "#4ade80";
  const typeVariant = (t) => t === "Rajdhani" ? "info" : t === "Shatabdi" ? "purple" : t === "Duronto" ? "warning" : t === "Garib Rath" ? "success" : "gray";

  return (
    <div>
      <GlassCard glow style={{ marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "end", marginBottom: 16 }}>
          <div>
            <label style={{ color: "#64a0c8", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>From Station</label>
            <StationInput value={from ? STATIONS.find(s => s.code === from)?.name + ` (${from})` : ""} onChange={setFrom} placeholder="City or Station Code"  />
          </div>
          <button onClick={swap} style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(0,200,255,0.15)", border: "1px solid rgba(0,200,255,0.4)", color: "#00c8ff", fontSize: 18, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,200,255,0.3)"; e.currentTarget.style.transform = "rotate(180deg)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,200,255,0.15)"; e.currentTarget.style.transform = "rotate(0deg)"; }}>⇄</button>
          <div>
            <label style={{ color: "#64a0c8", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>To Station</label>
            <StationInput value={to ? STATIONS.find(s => s.code === to)?.name + ` (${to})` : ""} onChange={setTo} placeholder="City or Station Code" />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 12, alignItems: "end" }}>
          <div>
            <label style={{ color: "#64a0c8", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Date of Journey</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "12px 16px", color: "#e8f4ff", fontSize: 15, outline: "none", colorScheme: "dark" }} />
          </div>
          <div>
            <label style={{ color: "#64a0c8", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Quota</label>
            <select value={quota} onChange={e => setQuota(e.target.value)} style={{ width: "100%", boxSizing: "border-box", background: "rgba(14,24,42,0.95)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "12px 16px", color: "#e8f4ff", fontSize: 15, outline: "none" }}>
              <option value="GN">General (GN)</option>
              <option value="TQ">Tatkal (TQ)</option>
              <option value="PT">Premium Tatkal (PT)</option>
              <option value="LD">Ladies (LD)</option>
              <option value="HO">HO Quota</option>
            </select>
          </div>
          <button onClick={search} style={{ background: "linear-gradient(135deg, #0099cc, #00c8ff)", border: "none", borderRadius: 10, padding: "12px 32px", color: "#001a2e", fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "opacity 0.2s" }}>🔍 Search</button>
        </div>
      </GlassCard>

      {loading && <Spinner />}

      {results && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#64a0c8", fontSize: 14 }}>{results.length} trains found</span>
              <ApiSourceTag fromApi={fromApi} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["departure", "duration", "arrival"].map(f => (
                <button key={f} onClick={() => setSortBy(f)} style={{ background: sortBy === f ? "rgba(0,200,255,0.15)" : "rgba(255,255,255,0.06)", border: `1px solid ${sortBy === f ? "rgba(0,200,255,0.4)" : "rgba(255,255,255,0.12)"}`, borderRadius: 8, padding: "6px 14px", color: sortBy === f ? "#00c8ff" : "#94a3b8", fontSize: 12, cursor: "pointer", textTransform: "capitalize" }}>{f}</button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {sorted.map((train, i) => (
              <div key={train.number} style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, overflow: "hidden", transition: "all 0.25s", animation: `slideIn 0.3s ease ${i * 0.06}s both` }}
                onMouseEnter={e => { e.currentTarget.style.border = "1px solid rgba(0,200,255,0.3)"; e.currentTarget.style.background = "rgba(0,200,255,0.04)"; }}
                onMouseLeave={e => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)"; e.currentTarget.style.background = "rgba(255,255,255,0.035)"; }}>
                <div style={{ padding: "16px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                        <span style={{ color: "#00c8ff", fontSize: 13, fontWeight: 600 }}>{train.number}</span>
                        <span style={{ color: "#e8f4ff", fontSize: 15, fontWeight: 700 }}>{train.name}</span>
                        <Badge variant={typeVariant(train.type)}>{train.type}</Badge>
                      </div>
                      <div style={{ display: "flex", gap: 5 }}>
                        {train.days.map((d, idx) => (
                          <span key={idx} style={{ fontSize: 10, color: "#64a0c8", background: "rgba(255,255,255,0.06)", borderRadius: 4, padding: "2px 5px" }}>{d}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 22, fontWeight: 700, color: "#e8f4ff", fontVariantNumeric: "tabular-nums" }}>{train.departs}</div>
                        <div style={{ fontSize: 11, color: "#64a0c8" }}>{train.from}</div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 11, color: "#64a0c8", marginBottom: 4 }}>{train.duration}</div>
                        <div style={{ height: 1, width: 80, background: "linear-gradient(90deg,#00c8ff,rgba(0,200,255,0.2))", position: "relative" }}>
                          <div style={{ position: "absolute", right: -4, top: -4, width: 8, height: 8, borderRadius: "50%", background: "#00c8ff" }} />
                        </div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 22, fontWeight: 700, color: "#e8f4ff", fontVariantNumeric: "tabular-nums" }}>{train.arrives}</div>
                        <div style={{ fontSize: 11, color: "#64a0c8" }}>{train.to}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                    {train.classes.map(cls => {
                      const avl = train.available[cls];
                      const fare = train.fare[cls];
                      const isSel = selectedClass[train.number] === cls;
                      return (
                        <button key={cls} onClick={() => setSelectedClass(p => ({ ...p, [train.number]: cls }))} style={{ background: isSel ? "rgba(0,200,255,0.2)" : "rgba(255,255,255,0.05)", border: `1px solid ${isSel ? "rgba(0,200,255,0.6)" : "rgba(255,255,255,0.1)"}`, borderRadius: 10, padding: "8px 14px", cursor: "pointer", transition: "all 0.15s", textAlign: "left" }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: isSel ? "#00c8ff" : "#94a3b8" }}>{cls}</div>
                          <div style={{ fontSize: 11, color: availColor(avl) }}>{avl === 0 ? "Not Avl" : `AVL ${avl}`}</div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: "#e8f4ff" }}>₹{fare}</div>
                        </button>
                      );
                    })}
                    <button
                      onClick={() => handleBookNow(train, selectedClass[train.number] || train.classes[0])}
                      style={{ marginLeft: "auto", background: "linear-gradient(135deg,#0099cc,#00c8ff)", border: "none", borderRadius: 10, padding: "10px 22px", color: "#001a2e", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "opacity 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                    >Book Now →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {bookingTrain && (
        <BookingModal
          train={bookingTrain.train}
          selectedClass={bookingTrain.cls}
          travelDate={date}
          onClose={() => setBookingTrain(null)}
        />
      )}
    </div>
  );
}

// ─── PNR TAB ──────────────────────────────────────────────────────────────────
function PNRTab() {
  const [pnr, setPnr] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [fromApi, setFromApi] = useState(false);

const check = async () => {

  if (pnr.length !== 10) {
    setErr("PNR must be 10 digits");
    return;
  }

  try {

    setLoading(true);
    setErr("");
    setResult(null);
    const token=localStorage.getItem("token");


    const res = await fetch(
      `http://localhost:3000/api/train/${pnr}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    const data = await res.json();

    // if (!res.ok) {
    //   throw new Error(data.message);
    // }

    setResult(data.pnr);
    setFromApi(true);

  } catch (error) {

    console.log(error);

    if (DEMO_PNR[pnr]) {
      setResult(DEMO_PNR[pnr]);
      setFromApi(false);
    } else {
      setErr(error.message || "PNR not found");
    }

  } finally {
    setLoading(false);
  }
};

  const statusVariant = (s) => s?.startsWith("CNF") ? "success" : s?.startsWith("WL") ? "danger" : s?.startsWith("RAC") ? "warning" : "info";

  return (
    <div>
      <GlassCard glow style={{ marginBottom: 20 }}>
        <label style={{ color: "#64a0c8", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>PNR Number (10 Digits)</label>
        <div style={{ display: "flex", gap: 10 }}>
          <input value={pnr} onChange={e => setPnr(e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="Enter 10-digit PNR" style={{ flex: 1, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "12px 16px", color: "#e8f4ff", fontSize: 15, outline: "none", letterSpacing: "0.1em", fontVariantNumeric: "tabular-nums" }} onKeyDown={e => e.key === "Enter" && check()} />
          <button onClick={check} style={{ background: "linear-gradient(135deg,#0099cc,#00c8ff)", border: "none", borderRadius: 10, padding: "12px 28px", color: "#001a2e", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Check Status</button>
        </div>
        {err && <div style={{ color: "#fbbf24", fontSize: 13, marginTop: 8 }}>⚠️ {err}</div>}
        <div style={{ color: "#475569", fontSize: 12, marginTop: 6 }}>Demo PNRs: 2846123456 · 4521789012 · 7234901234 · 9876543210 · 1122334455</div>
      </GlassCard>

      {loading && <Spinner />}

      {result && (
        <div style={{ animation: "slideIn 0.35s ease both" }}>
          <GlassCard glow style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#e8f4ff" }}>{result.trainNo} — {result.trainName}</div>
                  <ApiSourceTag fromApi={fromApi} />
                </div>
                <div style={{ color: "#64a0c8", fontSize: 13 }}>Journey Date: {result.date} · Class: {result.class}</div>
              </div>
              <Badge variant={statusVariant(result.status)}>{result.status}</Badge>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
              {[{ label: "From", val: result.from }, { label: "To", val: result.to }, { label: "Boarding", val: result.boardingPoint }].map(({ label, val }) => (
                <div key={label} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "10px 14px" }}>
                  <div style={{ color: "#64a0c8", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{label}</div>
                  <div style={{ color: "#e8f4ff", fontSize: 14, fontWeight: 600 }}>{val}</div>
                </div>
              ))}
            </div>
            {result.coach && result.coach !== "-" && (
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.2)", borderRadius: 10, padding: "10px 16px", fontSize: 13 }}>
                  <span style={{ color: "#64a0c8" }}>Coach: </span><span style={{ color: "#00c8ff", fontWeight: 700 }}>{result.coach}</span>
                </div>
                <div style={{ background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.2)", borderRadius: 10, padding: "10px 16px", fontSize: 13 }}>
                  <span style={{ color: "#64a0c8" }}>Berth: </span><span style={{ color: "#00c8ff", fontWeight: 700 }}>{result.berth}</span>
                </div>
              </div>
            )}
          </GlassCard>
          <GlassCard>
            <div style={{ color: "#64a0c8", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }}>Passenger Details</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {result.passengers.map((p, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "rgba(255,255,255,0.04)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(0,200,255,0.15)", border: "1px solid rgba(0,200,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00c8ff", fontSize: 13, fontWeight: 700 }}>{i + 1}</div>
                    <div>
                      <div style={{ color: "#e8f4ff", fontSize: 14, fontWeight: 600 }}>{p.name}</div>
                      <div style={{ color: "#64a0c8", fontSize: 12 }}>Age {p.age} · {p.gender === "M" ? "Male" : p.gender === "F" ? "Female" : "Other"}</div>
                    </div>
                  </div>
                  <Badge variant={statusVariant(p.status)}>{p.status}</Badge>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

// ─── LIVE TRAIN TAB ───────────────────────────────────────────────────────────
function LiveTrainTab() {
  const [trainNo, setTrainNo] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [fromApi, setFromApi] = useState(false);

  const check = async () => {
    if (!trainNo) { setErr("Enter a train number"); return; }
    setErr(""); setLoading(true); setResult(null);
    const { data, fromApi: fa } = await apiCall(`/trains/live/${trainNo}`, null);
    setFromApi(fa);
    if (fa && data?.train) { setResult(data.train); }
    else { setResult(DEMO_LIVE[trainNo] || DEMO_LIVE["12301"]); }
    setLoading(false);
  };

  return (
    <div>
      <GlassCard glow style={{ marginBottom: 20 }}>
        <label style={{ color: "#64a0c8", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Train Number / Name</label>
        <div style={{ display: "flex", gap: 10 }}>
          <input value={trainNo} onChange={e => setTrainNo(e.target.value.trim())} placeholder="e.g. 12301 or 12951" style={{ flex: 1, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "12px 16px", color: "#e8f4ff", fontSize: 15, outline: "none" }} onKeyDown={e => e.key === "Enter" && check()} />
          <button onClick={check} style={{ background: "linear-gradient(135deg,#0099cc,#00c8ff)", border: "none", borderRadius: 10, padding: "12px 28px", color: "#001a2e", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>📍 Track</button>
        </div>
        {err && <div style={{ color: "#fbbf24", fontSize: 13, marginTop: 8 }}>⚠️ {err}</div>}
        <div style={{ color: "#475569", fontSize: 12, marginTop: 6 }}>Demo: 12301 (Howrah Rajdhani) · 12951 (Mumbai Rajdhani) · 12001 (Shatabdi)</div>
      </GlassCard>

      {loading && <Spinner />}

      {result && (
        <div style={{ animation: "slideIn 0.35s ease both" }}>
          <GlassCard glow style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#e8f4ff" }}>{result.trainNo} · {result.name}</div>
                  <ApiSourceTag fromApi={fromApi} />
                </div>
                <div style={{ color: "#64a0c8", fontSize: 13 }}>{result.from} → {result.to} · Last updated: {result.lastUpdated}</div>
              </div>
              {result.delay > 0 ? <Badge variant="warning">+{result.delay} min delayed</Badge> : <Badge variant="success">On Time</Badge>}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
              {[
                { label: "Current Station", val: result.currentStation, sub: result.currentStatus },
                { label: "Next Station", val: result.nextStation, sub: `Sch: ${result.nextScheduled}` },
                { label: "Speed", val: result.speed > 0 ? `${result.speed} km/h` : "Halted", sub: "Current speed" },
                { label: "Delay", val: result.delay ? `${result.delay} min` : "On Time", sub: "Running status" },
              ].map(({ label, val, sub }) => (
                <div key={label} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "12px 16px" }}>
                  <div style={{ color: "#64a0c8", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{label}</div>
                  <div style={{ color: "#00c8ff", fontSize: 15, fontWeight: 700 }}>{val}</div>
                  <div style={{ color: "#64a0c8", fontSize: 12 }}>{sub}</div>
                </div>
              ))}
            </div>
          </GlassCard>
          <GlassCard>
            <div style={{ color: "#64a0c8", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }}>Station-wise Status</div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 19, top: 0, bottom: 0, width: 2, background: "rgba(0,200,255,0.15)", borderRadius: 2 }} />
              {result.stops.map((stop, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: 6, position: "relative" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", flexShrink: 0, zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: stop.status === "current" ? "#00c8ff" : stop.status === "departed" ? "rgba(0,200,255,0.2)" : "rgba(255,255,255,0.06)", border: `2px solid ${stop.status === "current" ? "#00c8ff" : stop.status === "departed" ? "rgba(0,200,255,0.4)" : "rgba(255,255,255,0.15)"}`, fontSize: 14 }}>
                    {stop.status === "current" ? "📍" : stop.status === "departed" ? "✓" : "○"}
                  </div>
                  <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 14px", borderRadius: 10, background: stop.status === "current" ? "rgba(0,200,255,0.08)" : "transparent", border: stop.status === "current" ? "1px solid rgba(0,200,255,0.25)" : "1px solid transparent", marginBottom: 4 }}>
                    <div>
                      <span style={{ color: stop.status === "upcoming" ? "#64a0c8" : "#e8f4ff", fontSize: 14, fontWeight: 600 }}>{stop.station}</span>
                      <span style={{ color: "#475569", fontSize: 12, marginLeft: 8 }}>{stop.code}</span>
                      {stop.status === "current" && <span style={{ marginLeft: 8 }}><Badge variant="info">Current</Badge></span>}
                    </div>
                    <div style={{ textAlign: "right", fontSize: 12 }}>
                      <div style={{ color: "#94a3b8" }}>Arr: {stop.arr} · Dep: {stop.dep}</div>
                      {stop.delay && <div style={{ color: "#fbbf24" }}>+{stop.delay} min late</div>}
                      <div style={{ color: "#475569" }}>{stop.dist} km</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

// ─── SEAT AVAILABILITY ────────────────────────────────────────────────────────
function SeatTab() {
  const [from, setFrom] = useState(""); const [to, setTo] = useState(""); const [trainNo, setTrainNo] = useState("");
  const [result, setResult] = useState(null); const [loading, setLoading] = useState(false); const [fromApi, setFromApi] = useState(false);

  const check = async () => {
    setLoading(true); setResult(null);
    const { data, fromApi: fa } = await apiCall(`/trains/availability?from=${from}&to=${to}&trainNo=${trainNo}`, null);
    setFromApi(fa);
    if (fa && data?.availability) { setResult(data.availability); } else { setResult(SEAT_AVAIL_DEMO); }
    setLoading(false);
  };

  const cellColor = (val) => {
    if (val.startsWith("AVL")) { const n = parseInt(val.split(" ")[1]); if (n === 0) return { bg: "rgba(239,68,68,0.12)", color: "#f87171" }; if (n <= 10) return { bg: "rgba(251,191,36,0.12)", color: "#fbbf24" }; return { bg: "rgba(34,197,94,0.12)", color: "#4ade80" }; }
    if (val.startsWith("WL")) return { bg: "rgba(251,191,36,0.12)", color: "#fbbf24" };
    if (val === "REGRET") return { bg: "rgba(239,68,68,0.12)", color: "#f87171" };
    return { bg: "rgba(255,255,255,0.04)", color: "#94a3b8" };
  };

  return (
    <div>
      <GlassCard glow style={{ marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div><label style={{ color: "#64a0c8", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>From</label><StationInput value={from ? STATIONS.find(s => s.code === from)?.name + ` (${from})` : ""} onChange={setFrom} placeholder="From Station" /></div>
          <div><label style={{ color: "#64a0c8", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>To</label><StationInput value={to ? STATIONS.find(s => s.code === to)?.name + ` (${to})` : ""} onChange={setTo} placeholder="To Station" /></div>
          <div><label style={{ color: "#64a0c8", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Train Number</label><input value={trainNo} onChange={e => setTrainNo(e.target.value)} placeholder="e.g. 12301" style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "12px 16px", color: "#e8f4ff", fontSize: 15, outline: "none" }} /></div>
        </div>
        <button onClick={check} style={{ background: "linear-gradient(135deg,#0099cc,#00c8ff)", border: "none", borderRadius: 10, padding: "12px 32px", color: "#001a2e", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Check Availability</button>
      </GlassCard>

      {loading && <Spinner />}

      {result && (
        <GlassCard style={{ animation: "slideIn 0.35s ease both", overflowX: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ color: "#64a0c8", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Seat Availability</div>
            <ApiSourceTag fromApi={fromApi} />
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr>
              <th style={{ padding: "8px 14px", textAlign: "left", color: "#64a0c8", fontSize: 12, fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>Class</th>
              {result.dates.map(d => <th key={d} style={{ padding: "8px 12px", textAlign: "center", color: "#64a0c8", fontSize: 12, fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.08)", whiteSpace: "nowrap" }}>{d}</th>)}
            </tr></thead>
            <tbody>
              {result.classes.map((cls, ri) => (
                <tr key={cls} style={{ background: ri % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                  <td style={{ padding: "10px 14px", color: "#00c8ff", fontSize: 13, fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{cls}</td>
                  {result.data[cls].map((val, ci) => { const c = cellColor(val); return <td key={ci} style={{ padding: "8px 10px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.04)" }}><span style={{ background: c.bg, color: c.color, fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, whiteSpace: "nowrap" }}>{val}</span></td>; })}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex", gap: 16, marginTop: 14, fontSize: 11, color: "#64a0c8" }}>
            {[["#4ade80","Available"],["#fbbf24","Waiting List"],["#f87171","No Seats"]].map(([c, l]) => (
              <span key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: c, display: "inline-block" }} />{l}</span>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
}

// ─── FARE TAB ──────────────────────────────────────────────────────────────────
function FareTab() {
  const [from, setFrom] = useState(""); const [to, setTo] = useState(""); const [trainNo, setTrainNo] = useState(""); const [quota, setQuota] = useState("GN");
  const [result, setResult] = useState(null); const [loading, setLoading] = useState(false); const [fromApi, setFromApi] = useState(false);

  const DEMO_FARE = { train: "12301 — Howrah Rajdhani", distance: "1447 km", fares: [
    { cls: "1A (AC First Class)", base: 3830, tatkal: 5745, berths: 2 },
    { cls: "2A (AC 2 Tier)", base: 2215, tatkal: 3322, berths: 4 },
    { cls: "3A (AC 3 Tier)", base: 1480, tatkal: 2220, berths: 8 },
    { cls: "SL (Sleeper)", base: 505, tatkal: 757, berths: 9 },
  ]};

  const calc = async () => {
    setLoading(true); setResult(null);
    const { data, fromApi: fa } = await apiCall(`/trains/fare?from=${from}&to=${to}&trainNo=${trainNo}&quota=${quota}`, null);
    setFromApi(fa);
    if (fa && data?.fares) { setResult(data); } else { setResult(DEMO_FARE); }
    setLoading(false);
  };

  const inputSt = { width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "12px 16px", color: "#e8f4ff", fontSize: 15, outline: "none" };

  return (
    <div>
      <GlassCard glow style={{ marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div><label style={{ color: "#64a0c8", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>From Station</label><StationInput value={from ? STATIONS.find(s => s.code === from)?.name + ` (${from})` : ""} onChange={setFrom} placeholder="From Station" /></div>
          <div><label style={{ color: "#64a0c8", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>To Station</label><StationInput value={to ? STATIONS.find(s => s.code === to)?.name + ` (${to})` : ""} onChange={setTo} placeholder="To Station" /></div>
          <div><label style={{ color: "#64a0c8", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Train Number (optional)</label><input value={trainNo} onChange={e => setTrainNo(e.target.value)} placeholder="e.g. 12301" style={inputSt} /></div>
          <div><label style={{ color: "#64a0c8", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Quota</label><select value={quota} onChange={e => setQuota(e.target.value)} style={{ ...inputSt, background: "rgba(14,24,42,0.95)" }}><option value="GN">General (GN)</option><option value="TQ">Tatkal (TQ)</option><option value="PT">Premium Tatkal</option><option value="LD">Ladies</option></select></div>
        </div>
        <button onClick={calc} style={{ background: "linear-gradient(135deg,#0099cc,#00c8ff)", border: "none", borderRadius: 10, padding: "12px 32px", color: "#001a2e", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Get Fare</button>
      </GlassCard>

      {loading && <Spinner />}

      {result && (
        <div style={{ animation: "slideIn 0.35s ease both" }}>
          <GlassCard>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
              <div><div style={{ fontSize: 16, fontWeight: 700, color: "#e8f4ff" }}>{result.train}</div><div style={{ color: "#64a0c8", fontSize: 13 }}>Distance: {result.distance}</div></div>
              <ApiSourceTag fromApi={fromApi} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {result.fares.map((f, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12 }}>
                  <div><div style={{ color: "#e8f4ff", fontSize: 14, fontWeight: 600 }}>{f.cls}</div><div style={{ color: "#64a0c8", fontSize: 12 }}>{f.berths} berths per coupe</div></div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#00c8ff" }}>₹{f.base.toLocaleString("en-IN")}</div>
                    <div style={{ fontSize: 11, color: "#fbbf24" }}>Tatkal: ₹{f.tatkal.toLocaleString("en-IN")}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 10, fontSize: 12, color: "#fbbf24" }}>* Fares include base fare + reservation charge + superfast surcharge. GST and catering charges extra.</div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

// ─── SCHEDULE TAB ─────────────────────────────────────────────────────────────
function ScheduleTab() {
  const [trainNo, setTrainNo] = useState(""); const [result, setResult] = useState(null); const [loading, setLoading] = useState(false); const [fromApi, setFromApi] = useState(false);

  const DEMO_SCHEDULE = { number: "12301", name: "Howrah Rajdhani Express", from: "New Delhi", to: "Howrah Junction", days: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], type: "Rajdhani", distance: "1447 km", duration: "17h 00m", stops: [
    { no:1, station:"New Delhi", code:"NDLS", arr:"-", dep:"16:55", halt:"-", dist:0, zone:"NR", platform:4 },
    { no:2, station:"Kanpur Central", code:"CNB", arr:"21:15", dep:"21:20", halt:"5m", dist:440, zone:"NCR", platform:1 },
    { no:3, station:"Allahabad Jn", code:"ALD", arr:"23:19", dep:"23:29", halt:"10m", dist:639, zone:"NCR", platform:2 },
    { no:4, station:"Mughal Sarai Jn", code:"MGS", arr:"00:48", dep:"00:53", halt:"5m", dist:793, zone:"ECR", platform:5 },
    { no:5, station:"Gaya Junction", code:"GAYA", arr:"03:00", dep:"03:02", halt:"2m", dist:992, zone:"ECR", platform:3 },
    { no:6, station:"Dhanbad Junction", code:"DHN", arr:"04:20", dep:"04:25", halt:"5m", dist:1091, zone:"ECR", platform:2 },
    { no:7, station:"Asansol Junction", code:"ASN", arr:"05:42", dep:"05:44", halt:"2m", dist:1194, zone:"ER", platform:1 },
    { no:8, station:"Durgapur", code:"DGR", arr:"06:08", dep:"06:10", halt:"2m", dist:1240, zone:"ER", platform:1 },
    { no:9, station:"Barddhaman Jn", code:"BWN", arr:"07:02", dep:"07:04", halt:"2m", dist:1329, zone:"ER", platform:3 },
    { no:10, station:"Howrah Junction", code:"HWH", arr:"09:55", dep:"-", halt:"-", dist:1447, zone:"ER", platform:9 },
  ]};

  const fetchSchedule = async () => {
    setLoading(true); setResult(null);
    const { data, fromApi: fa } = await apiCall(`/trains/schedule/${trainNo}`, null);
    setFromApi(fa);
    if (fa && data?.schedule) { setResult(data.schedule); } else { setResult(DEMO_SCHEDULE); }
    setLoading(false);
  };

  return (
    <div>
      <GlassCard glow style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1 }}>
            <label style={{ color: "#64a0c8", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Train Number / Name</label>
            <input value={trainNo} onChange={e => setTrainNo(e.target.value)} placeholder="e.g. 12301 or Rajdhani" style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "12px 16px", color: "#e8f4ff", fontSize: 15, outline: "none" }} onKeyDown={e => e.key === "Enter" && fetchSchedule()} />
          </div>
          <div style={{ alignSelf: "flex-end" }}>
            <button onClick={fetchSchedule} style={{ background: "linear-gradient(135deg,#0099cc,#00c8ff)", border: "none", borderRadius: 10, padding: "12px 28px", color: "#001a2e", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>View Schedule</button>
          </div>
        </div>
        <div style={{ color: "#475569", fontSize: 12, marginTop: 8 }}>Demo: Try 12301</div>
      </GlassCard>

      {loading && <Spinner />}

      {result && (
        <div style={{ animation: "slideIn 0.35s ease both" }}>
          <GlassCard glow style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#e8f4ff", marginBottom: 6 }}>{result.number} · {result.name}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <Badge variant="info">{result.type}</Badge>
                  <span style={{ color: "#64a0c8", fontSize: 13 }}>{result.from} → {result.to} · {result.distance} · {result.duration}</span>
                  <ApiSourceTag fromApi={fromApi} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {result.days.map(d => <span key={d} style={{ fontSize: 10, background: "rgba(0,200,255,0.12)", color: "#00c8ff", borderRadius: 5, padding: "3px 7px", fontWeight: 600 }}>{d}</span>)}
              </div>
            </div>
          </GlassCard>
          <GlassCard style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
              <thead><tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                {["#","Station","Arrival","Departure","Halt","Distance","Platform"].map(h => <th key={h} style={{ padding: "10px 12px", textAlign: h === "#" || h === "Distance" || h === "Platform" ? "center" : "left", color: "#64a0c8", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{h}</th>)}
              </tr></thead>
              <tbody>
                {result.stops.map((s, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: (i === 0 || i === result.stops.length - 1) ? "rgba(0,200,255,0.05)" : i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(0,200,255,0.06)"}
                    onMouseLeave={e => e.currentTarget.style.background = (i === 0 || i === result.stops.length - 1) ? "rgba(0,200,255,0.05)" : i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent"}>
                    <td style={{ padding: "10px 12px", textAlign: "center", color: "#475569", fontSize: 12 }}>{s.no}</td>
                    <td style={{ padding: "10px 12px" }}><div style={{ color: "#e8f4ff", fontSize: 13, fontWeight: (i === 0 || i === result.stops.length - 1) ? 700 : 400 }}>{s.station}</div><div style={{ color: "#475569", fontSize: 11 }}>{s.code} · {s.zone}</div></td>
                    <td style={{ padding: "10px 12px", color: "#94a3b8", fontSize: 13, fontVariantNumeric: "tabular-nums" }}>{s.arr}</td>
                    <td style={{ padding: "10px 12px", color: s.dep !== "-" ? "#00c8ff" : "#475569", fontSize: 13, fontWeight: s.dep !== "-" ? 600 : 400, fontVariantNumeric: "tabular-nums" }}>{s.dep}</td>
                    <td style={{ padding: "10px 12px", textAlign: "center", color: "#64a0c8", fontSize: 12 }}>{s.halt}</td>
                    <td style={{ padding: "10px 12px", textAlign: "center", color: "#94a3b8", fontSize: 12 }}>{s.dist} km</td>
                    <td style={{ padding: "10px 12px", textAlign: "center", color: "#00c8ff", fontSize: 13, fontWeight: 600 }}>{s.platform}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </div>
      )}
    </div>
  );
}



// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function IndianRailwayPortal() {
  const [activeTab, setActiveTab] = useState("search");

  const TAB_COMPONENTS = {
    search: <TrainSearchTab />,
    pnr: <PNRTab />,
    live: <LiveTrainTab />,
    seat: <SeatTab />,
    fare: <FareTab />,
    schedule: <ScheduleTab />,
   
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)", fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", color: "#e8f4ff" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,200,255,0.2); border-radius: 3px; }
        input:focus { border-color: rgba(0,200,255,0.5) !important; box-shadow: 0 0 0 3px rgba(0,200,255,0.1); }
        select { appearance: none; }
      `}</style>

      <div style={{ background: "linear-gradient(180deg,rgba(0,100,200,0.12) 0%,transparent 100%)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "28px 32px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 20, animation: "fadeIn 0.5s ease" }}>
            <h1 style={{ fontSize: 30, fontWeight: 800, margin: 0, letterSpacing: "-0.04em", color: "#e8f4ff" }}>🚆 Indian Rail Travel Portal</h1>
            <p style={{ color: "#64a0c8", margin: "6px 0 0", fontSize: 15 }}>Search, Book, Track & Manage Indian Rail Travel — all in one place</p>
          </div>
          <div style={{ display: "flex", gap: 2, overflowX: "auto", paddingBottom: 0 }}>
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ display: "flex", alignItems: "center", gap: 7, padding: "12px 18px", border: "none", background: "transparent", color: activeTab === tab.id ? "#00c8ff" : "#64a0c8", fontSize: 14, fontWeight: activeTab === tab.id ? 700 : 400, cursor: "pointer", whiteSpace: "nowrap", borderBottom: `2px solid ${activeTab === tab.id ? "#00c8ff" : "transparent"}`, transition: "all 0.2s" }}>
                <span style={{ fontSize: 16 }}>{tab.icon}</span>{tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 32px 60px" }}>
        <div key={activeTab} style={{ animation: "slideIn 0.25s ease both" }}>
          {TAB_COMPONENTS[activeTab]}
        </div>
      </main>
    </div>
  );
}
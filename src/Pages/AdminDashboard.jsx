import { useState, useEffect, useRef } from "react";

const T = {
  bg: "#0d1117", card: "#161b22", border: "#21262d",
  cyan: "#00b4d8", cyanDim: "#0096b4", cyanGlow: "rgba(0,180,216,0.12)",
  text: "#e6edf3", textMuted: "#8b949e", textDim: "#6e7681",
  green: "#3fb950", red: "#f85149", amber: "#d29922", purple: "#bc8cff", pink: "#f778ba",
};

const BASE_URL = "http://localhost:3000/api/admin";
const token=localStorage.getItem("token")
const API = {
  getTours: () => fetch(`${BASE_URL}/get-tours`).then(r => r.json()),
  addTour: (data) => fetch(`${BASE_URL}/add-tours`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json()),
  updateTour: (id, data) => fetch(`${BASE_URL}/tours/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json()),
  deleteTour: (id) => fetch(`${BASE_URL}/tours/${id}`, { method: "DELETE" }).then(r => r.json()),

  getDrivers: () => fetch(`${BASE_URL}/get-drivers`).then(r => r.json()),
  addDriver: (data) => fetch(`${BASE_URL}/add-drivers`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json()),
  updateDriver: (id, data) => fetch(`${BASE_URL}/update-drivers/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json()),
  deleteDriver: (id) => fetch(`${BASE_URL}/delete-drivers/${id}`, { method: "DELETE" }).then(r => r.json()),

  getBookings: () => fetch(`${BASE_URL}/get-allbookings`).then(r => r.json()),
  cancelBooking: (type,bookingId) => fetch(`http://localhost:3000/api/delete-booking/${type}/${bookingId}`, { method: "DELETE",
      headers: {
            Authorization: `Bearer ${token}`
          }
   }).then(r => r.json()),

  getRequests: () => fetch(`${BASE_URL}/getRequest`).then(r => r.json()),
  approveProvider: (id) => fetch(`${BASE_URL}/provider/${id}/approve`, { method: "PATCH" }).then(r => r.json()),
  rejectProvider: (id) => fetch(`${BASE_URL}/provider/${id}/reject`, { method: "PATCH" }).then(r => r.json()),
  deleteProvider: (id) => fetch(`${BASE_URL}/provider/${id}`, { method: "DELETE" }).then(r => r.json()),

  getUsers: () => fetch(`${BASE_URL}/getall-users`).then(r => r.json()),
  toggleUser: (id, status) => fetch(`${BASE_URL}/users/${id}/status`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) }).then(r => r.json()),
};

const S = {
  app: { minHeight: "100vh", background: `linear-gradient(135deg, #0d1117 0%, #0a1628 100%)`, fontFamily: "'Sora','Segoe UI',sans-serif", color: T.text, display: "flex" },
  card: { background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: "20px 24px" },
  input: { width: "100%", background: "#0d1117", border: `1px solid ${T.border}`, borderRadius: 8, color: T.text, padding: "10px 14px", fontSize: 14, outline: "none", boxSizing: "border-box" },
  select: { width: "100%", background: "#0d1117", border: `1px solid ${T.border}`, borderRadius: 8, color: T.text, padding: "10px 14px", fontSize: 14, outline: "none", boxSizing: "border-box" },
  btnP: { background: `linear-gradient(135deg, ${T.cyan}, ${T.cyanDim})`, border: "none", borderRadius: 8, color: "#0d1117", padding: "10px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer" },
  btnG: { background: "transparent", border: `1px solid ${T.border}`, borderRadius: 8, color: T.textMuted, padding: "8px 16px", fontSize: 13, cursor: "pointer" },
  badge: (c) => ({ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: `${c}22`, color: c }),
  label: { fontSize: 12, color: T.textMuted, marginBottom: 5, display: "block", fontWeight: 500 },
  pill: { display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, background: "#21262d", color: T.textMuted, border: `1px solid ${T.border}` },
};

const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");
const statusColor = (s) => ({ confirmed: T.green, pending: T.amber, cancelled: T.red, active: T.green, full: T.red, approved: T.green, "on-duty": T.amber, available: T.green, inactive: T.red })[s] || T.textMuted;

const CATEGORIES = ["Hotel", "Bike", "Cab", "Bus", "Outstation"];
const CATEGORY_ICONS = { Hotel: "🏨", Bike: "🏍️", Cab: "🚕", Bus: "🚌", Outstation: "🛣️" };
const VEHICLE_CATS = ["Cab", "Bus", "Outstation"];

function tourToForm(t) {
  if (!t) return {
    name: "", destination: "", price: "", category: "Hotel",
    vehicleType: "", vehicleModel: "", perHourRate: "",
    roomType: "", amenities: "", roomsLeft: "", reviews: "",
    origin: "", departure: "", arrival: "", travelTime: "", seatsLeft: "", includes: "",
    eta: "", distanceKm: "", estimatedFare: "", rides: "",
    fuelPolicy: "", available: "",
  };
  return {
    name: t.name || "",
    destination: t.destination || "",
    price: t.price != null ? String(t.price) : "",
    category: t.category || "Hotel",
    vehicleType: t.vehicleType || "",
    vehicleModel: t.vehicleModel || "",
    perHourRate: t.perHourRate != null ? String(t.perHourRate) : "",
    roomType: t.roomType || "",
    amenities: Array.isArray(t.amenities) ? t.amenities.join(", ") : (t.amenities || ""),
    roomsLeft: t.roomsLeft != null ? String(t.roomsLeft) : "",
    reviews: t.reviews != null ? String(t.reviews) : "",
    origin: t.origin || "",
    departure: t.departure || "",
    arrival: t.arrival || "",
    travelTime: t.travelTime || "",
    seatsLeft: t.seatsLeft != null ? String(t.seatsLeft) : "",
    includes: Array.isArray(t.includes) ? t.includes.join(", ") : (t.includes || ""),
    eta: t.eta || "",
    distanceKm: t.distanceKm != null ? String(t.distanceKm) : "",
    estimatedFare: t.estimatedFare != null ? String(t.estimatedFare) : "",
    rides: t.rides != null ? String(t.rides) : "",
    fuelPolicy: t.fuelPolicy || "",
    available: t.available != null ? String(t.available) : "",
  };
}

// ─── Small Components ─────────────────────────────────────────────────────────
function Avatar({ initials, size = 36, color = T.cyan }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: `${color}22`, border: `1.5px solid ${color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.32, fontWeight: 700, color, flexShrink: 0 }}>
      {initials}
    </div>
  );
}

function StatCard({ label, value, icon, color = T.cyan, sub }) {
  return (
    <div style={{ ...S.card, flex: 1, minWidth: 130 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 6, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</div>
          <div style={{ fontSize: 24, fontWeight: 700, color }}>{value}</div>
          {sub && <div style={{ fontSize: 11, color: T.textDim, marginTop: 3 }}>{sub}</div>}
        </div>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{icon}</div>
      </div>
    </div>
  );
}

function Toast({ toast }) {
  if (!toast) return null;
  const c = toast.type === "warning" ? T.amber : toast.type === "error" ? T.red : T.green;
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, background: T.card, border: `1px solid ${c}55`, borderRadius: 10, padding: "12px 20px", fontSize: 13, color: c, fontWeight: 600, boxShadow: `0 4px 20px ${c}22` }}>
      {toast.msg}
    </div>
  );
}

function NavItem({ icon, label, badge, active, onClick }) {
  return (
    <div onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 16px", cursor: "pointer", borderRadius: 8, margin: "1px 8px", background: active ? `${T.cyan}18` : "transparent", color: active ? T.cyan : T.textMuted, fontSize: 13, fontWeight: active ? 600 : 400, transition: "all 0.15s" }}>
      <span style={{ fontSize: 15 }}>{icon}</span>
      <span style={{ flex: 1 }}>{label}</span>
      {badge ? <span style={{ ...S.badge(T.red), padding: "1px 7px", fontSize: 10 }}>{badge}</span> : null}
    </div>
  );
}

// ─── Card Components ──────────────────────────────────────────────────────────
function HotelCard({ t, onDelete, onEdit }) {
  const roomTypeColor = { Premium: T.purple, Standard: T.cyan, Deluxe: T.amber, Suite: T.pink }[t.roomType] || T.cyan;
  return (
    <div style={{ ...S.card, padding: 0, overflow: "hidden", transition: "border-color 0.2s" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = T.cyan}
      onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
      <div style={{ height: 150, background: "linear-gradient(135deg,#1a2744,#0d1a33)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {t.img ? <img src={t.img} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <div style={{ fontSize: 36, fontWeight: 800, color: `${T.cyan}44` }}>{t.initials}</div>}
        {t.roomType && <div style={{ position: "absolute", top: 10, right: 10, background: roomTypeColor, color: "#0d1117", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{t.roomType}</div>}
        <div style={{ position: "absolute", top: 10, left: 10 }}><span style={S.badge(t.status === "full" ? T.red : T.green)}>{t.status}</span></div>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ fontSize: 11, color: T.cyan, marginBottom: 3 }}>📍 {t.destination}</div>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{t.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ color: T.amber, fontSize: 13 }}>★ {t.rating}</span>
          {t.reviews != null && <span style={{ fontSize: 11, color: T.textDim }}>{t.reviews} reviews</span>}
        </div>
        {t.amenities && t.amenities.length > 0 && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>{t.amenities.map(a => <span key={a} style={S.pill}>{a}</span>)}</div>}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div><span style={{ fontSize: 11, color: T.textMuted }}>from </span><span style={{ fontSize: 20, fontWeight: 800, color: T.cyan }}>{fmt(t.price)}</span><span style={{ fontSize: 11, color: T.textMuted }}>/night</span></div>
          {t.roomsLeft != null && <span style={{ fontSize: 11, color: T.red, fontWeight: 600 }}>{t.roomsLeft} rooms left</span>}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ ...S.btnP, flex: 1, fontSize: 12, padding: "9px 0" }} onClick={() => onEdit(t)}>Edit</button>
          <button style={{ ...S.btnG, flex: 1, fontSize: 12, padding: "9px 0", color: T.red, borderColor: `${T.red}44` }} onClick={() => onDelete(t.id, t.name)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

function BikeCard({ t, onDelete, onEdit }) {
  return (
    <div style={{ ...S.card, padding: 0, overflow: "hidden", transition: "border-color 0.2s" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = T.amber}
      onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
      <div style={{ height: 140, background: "linear-gradient(135deg,#1a1a0d,#0d1a0d)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {t.img ? <img src={t.img} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ fontSize: 36 }}>🏍️</div>}
        {t.vehicleType && <div style={{ position: "absolute", top: 10, left: 10, background: T.cyan, color: "#0d1117", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{t.vehicleType}</div>}
        {t.vehicleModel && <div style={{ position: "absolute", top: 10, right: 10, background: "#21262d", color: T.textMuted, padding: "3px 10px", borderRadius: 20, fontSize: 11, border: `1px solid ${T.border}` }}>{t.vehicleModel}</div>}
      </div>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ fontSize: 11, color: T.cyan, marginBottom: 3 }}>📍 {t.destination}</div>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{t.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ color: T.amber, fontSize: 13 }}>★ {t.rating}</span>
          {t.available != null && <span style={{ fontSize: 11, color: T.green, fontWeight: 600 }}>{t.available} available</span>}
        </div>
        {t.includes && t.includes.length > 0 && <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>{t.includes.map(i => <span key={i} style={S.pill}>{i}</span>)}</div>}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 12, background: "#0d1117", borderRadius: 8, padding: "10px 12px" }}>
          <div><div style={{ fontSize: 10, color: T.textMuted }}>Per Hour</div><div style={{ fontSize: 14, fontWeight: 700, color: T.cyan }}>{fmt(t.perHourRate || 0)}</div></div>
          <div><div style={{ fontSize: 10, color: T.textMuted }}>Per Day</div><div style={{ fontSize: 14, fontWeight: 700, color: T.cyan }}>{fmt(t.price)}</div></div>
          {t.fuelPolicy && <div><div style={{ fontSize: 10, color: T.textMuted }}>Fuel</div><div style={{ fontSize: 11, fontWeight: 600, color: T.amber }}>{t.fuelPolicy}</div></div>}
        </div>
        {t.driverName && (
          <div style={{ background: "#0d1117", borderRadius: 8, padding: "10px 12px", marginBottom: 12, border: `1px solid ${T.cyan}22` }}>
            <div style={{ fontSize: 10, color: T.cyan, marginBottom: 6, fontWeight: 600, letterSpacing: "0.5px" }}>ASSIGNED DRIVER</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Avatar initials={t.driverName.split(" ").map(n => n[0]).join("")} size={26} color={T.cyan} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{t.driverName}</div>
                {t.driverPhone && <div style={{ fontSize: 11, color: T.textMuted }}>📞 {t.driverPhone}</div>}
              </div>
            </div>
          </div>
        )}
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ ...S.btnP, flex: 1, fontSize: 12, padding: "9px 0" }} onClick={() => onEdit(t)}>Edit</button>
          <button style={{ ...S.btnG, fontSize: 12, padding: "9px 14px", color: T.red, borderColor: `${T.red}44` }} onClick={() => onDelete(t.id, t.name)}>Del</button>
        </div>
      </div>
    </div>
  );
}

function BusCard({ t, onDelete, onEdit }) {
  return (
    <div style={{ ...S.card, padding: 0, overflow: "hidden", transition: "border-color 0.2s" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = T.green}
      onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
      <div style={{ height: 130, background: "linear-gradient(135deg,#0d1a17,#0a1422)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {t.img ? <img src={t.img} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ fontSize: 36 }}>🚌</div>}
        {t.vehicleType && <div style={{ position: "absolute", top: 10, left: 10, background: "#21262d", color: T.textMuted, padding: "3px 10px", borderRadius: 20, fontSize: 11, border: `1px solid ${T.border}` }}>{t.vehicleType}</div>}
        <div style={{ position: "absolute", top: 10, right: 10, display: "flex", alignItems: "center", gap: 5, background: `${T.green}22`, border: `1px solid ${T.green}55`, padding: "3px 10px", borderRadius: 20 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.green }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: T.green }}>LIVE</span>
        </div>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ fontSize: 11, color: T.cyan, marginBottom: 4 }}>📍 {t.origin || ""} → {t.destination}</div>
        <div style={{ fontSize: 15, fontWeight: 700 }}>{t.name}</div>
        {t.vehicleModel && <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 8 }}>{t.vehicleModel}</div>}
        {t.departure && (
          <div style={{ display: "flex", alignItems: "center", marginBottom: 10, background: "#0d1117", borderRadius: 8, padding: "10px 12px" }}>
            <div><div style={{ fontSize: 18, fontWeight: 800 }}>{t.departure}</div><div style={{ fontSize: 10, color: T.textMuted }}>{t.origin}</div></div>
            <div style={{ flex: 1, textAlign: "center", padding: "0 8px" }}>
              <div style={{ fontSize: 10, color: T.textMuted, marginBottom: 3 }}>{t.travelTime}</div>
              <div style={{ height: 1, background: `linear-gradient(90deg,${T.cyan}44,${T.cyan},${T.cyan}44)` }} />
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 18, fontWeight: 800 }}>{t.arrival}{t.overnight && <span style={{ fontSize: 11, color: T.amber }}>+1</span>}</div>
              <div style={{ fontSize: 10, color: T.textMuted }}>{t.destination}</div>
            </div>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ color: T.amber, fontSize: 13 }}>★ {t.rating}</span>
          {t.seatsLeft != null && <span style={{ fontSize: 11, color: T.red, fontWeight: 600 }}>{t.seatsLeft} seats left</span>}
        </div>
        {t.includes && t.includes.length > 0 && <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>{t.includes.map(i => <span key={i} style={S.pill}>{i}</span>)}</div>}
        {t.driverName && (
          <div style={{ background: "#0d1117", borderRadius: 8, padding: "10px 12px", marginBottom: 10, border: `1px solid ${T.green}22` }}>
            <div style={{ fontSize: 10, color: T.green, marginBottom: 6, fontWeight: 600, letterSpacing: "0.5px" }}>ASSIGNED DRIVER</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Avatar initials={t.driverName.split(" ").map(n => n[0]).join("")} size={26} color={T.green} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{t.driverName}</div>
                {t.driverPhone && <div style={{ fontSize: 11, color: T.textMuted }}>📞 {t.driverPhone}</div>}
              </div>
            </div>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div><span style={{ fontSize: 11, color: T.textMuted }}>from </span><span style={{ fontSize: 20, fontWeight: 800, color: T.cyan }}>{fmt(t.price)}</span><span style={{ fontSize: 11, color: T.textMuted }}>/seat</span></div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ ...S.btnP, flex: 1, fontSize: 12, padding: "9px 0" }} onClick={() => onEdit(t)}>Edit</button>
          <button style={{ ...S.btnG, fontSize: 12, padding: "9px 14px", color: T.red, borderColor: `${T.red}44` }} onClick={() => onDelete(t.id, t.name)}>Del</button>
        </div>
      </div>
    </div>
  );
}

function CabCard({ t, onDelete, onEdit }) {
  return (
    <div style={{ ...S.card, padding: 0, overflow: "hidden", transition: "border-color 0.2s" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = T.purple}
      onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
      <div style={{ height: 140, background: "linear-gradient(135deg,#1a0d1a,#0d1022)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {t.img ? <img src={t.img} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ fontSize: 36 }}>🚕</div>}
        {t.vehicleType && <div style={{ position: "absolute", top: 10, left: 10, background: T.green, color: "#0d1117", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{t.vehicleType}</div>}
        {t.eta && <div style={{ position: "absolute", top: 10, right: 10, background: "#21262d", color: T.amber, padding: "3px 10px", borderRadius: 20, fontSize: 11, border: `1px solid ${T.border}`, fontWeight: 600 }}>ETA {t.eta}</div>}
      </div>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ fontSize: 11, color: T.cyan, marginBottom: 3 }}>📍 {t.destination}</div>
        <div style={{ fontSize: 15, fontWeight: 700 }}>{t.name}</div>
        {t.vehicleModel && <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 6 }}>{t.vehicleModel}</div>}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ color: T.amber, fontSize: 13 }}>★ {t.rating}</span>
          {t.rides != null && <span style={{ fontSize: 11, color: T.textDim }}>{t.rides} rides</span>}
        </div>
        {t.includes && t.includes.length > 0 && <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>{t.includes.map(i => <span key={i} style={S.pill}>{i}</span>)}</div>}
        {t.driverName && (
          <div style={{ background: "#0d1117", borderRadius: 8, padding: "10px 12px", marginBottom: 10, border: `1px solid ${T.purple}22` }}>
            <div style={{ fontSize: 10, color: T.purple, marginBottom: 6, fontWeight: 600, letterSpacing: "0.5px" }}>ASSIGNED DRIVER</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Avatar initials={t.driverName.split(" ").map(n => n[0]).join("")} size={26} color={T.purple} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{t.driverName}</div>
                {t.driverPhone && <div style={{ fontSize: 11, color: T.textMuted }}>📞 {t.driverPhone}</div>}
              </div>
            </div>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, background: "#0d1117", borderRadius: 8, padding: "10px 12px" }}>
          <div><div style={{ fontSize: 10, color: T.textMuted }}>Est. fare ({t.distanceKm}km)</div><div style={{ fontSize: 20, fontWeight: 800, color: T.cyan }}>{fmt(t.estimatedFare || t.price)}</div></div>
          <div style={{ textAlign: "right" }}><div style={{ fontSize: 11, color: T.textMuted }}>{fmt(t.price)}/km</div></div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ ...S.btnP, flex: 1, fontSize: 12, padding: "9px 0" }} onClick={() => onEdit(t)}>Edit</button>
          <button style={{ ...S.btnG, fontSize: 12, padding: "9px 14px", color: T.red, borderColor: `${T.red}44` }} onClick={() => onDelete(t.id, t.name)}>Del</button>
        </div>
      </div>
    </div>
  );
}

function OutstationCard({ t, onDelete, onEdit }) {
  return (
    <div style={{ ...S.card, padding: 0, overflow: "hidden", transition: "border-color 0.2s" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = T.pink}
      onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
      <div style={{ height: 140, background: "linear-gradient(135deg,#1a0d17,#0d0d1a)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {t.img ? <img src={t.img} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ fontSize: 36 }}>🛣️</div>}
        {t.vehicleType && <div style={{ position: "absolute", top: 10, left: 10, background: T.amber, color: "#0d1117", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{t.vehicleType}</div>}
      </div>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ fontSize: 15, fontWeight: 700 }}>{t.name}</div>
        {t.vehicleModel && <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 6 }}>{t.vehicleModel}</div>}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ color: T.amber, fontSize: 13 }}>★ {t.rating}</span>
        </div>
        {t.distanceKm != null && (
          <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 10, background: "#0d1117", borderRadius: 8, padding: "10px 12px" }}>
            Outstation fare ({t.distanceKm}km) — <span style={{ color: T.cyan, fontWeight: 700 }}>{fmt(t.price)}</span>
          </div>
        )}
        {t.driverName && (
          <div style={{ background: "#0d1117", borderRadius: 8, padding: "10px 12px", marginBottom: 12, border: `1px solid ${T.pink}22` }}>
            <div style={{ fontSize: 10, color: T.pink, marginBottom: 6, fontWeight: 600, letterSpacing: "0.5px" }}>ASSIGNED DRIVER</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Avatar initials={t.driverName.split(" ").map(n => n[0]).join("")} size={26} color={T.pink} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{t.driverName}</div>
                {t.driverPhone && <div style={{ fontSize: 11, color: T.textMuted }}>📞 {t.driverPhone}</div>}
              </div>
            </div>
          </div>
        )}
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ ...S.btnP, flex: 1, fontSize: 12, padding: "9px 0" }} onClick={() => onEdit(t)}>Edit</button>
          <button style={{ ...S.btnG, fontSize: 12, padding: "9px 14px", color: T.red, borderColor: `${T.red}44` }} onClick={() => onDelete(t.id, t.name)}>Del</button>
        </div>
      </div>
    </div>
  );
}

function TourCard({ t, onDelete, onEdit }) {
  const props = { t, onDelete, onEdit };
  switch (t.category) {
    case "Hotel": return <HotelCard {...props} />;
    case "Bike": return <BikeCard {...props} />;
    case "Bus": return <BusCard {...props} />;
    case "Cab": return <CabCard {...props} />;
    case "Outstation": return <OutstationCard {...props} />;
    default: return null;
  }
}

// ─── ADD / EDIT LISTING MODAL ─────────────────────────────────────────────────
function TourModal({ editTour, onClose, onAdd, onUpdate, showToast, onAddDriver }) {
  const isEdit = Boolean(editTour);
  const imgInputRef = useRef(null);
  const [imgPreview, setImgPreview] = useState(editTour?.img || null);
  const [loading, setLoading] = useState(false);
  // For edit mode: pre-fill driver data from existing tour
  const [newDriver, setNewDriver] = useState({
    name: editTour?.driverName || "",
    phone: editTour?.driverPhone || "",
    license: editTour?.driverLicense || "",
    experience: editTour?.driverExperience || ""
  });
  const [form, setForm] = useState(tourToForm(editTour));

  const isVehicle = VEHICLE_CATS.includes(form.category);
  const isBike = form.category === "Bike";
  const isHotel = form.category === "Hotel";

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleDriverChange = (e) => setNewDriver(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImgPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const buildTourObject = (apiId, assignedDriver) => ({
    ...form,
    id: apiId || editTour?.id,
    img: imgPreview,
    initials: form.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(),
    status: editTour?.status || "active",
    rating: editTour?.rating || 0,
    price: Number(form.price),
    perHourRate: Number(form.perHourRate) || 0,
    roomsLeft: Number(form.roomsLeft) || 0,
    seatsLeft: Number(form.seatsLeft) || 0,
    distanceKm: Number(form.distanceKm) || 0,
    estimatedFare: Number(form.estimatedFare) || 0,
    rides: Number(form.rides) || 0,
    reviews: Number(form.reviews) || 0,
    available: Number(form.available) || 0,
    amenities: form.amenities ? form.amenities.split(",").map(s => s.trim()).filter(Boolean) : [],
    includes: form.includes ? form.includes.split(",").map(s => s.trim()).filter(Boolean) : [],
    driverName: assignedDriver?.name || editTour?.driverName || null,
    driverPhone: assignedDriver?.phone || editTour?.driverPhone || null,
    driverId: assignedDriver?.id || assignedDriver?._id || editTour?.driverId ||
      null,
  });
  console.log(buildTourObject);

  const handleSubmit = async () => {
    if (!form.name || !form.destination || !form.price || !form.category) {
      showToast("Name, destination, price and category is required", "error");
      return;
    }
    setLoading(true);
    try {
      let assignedDriver = null;

      // ─── Driver logic ───────────────────────────────────────────────────────
      if ((isVehicle || isBike) && newDriver.name && newDriver.phone) {
        if (isEdit && editTour?.driverId) {
          // Update existing driver
          const result = await API.updateDriver(editTour.driverId, newDriver);
          if (result.success !== false) {
            assignedDriver = { ...newDriver, id: editTour.driverId };
            onAddDriver(assignedDriver); // refresh drivers list
            showToast(`Driver "${newDriver.name}" updated!`);
          }
        } else {
          // Add new driver
          const result = await API.addDriver(newDriver);
          if (result.success !== false) {
            assignedDriver = { ...newDriver, id: result.id || result._id };
            onAddDriver(assignedDriver);
            showToast(`Driver "${newDriver.name}" added!`);
          }
        }
      }
      // ───────────────────────────────────────────────────────────────────────

      if (isEdit) {
        const result = await API.updateTour(editTour.id, {
          ...form, img: imgPreview, driver:
            assignedDriver?.id ||
            assignedDriver?._id ||
            editTour?.driverId ||
            null,
        });
        if (result.success !== false) {
          onUpdate(buildTourObject(editTour.id, assignedDriver));
          showToast("Listing update ho gaya!");
          onClose();
        } else {
          showToast("Update failed.", "error");
        }
      } else {
        const result = await API.addTour({ ...form, img: imgPreview, driver: assignedDriver?.id || assignedDriver?._id || null, });
        if (assignedDriver?.id || assignedDriver?._id) {
  await API.updateDriver(
    assignedDriver.id || assignedDriver._id,
    {
      assignedTo: form.name,
      status: "on-duty",
    }
  );
}
        if (result.success !== false) {
          onAdd(buildTourObject(result.id || result._id, assignedDriver));
          showToast("Listing add ho gaya!");
          onClose();
        } else {
          showToast("Server error.", "error");
        }
      }
    } catch (err) {
      showToast("Error: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, padding: 16 }}>
      <div style={{ ...S.card, width: "100%", maxWidth: 700, maxHeight: "92vh", overflowY: "auto", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: T.cyan }}>{isEdit ? "✏️ Edit Listing" : "+ New Listing"}</div>
            <div style={{ fontSize: 12, color: T.textMuted, marginTop: 2 }}>{isEdit ? `Editing: ${editTour.name}` : "add Hotel, Vehicle or Ride"}</div>
          </div>
          <button onClick={onClose} style={{ ...S.btnG, padding: "6px 12px", fontSize: 18 }}>✕</button>
        </div>

        {/* Category */}
        <div style={{ marginBottom: 16 }}>
          <label style={S.label}>Category *</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setForm(p => ({ ...p, category: cat }))}
                style={{ ...S.btnG, fontSize: 12, padding: "6px 12px", borderColor: form.category === cat ? T.cyan : T.border, color: form.category === cat ? T.cyan : T.textMuted, background: form.category === cat ? `${T.cyan}15` : "transparent" }}>
                {CATEGORY_ICONS[cat]} {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div style={{ marginBottom: 16 }}>
          <label style={S.label}>Cover Image</label>
          <div onClick={() => imgInputRef.current.click()}
            style={{ border: `2px dashed ${imgPreview ? T.cyan : T.border}`, borderRadius: 10, minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden", background: `${T.cyan}08` }}>
            {imgPreview
              ? <img src={imgPreview} alt="preview" style={{ width: "100%", maxHeight: 160, objectFit: "cover" }} />
              : <div style={{ textAlign: "center", color: T.textMuted }}><div style={{ fontSize: 24, marginBottom: 4 }}>📷</div><div style={{ fontSize: 13 }}>Click karke image upload karo</div></div>}
          </div>
          <input ref={imgInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImage} />
          {imgPreview && (
            <button onClick={() => setImgPreview(null)} style={{ ...S.btnG, fontSize: 11, marginTop: 6, color: T.red, borderColor: `${T.red}44` }}>Remove Image</button>
          )}
        </div>

        {/* Common Fields */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <div>
            <label style={S.label}>Name / Title *</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder={isHotel ? "e.g. The Grand Meridian" : "e.g. Royal Enfield Classic"} style={S.input} />
          </div>
          <div>
            <label style={S.label}>Destination / Location *</label>
            <input name="destination" value={form.destination} onChange={handleChange} placeholder="e.g. Mumbai" style={S.input} />
          </div>
          <div>
            <label style={S.label}>{isHotel ? "Price per Night (₹) *" : form.category === "Cab" ? "Rate per KM (₹) *" : "Price (₹) *"}</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="0" style={S.input} />
          </div>
        </div>

        {/* Hotel Fields */}
        {isHotel && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div>
              <label style={S.label}>Room Type</label>
              <select name="roomType" value={form.roomType} onChange={handleChange} style={S.select}>
                <option value="">Select</option><option>Standard</option><option>Deluxe</option><option>Premium</option><option>Suite</option>
              </select>
            </div>
            <div><label style={S.label}>Rooms Available</label><input name="roomsLeft" type="number" value={form.roomsLeft} onChange={handleChange} placeholder="0" style={S.input} /></div>
            <div><label style={S.label}>Reviews Count</label><input name="reviews" type="number" value={form.reviews} onChange={handleChange} placeholder="0" style={S.input} /></div>
            <div><label style={S.label}>Amenities (comma separated)</label><input name="amenities" value={form.amenities} onChange={handleChange} placeholder="Pool, Spa, WiFi" style={S.input} /></div>
          </div>
        )}

        {/* Bike Fields */}
        {isBike && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div>
              <label style={S.label}>Vehicle Type</label>
              <select name="vehicleType" value={form.vehicleType} onChange={handleChange} style={S.select}>
                <option value="">Select</option><option>Scooter</option><option>Sports Bike</option><option>Cruiser</option><option>Off-Road</option>
              </select>
            </div>
            <div><label style={S.label}>Engine CC</label><input name="vehicleModel" value={form.vehicleModel} onChange={handleChange} placeholder="e.g. 350cc" style={S.input} /></div>
            <div><label style={S.label}>Per Hour Rate (₹)</label><input name="perHourRate" type="number" value={form.perHourRate} onChange={handleChange} placeholder="0" style={S.input} /></div>
            <div><label style={S.label}>Available Count</label><input name="available" type="number" value={form.available} onChange={handleChange} placeholder="0" style={S.input} /></div>
            <div><label style={S.label}>Fuel Policy</label><input name="fuelPolicy" value={form.fuelPolicy} onChange={handleChange} placeholder="e.g. Full-to-Full" style={S.input} /></div>
            <div><label style={S.label}>Includes (comma separated)</label><input name="includes" value={form.includes} onChange={handleChange} placeholder="Helmet, Insurance, GPS" style={S.input} /></div>
          </div>
        )}

        {/* Bus Fields */}
        {form.category === "Bus" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div>
              <label style={S.label}>Bus Type</label>
              <select name="vehicleType" value={form.vehicleType} onChange={handleChange} style={S.select}>
                <option value="">Select</option><option>AC Sleeper</option><option>Non-AC Sleeper</option><option>AC Seater</option><option>Luxury Coach</option>
              </select>
            </div>
            <div><label style={S.label}>Operator Name</label><input name="vehicleModel" value={form.vehicleModel} onChange={handleChange} placeholder="e.g. RedBus Express" style={S.input} /></div>
            <div><label style={S.label}>Origin City</label><input name="origin" value={form.origin} onChange={handleChange} placeholder="e.g. Delhi" style={S.input} /></div>
            <div><label style={S.label}>Travel Time</label><input name="travelTime" value={form.travelTime} onChange={handleChange} placeholder="e.g. 11h 30m" style={S.input} /></div>
            <div><label style={S.label}>Departure Time</label><input name="departure" value={form.departure} onChange={handleChange} placeholder="e.g. 21:00" style={S.input} /></div>
            <div><label style={S.label}>Arrival Time</label><input name="arrival" value={form.arrival} onChange={handleChange} placeholder="e.g. 08:30" style={S.input} /></div>
            <div><label style={S.label}>Seats Available</label><input name="seatsLeft" type="number" value={form.seatsLeft} onChange={handleChange} placeholder="0" style={S.input} /></div>
            <div><label style={S.label}>Includes (comma separated)</label><input name="includes" value={form.includes} onChange={handleChange} placeholder="AC, Blanket, WiFi" style={S.input} /></div>
          </div>
        )}

        {/* Cab Fields */}
        {form.category === "Cab" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div>
              <label style={S.label}>Cab Type</label>
              <select name="vehicleType" value={form.vehicleType} onChange={handleChange} style={S.select}>
                <option value="">Select</option><option>Economy</option><option>Standard</option><option>SUV</option><option>Luxury</option>
              </select>
            </div>
            <div><label style={S.label}>Model (seats)</label><input name="vehicleModel" value={form.vehicleModel} onChange={handleChange} placeholder="e.g. Luxury · 4 seats" style={S.input} /></div>
            <div><label style={S.label}>ETA</label><input name="eta" value={form.eta} onChange={handleChange} placeholder="e.g. 10 min" style={S.input} /></div>
            <div><label style={S.label}>Est. Distance (km)</label><input name="distanceKm" type="number" value={form.distanceKm} onChange={handleChange} placeholder="0" style={S.input} /></div>
            <div><label style={S.label}>Estimated Total Fare (₹)</label><input name="estimatedFare" type="number" value={form.estimatedFare} onChange={handleChange} placeholder="0" style={S.input} /></div>
            <div><label style={S.label}>Total Rides</label><input name="rides" type="number" value={form.rides} onChange={handleChange} placeholder="0" style={S.input} /></div>
            <div style={{ gridColumn: "1/-1" }}><label style={S.label}>Includes (comma separated)</label><input name="includes" value={form.includes} onChange={handleChange} placeholder="AC, Music, GPS, WiFi" style={S.input} /></div>
          </div>
        )}

        {/* Outstation Fields */}
        {form.category === "Outstation" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div>
              <label style={S.label}>Vehicle Type</label>
              <select name="vehicleType" value={form.vehicleType} onChange={handleChange} style={S.select}>
                <option value="">Select</option><option>Economy</option><option>Standard</option><option>SUV</option><option>Tempo Traveller</option><option>Bus</option>
              </select>
            </div>
            <div><label style={S.label}>Model / Description</label><input name="vehicleModel" value={form.vehicleModel} onChange={handleChange} placeholder="e.g. Sedan · 4 seats" style={S.input} /></div>
            <div><label style={S.label}>Distance (km estimate)</label><input name="distanceKm" type="number" value={form.distanceKm} onChange={handleChange} placeholder="0" style={S.input} /></div>
          </div>
        )}

        {/* ─── Driver Section (Vehicle + Bike categories) ─── */}
        {(isVehicle || isBike) && (
          <div style={{ marginBottom: 20, border: `1px solid ${T.cyan}33`, borderRadius: 10, overflow: "hidden" }}>
            <div style={{ background: `${T.cyan}10`, padding: "10px 16px", borderBottom: `1px solid ${T.cyan}22`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.cyan }}>
                👤 Driver Assignment {isEdit ? "(Update)" : "(Add New)"}
              </div>
              {isEdit && editTour?.driverName && (
                <span style={{ fontSize: 11, color: T.textMuted }}>Current: {editTour.driverName}</span>
              )}
            </div>
            <div style={{ padding: "14px 16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div><label style={S.label}>Driver Name</label><input name="name" value={newDriver.name} onChange={handleDriverChange} placeholder="e.g. Ramesh Kumar" style={S.input} /></div>
                <div><label style={S.label}>Phone Number</label><input name="phone" value={newDriver.phone} onChange={handleDriverChange} placeholder="e.g. 9876543210" style={S.input} /></div>
                <div><label style={S.label}>License Number</label><input name="license" value={newDriver.license} onChange={handleDriverChange} placeholder="e.g. UP14-20180012345" style={S.input} /></div>
                <div><label style={S.label}>Experience</label><input name="experience" value={newDriver.experience} onChange={handleDriverChange} placeholder="e.g. 5 yrs" style={S.input} /></div>
              </div>
              {isEdit && (
                <div style={{ marginTop: 10, fontSize: 12, color: T.textMuted, background: "#0d1117", borderRadius: 8, padding: "8px 12px", border: `1px solid ${T.border}` }}>
                  💡 Driver fields khali chhodo agar driver change nahi karna
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={S.btnG}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading} style={{ ...S.btnP, opacity: loading ? 0.7 : 1 }}>
            {loading ? (isEdit ? "Updating..." : "Submitting...") : (isEdit ? "Update Listing" : "Add Listing")}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── DRIVER EDIT MODAL ────────────────────────────────────────────────────────
function DriverModal({ driver, onClose, onUpdate, showToast }) {
  const [form, setForm] = useState({
    name: driver.name || "",
    phone: driver.phone || "",
    license: driver.license || "",
    experience: driver.experience || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.phone) {
      showToast("Name and phone number is required ", "error");
      return;
    }
    setLoading(true);
    try {
      const result = await API.updateDriver(driver._id || driver.id, form);
      if (result.success !== false) {
        onUpdate({ ...driver, ...form });
        showToast(`Driver "${form.name}" updated!`);
        onClose();
      } else {
        showToast("Update failed.", "error");
      }
    } catch (err) {
      showToast("Error: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, padding: 16 }}>
      <div style={{ ...S.card, width: "100%", maxWidth: 480, position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: T.cyan }}>✏️ Edit Driver</div>
            <div style={{ fontSize: 12, color: T.textMuted, marginTop: 2 }}>Editing: {driver.name}</div>
          </div>
          <button onClick={onClose} style={{ ...S.btnG, padding: "6px 12px", fontSize: 18 }}>✕</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div><label style={S.label}>Driver Name *</label><input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Ramesh Kumar" style={S.input} /></div>
          <div><label style={S.label}>Phone Number *</label><input name="phone" value={form.phone} onChange={handleChange} placeholder="e.g. 9876543210" style={S.input} /></div>
          <div><label style={S.label}>License Number</label><input name="license" value={form.license} onChange={handleChange} placeholder="e.g. UP14-20180012345" style={S.input} /></div>
          <div><label style={S.label}>Experience</label><input name="experience" value={form.experience} onChange={handleChange} placeholder="e.g. 5 yrs" style={S.input} /></div>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={S.btnG}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading} style={{ ...S.btnP, opacity: loading ? 0.7 : 1 }}>
            {loading ? "Updating..." : "Update Driver"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── DRIVERS PAGE ─────────────────────────────────────────────────────────────
function DriversPage({ drivers, onUpdateDriver, onDeleteDriver, showToast }) {
  const [editDriver, setEditDriver] = useState(null);

  const handleDelete = async (driver) => {
    
    try {
      await API.deleteDriver(driver._id || driver.id);
      onDeleteDriver(driver._id || driver.id);
      showToast(`"${driver.name}" deleted!`, "warning");
    } catch {
      showToast("Delete failed.", "error");
    }
  };

  return (
    <div>
      {editDriver && (
        <DriverModal
          driver={editDriver}
          onClose={() => setEditDriver(null)}
          onUpdate={(updated) => { onUpdateDriver(updated); setEditDriver(null); }}
          showToast={showToast}
        />
      )}

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
        <StatCard label="Total Drivers" value={drivers.length} icon="👤" color={T.cyan} />
        <StatCard label="Available" value={drivers.filter(d => d.status === "available").length} icon="✅" color={T.green} />
        <StatCard label="On Duty" value={drivers.filter(d => d.status === "on-duty").length} icon="🚗" color={T.amber} />
      </div>

      {/* Driver Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14, marginBottom: 24 }}>
        {drivers.map(d => {
          const sColor = statusColor(d.status);
          return (
            <div key={d._id || d.id} style={{ ...S.card, borderLeft: `3px solid ${sColor}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <Avatar initials={d.name.split(" ").map(n => n[0]).join("")} size={42} color={sColor} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{d.name}</div>
                  <div style={{ fontSize: 11, color: T.textMuted }}>📞 {d.phone}</div>
                </div>
                <span style={{ ...S.badge(sColor), alignSelf: "flex-start" }}>{d.status}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                <div style={{ background: "#0d1117", borderRadius: 8, padding: "8px 10px" }}>
                  <div style={{ fontSize: 10, color: T.textMuted, marginBottom: 2 }}>Experience</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.cyan }}>{d.experience || "—"}</div>
                </div>
                <div style={{ background: "#0d1117", borderRadius: 8, padding: "8px 10px" }}>
                  <div style={{ fontSize: 10, color: T.textMuted, marginBottom: 2 }}>Rating</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.amber }}>★ {d.rating || "—"}</div>
                </div>
              </div>
              <div style={{ background: "#0d1117", borderRadius: 8, padding: "8px 10px", marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: T.textMuted, marginBottom: 2 }}>License</div>
                <div style={{ fontSize: 11, fontFamily: "monospace", color: T.text }}>{d.license || "—"}</div>
              </div>
              <div style={{ fontSize: 12, color: d.assignedTo ? T.cyan : T.textDim, marginBottom: 12 }}>
                {d.assignedTo ? `🚗 Assigned: ${d.assignedTo}` : "🟢 No active assignment"}
              </div>
              {/* Edit + Delete Buttons */}
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  style={{ ...S.btnP, flex: 1, fontSize: 12, padding: "8px 0" }}
                  onClick={() => setEditDriver(d)}>
                  Edit
                </button>
                <button
                  style={{ ...S.btnG, fontSize: 12, padding: "8px 14px", color: T.red, borderColor: `${T.red}44` }}
                  onClick={() => handleDelete(d)}>
                  Del
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Table */}
      <div style={S.card}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>All Drivers</div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                {["Driver", "Phone", "License", "Experience", "Rating", "Status", "Assigned To", "Actions"].map(h => (
                  <th key={h} style={{ padding: "9px 13px", textAlign: "left", color: T.textMuted, fontWeight: 500, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.4px", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {drivers.map(d => (
                <tr key={d._id || d.id} style={{ borderBottom: `1px solid ${T.border}22` }}>
                  <td style={{ padding: "11px 13px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar initials={d.name.split(" ").map(n => n[0]).join("")} size={28} color={T.cyan} />
                      <span style={{ fontWeight: 500 }}>{d.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "11px 13px", color: T.textMuted, fontSize: 12 }}>{d.phone}</td>
                  <td style={{ padding: "11px 13px", color: T.textMuted, fontSize: 11, fontFamily: "monospace" }}>{d.license}</td>
                  <td style={{ padding: "11px 13px", color: T.textMuted, fontSize: 12 }}>{d.experience}</td>
                  <td style={{ padding: "11px 13px", color: T.amber, fontWeight: 700 }}>★ {d.rating}</td>
                  <td style={{ padding: "11px 13px" }}><span style={S.badge(statusColor(d.status))}>{d.status}</span></td>
                  <td style={{ padding: "11px 13px", color: d.assignedTo ? T.cyan : T.textDim, fontSize: 12 }}>{d.assignedTo || "—"}</td>
                  <td style={{ padding: "11px 13px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        style={{ ...S.btnG, fontSize: 11, padding: "5px 10px", color: T.cyan, borderColor: `${T.cyan}44` }}
                        onClick={() => setEditDriver(d)}>
                        Edit
                      </button>
                      <button
                        style={{ ...S.btnG, fontSize: 11, padding: "5px 10px", color: T.red, borderColor: `${T.red}44` }}
                        onClick={() => handleDelete(d)}>
                        Del
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
export default function AdminDashboard({ user, onLogout }) {
  const [tourModal, setTourModal] = useState(null);
  const [page, setPage] = useState("overview");
  const [stats, setStats] = useState(null);
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [Request, setRequest] = useState([]);
  const [users, setUsers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [totalRevenue, setTotalRevenue] = useState(0);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    Promise.all([
      API.getTours(),
      API.getBookings(),
      API.getRequests(),
      API.getUsers(),
      API.getDrivers(),
    ])
      .then(([toursData, bookings, request, users, drivers]) => {
        
        setTours(
  toursData.map(t => ({
    ...t,
    id: t._id,

    driverId: t.driver?._id || null,
    driverName: t.driver?.name || null,
    driverPhone: t.driver?.phone || null,
    driverLicense: t.driver?.license || null,
    driverExperience: t.driver?.experience || null,
  }))
);
        setStats({
          totalBookings: bookings?.totalBookings || 0,
          totalAmount: bookings?.totalAmount || 0,
          newUsers: users?.newUsers || 0,
          avgRating: 4.5
        });
        setRequest(request?.data || []);
        setTotalRevenue(bookings?.totalAmount || 0);
        setUsers(users?.users || []);
        setDrivers(drivers);

        const normalizedBookings = [
          ...(bookings?.data?.trainBookings || []).map(b => ({
            id: b._id, bookingId: b.bookingId, type: "Train",
            customer: b.passengers?.[0]?.name || "N/A", service: b.trainName,
            amount: b.total, status: b.status || b.paymentStatus, date: b.createdAt,
          })),
          ...(bookings?.data?.flightBookings || []).map(b => ({
            id: b._id, bookingId: b.bookingId, type: "Flight",
            customer: b.passengers?.[0]?.name || "N/A", service: b.flight?.airline,
            amount: b.total, status: b.paymentStatus, date: b.createdAt,
          })),
          ...(bookings?.data?.hotelBookings || []).map(b => ({
            id: b._id, bookingId: b.bookingId, type: "Hotel",
            customer: b.guestDetails?.name || "N/A", service: b.hotel?.name,
            amount: b.totalAmount, status: b.bookingStatus, date: b.createdAt,
          })),
          ...(bookings?.data?.transportBookings || []).map(b => ({
            id: b._id, bookingId: b.bookingId, type: b.bookingType,
            customer: b.customer?.name || "N/A", service: b.vehicle?.name,
            amount: b.amount, status: b.bookingStatus, date: b.createdAt,
          })),
          
        ];
        setBookings(normalizedBookings);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Promise Error:", err);
        setLoading(false);
      });
  }, []);

const handleCancelBooking = async (type, bookingId) => {
  const mappedType = type.toLowerCase(); 
  
  try {
    const res = await API.cancelBooking(mappedType, bookingId);
    
    if (res.success) {
      setBookings(prev => prev.filter(b => b.bookingId !== bookingId));
      showToast("Booking deleted!");
    } else {
      showToast(res.message || "Delete failed.", "error");
    }
  } catch (err) {
    console.log("error",err);
    
    showToast("Error cancelling.", "error");
  }
};

  const handleApproveReview = async (id) => {
    try {
      await API.approveProvider(id);
      setRequest(prev => prev.map(x => x._id === id ? { ...x, status: "approved" } : x));
      showToast("Request approved");
    } catch { showToast("Error.", "error"); }
  };

  const handelRejectRequest = async (id) => {
    try {
      await API.rejectProvider(id);
      setRequest(prev => prev.map(x => x._id === id ? { ...x, status: "rejected" } : x));
      showToast("Request rejected");
    } catch { showToast("Error.", "error"); }
  };

  const handleDeleteReview = async (id) => {
    try {
      await API.deleteProvider(id);
      setRequest(prev => prev.filter(x => x._id !== id));
      showToast("Request deleted", "warning");
    } catch { showToast("Error.", "error"); }
  };

 

  const handleDeleteTour = async (id, name) => {
    console.log("DELETE CLICKED");
    console.log("ID =", id);
    console.log("NAME =", name);
    try {
      await API.deleteTour(id);
      setTours(prev => prev.filter(t => t._id !== id));
      showToast(`"${name}" deleted.`, "warning");
    } catch { showToast("Error deleting.", "error"); }
  };

  const handleAddDriver = (driver) => {
    const driverId = driver.id || driver._id;
    setDrivers(prev => {
      const exists = prev.find(d => (d._id || d.id) === driverId);
      if (exists) {
        return prev.map(d => (d._id || d.id) === driverId ? { ...d, ...driver } : d);
      }
      return [...prev, { ...driver, id: driverId, status: "available", rating: 0, assignedTo: null }];
    });
  };


  const handleUpdateDriver = (updated) => {
    setDrivers(prev => prev.map(d =>
      (d._id || d.id) === (updated._id || updated.id) ? { ...d, ...updated } : d
    ));
  };

  const handleDeleteDriver = (id) => {
    setDrivers(prev => prev.filter(d => (d._id || d.id) !== id));
  };
  // ──────────────────────────────────────────────────────────────────────────

  const handleTourAdded = (newTour) => setTours(prev => [newTour, ...prev]);
  const handleTourUpdated = (updatedTour) => setTours(prev => prev.map(t => t.id === updatedTour.id ? updatedTour : t));

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-IN");
  };

  const nav = [
    { id: "overview", icon: "📊", label: "Overview" },
    { id: "tours", icon: "🗺️", label: "Listings" },
    { id: "drivers", icon: "👤", label: "Drivers" },
    { id: "bookings", icon: "📋", label: "Bookings", badge: bookings.filter(b => b.status === "pending").length || null },
    { id: "users", icon: "👥", label: "Users" },
    { id: "Request", icon: "⭐", label: "Request", badge: Request.filter(r => r.status === "pending").length || null },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  const fTours = tours.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.destination.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "all" || t.category === activeFilter;
    return matchSearch && matchFilter;
  });

  const fBookings = bookings.filter(b =>
    (b.service || "").toLowerCase().includes(search.toLowerCase()) ||
    (b.customer || "").toLowerCase().includes(search.toLowerCase()) ||
    (b.status || "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora',sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: T.cyan }}>TourX</div>
          <div style={{ color: T.textMuted, fontSize: 14, marginTop: 8 }}>Loading admin panel...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={S.app}>
      {/* Sidebar */}
      <div style={{ width: 215, minHeight: "100vh", background: T.card, borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, zIndex: 100 }}>
        <div style={{ padding: "18px 16px 12px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 21, fontWeight: 800 }}><span style={{ color: T.cyan }}>Tour</span><span style={{ color: T.text }}>X</span></div>
          <div style={{ fontSize: 10, color: T.red, fontWeight: 700, letterSpacing: "1px", marginTop: 2 }}>ADMIN PANEL</div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "10px 0" }}>
          {nav.map(n => (
            <NavItem key={n.id} {...n} active={page === n.id} onClick={() => { setPage(n.id); setSearch(""); setActiveFilter("all"); }} />
          ))}
        </div>
        <div style={{ padding: "12px 16px", borderTop: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <Avatar initials={user?.fullname?.split(" ").map(n => n[0]).join("") || "A"} size={30} color={T.red} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{user?.fullname || "Admin"}</div>
              <div style={{ fontSize: 10, color: T.red }}>Administrator</div>
            </div>
          </div>
          <button onClick={onLogout} style={{ ...S.btnG, width: "100%", fontSize: 12, color: T.red, borderColor: `${T.red}44` }}>Sign Out</button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: 215, flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Topbar */}
        <div style={{ height: 54, background: `${T.card}ee`, backdropFilter: "blur(12px)", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 26px", position: "sticky", top: 0, zIndex: 99 }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>{nav.find(n => n.id === page)?.icon} {nav.find(n => n.id === page)?.label}</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {(page === "tours" || page === "bookings") && (
              <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...S.input, width: 200, padding: "6px 12px" }} />
            )}
            <div style={{ fontSize: 12, color: T.textMuted }}>{new Date().toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}</div>
          </div>
        </div>

        <div style={{ padding: "22px 26px", flex: 1 }}>

          {/* OVERVIEW */}
          {page === "overview" && stats && (
            <div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
                <StatCard label="Total Bookings" value={stats.totalBookings || 0} icon="📋" color={T.cyan} sub="+12% this month" />
                <StatCard label="Revenue" value={fmt(stats.totalAmount || 0)} icon="💰" color={T.green} sub="FY 2026" />
                <StatCard label="New Users" value={stats.newUsers || 0} icon="👥" color={T.pink} sub="This month" />
                <StatCard label="Avg Rating" value={(stats.avgRating || 0) + "⭐"} icon="🌟" color={T.amber} />
              </div>
              <div style={S.card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>Recent Bookings</div>
                  <button onClick={() => setPage("bookings")} style={{ ...S.btnG, fontSize: 12 }}>View All →</button>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                      {["ID", "Tour", "Guest", "Date", "Amount", "Status"].map(h => (
                        <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: T.textMuted, fontWeight: 500, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.4px" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 4).map((b,index)=> (
                      <tr key={b.id} style={{ borderBottom: `1px solid ${T.border}22` }}>
                        <td style={{ padding: "10px 12px", fontFamily: "monospace", color: T.cyan, fontSize: 12 }}>{index+1}</td>
                        <td style={{ padding: "10px 12px" }}>{b.type}</td>
                        <td style={{ padding: "10px 12px", color: T.textMuted }}>{b.customer}</td>
                        <td style={{ padding: "10px 12px", color: T.textMuted }}>{formatDate(b.date)}</td>
                        <td style={{ padding: "10px 12px", fontWeight: 600, color: T.green }}>{fmt(b.amount)}</td>
                        <td style={{ padding: "10px 12px" }}><span style={S.badge(statusColor(b.status))}>{b.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* LISTINGS */}
          {page === "tours" && (
            <div>
              <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                {["all", ...CATEGORIES].map(cat => (
                  <button key={cat} onClick={() => setActiveFilter(cat)}
                    style={{ ...S.btnG, fontSize: 12, padding: "6px 12px", borderColor: activeFilter === cat ? T.cyan : T.border, color: activeFilter === cat ? T.cyan : T.textMuted, background: activeFilter === cat ? `${T.cyan}15` : "transparent" }}>
                    {cat === "all" ? "🗂️ All" : `${CATEGORY_ICONS[cat]} ${cat}`}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: T.textMuted }}>{fTours.length} listings found</div>
                <button style={{ ...S.btnP, fontSize: 13 }} onClick={() => setTourModal("add")}>+ Add New Listing</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 14 }}>
                {fTours.map(t => (
                  <TourCard key={t._id} t={t} onDelete={handleDeleteTour} onEdit={(tour) => setTourModal(tour)} />
                ))}
              </div>
            </div>
          )}

          {/* DRIVERS */}
          {page === "drivers" && (
            <DriversPage
              drivers={drivers}
              onAddDriver={handleAddDriver}
              onUpdateDriver={handleUpdateDriver}
              onDeleteDriver={handleDeleteDriver}
              showToast={showToast}
            />
          )}

          {/* BOOKINGS */}
          {page === "bookings" && (
            <div>
              <StatCard label="Total Revenue" value={`${fmt(totalRevenue)}`} icon="💰" color={T.purple} />
              <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                {["all", "confirmed", "pending", "cancelled"].map(f => (
                  <button key={f} onClick={() => setSearch(f === "all" ? "" : f)}
                    style={{ ...S.btnG, fontSize: 12, textTransform: "capitalize", borderColor: search === (f === "all" ? "" : f) ? T.cyan : T.border, color: search === (f === "all" ? "" : f) ? T.cyan : T.textMuted }}>
                    {f}
                  </button>
                ))}
              </div>
              <div style={{ ...S.card, overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 680 }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                      {["Booking ID", "Tour", "Guest", "Date", "Pax", "Amount", "Status", "Action"].map(h => (
                        <th key={h} style={{ padding: "9px 13px", textAlign: "left", color: T.textMuted, fontWeight: 500, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.4px", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {fBookings.map(b => (
                      <tr key={b._id} style={{ borderBottom: `1px solid ${T.border}22` }}>
                        <td style={{ padding: "11px 13px", fontFamily: "monospace", color: T.cyan, fontSize: 12 }}>{b.bookingId}</td>
                        <td style={{ padding: "11px 13px", fontWeight: 500 }}>{b.type}</td>
                        <td style={{ padding: "11px 13px", color: T.textMuted }}>{b.customer}</td>
                        <td style={{ padding: "11px 13px", color: T.textMuted }}>{formatDate(b.date)}</td>
                        <td style={{ padding: "11px 13px", textAlign: "center" }}>{b.service}</td>
                        <td style={{ padding: "11px 13px", fontWeight: 700, color: T.green }}>{fmt(b.amount)}</td>
                        <td style={{ padding: "11px 13px" }}><span style={S.badge(statusColor(b.status))}>{b.status}</span></td>
                        <td style={{ padding: "11px 13px" }}>
                          {b.status !== "cancelled" && (
                            <button style={{ ...S.btnG, fontSize: 11, color: T.red, borderColor: `${T.red}33`, padding: "5px 10px" }} onClick={() => handleCancelBooking(b.type,b.bookingId)}>Cancel/Delete</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* USERS */}
          {page === "users" && (
            <div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
                <StatCard label="Total Users" value={users.length} icon="👥" color={T.cyan} />
              </div>
              <div style={{ ...S.card, overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 560 }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                      {["User", "Email", "Joined"].map(h => (
                        <th key={h} style={{ padding: "9px 13px", textAlign: "left", color: T.textMuted, fontWeight: 500, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.4px" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u._id} style={{ borderBottom: `1px solid ${T.border}22` }}>
                        <td style={{ padding: "11px 13px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <Avatar initials={(u?.fullname || "U").split(" ").map(n => n[0] || "").join("")} size={28} />
                            <span style={{ fontWeight: 500 }}>{u.fullname || "Unknown User"}</span>
                          </div>
                        </td>
                        <td style={{ padding: "11px 13px", color: T.textMuted, fontSize: 12 }}>{u.email}</td>
                        <td style={{ padding: "11px 13px", color: T.textMuted, fontSize: 12 }}>{new Date(u.createdAt).toLocaleString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true })}</td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* REVIEWS */}
          {page === "Request" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {Request.map(r => (
                <div key={r.id} style={{ ...S.card, borderLeft: `3px solid ${r.status === "pending" ? T.amber : T.green}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <Avatar initials={r.providerName ? r.providerName.split(" ").map(n => n[0]).join("") : "PR"} />
                      <div>
                        <div style={{ fontWeight: 600 }}>{r.providerName}</div>
                        <div style={{ fontSize: 12, color: T.textMuted }}>{r.serviceType} · {r.location}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={S.badge(statusColor(r.status))}>{r.status}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: T.textMuted, lineHeight: 1.6, margin: "0 0 12px" }}>"{r.description}"</p>
                  {r.status === "Pending" && (
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={{ ...S.btnG, fontSize: 12, color: T.green, borderColor: `${T.green}44` }} onClick={() => handleApproveReview(r._id)}>✓ Approve</button>
                      <button style={{ ...S.btnG, fontSize: 12, color: T.red, borderColor: `${T.red}44` }} onClick={() => handelRejectRequest(r._id)}>✕ Reject</button>
                    </div>
                  )}
                  {r.status === "Approved" && (
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={{ ...S.btnG, fontSize: 12, color: T.amber, borderColor: `${T.amber}44` }} onClick={() => handelRejectRequest(r._id)}>✕ Reject</button>
                      <button style={{ ...S.btnG, fontSize: 12, color: T.red, borderColor: `${T.red}44` }} onClick={() => handleDeleteReview(r._id)}>🗑 Delete</button>
                    </div>
                  )}
                  {r.status === "Rejected" && (
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={{ ...S.btnG, fontSize: 12, color: T.green, borderColor: `${T.green}44` }} onClick={() => handleApproveReview(r._id)}>✓ Approve</button>
                      <button style={{ ...S.btnG, fontSize: 12, color: T.red, borderColor: `${T.red}44` }} onClick={() => handleDeleteReview(r._id)}>🗑 Delete</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* SETTINGS */}
          {page === "settings" && (
            <div style={{ maxWidth: 560 }}>
              <div style={{ ...S.card, marginBottom: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Platform Settings</div>
                {[["Site Name", "TourX"], ["Support Email", "support@tourx.com"], ["Contact", "+91 98765 43210"], ["Currency", "INR (₹)"]].map(([l, v]) => (
                  <div key={l} style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 5 }}>{l}</div>
                    <input defaultValue={v} style={S.input} />
                  </div>
                ))}
                <button style={{ ...S.btnP, marginTop: 8 }} onClick={() => showToast("Settings save ho gayi!")}>Save Changes</button>
              </div>
              <div style={S.card}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Notification Preferences</div>
                {["New booking alerts", "Payment confirmations", "Cancellation alerts", "Review notifications", "Weekly report email"].map(n => (
                  <div key={n} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${T.border}22` }}>
                    <span style={{ fontSize: 13 }}>{n}</span>
                    <div style={{ width: 38, height: 20, background: T.cyan, borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 2px" }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Tour Add / Edit Modal */}
      {tourModal && (
        <TourModal
          editTour={tourModal === "add" ? null : tourModal}
          onClose={() => setTourModal(null)}
          showToast={showToast}
          drivers={drivers}
          onAddDriver={handleAddDriver}
          onAdd={handleTourAdded}
          onUpdate={handleTourUpdated}
        />
      )}

      <Toast toast={toast} />
    </div>
  );
}
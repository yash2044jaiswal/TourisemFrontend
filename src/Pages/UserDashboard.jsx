import { useState, useEffect } from "react";
import Toast from "../Components/Toast";
import NavItem from "../Components/NavItem";
const T = {
  bg: "#0d1117", card: "#161b22", border: "#21262d",
  cyan: "#00b4d8", cyanDim: "#0096b4", cyanGlow: "rgba(0,180,216,0.12)",
  text: "#e6edf3", textMuted: "#8b949e", textDim: "#6e7681",
  green: "#3fb950", red: "#f85149", amber: "#d29922", purple: "#bc8cff", pink: "#f778ba",
};


function Avatar({ initials, size = 36, color = T.cyan }) {
  return <div style={{ width: size, height: size, borderRadius: "50%", background: `${color}22`, border: `1.5px solid ${color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.32, fontWeight: 700, color, flexShrink: 0 }}>{initials}</div>;
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
const S = {
  app: { minHeight: "100vh", background: `linear-gradient(135deg, #0d1117 0%, #0a1628 100%)`, fontFamily: "'Sora','Segoe UI',sans-serif", color: T.text, display: "flex" },
  card: { background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: "20px 24px" },
  input: { width: "100%", background: "#0d1117", border: `1px solid ${T.border}`, borderRadius: 8, color: T.text, padding: "10px 14px", fontSize: 14, outline: "none", boxSizing: "border-box" },
  btnP: { background: `linear-gradient(135deg, ${T.cyan}, ${T.cyanDim})`, border: "none", borderRadius: 8, color: "#0d1117", padding: "10px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer" },
  btnG: { background: "transparent", border: `1px solid ${T.border}`, borderRadius: 8, color: T.textMuted, padding: "8px 16px", fontSize: 13, cursor: "pointer" },
  badge: c => ({ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: `${c}22`, color: c }),
};

const fmt = n => "₹" + Number(n).toLocaleString("en-IN");


function UserDashboard({ user, onLogout }) {
  const [page, setPage] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const [profile, setProfile] = useState({
    fullname: user.fullname || "",
    email: user.email || "",
    phone: user.phone || "",
    password: user.password || "",
    location: user.loacation || ""
  });
  const [ticket, setTicket] = useState({
    subject: "",
    category: "Booking Issue",
    message: ""
  });
  const submitTicket = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:3000/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(ticket)
        }
      );

      const data = await res.json();

      if (data.success) {
        showToast(
          "Support Ticket Submitted"
        );

        setTicket({
          subject: "",
          category: "Booking Issue",
          message: ""
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateProfile = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:3000/api/profile/update",
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(profile)
        }
      );

      const data = await res.json();

      if (data.success) {
        showToast(
          "Profile Updated Successfully"
        );
        setProfile({
          ...profile
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };
  const fetchBookings = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:3000/api/getall-bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();
      console.log("Bookig data:", data);

      setBookings(data.bookings || data);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false)
    }
  };
  const handleDeleteBooking = async (
    bookingId,
    bookingType
  ) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/delete-booking/${bookingType}/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

       await response.json();

      if (response.ok) {
        

        setBookings(prev =>
          prev.filter(
            booking => booking.bookingId !== bookingId
          )
        );
      } 

    } catch (error) {
      console.error(error);
      alert("Failed to delete booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const nav = [

    { id: "bookings", icon: "📋", label: "My Bookings", badge: bookings.filter(b => b.status === "pending").length || null },
    { id: "profile", icon: "👤", label: "My Profile" },
    { id: "support", icon: "💬", label: "Support" },
  ];




  if (loading) return <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora',sans-serif" }}><div style={{ textAlign: "center" }}><div style={{ fontSize: 32, fontWeight: 800, color: T.cyan }}>TourX</div><div style={{ color: T.textMuted, fontSize: 14, marginTop: 8 }}>Loading travel hub...</div></div></div>;

  return (
    <div style={{ ...S.app, color: T.text }}>
      {/* SIDEBAR */}
      <div style={{ width: 215, minHeight: "100vh", background: T.card, borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, zIndex: 100 }}>
        <div style={{ padding: "18px 16px 12px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 21, fontWeight: 800 }}><span style={{ color: T.cyan }}>Tour</span><span style={{ color: T.text }}>X</span></div>
          <div style={{ fontSize: 10, color: T.cyan, fontWeight: 700, letterSpacing: "1px", marginTop: 2 }}>TRAVELER PORTAL</div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "10px 0" }}>
          {nav.map(n => <NavItem key={n.id} {...n} active={page === n.id} onClick={() => { setPage(n.id); }} />)}
        </div>
        <div style={{ padding: "12px 16px", borderTop: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <Avatar initials={user?.fullname?.split(" ").map(n => n[0]).join("")} size={30} color={T.cyan} />
            <div><div style={{ fontSize: 12, fontWeight: 600 }}>{user.fullname}</div><div style={{ fontSize: 10, color: T.cyan }}>Traveler</div></div>
          </div>
          <button onClick={onLogout} style={{ ...S.btnG, width: "100%", fontSize: 12 }}>Sign Out</button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ marginLeft: 215, flex: 1, display: "flex", flexDirection: "column" }}>


        <div style={{ padding: "22px 26px", flex: 1 }}>


          {page === "bookings" && (
            <div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
                <StatCard label="Total" value={bookings.length} icon="📋" color={T.cyan} />
                <StatCard label="Total Spent" value={fmt(bookings.filter(b => b.status !== "cancelled").reduce((a, b) => a + b.amount, 0))} icon="💰" color={T.purple} />
              </div>
              {bookings.length === 0 ? (
                <div style={{ ...S.card, textAlign: "center", padding: "50px 24px" }}>
                  <div style={{ fontSize: 40, marginBottom: 10 }}>🧳</div>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>No bookings yet!</div>
                  <div style={{ fontSize: 13, color: T.textMuted, marginBottom: 18 }}>Start exploring and book your first adventure.</div>
                  
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {bookings.map(b => (
                    <div key={b.id} style={{ ...S.card, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <div style={{ width: 44, height: 44, borderRadius: 10, background: `${T.cyan}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🗺️</div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14 }}>{b.title || b.bookingType}</div>
                          <div style={{
                            fontSize: 12,
                            color: T.textMuted
                          }}>
                            Type: {b.bookingType.toUpperCase()}
                          </div>

                          <div style={{
                            fontSize: 12,
                            color: T.textMuted
                          }}>
                            Booking ID: {b.bookingId}
                          </div>
                          <div style={{
                            fontSize: 12,
                            color: T.textMuted
                          }}>
                            Date: {new Date(b.date).toLocaleDateString()}
                          </div>
                          {b.bookingType === "flight" && (
                            <>
                              <div>Airline: <b>{b.details?.flight?.airline}</b></div>
                              <div>Flight No: <b>{b.details?.flight?.flightNo}</b></div>
                            </>
                          )}

                          {b.bookingType === "train" && (
                            <>
                              <div>Train: <b>{b.details?.trainName}</b></div>
                              <div>PNR: <b>{b.details?.pnr}</b></div>
                            </>
                          )}

                          {b.bookingType === "hotel" && (
                            <>
                              <div>Hotel: <b> {b.details?.hotel?.name}</b></div>
                              <div>Guests: <b> {b.details?.guestDetails?.name}</b></div>
                              <div>Service Type : <b>{b.details?.serviceType}</b></div>
                            </>
                          )}

                          {b.bookingType === "bike" && (
                            <>
                              <div>
                                Bike Name: <b>{b.details?.vehicle?.name}</b>
                                <div>Rider: <b>{b.details?.passengers[0]?.name}</b></div>
                              </div>
                            </>
                          )}
                          {b.bookingType === "cab" && (
                            <>
                              <div>Vehicle Name: <b>{b.details?.vehicle?.name}</b></div>
                              <div>Passenger: <b>{b.details?.passengers[0]?.name}</b></div>
                              <div></div>
                            </>
                          )}
                          {b.bookingType === "bus" && (
                            <>
                              <div>Vehicle Name: <b>{b.details?.vehicle?.name}</b></div>
                              <div>Passenger: <b>{b.details?.passengers[0]?.name}</b></div>
                              <div></div>
                            </>
                          )}
                          {b.bookingType === "outstation" && (
                            <>
                              <div>Vehicle Name: <b>{b.details?.vehicle?.name}</b></div>
                              <div>Passenger: <b>{b.details?.passengers[0]?.name}</b></div>
                              <div></div>
                            </>
                          )}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: 17, fontWeight: 800, color: T.green }}>{fmt(b.amount)}</div>
                        </div>
                        {b.status !== "cancelled" && <button style={{ ...S.btnG, fontSize: 12, color: T.red, borderColor: `${T.red}44` }} onClick={() => {
                          handleDeleteBooking(
                            b.bookingId,
                            b.bookingType
                          )
                          showToast(
                            "Tour Deleted Successfully",
                            "success"
                          );
                        }}>Delete/Cancel</button>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}



          {page === "profile" && (
            <div style={{ maxWidth: 560 }}>
              <div style={{ ...S.card, marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 22 }}>
                  <Avatar
                    initials={
                      user.fullname
                        ?.split(" ")
                        .map(n => n[0])
                        .join("")
                    }
                  />
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 800 }}>{user.fullname}</div>
                    <div style={{ fontSize: 13, color: T.textMuted }}>{user.email}</div>
                    <span style={{ ...S.badge(T.cyan), marginTop: 6, display: "inline-block" }}>🧳 Verified Traveler</span>
                  </div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 5 }}>
                    Full Name
                  </div>
                  <input
                    value={profile.fullname}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        fullname: e.target.value
                      })
                    }
                    style={S.input}
                  />
                </div>

                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 5 }}>
                    Email
                  </div>
                  <input
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        email: e.target.value
                      })
                    }
                    style={S.input}
                  />
                </div>

                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 5 }}>
                    Phone
                  </div>
                  <input
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        phone: e.target.value
                      })
                    }
                    style={S.input}
                  />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 5 }}>
                    Password
                  </div>
                  <input
                    type="password"
                    value={profile.password}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        password: e.target.value
                      })
                    }
                    style={S.input}
                  />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 5 }}>
                    location
                  </div>
                  <input
                    value={profile.location}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        location: e.target.value
                      })
                    }
                    style={S.input}
                  />
                </div>
                <button style={{ ...S.btnP, marginTop: 8 }} onClick={updateProfile}>Update Profile</button>
              </div>

            </div>
          )}

          {page === "support" && (
            <div style={{ maxWidth: 560 }}>
              <div style={{ ...S.card, marginBottom: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Raise a Support Ticket</div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 5 }}>Subject</div>
                  <input placeholder="What's your issue about?" style={S.input} />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 5 }}>Category</div>
                  <select style={{ ...S.input }}><option>Booking Issue</option><option>Payment Problem</option><option>Refund Request</option><option>Tour Query</option><option>General</option></select>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 5 }}>Message</div>
                  <textarea rows={4} placeholder="Describe your issue in detail..." style={{ ...S.input, resize: "vertical" }} />
                </div>
                <button style={S.btnP} onClick={submitTicket}>Submit Ticket →</button>
              </div>
              <div style={S.card}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Quick Help</div>
                {[["📞 Call Us", "+91 98765 43210"], ["📧 Email", "support@tourx.com"], ["💬 Live Chat", "Available 9am–6pm IST"], ["📍 Office", "Varanasi, UP, India"]].map(([l, v]) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${T.border}22`, fontSize: 13 }}>
                    <span style={{ fontWeight: 500 }}>{l}</span><span style={{ color: T.textMuted }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>


      <Toast toast={toast} />
    </div>
  );
}

export default UserDashboard;






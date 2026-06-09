const T = {
  bg:"#0d1117", card:"#161b22", border:"#21262d",
  cyan:"#00b4d8", cyanDim:"#0096b4", cyanGlow:"rgba(0,180,216,0.12)",
  text:"#e6edf3", textMuted:"#8b949e", textDim:"#6e7681",
  green:"#3fb950", red:"#f85149", amber:"#d29922", purple:"#bc8cff", pink:"#f778ba",
};
function NavItem({ icon, label, active, onClick, badge }) {
  return (
    <div onClick={onClick} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 16px", borderRadius:8, cursor:"pointer", margin:"1px 10px", fontSize:13, fontWeight:active?600:400, color:active?T.cyan:T.textMuted, background:active?T.cyanGlow:"transparent", borderLeft:active?`2px solid ${T.cyan}`:"2px solid transparent", transition:"all 0.2s" }}>
      <span style={{ fontSize:16 }}>{icon}</span>
      <span>{label}</span>
      {badge ? <span style={{ marginLeft:"auto", background:T.red, color:"#fff", borderRadius:10, fontSize:10, padding:"2px 6px", fontWeight:700 }}>{badge}</span> : null}
    </div>
  );
}
export default NavItem;
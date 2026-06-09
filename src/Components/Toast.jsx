const T = {
  bg:"#0d1117", card:"#161b22", border:"#21262d",
  cyan:"#00b4d8", cyanDim:"#0096b4", cyanGlow:"rgba(0,180,216,0.12)",
  text:"#e6edf3", textMuted:"#8b949e", textDim:"#6e7681",
  green:"#3fb950", red:"#f85149", amber:"#d29922", purple:"#bc8cff", pink:"#f778ba",
};

function Toast({ toast }) {
  if (!toast) return null;
  return <div style={{ position:"fixed", bottom:24, right:24, zIndex:9999, background:toast.type==="warning"?T.amber:T.green, color:"#0d1117", padding:"12px 20px", borderRadius:10, fontSize:13, fontWeight:600, boxShadow:"0 8px 32px rgba(0,0,0,0.4)" }}>{toast.msg}</div>;
}
export default Toast;
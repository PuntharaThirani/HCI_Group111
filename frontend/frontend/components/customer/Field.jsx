import { C } from '../../constants/styles';

const Field = ({ label, name, type = "text", value, onChange, placeholder = "" }) => (
  <div style={{ marginBottom: "1.1rem" }}>
    <label style={{
      display: "block", marginBottom: "0.4rem", fontSize: "0.82rem",
      fontWeight: "600", color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em",
    }}>
      {label}
    </label>
    <input
      type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
      style={{
        width: "100%", padding: "0.7rem 0.9rem", border: `1.5px solid ${C.border}`,
        borderRadius: "8px", fontSize: "0.93rem", outline: "none",
        background: "#FAFAF8", fontFamily: "inherit", color: C.text,
        boxSizing: "border-box", transition: "border-color 0.15s",
      }}
      onFocus={e => { e.target.style.borderColor = C.brand; e.target.style.background = "#fff"; }}
      onBlur={e =>  { e.target.style.borderColor = C.border; e.target.style.background = "#FAFAF8"; }}
    />
  </div>
);

export default Field;

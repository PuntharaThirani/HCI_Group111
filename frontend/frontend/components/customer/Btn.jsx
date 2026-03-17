import { C } from '../../constants/styles';

const Btn = ({ children, onClick, variant = "primary", style = {}, type = "button" }) => {
  const base = {
    border: "none", borderRadius: "8px", fontFamily: "inherit",
    fontWeight: "600", fontSize: "0.9rem", cursor: "pointer",
    padding: "0.65rem 1.25rem", transition: "all 0.18s ease",
    display: "inline-flex", alignItems: "center", gap: "0.4rem",
  };
  const variants = {
    primary: { background: C.brand, color: "#fff" },
    outline: { background: "transparent", color: C.brand, border: `1.5px solid ${C.brand}` },
    ghost:   { background: "#F0EFEC", color: C.text },
    danger:  { background: C.dangerBg, color: C.danger },
  };
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = "1";    e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {children}
    </button>
  );
};

export default Btn;

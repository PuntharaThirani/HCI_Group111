import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { C } from '../../constants/styles';
import { supabase } from '../../supabaseClient';

const Sidebar = () => {
  const location = useLocation();
  const [profile, setProfile] = useState({ name: "Customer", initials: "C" });

  const links = [
    { name: "My Designs",       path: "/customer/dashboard" },
    { name: "Profile Settings", path: "/customer/profile" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('customer_profiles')
        .select('first_name, last_name')
        .eq('id', user.id)
        .single();

      if (data && data.first_name) {
        const name = `${data.first_name} ${data.last_name}`;
        const initials = (data.first_name.charAt(0) + data.last_name.charAt(0)).toUpperCase();
        setProfile({ name, initials });
      } else {
        // fallback to email
        const email = user.email || "";
        setProfile({ name: email, initials: email.charAt(0).toUpperCase() });
      }
    };
    fetchUser();
  }, []);

  return (
    <div style={{
      width: "230px",
      height: "calc(100vh - 42px)",
      overflowY: "auto",
      background: "#fff",
      borderRight: `1px solid ${C.border}`,
      position: "fixed",
      top: "42px", left: 0,
      padding: "1.75rem 1rem",
      boxSizing: "border-box",
      zIndex: 100,
    }}>

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2rem", paddingLeft: "0.5rem" }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "8px",
          background: C.brand, display: "flex", alignItems: "center",
          justifyContent: "center", color: "white", fontWeight: "800",
          fontSize: "1rem", flexShrink: 0,
        }}>
          V
        </div>
        <div>
          <div style={{ color: "#1A1A1A", fontWeight: "800", fontSize: "1rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            VISIONARY
          </div>
          <div style={{ fontSize: "0.65rem", color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            INTERIORS
          </div>
        </div>
      </div>

      {/* Section label */}
      <div style={{
        fontSize: "0.7rem", color: C.muted, letterSpacing: "0.1em",
        textTransform: "uppercase", fontWeight: "700",
        padding: "0 0.5rem", marginBottom: "0.5rem",
      }}>
        Customer Menu
      </div>

      {/* Nav links */}
      {links.map(link => {
        const active = location.pathname === link.path;
        return (
          <Link key={link.path} to={link.path} style={{ textDecoration: "none" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              padding: "0.7rem 0.9rem", borderRadius: "9px", marginBottom: "0.25rem",
              background: active ? C.brandLight : "transparent",
              color: active ? C.brand : "#555",
              fontWeight: active ? "700" : "400", fontSize: "0.92rem",
              borderLeft: active ? `3px solid ${C.brand}` : "3px solid transparent",
              transition: "all 0.15s",
            }}>
              {link.name}
            </div>
          </Link>
        );
      })}

      {/* Bottom user + logout */}
      <div style={{ position: "absolute", bottom: "1.5rem", left: "1rem", right: "1rem" }}>
        <div style={{ height: "1px", background: C.border, marginBottom: "1rem" }} />

        {/* User card */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "50%",
            background: `linear-gradient(135deg, ${C.brand}, ${C.brandDark})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: "0.8rem", fontWeight: "800", flexShrink: 0,
          }}>
            {profile.initials}
          </div>
          <div>
            <div style={{ fontWeight: "700", fontSize: "0.88rem", color: C.text, lineHeight: 1.2 }}>
              {profile.name}
            </div>
            <div style={{ fontSize: "0.7rem", color: C.brand, fontWeight: "600", letterSpacing: "0.04em" }}>
              ● CUSTOMER
            </div>
          </div>
        </div>

        {/* Log out */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <div style={{
            padding: "0.6rem 0.9rem", color: "#C62828", fontSize: "0.85rem",
            cursor: "pointer", background: "#FFEBEE", borderRadius: "8px",
            fontWeight: "600", textAlign: "center", border: "1px solid #FFCDD2",
          }}>
            ← Log Out
          </div>
        </Link>
      </div>

    </div>
  );
};

export default Sidebar;

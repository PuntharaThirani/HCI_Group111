import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerLayout from '../../components/customer/CustomerLayout';
import Btn from '../../components/customer/Btn';
import { C, shadow } from '../../constants/styles';
import { supabase } from '../../supabaseClient';

const Badge = ({ status }) => {
  const map = {
    "IN-PROGRESS": { bg: "#FFF3E8", color: C.brand },
    "COMPLETED": { bg: "#E8F5E9", color: "#2E7D32" },
    "SAVED": { bg: "#E3F2FD", color: "#1565C0" },
    "PAID": { bg: "#E8F5E9", color: "#1B5E20" },
  };

  const normalizedStatus = (status || "IN-PROGRESS").toUpperCase();
  const s = map[normalizedStatus] || map["IN-PROGRESS"];

  return (
    <span
      style={{
        padding: "0.28rem 0.75rem",
        borderRadius: "999px",
        fontSize: "0.7rem",
        fontWeight: "700",
        letterSpacing: "0.05em",
        background: s.bg,
        color: s.color,
        textTransform: "uppercase",
      }}
    >
      {normalizedStatus}
    </span>
  );
};

const DesignCard = ({ design, onDelete, onRename }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [nameValue, setNameValue] = useState(design.name || '');

  const roomIconMap = {
    "Living Room": "🛋️",
    "Bedroom": "🛏️",
    "Kitchen": "🍳",
    "Office": "🖥️",
    "Bathroom": "🚿",
  };

  const icon = roomIconMap[design.room] || "🛋️";

  const handleNameBlur = async () => {
    const trimmed = nameValue.trim();

    if (!trimmed || trimmed === design.name) {
      setNameValue(design.name);
      return;
    }

    const { error } = await supabase
      .from('customer_designs')
      .update({ name: trimmed })
      .eq('id', design.id);

    if (!error) {
      onRename(design.id, trimmed);
    }
  };

  const handlePayNow = () => {
    navigate('/payment', {
      state: {
        project: {
          id: design.id,
          name: design.name || 'Interior Design Project',
          image: design.image || '/assets/placeholder.jpeg',
          price: design.budget || 25000,
          status: design.status || 'COMPLETED',
        },
      },
    });
  };

  const normalizedStatus = (design.status || '').toUpperCase();
  const canPay = normalizedStatus === 'COMPLETED';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.white,
        borderRadius: "14px",
        overflow: "hidden",
        border: `1px solid ${C.border}`,
        boxShadow: hovered ? shadow.lg : shadow.sm,
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "all 0.2s ease",
      }}
    >
      {/* Card thumbnail */}
      <div
        style={{
          height: "160px",
          background: "linear-gradient(135deg, #F5EFE7 0%, #EDE0D0 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "3.5rem",
          position: "relative",
        }}
      >
        {design.image ? (
          <img
            src={design.image}
            alt={design.name || 'Design'}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          icon
        )}

        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "rgba(255,255,255,0.85)",
            borderRadius: "6px",
            padding: "3px 8px",
            fontSize: "0.7rem",
            color: C.muted,
          }}
        >
          {design.created_at
            ? new Date(design.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : 'No date'}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "0.9rem 1rem 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <input
            type="text"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            onBlur={handleNameBlur}
            onClick={(e) => e.stopPropagation()}
            title="Click to rename"
            style={{
              fontWeight: "700",
              fontSize: "0.95rem",
              color: C.text,
              background: "transparent",
              border: "none",
              borderBottom: "1.5px solid transparent",
              outline: "none",
              width: "100%",
              cursor: "text",
              transition: "border-color 0.2s",
              fontFamily: "inherit",
            }}
            onFocus={(e) => (e.target.style.borderBottomColor = "#C96A2B")}
            onBlurCapture={(e) => (e.target.style.borderBottomColor = "transparent")}
          />
          <Badge status={design.status || 'IN-PROGRESS'} />
        </div>

        <div style={{ fontSize: "0.8rem", color: C.muted, marginTop: "0.25rem" }}>
          {design.room || 'Room'} · {design.items || 0} items
        </div>
      </div>

      {/* Card actions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: canPay ? "1fr 1fr 1fr" : "1fr 1fr",
          gap: "0.5rem",
          padding: "0.85rem 1rem 1rem",
        }}
      >
        <Btn onClick={() => navigate(`/workspace?id=${design.id}`)} style={{ flex: 1 }}>
          Open
        </Btn>

        {canPay && (
          <Btn
            onClick={handlePayNow}
            style={{
              flex: 1,
              background: "#2E7D32",
              color: "#fff",
            }}
          >
            Pay Now
          </Btn>
        )}

        <Btn variant="ghost" onClick={() => onDelete(design.id)} style={{ flex: 1 }}>
          Delete
        </Btn>
      </div>
    </div>
  );
};

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  const statuses = ["ALL", "IN-PROGRESS", "COMPLETED", "PAID"];

  useEffect(() => {
    const fetchDesigns = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from('customer_designs')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching designs:', error);
      } else {
        setDesigns(data || []);
      }

      setLoading(false);
    };

    fetchDesigns();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this design?")) {
      const { error } = await supabase
        .from('customer_designs')
        .delete()
        .eq('id', id);

      if (!error) {
        setDesigns((prev) => prev.filter((d) => d.id !== id));
      } else {
        console.error('Error deleting design:', error);
      }
    }
  };

  const handleRename = (id, newName) => {
    setDesigns((prev) =>
      prev.map((d) => (d.id === id ? { ...d, name: newName } : d))
    );
  };

  const filtered =
    filter === "ALL"
      ? designs
      : designs.filter((d) => (d.status || '').toUpperCase() === filter);

  if (loading) {
    return (
      <CustomerLayout>
        <div
          style={{
            padding: "2rem 2.5rem",
            color: C.muted,
            fontSize: "0.95rem",
          }}
        >
          Loading your designs...
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <div style={{ padding: "2rem 2.5rem" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "1.6rem",
                fontWeight: "800",
                color: C.text,
              }}
            >
              My Designs
            </h2>
            <p
              style={{
                margin: "0.3rem 0 0",
                color: C.muted,
                fontSize: "0.9rem",
              }}
            >
              {designs.length} design{designs.length !== 1 ? "s" : ""} saved to your account
            </p>
          </div>

          <Btn onClick={() => navigate("/workspace")}>+ Start New Design</Btn>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "Total", value: designs.length, color: C.brand },
            {
              label: "In Progress",
              value: designs.filter((d) => (d.status || '').toUpperCase() === "IN-PROGRESS").length,
              color: C.brand,
            },
            {
              label: "Completed",
              value: designs.filter((d) => (d.status || '').toUpperCase() === "COMPLETED").length,
              color: "#2E7D32",
            },
            {
              label: "Paid",
              value: designs.filter((d) => (d.status || '').toUpperCase() === "PAID").length,
              color: "#1B5E20",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: "10px",
                padding: "0.9rem 1.4rem",
                minWidth: "100px",
                boxShadow: shadow.sm,
              }}
            >
              <div
                style={{
                  fontSize: "1.6rem",
                  fontWeight: "800",
                  color: stat.color,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: C.muted,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  fontWeight: "600",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: "0.45rem 1rem",
                borderRadius: "999px",
                cursor: "pointer",
                border: `1.5px solid ${filter === s ? C.brand : C.border}`,
                background: filter === s ? C.brand : C.white,
                color: filter === s ? "#fff" : C.muted,
                fontWeight: "600",
                fontSize: "0.8rem",
                fontFamily: "inherit",
              }}
            >
              {s === "ALL" ? "All Designs" : s}
            </button>
          ))}
        </div>

        {/* Design grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", color: C.muted }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🛋️</div>
            <div
              style={{
                fontWeight: "600",
                color: C.text,
                marginBottom: "0.5rem",
              }}
            >
              No designs yet
            </div>
            <Btn onClick={() => navigate("/workspace")}>+ Start New Design</Btn>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {filtered.map((design) => (
              <DesignCard
                key={design.id}
                design={design}
                onDelete={handleDelete}
                onRename={handleRename}
              />
            ))}
          </div>
        )}
      </div>
    </CustomerLayout>
  );
};

export default CustomerDashboard;
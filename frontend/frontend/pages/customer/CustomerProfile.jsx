import { useState, useEffect } from 'react';
import CustomerLayout from '../../components/customer/CustomerLayout';
import Btn from '../../components/customer/Btn';
import Field from '../../components/customer/Field';
import { C, shadow } from '../../constants/styles';
import { supabase } from '../../supabaseClient';

const SectionCard = ({ title, children, onSave, btnLabel = "Save Changes" }) => (
  <div style={{
    background: C.white, borderRadius: "12px", border: `1px solid ${C.border}`,
    boxShadow: shadow.sm, marginBottom: "1.25rem",
  }}>
    <div style={{ padding: "1rem 1.4rem", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ fontWeight: "700", fontSize: "1rem", color: C.text }}>{title}</div>
    </div>
    <div style={{ padding: "1.4rem" }}>
      {children}
      {onSave && <Btn onClick={onSave} style={{ marginTop: "0.5rem" }}>{btnLabel}</Btn>}
    </div>
  </div>
);

const CustomerProfile = () => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "",
    email: "", phone: "", address: "",
    currentPassword: "", newPassword: "", confirmPassword: "",
  });
  const [saved, setSaved] = useState(false);
  const [pwError, setPwError] = useState("");
  const [loading, setLoading] = useState(true);

  // Load profile from Supabase
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data, error } = await supabase
        .from('customer_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) {
        setForm(prev => ({
          ...prev,
          firstName: data.first_name || "",
          lastName:  data.last_name  || "",
          email:     data.email      || user.email || "",
          phone:     data.phone      || "",
          address:   data.address    || "",
        }));
      } else {
        // No profile yet — use email from auth
        setForm(prev => ({ ...prev, email: user.email || "" }));
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false); setPwError("");
  };

  // Save personal info to Supabase
  const handleSaveInfo = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('customer_profiles')
      .upsert({
        id:         user.id,
        first_name: form.firstName,
        last_name:  form.lastName,
        email:      form.email,
        phone:      form.phone,
        address:    form.address,
      });

    if (!error) { setSaved(true); setEditing(false); }
    else console.error('Error saving profile:', error);
  };

  // Change password via Supabase auth
  const handleSavePassword = async () => {
    if (!form.newPassword || form.newPassword !== form.confirmPassword) {
      setPwError("Passwords do not match or are empty."); return;
    }
    const { error } = await supabase.auth.updateUser({ password: form.newPassword });
    if (!error) {
      setForm(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
      setSaved(true);
    } else {
      setPwError(error.message);
    }
  };

  const initials = (form.firstName.charAt(0) + form.lastName.charAt(0)).toUpperCase() || "?";

  if (loading) return (
    <CustomerLayout>
      <div style={{ padding: "2rem 2.5rem", color: C.muted }}>Loading profile...</div>
    </CustomerLayout>
  );

  return (
    <CustomerLayout>
      <div style={{ padding: "2rem 2.5rem" }}>
        <h2 style={{ margin: "0 0 0.3rem", fontSize: "1.5rem", fontWeight: "800", color: C.text }}>
          Profile Settings
        </h2>
        <p style={{ margin: "0 0 1.75rem", color: C.muted, fontSize: "0.9rem" }}>
          Your personal information
        </p>

        {saved && (
          <div style={{
            padding: "0.75rem 1rem", borderRadius: "8px", marginBottom: "1.25rem",
            background: C.successBg, color: C.success, fontWeight: "600", fontSize: "0.9rem",
          }}>
            ✅ Saved successfully!
          </div>
        )}

        {!editing ? (
          /* VIEW MODE */
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <div style={{
              background: C.white, borderRadius: "16px", border: `1px solid ${C.border}`,
              boxShadow: shadow.sm, overflow: "hidden",
            }}>
              <div style={{
                background: `linear-gradient(135deg, ${C.brand}, ${C.brandDark})`,
                height: "100px",
              }} />
              <div style={{ padding: "0 2rem 2rem", marginTop: "-50px" }}>
                <div style={{
                  width: "90px", height: "90px", borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.brand}, ${C.brandDark})`,
                  border: `4px solid ${C.white}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: "2rem", fontWeight: "800",
                  boxShadow: shadow.md, marginBottom: "1rem",
                }}>
                  {initials}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                  <div>
                    <div style={{ fontWeight: "800", fontSize: "1.3rem", color: C.text }}>
                      {form.firstName} {form.lastName}
                    </div>
                    <div style={{
                      display: "inline-block", marginTop: "0.3rem",
                      background: C.brandLight, color: C.brand,
                      fontSize: "0.72rem", fontWeight: "700", letterSpacing: "0.07em",
                      padding: "0.25rem 0.75rem", borderRadius: "999px", textTransform: "uppercase",
                    }}>
                      Customer
                    </div>
                  </div>
                  <Btn onClick={() => { setEditing(true); setSaved(false); }}>
                    ✏️ Edit Profile
                  </Btn>
                </div>

                <div style={{ height: "1px", background: C.border, marginBottom: "1.25rem" }} />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {[
                    { icon: "✉", label: "Email",   value: form.email   },
                    { icon: "📞", label: "Phone",   value: form.phone   },
                    { icon: "📍", label: "Address", value: form.address },
                  ].map((item, i) => (
                    <div key={i} style={{
                      background: C.bg, borderRadius: "10px", padding: "0.85rem 1rem",
                      display: "flex", gap: "0.75rem", alignItems: "flex-start",
                    }}>
                      <span style={{ fontSize: "1rem", marginTop: "1px" }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: "0.72rem", color: C.muted, fontWeight: "700",
                          textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.2rem" }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: "0.88rem", color: C.text, fontWeight: "500" }}>
                          {item.value || "—"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        ) : (
          /* EDIT MODE */
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <Btn variant="ghost" onClick={() => setEditing(false)}>← Back</Btn>
              <span style={{ color: C.muted, fontSize: "0.9rem" }}>Editing your profile</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignItems: "start" }}>

              <SectionCard title="Personal Information" onSave={handleSaveInfo}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
                  <Field label="First Name" name="firstName" value={form.firstName} onChange={handleChange} />
                  <Field label="Last Name"  name="lastName"  value={form.lastName}  onChange={handleChange} />
                </div>
                <Field label="Email Address" name="email"   type="email" value={form.email}   onChange={handleChange} />
                <Field label="Phone Number"  name="phone"   type="tel"   value={form.phone}   onChange={handleChange} />
                <Field label="Address"       name="address"              value={form.address} onChange={handleChange} />
              </SectionCard>

              <SectionCard title="Change Password" onSave={handleSavePassword} btnLabel="Update Password">
                <Field label="Current Password"     name="currentPassword" type="password"
                  value={form.currentPassword} onChange={handleChange} placeholder="Enter current password" />
                <Field label="New Password"         name="newPassword"     type="password"
                  value={form.newPassword}     onChange={handleChange} placeholder="Min. 6 characters" />
                <Field label="Confirm New Password" name="confirmPassword" type="password"
                  value={form.confirmPassword} onChange={handleChange} placeholder="Repeat new password" />
                {pwError && (
                  <div style={{ color: C.danger, fontSize: "0.83rem", fontWeight: "600" }}>⚠️ {pwError}</div>
                )}
              </SectionCard>

            </div>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
};

export default CustomerProfile;


import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const project = {
    id: location.state?.project?.id || 'N/A',
    name: location.state?.project?.name || 'Interior Design Project',
    image: location.state?.project?.image || '/assets/placeholder.jpeg',
    price: Number(location.state?.project?.price) || 25000,
    status: location.state?.project?.status || 'in-progress',
  };

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    email: '',
    billingAddress: '',
  });

  const subtotal = useMemo(() => project.price, [project.price]);
  const serviceFee = useMemo(() => Math.round(subtotal * 0.05), [subtotal]);
  const total = subtotal + serviceFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      navigate('/payment-success', {
        state: {
          project,
          amount: total,
          paymentMethod,
        },
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#EEF1F4] text-slate-900">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#C96A2B] px-3 py-2 text-sm font-bold text-white">
              V
            </div>
            <div>
              <h1 className="text-lg font-semibold uppercase tracking-tight text-slate-900">
                Visionary<span className="font-light">Interiors</span>
              </h1>
              <p className="text-xs font-medium text-slate-400">
                Secure Checkout
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-[#C96A2B] hover:text-[#C96A2B]"
          >
            ← Back
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[1.1fr_420px]">
        {/* Left: Payment Form */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
          <div className="mb-8">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#C96A2B]">
              Checkout
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-800">
              Complete your payment
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Review your details and confirm the order.
            </p>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <MethodCard
              active={paymentMethod === 'card'}
              label="Card Payment"
              icon="💳"
              onClick={() => setPaymentMethod('card')}
            />
            <MethodCard
              active={paymentMethod === 'bank'}
              label="Bank Transfer"
              icon="🏦"
              onClick={() => setPaymentMethod('bank')}
            />
            <MethodCard
              active={paymentMethod === 'cash'}
              label="Pay In Store"
              icon="💵"
              onClick={() => setPaymentMethod('cash')}
            />
          </div>

          <form onSubmit={handlePayment} className="space-y-5">
            <SectionTitle title="Billing Details" />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Full Name"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                placeholder="John Doe"
              />
              <Field
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@email.com"
              />
            </div>

            <Field
              label="Billing Address"
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleChange}
              placeholder="No. 25, Colombo 07"
            />

            {paymentMethod === 'card' && (
              <>
                <SectionTitle title="Card Information" />

                <Field
                  label="Card Number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Expiry Date"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                  />
                  <Field
                    label="CVV"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                  />
                </div>
              </>
            )}

            {paymentMethod === 'bank' && (
              <InfoBox>
                Transfer the amount to the provided business account and upload
                your reference later in the admin workflow.
              </InfoBox>
            )}

            {paymentMethod === 'cash' && (
              <InfoBox>
                This option allows the customer to confirm the design now and pay
                physically at the furniture store.
              </InfoBox>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-[#C96A2B] py-4 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-[#B95D20] disabled:opacity-50"
              >
                {loading ? 'Processing Payment...' : `Pay LKR ${total.toLocaleString()}`}
              </button>
            </div>
          </form>
        </section>

        {/* Right: Order Summary */}
        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#C96A2B]">
            Order Summary
          </p>
          <h3 className="text-2xl font-semibold text-slate-800">
            {project.name}
          </h3>

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <img
              src={project.image}
              alt={project.name}
              onError={(e) => {
                e.currentTarget.src = '/assets/placeholder.jpeg';
              }}
              className="h-56 w-full object-cover"
            />
          </div>

          <div className="mt-6 space-y-4">
            <SummaryRow label="Project ID"      value={`#${project.id}`} />
            <SummaryRow label="Current Status"  value={project.status} />
            <SummaryRow label="Design Fee"      value={`LKR ${subtotal.toLocaleString()}`} />
            <SummaryRow label="Service Fee"     value={`LKR ${serviceFee.toLocaleString()}`} />
          </div>

          <div className="my-6 h-px bg-slate-200"></div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Total</span>
            <span className="text-2xl font-semibold text-[#C96A2B]">
              LKR {total.toLocaleString()}
            </span>
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Your payment interface is simulated for coursework demonstration.
          </div>
        </aside>
      </main>
    </div>
  );
};

const MethodCard = ({ active, label, icon, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-2xl border px-4 py-5 text-left transition ${
      active
        ? 'border-[#C96A2B] bg-orange-50 shadow-sm'
        : 'border-slate-200 bg-white hover:border-orange-200'
    }`}
  >
    <div className="mb-2 text-2xl">{icon}</div>
    <div className="text-sm font-semibold text-slate-800">{label}</div>
  </button>
);

const SectionTitle = ({ title }) => (
  <p className="pt-2 text-xs font-medium uppercase tracking-wider text-slate-400">
    {title}
  </p>
);

const Field = ({ label, name, value, onChange, placeholder, type = 'text' }) => (
  <div>
    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:border-[#C96A2B] focus:ring-2 focus:ring-[#C96A2B]/10"
    />
  </div>
);

const SummaryRow = ({ label, value }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-slate-500">{label}</span>
    <span className="font-medium text-slate-800">{value}</span>
  </div>
);

const InfoBox = ({ children }) => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
    {children}
  </div>
);

export default PaymentPage;
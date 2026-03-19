import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const project = location.state?.project || null;
  const amount = location.state?.amount || 0;
  const paymentMethod = location.state?.paymentMethod || 'card';

  return (
    <div className="min-h-screen bg-[#EEF1F4] px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl lg:p-12">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl">
          ✅
        </div>

        <div className="text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-emerald-600">
            Payment Complete
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-800">
            Payment Successful
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Your project payment has been recorded successfully.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="space-y-4">
            <InfoRow label="Project" value={project?.name || 'Interior Design Project'} />
            <InfoRow label="Amount Paid" value={`LKR ${Number(amount).toLocaleString()}`} />
            <InfoRow label="Payment Method" value={paymentMethod} />
            <InfoRow label="Reference" value={`VI-${Date.now()}`} />
          </div>
        </div>

       
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3 text-sm last:border-b-0 last:pb-0">
    <span className="text-slate-500">{label}</span>
    <span className="font-medium text-slate-800">{value}</span>
  </div>
);

export default PaymentSuccess;
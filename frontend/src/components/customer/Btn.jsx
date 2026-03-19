const Btn = ({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition';

  const variants = {
    primary: 'bg-[#C96A2B] text-white hover:bg-[#B95D20] disabled:opacity-50',
    outline: 'border border-[#C96A2B] text-[#C96A2B] bg-white hover:bg-orange-50 disabled:opacity-50',
    ghost: 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 disabled:opacity-50',
    danger: 'border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Btn;
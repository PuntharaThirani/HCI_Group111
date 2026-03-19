import { C } from '../../constants/styles';

const Field = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  disabled = false,
}) => (
  <div style={{ marginBottom: '1rem' }}>
    <label
      htmlFor={name}
      style={{
        display: 'block',
        marginBottom: '0.45rem',
        fontSize: '0.75rem',
        fontWeight: '500',
        color: C.muted,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
      }}
    >
      {label}
    </label>

    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '0.75rem 0.95rem',
        border: `1px solid ${C.border}`,
        borderRadius: '12px',
        fontSize: '0.95rem',
        outline: 'none',
        background: disabled ? '#F3F4F6' : '#FFFFFF',
        fontFamily: 'inherit',
        color: C.text,
        boxSizing: 'border-box',
        transition: 'all 0.15s ease',
        opacity: disabled ? 0.65 : 1,
      }}
    />
  </div>
);

export default Field;
import { useState } from 'react';

export default function Input({
  label,
  type = 'text',
  error,
  icon: Icon,
  required = false,
  className = '',
  options = [],
  rows = 4,
  value,
  onChange,
  name,
  placeholder,
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value !== undefined && value !== '';

  const baseInputClasses = `
    w-full bg-white/[0.04] border rounded-xl px-4 py-3
    text-white placeholder-transparent
    focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50
    transition-all duration-300
    ${Icon ? 'pl-11' : ''}
    ${error ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/[0.08] hover:border-white/[0.15]'}
  `;

  const labelClasses = `
    absolute transition-all duration-300 pointer-events-none
    ${Icon ? 'left-11' : 'left-4'}
    ${focused || hasValue
      ? '-top-2.5 text-xs px-1 bg-dark-card text-primary'
      : 'top-3 text-sm text-text-muted'
    }
  `;

  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          required={required}
          placeholder={placeholder || label}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${baseInputClasses} resize-none`}
          {...props}
        />
      );
    }

    if (type === 'select') {
      return (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${baseInputClasses} appearance-none cursor-pointer`}
          {...props}
        >
          <option value="" className="bg-dark-card text-text-muted">{placeholder || `Select ${label}`}</option>
          {options.map((opt) => (
            <option key={opt.value || opt} value={opt.value || opt} className="bg-dark-card text-white">
              {opt.label || opt}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder || label}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={baseInputClasses}
        {...props}
      />
    );
  };

  return (
    <div className={`relative ${className}`}>
      {Icon && (
        <Icon className={`absolute left-3.5 top-3.5 w-4.5 h-4.5 transition-colors duration-300 ${
          focused ? 'text-primary' : 'text-text-muted'
        }`} />
      )}

      {renderInput()}

      {label && <label className={labelClasses}>{label}{required && ' *'}</label>}

      {error && (
        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-red-400" />
          {error}
        </p>
      )}
    </div>
  );
}

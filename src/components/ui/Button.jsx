import { forwardRef } from 'react';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  isLoading = false,
  onClick,
  type = 'button',
  className = '',
  ...props 
}, ref) => {
  const baseClasses = 'button';
  const variantClasses = {
    primary: 'button--primary',
    secondary: 'button--secondary',
    ghost: 'button--ghost'
  };
  const sizeClasses = {
    small: 'button--small',
    medium: 'button--medium',
    large: 'button--large'
  };

  const buttonClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled && 'button--disabled',
    isLoading && 'button--loading',
    className
  ].filter(Boolean).join(' ');

  // AGENTS.md: Loading buttons show spinner and keep original label
  const handleClick = (e) => {
    if (!disabled && !isLoading && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      ref={ref}
      type={type}
      className={buttonClasses}
      disabled={disabled || isLoading}
      onClick={handleClick}
      aria-disabled={disabled || isLoading}
      // AGENTS.md: Hit target ≥24px (mobile ≥44px) - handled in CSS
      style={{
        minHeight: '44px',
        minWidth: '44px',
        touchAction: 'manipulation', // AGENTS.md: prevent double-tap zoom
        WebkitTapHighlightColor: 'transparent' // AGENTS.md: set tap highlight
      }}
      {...props}
    >
      {isLoading && (
        <span className="button-spinner" aria-hidden="true" role="status">
          <span className="sr-only">Cargando...</span>
          ⟳
        </span>
      )}
      <span className={isLoading ? 'button-text--loading' : 'button-text'}>
        {children}
      </span>
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
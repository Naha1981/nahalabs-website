import React from 'react';

export type ButtonVariant = 'primary' | 'secondary';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#0B0E10] text-white border border-[#0B0E10] hover:bg-[#23282D] focus-visible:outline-[#355241]',
  secondary: 'bg-transparent text-[#0B0E10] border border-[#D1D5DB] hover:bg-white focus-visible:outline-[#355241]',
};

const baseClasses =
  'inline-flex min-h-12 h-12 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold leading-none tracking-[-0.005em] transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) => (
  <button
    type={type}
    className={`${baseClasses} ${variantClasses[variant]} ${className}`.trim()}
    {...props}
  />
);

export interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
}

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ variant = 'primary', className = '', ...props }, ref) => (
    <a
      ref={ref}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`.trim()}
      {...props}
    />
  ),
);

ButtonLink.displayName = 'ButtonLink';

'use client';

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const SkipLink = ({ href, children, className = '' }: SkipLinkProps) => {
  return (
    <a
      href={href}
      className={`
        sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
        bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium 
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        z-50 transition-all duration-200
        ${className}
      `}
      onFocus={(e) => {
        // Ensure the skip link is visible when focused
        e.currentTarget.classList.remove('sr-only');
      }}
      onBlur={(e) => {
        // Hide the skip link when focus is lost
        e.currentTarget.classList.add('sr-only');
      }}
    >
      {children}
    </a>
  );
};

export default SkipLink;

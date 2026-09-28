type ToothIconProps = {
  className?: string;
};

export const ToothIcon = ({ className = 'w-5 h-5' }: ToothIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    className={className}
  >
    <path d="M18.66 4.34C17.5 3.18 15.86 2.5 14.1 2.5c-1.28 0-2.12.35-2.1.35-.02 0-.82-.35-2.1-.35-1.76 0-3.4.68-4.56 1.84C3.82 5.86 3.5 8.1 3.5 10.5c0 3.3 1.25 6.35 2.12 8.52.56 1.4 1.2 2.48 2.08 2.48.97 0 1.55-1.12 2.3-2.58.48-.94.98-1.92 2-1.92s1.52.98 2 1.92c.75 1.46 1.33 2.58 2.3 2.58.88 0 1.52-1.08 2.08-2.48.87-2.17 2.12-5.22 2.12-8.52 0-2.4-.32-4.64-1.84-6.16z"></path>
  </svg>
);

export default ToothIcon;

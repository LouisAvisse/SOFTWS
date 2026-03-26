interface Props { className?: string }

export function PersonSilhouette({ className }: Props) {
  return (
    <svg
      width="32"
      height="48"
      viewBox="0 0 32 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="16" cy="10" r="8" stroke="#d4d4d8" strokeWidth="1.5" />
      <rect x="4" y="22" width="24" height="22" rx="4" stroke="#d4d4d8" strokeWidth="1.5" />
    </svg>
  );
}

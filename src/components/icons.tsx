import Image from 'next/image';

export function Logo(props: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="Semixion Logo"
      width={32}
      height={32}
      className={props.className || "h-8 w-8"}
      priority
    />
  );
}

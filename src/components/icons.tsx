import Image from 'next/image';

export function Logo(props: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="Semixon Technologies Logo"
      width={200}
      height={50}
      className={props.className || "h-8 w-auto"}
      priority
    />
  );
}

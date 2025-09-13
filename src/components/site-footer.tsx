'use client';

import Link from 'next/link';
import { Logo } from './icons';
import { usePathname } from 'next/navigation';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="border-t">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
             <Link href="/" className="flex items-center space-x-2">
                <Logo className="h-8 w-auto" />
             </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Engineering the future of semiconductors.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase font-headline">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-base text-muted-foreground hover:text-foreground">About</Link></li>
              <li><Link href="/team" className="text-base text-muted-foreground hover:text-foreground">Team</Link></li>
              <li><Link href="/contact" className="text-base text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase font-headline">Solutions</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/services" className="text-base text-muted-foreground hover:text-foreground">Services</Link></li>
              <li><Link href="/products" className="text-base text-muted-foreground hover:text-foreground">Products</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <p className="text-base text-muted-foreground text-center">
            &copy; {currentYear} Semixon Lite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

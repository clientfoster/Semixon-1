'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronDown } from 'lucide-react';
import { Logo } from './icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { 
    href: '/services', 
    label: 'Services',
    dropdown: [
      {
        heading: 'Semiconductors',
        items: [
          'Analog and mixed-signal',
          'ATE',
          'Bench characterization',
          'Design verification',
          'DFT',
          'FPGA design',
          'In-house silicon validation lab',
          'Physical design',
          'Prototyping and Emulation',
        ],
      },
      {
        heading: 'Embedded',
        items: [
          'Bare metal programming',
          'Board support package',
          'CI/CD',
          'Device drivers',
          'Diagnostics',
          'OS porting and customization',
          'Cyber security',
          'Verification and validation',
        ],
      },
      {
        heading: 'Software',
        items: [
          'Data Analytics, AI and Machine Learning',
          'Cloud Architecture and Engineering',
          'Salesforce Implementation and Support​',
          'Application Development and Maintenance',
          'Quality Assurance',
          'IT Infrastructure',
          'Engineering and Technical Services',
        ],
      }
    ]
  },
  { href: '/products',label: 'Products' },
  { href: '/team', label: 'Team' },
  { href: '/contact', label: 'Contact' },
  { href: '/ai-copy-suggester', label: 'AI Suggester' },
  { href: '/admin', label: 'Admin' },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-6 w-auto" />
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
          {navLinks.map((link) => (
            link.dropdown ? (
              <DropdownMenu key={link.href}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={cn(
                    "flex items-center gap-1 transition-colors hover:text-foreground/80 focus-visible:ring-0",
                    pathname.startsWith(link.href) ? 'text-foreground' : 'text-foreground/60'
                  )}>
                    {link.label}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  <DropdownMenuItem asChild>
                    <Link href="/services" className="font-semibold">All Services</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {link.dropdown.map(group => (
                    <DropdownMenuGroup key={group.heading}>
                      <DropdownMenuLabel>{group.heading}</DropdownMenuLabel>
                      {group.items.map(item => (
                        <DropdownMenuItem key={item} disabled>
                          {item}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-foreground/80 px-3 py-2',
                  pathname === link.href ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end">
          <Button asChild className="hidden md:flex">
            <Link href="/contact">Get a Quote</Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col h-full py-6">
                <div className="px-4">
                  <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                    <Logo className="h-6 w-auto" />
                  </Link>
                </div>
                <nav className="flex flex-col items-start space-y-4 mt-8 px-4">
                  {navLinks.map((link) => (
                    // Simple mobile nav, no dropdown for now
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'text-lg font-medium transition-colors hover:text-foreground/80',
                        pathname === link.href ? 'text-foreground' : 'text-foreground/60'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto px-4">
                  <Button asChild className="w-full" onClick={() => setIsOpen(false)}>
                     <Link href="/contact">Get a Quote</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

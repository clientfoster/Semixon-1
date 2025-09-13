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
          { href: '/services/analog-and-mixed-signal', label: 'Analog and mixed-signal' },
          { href: '/services/ate', label: 'ATE' },
          { href: '/services/bench-characterization', label: 'Bench characterization' },
          { href: '/services/design-verification', label: 'Design verification' },
          { href: '/services/dft', label: 'DFT' },
          { href: '/services/fpga-design', label: 'FPGA design' },
          { href: '/services/in-house-silicon-validation-lab', label: 'In-house silicon validation lab' },
          { href: '/services/physical-design', label: 'Physical design' },
          { href: '/services/prototyping-and-emulation', label: 'Prototyping and Emulation' },
        ],
      },
      {
        heading: 'Embedded',
        items: [
          { href: '/services/bare-metal-programming', label: 'Bare metal programming' },
          { href: '/services/board-support-package', label: 'Board support package' },
          { href: '/services/ci-cd', label: 'CI/CD' },
          { href: '/services/device-drivers', label: 'Device drivers' },
          { href: '/services/diagnostics', label: 'Diagnostics' },
          { href: '/services/os-porting-and-customization', label: 'OS porting and customization' },
          { href: '/services/cyber-security', label: 'Cyber security' },
          { href: '/services/verification-and-validation', label: 'Verification and validation' },
        ],
      },
      {
        heading: 'Software',
        items: [
          { href: '/services/data-analytics-ai-and-machine-learning', label: 'Data Analytics, AI and Machine Learning' },
          { href: '/services/cloud-architecture-and-engineering', label: 'Cloud Architecture and Engineering' },
          { href: '/services/salesforce-implementation-and-support', label: 'Salesforce Implementation and Support' },
          { href: '/services/application-development-and-maintenance', label: 'Application Development and Maintenance' },
          { href: '/services/quality-assurance', label: 'Quality Assurance' },
          { href: '/services/it-infrastructure', label: 'IT Infrastructure' },
          { href: '/services/engineering-and-technical-services', label: 'Engineering and Technical Services' },
        ],
      }
    ]
  },
  { 
    href: '/industries',
    label: 'Industries',
    dropdown: [
      {
        items: [
          { href: '/industries/semiconductor', label: 'Semiconductor' },
          { href: '/industries/bfsi', label: 'BFSI' },
          { href: '/industries/insurance', label: 'Insurance' },
          { href: '/industries/retail', label: 'Retail' },
          { href: '/industries/automotive', label: 'Automotive' },
          { href: '/industries/telecom-and-network', label: 'Telecom and Network' },
        ]
      }
    ]
  },
  { href: '/contact', label: 'Contact' },
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
            <Logo className="h-8 w-auto" />
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
                <DropdownMenuContent className={cn("p-4", link.label === 'Services' ? "w-[50rem]" : "w-56")}>
                  {link.label === 'Services' ? (
                     <div className="grid grid-cols-3 gap-8">
                      {link.dropdown.map(group => (
                        <DropdownMenuGroup key={group.heading} className="flex flex-col gap-2">
                          <DropdownMenuLabel className="p-0 mb-1 font-semibold text-base">{group.heading}</DropdownMenuLabel>
                          {group.items.map(item => (
                            <DropdownMenuItem key={item.href} asChild>
                              <Link href={item.href}>{item.label}</Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuGroup>
                      ))}
                    </div>
                  ) : (
                     <DropdownMenuGroup>
                      {link.dropdown[0].items.map(item => (
                        <DropdownMenuItem key={item.href} asChild>
                          <Link href={item.href}>{item.label}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  )}
                   <DropdownMenuSeparator className="my-4" />
                    <DropdownMenuItem asChild>
                      <Link href={link.href} className="font-semibold focus:bg-accent">{`View All ${link.label}`}</Link>
                    </DropdownMenuItem>
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
                    <Logo className="h-8 w-auto" />
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

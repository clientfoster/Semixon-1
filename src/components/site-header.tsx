'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronDown } from 'lucide-react';
import { Logo } from './icons';
import { ThemeSwitcher } from './theme-switcher';
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
          { href: '/services/web-development', label: 'Web Development' },
          { href: '/services/quality-assurance', label: 'Quality Assurance' },
          { href: '/services/it-infrastructure', label: 'IT Infrastructure' },
          { href: '/services/engineering-and-technical-services', label: 'Engineering and Technical Services' },
        ],
      },
      {
        heading: 'Digital Marketing',
        items: [
          { href: '/services/digital-marketing', label: 'Digital Marketing' },
          { href: '/services/content-writing', label: 'Content Writing' },
          { href: '/services/branding-design', label: 'Branding & Design' },
          { href: '/services/quick-services', label: 'Quick Services' },
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
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const handleMouseEnter = (dropdownName: string) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set a new timeout for 0.3 seconds
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(dropdownName);
    }, 300);
  };

  const handleMouseLeave = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Don't close on mouse leave - keep dropdown open
    // Only close when clicking outside or on a different dropdown
  };

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg p-1 animate-glow-pulse">
                <Logo className="h-6 w-6 group-hover:animate-wiggle" />
              </div>
              <span className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">Semixion</span>
            </Link>
          </div>
          
          {/* Centered Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 text-base font-medium">
            {navLinks.map((link) => (
              link.dropdown ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <DropdownMenu open={openDropdown === link.label} onOpenChange={(open) => {
                    // Only close if explicitly closed (clicking outside or pressing escape)
                    if (!open) {
                      setOpenDropdown(null);
                    }
                  }}>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className={cn(
                          "flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 focus-visible:ring-0 font-medium text-base",
                          pathname.startsWith(link.href) ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600'
                        )}
                        onClick={() => {
                          // Navigate to the main page when clicked
                          window.location.href = link.href;
                        }}
                      >
                        {link.label}
                        <ChevronDown className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      className={cn("p-6 shadow-xl border border-slate-200 bg-white rounded-xl", link.label === 'Services' ? "w-[60rem]" : "w-64")}
                    >
                      {link.label === 'Services' ? (
                         <div className="grid grid-cols-4 gap-6">
                          {link.dropdown.map((group, index) => (
                            <DropdownMenuGroup key={'heading' in group ? group.heading : `group-${index}`} className="flex flex-col gap-3">
                              {'heading' in group && group.heading && (
                                <DropdownMenuLabel className="p-0 mb-2 text-lg font-bold text-slate-900">{group.heading}</DropdownMenuLabel>
                              )}
                              {group.items.map(item => (
                                <DropdownMenuItem key={item.href} asChild className="p-0">
                                  <Link 
                                    href={item.href} 
                                    className="block px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 text-slate-600 hover:text-blue-600"
                                  >
                                    {item.label}
                                  </Link>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuGroup>
                          ))}
                        </div>
                      ) : (
                         <DropdownMenuGroup>
                          {link.dropdown[0].items.map(item => (
                            <DropdownMenuItem key={item.href} asChild className="p-0">
                              <Link href={item.href} className="block px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 text-slate-600 hover:text-blue-600">{item.label}</Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuGroup>
                      )}
                       <DropdownMenuSeparator className="my-6 bg-slate-200" />
                        <DropdownMenuItem asChild className="p-0">
                          <Link href={link.href} className="block px-3 py-2 rounded-lg font-semibold text-blue-600 hover:bg-blue-50 transition-colors duration-200">{`View All ${link.label}`}</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 font-medium text-base',
                    pathname === link.href ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600'
                  )}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>
          
          {/* Theme Switcher */}
          <div className="flex items-center space-x-2">
            <ThemeSwitcher />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-slate-600 hover:bg-blue-50 hover:text-blue-600">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-white border-r border-slate-200">
                <div className="flex flex-col h-full py-6">
                  <div className="px-4 pb-6 border-b border-slate-200">
                    <Link href="/" className="flex items-center space-x-3" onClick={() => setIsOpen(false)}>
                      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center p-1">
                        <Logo className="h-6 w-6" />
                      </div>
                      <span className="text-2xl font-bold text-slate-900">Semixion</span>
                    </Link>
                  </div>
                  <nav className="flex flex-col items-start space-y-2 mt-8 px-4 flex-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'w-full px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:bg-blue-50 hover:text-blue-600',
                          pathname === link.href ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600'
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto px-4 pt-6 border-t border-slate-200">
                    <div className="flex justify-center">
                      <ThemeSwitcher />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
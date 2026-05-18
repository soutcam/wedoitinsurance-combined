import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  const navItems = [
    { label: "Home", href: "/" },
    { label: "HETHAVERSE", href: "/hethaverse" },
    // Home-page anchor scrolls
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Resources", href: "#resources" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 font-bold text-2xl text-blue-600 hover:text-blue-700">
              WEDOIT Insurance
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isAnchor = item.href.startsWith("#");
              const active = !isAnchor && isActive(item.href);

              if (isAnchor) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`font-medium transition-colors ${
                      active ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <Link key={item.href} href={item.href}>
                  <a
                    className={`font-medium transition-colors ${
                      active
                        ? "text-blue-600"
                        : "text-slate-700 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </a>
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <a href="https://calendly.com/wedoit2024/60min" target="_blank" rel="noopener noreferrer">
                Book a Free Policy Review
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-slate-200">
            <div className="flex flex-col gap-2 pt-4">
              {navItems.map((item) => {
                const isAnchor = item.href.startsWith("#");
                const active = !isAnchor && isActive(item.href);

                const className = `block px-4 py-2 rounded font-medium transition-colors ${
                  active ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
                }`;

                if (isAnchor) {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={className}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  );
                }

                return (
                  <Link key={item.href} href={item.href}>
                    <a
                      className={className}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  </Link>
                );
              })}
              <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-2" asChild>
                <a href="https://calendly.com/wedoit2024/60min" target="_blank" rel="noopener noreferrer">
                  Book a Free Policy Review
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

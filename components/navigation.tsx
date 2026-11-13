'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { categories } from '@/lib/cars-data'

const WHATSAPP_NUMBER = '260977844509'
const FALLBACK_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank', 'noopener,noreferrer')
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-fit transition-all duration-500 pointer-events-none ${scrolled || isMobileMenuOpen ? 'glass py-2' : 'bg-transparent py-3 sm:py-4'}`}>
      <div className="container mx-auto px-3 sm:px-4 pointer-events-auto">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="group flex items-center shrink-0" aria-label="ALIFARIS Auto home">
            <Image
              src="/assets/alifaris-logo.png"
              alt="ALIFARIS Auto"
              width={512}
              height={288}
              priority
              className="h-9 w-auto object-contain transition-transform group-hover:scale-105 sm:h-10 md:h-12 lg:h-16"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            <Link 
              href="/" 
              className="relative text-sm font-semibold text-foreground/90 hover:text-primary transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
            >
              Home
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-semibold text-foreground/90 hover:text-primary transition-all duration-300 outline-none">
                Inventory <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass border-border/50 mt-2">
                <DropdownMenuItem asChild>
                  <Link href="/inventory" className="cursor-pointer font-medium">
                    All Vehicles
                  </Link>
                </DropdownMenuItem>
                <div className="h-px bg-border/50 my-1" />
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link 
                      href={`/inventory?category=${category.id}`}
                      className="cursor-pointer"
                    >
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link 
              href="/about" 
              className="relative text-sm font-semibold text-foreground/90 hover:text-primary transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
            >
              About
            </Link>
            
            <Link 
              href="/contact" 
              className="relative text-sm font-semibold text-foreground/90 hover:text-primary transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
            >
              Contact
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button 
              asChild
              className="hidden md:flex items-center gap-2 bg-[#25D366] px-6 font-semibold text-white animate-pulse-glow rounded-full hover:bg-[#128C7E]"
            >
              <a 
                href={FALLBACK_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </Button>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden rounded-md p-2.5 text-foreground transition-colors hover:text-primary min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 max-h-[calc(100vh-10rem)] overflow-y-auto rounded-2xl border border-border/70 bg-background/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl animate-fade-in-up">
            <div className="flex flex-col gap-1">
              <Link 
                href="/" 
                className="text-sm font-semibold text-foreground/90 hover:text-primary hover:bg-primary/5 transition-all px-4 py-3.5 rounded-lg min-h-[44px] flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              <Link 
                href="/inventory" 
                className="text-sm font-semibold text-foreground/90 hover:text-primary hover:bg-primary/5 transition-all px-4 py-3.5 rounded-lg min-h-[44px] flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Inventory
              </Link>

              <div className="pl-4 flex flex-col gap-1 border-l-2 border-primary/30 ml-4 my-2">
                {categories.map((category) => (
                  <Link 
                    key={category.id}
                    href={`/inventory?category=${category.id}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors py-3 px-3 min-h-[44px] flex items-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              
              <Link 
                href="/about" 
                className="text-sm font-semibold text-foreground/90 hover:text-primary hover:bg-primary/5 transition-all px-4 py-3.5 rounded-lg min-h-[44px] flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              
              <Link 
                href="/contact" 
                className="text-sm font-semibold text-foreground/90 hover:text-primary hover:bg-primary/5 transition-all px-4 py-3.5 rounded-lg min-h-[44px] flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>

              <Button 
                asChild
                className="mt-4 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold rounded-full min-h-[48px]"
              >
                <a 
                  href={FALLBACK_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

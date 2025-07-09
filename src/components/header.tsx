import Link from "next/link";
import CartIcon from "./cart-icon";
import CurrencySelector from "./currency-selector";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-headline tracking-widest text-foreground hover:text-primary transition-colors">
              diwanar
            </Link>
          </div>
          <nav className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className="font-headline text-sm uppercase tracking-wider text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/perfumes" className="font-headline text-sm uppercase tracking-wider text-foreground hover:text-primary transition-colors">
              Perfumes
            </Link>
            <Link href="/about" className="font-headline text-sm uppercase tracking-wider text-foreground hover:text-primary transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <CurrencySelector />
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

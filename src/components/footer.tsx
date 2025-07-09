import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-xl font-headline tracking-widest text-foreground">
              diwanar
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">Luxury Perfumes</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-4 text-sm font-headline uppercase tracking-wider">Support</h2>
              <ul className="text-muted-foreground space-y-2">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">Shipping &amp; Returns</Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-headline uppercase tracking-wider">Legal</h2>
              <ul className="text-muted-foreground space-y-2">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">Terms &amp; Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} diwanar. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useAppContext } from "@/context/app-provider";
import { useEffect, useState } from "react";

const CartIcon = () => {
  const { state } = useAppContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const itemCount = isClient ? state.cart.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <Link href="/cart" className="relative text-foreground hover:text-primary transition-colors">
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;

'use client';

import { useAppContext } from '@/context/app-provider';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Minus, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CartPage() {
  const { state, dispatch } = useAppContext();
  const { toast } = useToast();

  const handleUpdateQuantity = (perfumeId: string, newQuantity: number) => {
    const quantity = Math.max(0, newQuantity);
    dispatch({ type: 'UPDATE_QUANTITY', payload: { perfumeId, quantity } });
  };

  const handleRemoveItem = (perfumeId: string, perfumeName: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { perfumeId } });
    toast({
      title: 'Item Removed',
      description: `${perfumeName} has been removed from your cart.`,
      variant: 'destructive',
    });
  };

  const currencySymbol = state.currency === 'GBP' ? '£' : '€';
  const subtotal = state.cart.reduce(
    (acc, item) => acc + item.perfume.price[state.currency] * item.quantity,
    0
  );

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extralight tracking-tight sm:text-5xl">
          Shopping Cart
        </h1>
      </div>

      {state.cart.length === 0 ? (
        <div className="text-center py-16 border border-dashed rounded-md">
          <p className="text-muted-foreground mb-4">Your cart is empty.</p>
          <Button asChild>
            <Link href="/perfumes">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          <div className="lg:col-span-2 space-y-4">
            {state.cart.map(({ perfume, quantity }) => (
              <div key={perfume.id} className="flex items-center gap-4 border-b pb-4">
                <div className="w-24 h-36 bg-gray-100 flex-shrink-0">
                    <Image
                    src={perfume.image}
                    alt={perfume.name}
                    width={100}
                    height={150}
                    data-ai-hint="perfume bottle"
                    className="w-full h-full object-cover object-center"
                    />
                </div>
                <div className="flex-grow">
                  <Link href={`/perfumes/${perfume.id}`}>
                    <h2 className="text-lg font-headline tracking-wider hover:text-primary">{perfume.name}</h2>
                  </Link>
                  <p className="text-sm text-muted-foreground">{currencySymbol}{perfume.price[state.currency]}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleUpdateQuantity(perfume.id, quantity - 1)}><Minus className="h-4 w-4" /></Button>
                    <Input type="number" value={quantity} readOnly className="w-12 h-8 text-center" />
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleUpdateQuantity(perfume.id, quantity + 1)}><Plus className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{currencySymbol}{(perfume.price[state.currency] * quantity).toFixed(2)}</p>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive mt-2" onClick={() => handleRemoveItem(perfume.id, perfume.name)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="border p-6 space-y-4 sticky top-24">
              <h2 className="text-2xl font-headline tracking-wider">Summary</h2>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{currencySymbol}{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{currencySymbol}{subtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Shipping &amp; taxes calculated at checkout.</p>
              <Button size="lg" className="w-full" asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

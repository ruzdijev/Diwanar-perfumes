'use client';

import { useState } from 'react';
import { useAppContext } from '@/context/app-provider';
import type { Perfume } from '@/lib/perfumes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"

type AddToCartFormProps = {
  perfume: Perfume;
};

const AddToCartForm = ({ perfume }: AddToCartFormProps) => {
  const { state, dispatch } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast()

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { perfume, quantity } });
    toast({
      title: "Added to cart",
      description: `${quantity} x ${perfume.name} has been added to your cart.`,
    })
  };

  const currencySymbol = state.currency === 'GBP' ? '£' : '€';
  const price = perfume.price[state.currency];

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="text-white border-white/50 hover:bg-white hover:text-black"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
          className="w-16 text-center bg-transparent text-white border-white/50 focus-visible:ring-primary"
          min="1"
        />
        <Button
          variant="outline"
          size="icon"
          className="text-white border-white/50 hover:bg-white hover:text-black"
          onClick={() => setQuantity(quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button
        size="lg"
        onClick={handleAddToCart}
        className="flex-grow bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
      >
        Add to Cart - {currencySymbol}{price * quantity}
      </Button>
    </div>
  );
};

export default AddToCartForm;

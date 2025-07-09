"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context/app-provider";
import { useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email(),
  country: z.enum(["United Kingdom", "Germany", "France", "Spain", "Italy"]),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  shippingMethod: z.enum(["Standard UK", "Express EU"]),
  cardName: z.string().min(1, "Name on card is required"),
  cardNumber: z.string().min(16).max(16),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Invalid expiry date"),
  cardCVC: z.string().min(3).max(4),
});

type CheckoutFormValues = z.infer<typeof formSchema>;

const shippingCosts = {
    'Standard UK': { GBP: 5, EUR: 6 },
    'Express EU': { GBP: 15, EUR: 18 }
}

export default function CheckoutForm() {
  const { state, dispatch } = useAppContext();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: "",
        country: "United Kingdom",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        shippingMethod: "Standard UK",
        cardName: "",
        cardNumber: "",
        cardExpiry: "",
        cardCVC: "",
    },
  });

  const currencySymbol = state.currency === 'GBP' ? '£' : '€';
  const subtotal = useMemo(() => state.cart.reduce(
    (acc, item) => acc + item.perfume.price[state.currency] * item.quantity,
    0
  ), [state.cart, state.currency]);

  const selectedShippingMethod = form.watch("shippingMethod");
  const shippingCost = useMemo(() => {
      return shippingCosts[selectedShippingMethod][state.currency]
  }, [selectedShippingMethod, state.currency]);

  const total = subtotal + shippingCost;
  
  const onSubmit = (data: CheckoutFormValues) => {
    console.log(data);
    toast({
        title: "Order Placed!",
        description: "Thank you for your purchase. A confirmation has been sent to your email.",
    });
    dispatch({ type: 'CLEAR_CART' });
    router.push('/');
  }

  if (state.cart.length === 0) {
    return (
        <div className="text-center py-16 border border-dashed rounded-md">
            <p className="text-muted-foreground mb-4">Your cart is empty. Add items to proceed to checkout.</p>
            <Button onClick={() => router.push('/perfumes')}>Continue Shopping</Button>
        </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                    <h2 className="text-2xl font-headline tracking-wider">Contact Information</h2>
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="me@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                
                <div className="space-y-4">
                    <h2 className="text-2xl font-headline tracking-wider">Shipping Address</h2>
                    <FormField control={form.control} name="country" render={({ field }) => (
                        <FormItem><FormLabel>Country</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a country" /></SelectTrigger></FormControl><SelectContent><SelectItem value="United Kingdom">United Kingdom</SelectItem><SelectItem value="Germany">Germany</SelectItem><SelectItem value="France">France</SelectItem><SelectItem value="Spain">Spain</SelectItem><SelectItem value="Italy">Italy</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                    )} />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="firstName" render={({ field }) => (
                            <FormItem><FormLabel>First Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="lastName" render={({ field }) => (
                            <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                    <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="city" render={({ field }) => (
                            <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="postalCode" render={({ field }) => (
                            <FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-headline tracking-wider">Shipping Method</h2>
                    <FormField control={form.control} name="shippingMethod" render={({ field }) => (
                        <FormItem><FormLabel>Method</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a shipping method" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Standard UK">Standard UK ({currencySymbol}{shippingCosts['Standard UK'][state.currency]})</SelectItem><SelectItem value="Express EU">Express EU ({currencySymbol}{shippingCosts['Express EU'][state.currency]})</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                    )} />
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-headline tracking-wider">Payment</h2>
                    <p className="text-sm text-muted-foreground">All transactions are secure and encrypted.</p>
                     <FormField control={form.control} name="cardName" render={({ field }) => (
                        <FormItem><FormLabel>Name on card</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="cardNumber" render={({ field }) => (
                        <FormItem><FormLabel>Card number</FormLabel><FormControl><Input placeholder="---- ---- ---- ----" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="cardExpiry" render={({ field }) => (
                            <FormItem><FormLabel>Expiry (MM/YY)</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="cardCVC" render={({ field }) => (
                            <FormItem><FormLabel>CVC</FormLabel><FormControl><Input placeholder="---" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                </div>

                <Button type="submit" size="lg" className="w-full">Pay {currencySymbol}{total.toFixed(2)}</Button>
            </form>
            </Form>
        </div>
        <div className="lg:border-l lg:pl-8">
            <div className="space-y-4 sticky top-24">
                <h2 className="text-2xl font-headline tracking-wider">Order Summary</h2>
                {state.cart.map(({perfume, quantity}) => (
                    <div key={perfume.id} className="flex items-center gap-4">
                         <div className="w-16 h-24 bg-gray-100 flex-shrink-0 relative">
                            <Image src={perfume.image} alt={perfume.name} fill className="object-cover" />
                            <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs text-foreground">{quantity}</span>
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold">{perfume.name}</p>
                        </div>
                        <p>{currencySymbol}{(perfume.price[state.currency] * quantity).toFixed(2)}</p>
                    </div>
                ))}
                <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>{currencySymbol}{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span>{currencySymbol}{shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                        <span>Total</span>
                        <span>{currencySymbol}{total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

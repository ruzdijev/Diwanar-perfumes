import CheckoutForm from "@/components/checkout-form";

export default function CheckoutPage() {
    return (
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extralight tracking-tight sm:text-5xl">
                    Checkout
                </h1>
            </div>
            <CheckoutForm />
        </div>
    )
}

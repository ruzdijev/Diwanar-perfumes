import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extralight tracking-tight sm:text-5xl">
            The Essence of diwanar
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A symphony of scent, a testament to modern luxury.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 text-foreground/90">
            <p className="text-lg leading-relaxed">
              diwanar was born from a singular vision: to redefine luxury perfumery for the modern connoisseur. We believe that a fragrance is not merely a scent, but an invisible signature, an intimate expression of self. Our philosophy is rooted in a minimalist aesthetic, where purity of form and clarity of scent converge.
            </p>
            <p className="leading-relaxed">
              We source the world's most exquisite raw materials, from the sun-drenched fields of Grasse to the ancient forests of the East. Each ingredient is chosen for its character and soul. Our master perfumers, artisans of olfaction, then compose these elements with audacious simplicity, creating fragrances that are both timeless and contemporary.
            </p>
            <p className="leading-relaxed">
              Our commitment to craftsmanship extends to our presentation. Each bottle is a work of art, designed to be as beautiful to behold as the fragrance is to wear. At diwanar, we invite you on a journey of sensory discovery, to find the scent that tells your story.
            </p>
          </div>
          <div>
            <Image
              src="https://placehold.co/800x1000.png"
              alt="Artistic shot of perfume ingredients"
              data-ai-hint="perfume ingredients"
              width={800}
              height={1000}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

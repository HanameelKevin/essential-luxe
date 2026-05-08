import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-light text-black mb-4">Curated Excellence</h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-12">
          Hand-selected electronics and luxury imports, tailored for those who settle for nothing less than the best.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto">
          {['Phones', 'Laptops', 'Luxury Goods'].map((cat) => (
            <div key={cat} className="group cursor-pointer overflow-hidden rounded-2xl bg-gray-50 p-8 transition-all hover:bg-white hover:shadow-xl border border-transparent hover:border-gold/30">
              <div className="h-48 w-full bg-gray-200 rounded-xl mb-6 group-hover:scale-105 transition-transform duration-500" />
              <h3 className="text-xl font-medium text-black">{cat}</h3>
              <p className="text-gray-400 text-sm mt-2">Discover the range</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

import Image from 'next/image';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sophie Martin',
    role: 'Cliente depuis 2 ans',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    rating: 5,
    text: 'Service impeccable ! La collecte le lundi est super pratique et mes vêtements reviennent toujours parfaitement propres et repassés. Je recommande vivement !',
  },
  {
    name: 'Thomas Dubois',
    role: 'Client Premium',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    rating: 5,
    text: 'Excellent rapport qualité-prix. L\'équipe est professionnelle et le suivi par QR code est génial. Plus jamais sans C\'Propre !',
  },
  {
    name: 'Marie Leroy',
    role: 'Cliente Confort',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    rating: 5,
    text: 'Je gagne un temps fou ! Le service de collecte à domicile change vraiment la vie. Et la qualité du pressing est au top.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 px-4">
            Ils nous font confiance
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Découvrez les avis de nos clients satisfaits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-gray-700 italic leading-relaxed">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center gap-2 bg-white px-12 py-6 rounded-2xl shadow-lg">
            <div className="text-4xl font-bold text-primary-600">4.9/5</div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export type PricingOption = {
  id: number
  label?: string
  salonPrice: number
  homePrice?: number
}

export type Service = {
  _id: string
  name: string
  category: string
  description: string
  duration: number
  salonPrice: number
  homePrice: number | null
  image: string
  popular: boolean
  homeServiceAvailable: boolean
  isActive: boolean
  options: PricingOption[]
}

const images = {
  hair: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=85',
  color: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=85',
  nails: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85',
  spa: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85',
  waxing: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=900&q=85',
  skin: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=900&q=85',
  makeup: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=85',
}

let nextId = 1
const make = (
  category: string,
  name: string,
  salonPrice: number,
  description: string,
  image: string,
  options?: PricingOption[],
  popular = false,
): Service => ({
  id: nextId++,
  name,
  category,
  description,
  salonPrice,
  image,
  options,
  popular,
})

export const services: Service[] = [
  // HAIR SERVICES
  make('Hair Services', 'Hair Wash', 300, 'Gentle shampoo & conditioning. Fresh & clean feel.', images.hair),
  make('Hair Services', 'Hair Dryer', 500, 'Professional blow dry finish. Perfect volume & shine.', images.hair),
  make('Hair Services', 'Hair Wash + Dryer', 600, 'Wash + dry combo package.', images.hair, undefined, true),
  make('Hair Services', 'Hair Cut', 800, 'Classic precision cut. Neat & stylish look.', images.hair),
  make('Hair Services', 'Hair Cut Advance', 1000, 'Trendy layers & texturizing with professional styling.', images.hair),
  make('Hair Services', 'Hair Styling', 800, 'Party, curling or straightening with long-lasting hold.', images.hair),

  // COLOR SERVICES
  make('Color Services', 'Global Hair Color', 1399, 'Basic global colour application with even coverage.', images.color),
  make('Color Services', 'With Ammonia', 1599, 'Long-lasting intense colour with full grey coverage.', images.color),
  make('Color Services', 'Ammonia Free', 1800, 'No damage, no smell. Safe for sensitive scalp.', images.color),
  make('Color Services', 'Touch-up Ammonia', 700, 'Roots retouch only for approximately one month of regrowth.', images.color),
  make('Color Services', 'Touch-up Ammonia Free', 900, 'Gentle root touch-up with no irritation.', images.color),
  make('Color Services', 'Color Toning', 1800, 'Colour refresh and shine boost. Fades yellowish tones.', images.color),
  make('Color Services', 'Balayage', 3499, 'Hand-painted natural highlights for a trendy sun-kissed look.', images.color),
  make('Color Services', 'French Balayage', 3999, 'Premium French technique with a soft blended finish.', images.color),
  make('Color Services', 'Global Hair Color (Fashion Shade)', 3000, 'Trendy shades with wash included.', images.color),
  make('Color Services', 'Highlights', 3999, 'Full head highlights with base colour.', images.color),
  make('Color Services', 'Highlight One Strip', 199, 'Single bold strip highlight for a fashion statement.', images.color),
  make('Color Services', 'Ombre Hair Color', 4500, 'Dark-to-light gradual shade with a stylish gradient effect.', images.color),

  // NAIL ART
  make('Nail Art', 'Gel Nails', 399, 'Natural nails with gel polish. High shine & long lasting.', images.nails),
  make('Nail Art', 'Extensions', 799, 'Artificial nail extension. Short / Medium length.', images.nails, [
    { id: 1, label: 'Short', salonPrice: 799 },
    { id: 2, label: 'Medium', salonPrice: 1199 },
  ]),
  make('Nail Art', 'Acrylic Nails', 2000, 'Strong acrylic extension with design & art.', images.nails, [
    { id: 1, label: 'Standard', salonPrice: 2000 },
    { id: 2, label: 'Premium', salonPrice: 2500 },
  ]),
  make('Nail Art', 'Feet Nails Gel', 2000, 'Toenails gel application with cleaning & polish.', images.nails, [
    { id: 1, label: 'Standard', salonPrice: 2000 },
    { id: 2, label: 'Premium', salonPrice: 2500 },
  ]),
  make('Nail Art', 'Feet Nails Extension', 500, 'Single toe / full feet touch-up with gel finish.', images.nails),

  // MANICURE / PEDICURE
  make('Manicure - Pedicure', 'Manicure', 500, 'Basic hand cleaning & shaping with lotion massage.', images.spa),
  make('Manicure - Pedicure', 'Pedicure', 500, 'Foot cleaning & nail cut with scrub & massage.', images.spa),
  make('Manicure - Pedicure', 'Manicure Spa', 1199, 'Luxury spa manicure with deep moisturizing & massage.', images.spa),
  make('Manicure - Pedicure', 'Pedicure Spa', 1499, 'Premium foot spa with dead skin removal & relaxation.', images.spa),
  make('Manicure - Pedicure', 'Foot Reflexology', 2499, 'Pressure point foot therapy for full relaxation & pain relief.', images.spa),

  // THREADING
  make('Threading', 'Eyebrow', 50, 'Perfect shape threading. Neat & clean finish.', images.skin),
  make('Threading', 'Forehead', 25, 'Forehead hair removal for smooth skin.', images.skin),
  make('Threading', 'Upper Lips', 25, 'Quick and painless threading with an instant glow.', images.skin),
  make('Threading', 'Full Face', 150, 'Complete face threading for a clean and fresh look.', images.skin),

  // WAXING
  make('Waxing', 'Face', 300, 'Gentle face wax for smooth & clear skin.', images.waxing),
  make('Waxing', 'Hand', 300, 'Full hand waxing for a soft & clean finish.', images.waxing),
  make('Waxing', 'Half Legs', 300, 'Below-knee waxing. Quick & neat.', images.waxing),
  make('Waxing', 'Full Legs', 500, 'Complete leg wax with long-lasting smoothness.', images.waxing),
  make('Waxing', 'Under Arms', 100, 'Quick underarm wax for a fresh feel.', images.waxing),
  make('Waxing', 'Half Back', 300, 'Upper or lower back wax for a clean look.', images.waxing),
  make('Waxing', 'Full Back', 400, 'Complete back waxing with a smooth finish.', images.waxing),
  make('Waxing', 'Stomach', 400, 'Stomach area wax for a neat & tidy finish.', images.waxing),
  make('Waxing', 'Bikini Waxing', 1500, 'Premium hygiene wax with extra care.', images.waxing),
  make('Waxing', 'Full Body', 2000, 'Full body waxing package.', images.waxing, undefined, true),

  // BRAZILIAN WAX
  make('Brazilian Wax', 'Face', 400, 'Premium face waxing with long-lasting smooth skin.', images.waxing),
  make('Brazilian Wax', 'Under Arms', 150, 'Gentle Brazilian underarm waxing.', images.waxing),
  make('Brazilian Wax', 'Upper Lips', 50, 'Quick upper lip wax. Neat & painless.', images.waxing),
  make('Brazilian Wax', 'Cheeks', 50, 'Cheek area waxing for a smooth glow.', images.waxing),
  make('Brazilian Wax', 'Chin', 50, 'Chin hair removal with a clean finish.', images.waxing),
  make('Brazilian Wax', 'Neck', 100, 'Neck area waxing for soft & clear skin.', images.waxing),

  // LIPO WAX
  make('Lipo Wax', 'Full Hand', 400, 'Premium lipo wax with a less-pain smooth finish.', images.waxing),
  make('Lipo Wax', 'Half Legs', 500, 'Below-knee lipo wax. Quick & gentle.', images.waxing),
  make('Lipo Wax', 'Full Legs', 1000, 'Complete leg lipo wax with long-lasting smoothness.', images.waxing),
  make('Lipo Wax', 'Half Back', 400, 'Upper or lower back lipo wax.', images.waxing),
  make('Lipo Wax', 'Full Back', 600, 'Full back lipo wax for a smooth look.', images.waxing),
  make('Lipo Wax', 'Under Arms', 150, 'Underarm lipo wax for soft & fresh skin.', images.waxing),
  make('Lipo Wax', 'Stomach', 550, 'Stomach area lipo wax with a clean finish.', images.waxing),
  make('Lipo Wax', 'Full Body', 3500, 'Full body lipo wax package.', images.waxing, undefined, true),

  // HAIR CARE
  make('Hair Care Services', 'Hair Spa', 1000, 'Deep nourishing hair spa for smooth & shiny hair.', images.hair),
  make('Hair Care Services', 'Moroccan Deep Spa', 1299, 'Premium Moroccan spa with intense hydration care.', images.hair),
  make('Hair Care Services', 'Repairs Treatment', 2000, 'Damage repair treatment for strong & healthy hair.', images.hair),
  make('Hair Care Services', 'Protein Hair Spa Advance', 1500, 'Advance protein spa for deep strength & shine.', images.hair),
  make('Hair Care Services', 'Head Massage', 600, 'Relaxing head massage for stress relief.', images.spa),
  make('Hair Care Services', 'Head Massage + Wash', 1500, 'Massage with hair wash for a fresh & relaxed feel.', images.hair),

  // HAIR TEXTURE
  make('Hair Texture Services', 'Smoothing', 3000, 'Long-lasting smooth finish. Frizz-free silky hair.', images.hair),
  make('Hair Texture Services', 'Protein Treatment', 4000, 'Deep protein nourishment for strong & smooth hair.', images.hair),
  make('Hair Texture Services', 'Smooth Therapy', 4000, 'Advanced smooth therapy for soft & manageable hair.', images.hair),
  make('Hair Texture Services', 'Flora Active', 3500, 'Flora active treatment for a healthy & shiny look.', images.hair),
  make('Hair Texture Services', 'Keratin Treatment', 3500, 'Keratin repair therapy for straight & glossy hair.', images.hair),
  make('Hair Texture Services', 'Rebounding', 5000, 'Permanent rebounding for a sleek straight finish.', images.hair),
  make('Hair Texture Services', 'Hair Perming', 8000, 'Stylish perming curls with long-lasting results.', images.hair),
  make('Hair Texture Services', 'Hair Botox Treatment', 4500, 'Botox hair repair and deep rejuvenation.', images.hair),
  make('Hair Texture Services', 'Nanoplastia Treatment', 4999, 'Premium nanoplastia care for ultimate straightness & shine.', images.hair),
  make('Hair Texture Services', 'Straightening', 3499, 'Classic hair straightening for a smooth sleek look.', images.hair),
  make('Hair Texture Services', 'Elastin Treatment', 4500, 'Elastin protein therapy for elasticity & bounce.', images.hair),
  make('Hair Texture Services', 'Collagen Protein Treatment', 4000, 'Collagen protein boost for strength & repair.', images.hair),

  // D-TAN & BLEACH
  make('D-Tan & Bleach', 'Face', 400, 'Face D-tan & bleach for bright and glowing skin.', images.skin),
  make('D-Tan & Bleach', 'Back Half', 200, 'Half back de-tan for a clean & clear finish.', images.skin),
  make('D-Tan & Bleach', 'Full Half', 300, 'Full half de-tan for an even tone finish.', images.skin),
  make('D-Tan & Bleach', 'Hands', 300, 'Hand de-tan bleach for soft & bright hands.', images.skin),
  make('D-Tan & Bleach', 'Half Legs', 350, 'Half legs de-tan for smooth & glowing skin.', images.skin),
  make('D-Tan & Bleach', 'Stomach', 200, 'Stomach de-tan for a neat & clean finish.', images.skin),
  make('D-Tan & Bleach', 'Full Body', 2500, 'Full body de-tan package.', images.skin, undefined, true),

  // SKIN SERVICES
  make('Skin Services', 'Basic Clean-Up', 700, 'Deep cleansing for fresh & glowing skin.', images.skin),
  make('Skin Services', 'Advance Clean-Up', 1000, 'Advance cleansing care for a bright & clear look.', images.skin),
  make('Skin Services', 'Premium Clean-Up', 1200, 'Premium clean-up for an ultimate glow.', images.skin),
  make('Skin Services', 'Basic Facial', 1500, 'Nourishing facial for soft & radiant skin.', images.skin),
  make('Skin Services', 'Advance Facial', 2000, 'Advance glow facial with deep hydration.', images.skin),
  make('Skin Services', 'Premium Facial', 2500, 'Luxury premium facial for the best glow.', images.skin, undefined, true),
  make('Skin Services', 'Basic Treatment', 2000, 'Skin repair treatment for healthy & fresh skin.', images.skin),
  make('Skin Services', 'Advance Treatment', 3000, 'Advance skin therapy for a clear & bright look.', images.skin),
  make('Skin Services', 'Premium Treatment', 3500, 'Premium skin treatment for complete rejuvenation.', images.skin),

  // SLIDER PACKAGES / MAKEUP
  make('Slider Packages', 'Basic Makeup - Saree Draping', 1500, 'Basic hair style (open, bun). Simple & elegant look.', images.makeup),
  make('Slider Packages', 'Makeup - Hair Style - Draping', 2000, 'M - PAC, Just Gold, Recod. H - Open Hair Curls, Bun. Party ready glam.', images.makeup),
  make('Slider Packages', 'Makeup - Hair Style - Draping - Lashes', 3000, 'HD make-up with hair variation and extension. HD glam look.', images.makeup),
  make('Slider Packages', 'Makeup - Hair Style - Draping - Lashes', 4000, 'Nars / Huda makeup with trending hairstyle and extension.', images.makeup),
  make('Slider Packages', 'Makeup - Hair Style - Draping - Lashes & Lens', 5000, 'Estee Lauder / Charlotte Tilbury. Advance hairstyle with fresh flower. Best bridal look.', images.makeup, undefined, true),

  // HAIR CUT SERVICES
  make('Hair Cut Services', 'U Cut', 300, 'Perfect U shape finish, easy to manage daily look.', images.hair),
  make('Hair Cut Services', 'Straight Cut', 300, 'Single length straight, neat and classic.', images.hair),
  make('Hair Cut Services', 'Split Ends Trimming', 200, 'Only ends clean-up for an instant fresh feel.', images.hair),
  make('Hair Cut Services', 'Layer Cut', 500, 'Soft layers for natural bounce and volume.', images.hair),
  make('Hair Cut Services', 'Step Cut', 500, 'Visible steps for a fuller and thicker look.', images.hair),
  make('Hair Cut Services', 'Butterfly Cut', 600, 'Trending cut with face framing and layers.', images.hair, undefined, true),
  make('Hair Cut Services', 'Bob / Lob Cut', 600, 'Short and bold, classy and confident style.', images.hair),
  make('Hair Cut Services', 'Wolf / Mullet Cut', 700, 'Edgy and trendy style, highly recommended for Gen-Z.', images.hair),
  make('Hair Cut Services', 'Front Bangs / Curtain Bangs', 400, 'Face-framing bangs that change the whole look.', images.hair),
  make('Hair Cut Services', "Men's Classic Hair Cut", 300, 'Sharp, clean and professional finish.', images.hair),
  make('Hair Cut Services', 'Hair Cut + Beard Combo', 500, 'Complete grooming package. Best value.', images.hair, undefined, true),
  make('Hair Cut Services', 'Kids Cut (Under 12)', 200, 'Quick, comfortable and kids-friendly haircut.', images.hair),
]

export const staff = [
  { id: 1, name: 'Alex', role: 'Senior Stylist', rating: 4.8, available: true, avatar: 'https://i.pravatar.cc/160?img=12' },
  { id: 2, name: 'Mike', role: 'Hair & Grooming Expert', rating: 4.9, available: true, avatar: 'https://i.pravatar.cc/160?img=11' },
  { id: 3, name: 'David', role: 'Senior Stylist', rating: 4.7, available: false, avatar: 'https://i.pravatar.cc/160?img=13' },
  { id: 4, name: 'James', role: 'Beauty & Hair Specialist', rating: 4.8, available: true, avatar: 'https://i.pravatar.cc/160?img=14' },
]

export const mockBookings = [
  { id: 'SAL-1048', service: 'Hair Cut + Beard Combo', date: '18 Sep 2026', time: '10:00 AM', location: 'At Salon', staff: 'Mike', amount: 500, status: 'Confirmed' },
  { id: 'SAL-1039', service: 'Hair Spa', date: '22 Sep 2026', time: '4:00 PM', location: 'At Home', staff: 'Alex', amount: 1000, status: 'Pending' },
  { id: 'SAL-1012', service: 'Premium Facial', date: '04 Sep 2026', time: '11:00 AM', location: 'At Salon', staff: 'James', amount: 2500, status: 'Completed' },
]

import { daysAgo, todayISO } from './utils';

/* ----------------------------------------------------------------
   PHOTOS — every photograph on the site comes from this list.
   Development: free-to-use photos from Unsplash (unsplash.com/license).
   Final site: put the client's photos in /public/assets/images and
   replace each value, e.g. hero: '/assets/images/hero-interior.jpg'.
   ---------------------------------------------------------------- */
export const PHOTOS = {
  hero: 'https://images.unsplash.com/photo-1600210492493-0946911123ea',
  living1: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c',
  living2: 'https://images.unsplash.com/photo-1628744876497-eb30460be9f6',
  living3: 'https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32',
  living4: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab',
  living5: 'https://images.unsplash.com/photo-1724582586529-62622e50c0b3',
  living6: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897',
  kitchen1: 'https://images.unsplash.com/photo-1556911220-bff31c812dba',
  kitchen2: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4',
  kitchen3: 'https://images.unsplash.com/photo-1600684388091-627109f3cd60',
  kitchen4: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7',
  kitchen5: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8',
  bedroom1: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0',
  bedroom2: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8',
  bedroom3: 'https://images.unsplash.com/photo-1757344454333-cc666252e596',
  bedroom4: 'https://images.unsplash.com/photo-1595526051245-4506e0005bd0',
  bedroom5: 'https://images.unsplash.com/photo-1653974123568-b5eff6d851e1',
  bath1: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a',
  bath2: 'https://images.unsplash.com/photo-1682888818696-906287d759f5',
  bath3: 'https://images.unsplash.com/photo-1733426107854-ee00a25d72a7',
  office1: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76',
  office2: 'https://images.unsplash.com/photo-1549637642-90187f64f420',
  office3: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174',
  office4: 'https://images.unsplash.com/photo-1606836576983-8b458e75221d',
  dining1: 'https://images.unsplash.com/photo-1600488999806-8efb986d87b1',
  dining2: 'https://images.unsplash.com/photo-1706820229870-f9a8c6dac193',
  dining3: 'https://images.unsplash.com/photo-1684928365214-5392bfb8a57e',
  dining4: 'https://images.unsplash.com/photo-1752004028694-72610be3604e',
  cafe1: 'https://images.unsplash.com/photo-1729394405518-eaf2a0203aa7',
  cafe2: 'https://images.unsplash.com/photo-1709548145082-04d0cde481d4',
  cafe3: 'https://images.unsplash.com/photo-1544031064-9de80864ade5',
};

/* Background photos for full-width sections (swap like the list above). */
export const BG = {
  promises: PHOTOS.living3,
  process: PHOTOS.living1,
  reviews: PHOTOS.dining2,
  estimate: PHOTOS.kitchen1,
  faq: PHOTOS.bedroom3,
  studio: PHOTOS.office1,
};

export const CATS = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Villa', 'Office', 'Commercial', 'Restaurant', 'Bedroom', 'Living Room', 'Modular Kitchen'];
export const STATUSES = ['New', 'Contacted', 'Follow-up', 'Interested', 'Converted', 'Not Interested', 'Closed'];
export const STAT_COL = {
  New: 'var(--info)', Contacted: 'var(--accent)', 'Follow-up': 'var(--warn)', Interested: '#5FA37A',
  Converted: 'var(--ok)', 'Not Interested': 'var(--bad)', Closed: 'var(--muted)',
};
export const PROPS = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Villa', 'Office', 'Commercial'];
export const BUDGETS = ['Under ₹5 lakh', '₹5–10 lakh', '₹10–20 lakh', '₹20–40 lakh', 'Above ₹40 lakh'];
export const PTYPES = ['Full home interior', 'Modular kitchen', 'Single room', 'Office interior', 'Renovation', 'Package quote'];
export const CALC_FACTOR = { '1 BHK': 0.72, '2 BHK': 1, '3 BHK': 1.38, '4 BHK': 1.75, Villa: 2.6 };
export const FAQS = [
  ['How long does a complete home interior take?', 'A 2BHK usually takes 45 working days from design sign-off to handover. Most carpentry is factory-made, so site work is quick and clean.'],
  ['Is the first consultation really free?', 'Yes. A designer visits your site anywhere in Pune and PCMC, takes measurements and talks through ideas at no charge.'],
  ['What warranty do you give?', '10 years on modular kitchens and wardrobes, and one year on all other carpentry and site work, in writing.'],
  ['Can I pay in instalments?', 'Yes. You pay in milestones (booking, design approval, production, handover), and no-cost EMI options are available through partner banks.'],
  ['Will I see my home before work starts?', 'Yes. Every room is designed in 3D with your chosen materials, and you approve the final renders before production.'],
  ['Do you work outside Pune?', 'We take full-home and villa projects in Mumbai, Lonavala, Nashik and Goa.'],
];
export const MATERIALS = ['Burma teak', 'Terrazzo', 'Kota stone', 'Brushed brass', 'Lime plaster', 'Fluted oak', 'Statuario marble', 'Cane & rattan', 'Linen drapes', 'Handmade tiles'];

const ROOM_OF = (k) =>
  ({ hero: 'Living Room', living: 'Living Room', kitchen: 'Kitchen', bedroom: 'Bedroom', bath: 'Bathroom', office: 'Office', dining: 'Dining', cafe: 'Restaurant' })[k.replace(/\d+$/, '')] || 'Living Room';

/** Starting data. IDs are fixed so the server and browser render the same page. */
export function seed() {
  const P = (k) => PHOTOS[k];
  const projects = [
    { id: 'p1', name: 'Modern Minimal 2BHK', category: '2 BHK', type: 'Residential', location: 'Baner, Pune', area: 1200, style: 'Modern Minimalist', date: '2026-03', client: 'The Kulkarnis', keys: ['hero', 'living4', 'kitchen1', 'bedroom4', 'bath1'], featured: true, published: true, desc: 'A young couple wanted a calm home that could hold two work-from-home desks without looking like an office. We opened the kitchen to the living room, hid storage in full-height fluted panels and kept the palette to sage, oak and brass.', highlights: ['Fluted oak storage wall with hidden study desk', 'Open kitchen with quartz breakfast counter', 'Cove lighting on dimmers in every room', 'Handover in 11 weeks'] },
    { id: 'p2', name: 'Teak & Terrazzo 3BHK', category: '3 BHK', type: 'Residential', location: 'Koregaon Park, Pune', area: 1850, style: 'Contemporary Indian', date: '2025-12', client: '', keys: ['bedroom3', 'living3', 'dining1', 'bedroom2', 'kitchen5'], featured: true, published: true, desc: 'Reclaimed teak doors from the family’s old wada were reworked into headboards and a pooja unit. Terrazzo floors in the common areas tie the three bedrooms together.', highlights: ['Reclaimed teak headboards', 'Terrazzo flooring in common areas', 'Pooja unit with jaali screen', 'Walk-in wardrobe in master suite'] },
    { id: 'p3', name: 'Courtyard Villa', category: 'Villa', type: 'Residential', location: 'Lonavala', area: 4200, style: 'Tropical Modern', date: '2025-09', client: '', keys: ['living5', 'dining3', 'bedroom1', 'bath3', 'living1'], featured: true, published: true, desc: 'A weekend villa built around an open courtyard. Deep verandahs, lime-plaster walls and slatted screens keep the interiors cool through the monsoon.', highlights: ['Central courtyard with reflecting pool', 'Lime-plaster walls', 'Monsoon-proof outdoor furniture', 'Six-seater dining facing the valley'] },
    { id: 'p4', name: 'Fintech Office Floor', category: 'Office', type: 'Commercial', location: 'Hinjewadi, Pune', area: 6500, style: 'Warm Industrial', date: '2026-05', client: '', keys: ['office1', 'office2', 'office3', 'office4'], featured: true, published: true, desc: 'A 90-seat floor for a growing fintech team, with focus pods, two boardrooms and a lounge that doubles as a town-hall space.', highlights: ['90 workstations + 6 focus pods', 'Planted breakout lounge', 'Two video-ready boardrooms', 'Completed in 9 weeks with phased occupancy'] },
    { id: 'p5', name: 'Compact 1BHK Rework', category: '1 BHK', type: 'Residential', location: 'Wakad, Pune', area: 620, style: 'Scandinavian', date: '2026-01', client: '', keys: ['living6', 'kitchen2', 'living2'], featured: false, published: true, desc: 'A rental-ready 1BHK where every wall works as storage. A folding dining table frees up the living room.', highlights: ['Wall-to-wall storage', 'Fold-down dining table', 'Light oak and white laminate', 'Budget under ₹6 lakh'] },
    { id: 'p6', name: 'Café Saffron', category: 'Restaurant', type: 'Commercial', location: 'Kalyani Nagar, Pune', area: 1400, style: 'Warm Contemporary', date: '2025-11', client: '', keys: ['cafe1', 'cafe2', 'cafe3'], featured: false, published: true, desc: 'A 48-cover café with timber banquettes, warm pendant lighting and a long bar counter.', highlights: ['48 covers', 'Custom timber banquettes', 'Layered warm lighting'] },
    { id: 'p7', name: 'Parallel Kitchen Refit', category: 'Modular Kitchen', type: 'Residential', location: 'Aundh, Pune', area: 140, style: 'Modern Classic', date: '2026-06', client: '', keys: ['kitchen4', 'kitchen3'], featured: false, published: true, desc: 'A dated kitchen refitted with soft-close hardware, a tall pantry unit, an island and under-cabinet lighting.', highlights: ['Tall pantry pull-out', 'Soft-close hardware throughout', 'Pendant-lit island'] },
    { id: 'p8', name: 'Master Suite, Viman Nagar', category: 'Bedroom', type: 'Residential', location: 'Viman Nagar, Pune', area: 380, style: 'Soft Luxe', date: '2026-08', client: '', keys: ['bedroom5', 'bath2'], featured: false, published: true, desc: 'A master bedroom with a large picture window, a reading corner and an ensuite bath in marble and green lacquer.', highlights: ['Picture window with blackout blinds', 'Walk-through wardrobe', 'Marble and lacquer ensuite'] },
  ];
  const gallery = [];
  let g = 0;
  projects.forEach((p) => {
    p.image = P(p.keys[0]);
    p.photos = p.keys.slice(1).map(P);
    p.keys.forEach((k, i) =>
      gallery.push({ id: 'g' + ++g, title: p.name + (i ? ' · ' + ROOM_OF(k).toLowerCase() : ''), type: 'Image', room: ROOM_OF(k), project: p.name, image: P(k), published: true })
    );
    delete p.keys;
  });
  gallery.push({ id: 'g' + ++g, title: 'Modern Minimal 2BHK walkthrough', type: 'Video', room: 'Living Room', project: 'Modern Minimal 2BHK', image: P('living4'), duration: '2:40', url: '', published: true });
  gallery.push({ id: 'g' + ++g, title: 'Courtyard Villa walkthrough', type: 'Video', room: 'Living Room', project: 'Courtyard Villa', image: P('living5'), duration: '3:10', url: '', published: true });
  gallery.push({ id: 'g' + ++g, title: 'Café Saffron before & after', type: 'Video', room: 'Restaurant', project: 'Café Saffron', image: P('cafe2'), duration: '1:15', url: '', published: true });

  const services = [
    { id: 's1', name: 'Residential Interior', icon: 'home', short: 'Complete homes, from 1BHK flats to villas, designed and delivered end to end.', detail: 'We handle layout planning, furniture, lighting, finishes and site execution, with one project manager as your single point of contact.', features: ['Space planning', 'Custom furniture', 'Lighting design', 'Site execution'], image: P('living1'), enabled: true },
    { id: 's2', name: 'Commercial Interior', icon: 'office', short: 'Offices, clinics, showrooms and cafés planned around how people use them.', detail: 'Workplace and hospitality interiors with services coordination for HVAC, electrical, data and fire safety.', features: ['Workplace strategy', 'MEP coordination', 'Brand integration', 'Phased execution'], image: P('office2'), enabled: true },
    { id: 's3', name: 'Modular Kitchen', icon: 'kitchen', short: 'Straight, L, U, parallel and island kitchens with a 10-year hardware warranty.', detail: 'Factory-finished carcasses in BWP ply, with a choice of acrylic, PU, laminate or veneer shutters.', features: ['BWP ply carcass', 'Soft-close hardware', 'Tall units and pantry', 'Chimney and hob fitting'], image: P('kitchen1'), enabled: true },
    { id: 's4', name: 'Living Room', icon: 'sofa', short: 'TV units, seating layouts, false ceilings and feature walls.', detail: 'Living rooms planned around conversation, light and storage, with media units that hide cables and clutter.', features: ['Media and TV units', 'Feature walls', 'Seating layout', 'Curtains and blinds'], image: P('living2'), enabled: true },
    { id: 's5', name: 'Bedroom Design', icon: 'bed', short: 'Wardrobes, beds with storage and restful lighting.', detail: 'Bedrooms that sleep well: blackout layers, warm lighting scenes and wardrobes planned to your actual clothes.', features: ['Sliding and hinged wardrobes', 'Storage beds', 'Dresser and study units', 'Warm lighting scenes'], image: P('bedroom1'), enabled: true },
    { id: 's6', name: '3D Design', icon: 'cube', short: 'Photoreal renders and walkthroughs before any work starts on site.', detail: 'See every room in 3D with your chosen materials, and revise until it feels right. Renders are included in all packages.', features: ['Photoreal renders', 'Walkthrough video', 'Material boards', 'Two revision rounds'], image: P('dining2'), enabled: true },
    { id: 's7', name: 'Bathroom', icon: 'bath', short: 'Vanities, wet-dry separation, fittings and waterproofing.', detail: 'Bathroom upgrades with proper waterproofing, concealed cisterns and vanities in water-resistant materials.', features: ['Waterproofing', 'Vanity units', 'Glass partitions'], image: P('bath2'), enabled: true },
    { id: 's8', name: 'False Ceiling', icon: 'ceiling', short: 'Gypsum and wood ceilings with cove and profile lighting.', detail: 'Ceilings that hide beams and wiring and add layered light, finished with moisture-resistant boards where needed.', features: ['Gypsum and POP', 'Cove lighting', 'Wooden rafters'], image: P('living5'), enabled: true },
    { id: 's9', name: 'Furniture Design', icon: 'chair', short: 'Made-to-measure sofas, beds, tables and storage.', detail: 'Furniture built in our partner workshop in Chakan, sized to your rooms.', features: ['Made to measure', 'Solid wood and veneer', 'Upholstery options'], image: P('dining4'), enabled: true },
    { id: 's10', name: 'Renovation', icon: 'hammer', short: 'Refresh an older home without moving out for months.', detail: 'Room-by-room renovation plans that keep part of the home usable while work is on.', features: ['Civil and plumbing', 'Electrical rewiring', 'Flooring', 'Painting and polish'], image: P('kitchen5'), enabled: true },
  ];
  const packages = [
    { id: 'k1', name: 'Essential', tier: 'Basic', price: 450000, desc: 'The rooms you use every day, done well.', image: P('living6'), features: ['Living room', 'Master bedroom', 'Modular kitchen (laminate)', 'Basic furniture', '3D renders of all rooms'], enabled: true },
    { id: 'k2', name: 'Signature', tier: 'Premium', price: 980000, desc: 'A complete home with custom furniture and lighting.', image: P('living4'), features: ['Complete interior', 'Modular kitchen (acrylic)', 'Custom furniture', 'False ceiling with cove lights', 'Lighting design', 'Walkthrough video'], enabled: true },
    { id: 'k3', name: 'Luxe', tier: 'Luxury', price: 1800000, desc: 'Premium materials and smart home controls.', image: P('living1'), features: ['Complete interior', 'Premium veneer and stone', 'Custom furniture', 'Smart home integration', 'Premium lighting scenes', 'Dedicated site supervisor'], enabled: true },
  ];
  const designs = [
    { id: 'd1', name: '2BHK living & dining concept', dtype: 'Design render', category: 'Living Room', project: 'Modern Minimal 2BHK', image: P('living4'), published: true },
    { id: 'd2', name: '2BHK layout, 1,200 sq.ft', dtype: 'Floor Plan', category: '2 BHK', project: 'Modern Minimal 2BHK', image: '', published: true },
    { id: 'd3', name: 'Island kitchen concept', dtype: 'Design render', category: 'Modular Kitchen', project: 'Parallel Kitchen Refit', image: P('kitchen4'), published: true },
    { id: 'd4', name: 'Master suite concept', dtype: 'Design render', category: 'Bedroom', project: 'Teak & Terrazzo 3BHK', image: P('bedroom2'), published: true },
    { id: 'd5', name: '3BHK layout, 1,850 sq.ft', dtype: 'Floor Plan', category: '3 BHK', project: 'Teak & Terrazzo 3BHK', image: '', published: true },
    { id: 'd6', name: 'Office lounge walkthrough', dtype: 'Walkthrough', category: 'Office', project: 'Fintech Office Floor', image: P('office1'), published: true },
  ];
  const testimonials = [
    { id: 't1', name: 'Priya & Rohan Kulkarni', review: 'The team completely transformed our 2BHK. The design and execution were excellent, and we moved in a week earlier than planned.', rating: 5, project: 'Modern Minimal 2BHK', date: '2026-04-12', published: true },
    { id: 't2', name: 'Anand Deshpande', review: 'They reused my grandfather’s teak doors in ways I never imagined. Every visit to site was organised and the budget held.', rating: 5, project: 'Teak & Terrazzo 3BHK', date: '2026-01-20', published: true },
    { id: 't3', name: 'Meera Iyer, COO', review: 'Our office opened on schedule while half the team was already working on the floor. Clear updates every Friday.', rating: 5, project: 'Fintech Office Floor', date: '2026-06-02', published: true },
    { id: 't4', name: 'Farhan Shaikh', review: 'Small flat, big difference. The fold-down table and storage wall changed how we live.', rating: 4, project: 'Compact 1BHK Rework', date: '2026-02-14', published: true },
    { id: 't5', name: 'Neha Joshi', review: 'Loved the 3D renders. What we saw is exactly what was built.', rating: 5, project: 'Parallel Kitchen Refit', date: '2026-07-08', published: false },
  ];
  const team = [
    { id: 'm1', name: 'Amit Sharma', role: 'Founder & Principal Designer', exp: 14, bio: 'Trained at CEPT Ahmedabad; leads every project’s concept stage.', published: true },
    { id: 'm2', name: 'Kavya Patil', role: 'Design Head, Residential', exp: 9, bio: 'Specialises in compact homes and storage planning.', published: true },
    { id: 'm3', name: 'Rahul Menon', role: 'Project Manager', exp: 11, bio: 'Runs site execution and vendor scheduling.', published: true },
    { id: 'm4', name: 'Sana Qureshi', role: '3D Visualiser', exp: 6, bio: 'Turns sketches into photoreal renders and walkthroughs.', published: true },
  ];
  const enquiries = [
    { id: 'e1', name: 'Rahul Sharma', phone: '98220 11834', email: 'rahul.s@example.com', city: 'Pune', property: '2 BHK', ptype: 'Full home interior', budget: '₹5–10 lakh', pdate: daysAgo(-4), message: 'Possession next month in Balewadi. Looking for full interiors.', date: todayISO(), status: 'New', assigned: '', follow: '', notes: [] },
    { id: 'e2', name: 'Amit Kale', phone: '99700 42115', email: 'amitk@example.com', city: 'Lonavala', property: 'Villa', ptype: 'Full home interior', budget: 'Above ₹40 lakh', pdate: '', message: 'Weekend villa, 4 bedrooms.', date: daysAgo(1), status: 'Contacted', assigned: 'Kavya Patil', follow: daysAgo(-2), notes: [{ t: 'Called, site visit fixed for Saturday 11am.', d: daysAgo(1) }] },
    { id: 'e3', name: 'Sneha Gokhale', phone: '90110 87320', email: 'sneha.g@example.com', city: 'Pune', property: '3 BHK', ptype: 'Full home interior', budget: '₹10–20 lakh', pdate: '', message: 'Liked the Teak & Terrazzo project.', date: '2026-09-25', status: 'Converted', assigned: 'Amit Sharma', follow: '', notes: [{ t: 'Signed Signature package. Advance received.', d: '2026-09-28' }] },
    { id: 'e4', name: 'Vikram Rao', phone: '98509 66271', email: 'vikram@example.com', city: 'Pune', property: 'Office', ptype: 'Office interior', budget: '₹20–40 lakh', pdate: '', message: '40-seat office in Kharadi.', date: daysAgo(3), status: 'Follow-up', assigned: 'Rahul Menon', follow: todayISO(), notes: [{ t: 'Sent layout options. Awaiting their landlord approval.', d: daysAgo(2) }] },
    { id: 'e5', name: 'Pooja Nair', phone: '97640 55310', email: 'pooja.n@example.com', city: 'Pune', property: '1 BHK', ptype: 'Modular kitchen', budget: 'Under ₹5 lakh', pdate: '', message: 'Only kitchen for now.', date: daysAgo(6), status: 'Interested', assigned: 'Kavya Patil', follow: daysAgo(-5), notes: [] },
    { id: 'e6', name: 'Harsh Mehta', phone: '98810 23109', email: 'harsh.m@example.com', city: 'Mumbai', property: '2 BHK', ptype: 'Renovation', budget: '₹5–10 lakh', pdate: '', message: 'Flat in Thane.', date: daysAgo(9), status: 'Not Interested', assigned: '', follow: '', notes: [{ t: 'Outside service area for renovation.', d: daysAgo(8) }] },
  ];
  const users = [
    { id: 'u1', name: 'Amit Sharma', email: 'admin@aanganstudio.in', role: 'Super Admin', published: true },
    { id: 'u2', name: 'Sana Qureshi', email: 'content@aanganstudio.in', role: 'Content Manager', published: true },
    { id: 'u3', name: 'Rahul Menon', email: 'leads@aanganstudio.in', role: 'Lead Manager', published: true },
  ];
  return {
    v: 4, projects, services, packages, gallery, designs, testimonials, team, enquiries, users,
    notifs: [
      { t: 'New enquiry received from Rahul Sharma', d: todayISO(), read: false },
      { t: 'New review submitted by Neha Joshi', d: daysAgo(2), read: false },
    ],
    settings: {
      name: 'Aangan Studio', tagline: 'Interior design & architecture, Pune',
      heroHeading: 'Transform your space into your dream home',
      heroSub: 'We design and build homes, offices and kitchens across Pune, from the first sketch to the day you get your keys.',
      heroCta: 'Get consultation',
      promises: 'Move in 45 days | from design sign-off\n10-year warranty | on modular kitchens & wardrobes\n146 quality checks | before every handover\nItemised quotes | no hidden costs\nEasy EMIs | through partner banks',
      phone: '+91 98220 41530', whatsapp: '919822041530', email: 'hello@aanganstudio.in',
      address: 'Office 402, Kapil Zenith, Baner Road, Pune 411045', hours: 'Mon–Sat, 10:00–19:00',
      years: 12, projectsDone: 160, clients: 140, designers: 18,
      about: 'Aangan Studio started in 2014 as a two-person practice working out of a Baner garage. Today we are a team of 18 designers, site engineers and craftspeople delivering about twenty homes and workplaces a year.',
      vision: 'Homes that feel calm, work hard and age well.',
      mission: 'Design honestly, price transparently and hand over on the date we promise.',
      philosophy: 'We start with how you live, not with a style. Light, storage and circulation come first; finishes come last.',
      instagram: 'https://instagram.com/', facebook: 'https://facebook.com/', youtube: 'https://youtube.com/', linkedin: 'https://linkedin.com/',
      seoTitle: 'Aangan Studio | Interior Designers in Pune',
      seoDesc: 'Residential and commercial interior design in Pune. Modular kitchens, 3D design and turnkey execution.',
      keywords: 'interior designer pune, modular kitchen pune, 2bhk interior', ga: 'G-XXXXXXX',
    },
  };
}

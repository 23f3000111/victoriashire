/* ============================================================
   products.js — the product catalogue (single source of truth).
   Same data as Mockup B's lib/products.ts.
   Categories: "course" | "goodie".
   Goodies have image:null → drawn as inline SVG keyed by id.
   ============================================================ */

export const PRODUCTS = [
  /* ---------------- Courses ---------------- */
  {
    id: "infant-care-trial",
    name: "Infant Care · 1-Month Trial",
    category: "course",
    price: 388,
    age: "4–15 months",
    schedule: "Mon–Fri, half or full days",
    image: "poster-infant.avif",
    badge: null,
    blurb: "A gentle first month for your littlest one — feeding, naps and floor time with caregivers who send photo updates before you think to ask.",
    details: [
      "Four to fifteen months is a lot of firsts, and the nursery is set up for all of them: cots, a calm feeding corner, and caregivers who do this every day.",
      "You'll get photo updates through the day — naps, floor time, the first time she holds her own bottle.",
      "The trial runs four full weeks. If you carry on, the fee counts toward your first term.",
    ],
  },
  {
    id: "toddler-trial",
    name: "Toddler Programme · 1-Month Trial",
    category: "course",
    price: 388,
    age: "15 months–3 years",
    schedule: "Mon–Fri mornings, full-day optional",
    image: "poster-toddler.avif",
    badge: null,
    blurb: "Montessori-inspired mornings for new walkers: pouring, stacking, climbing, and the occasional triumphant mess.",
    details: [
      "New walkers need room to pour, stack, climb and tip things over on purpose. That's most of the morning.",
      "It's Montessori-inspired and hands-on, with motor and social skills built into every activity.",
      "Four weeks, Mondays to Fridays. Continue and the trial fee counts toward term one.",
    ],
  },
  {
    id: "ece-trial",
    name: "Preschool & Kindergarten · 1-Month Trial",
    category: "course",
    price: 388,
    age: "Ages 3–6",
    schedule: "Mon–Fri, choose morning or full-day",
    image: "poster-ece.avif",
    badge: "Popular",
    blurb: "A full month in our kindergarten classrooms — letters, numbers, show-and-tell, and friends whose names you'll hear at dinner.",
    details: [
      "A full month in our kindergarten classrooms: letters and numbers, show-and-tell, songs in English, Mandarin and Bahasa Melayu.",
      "The international Montessori curriculum leads the day, with character-building woven through literacy and numeracy.",
      "Start the Monday after you enrol — four full weeks, mornings or full days.",
    ],
  },
  {
    id: "cambridge-english-trial",
    name: "Cambridge Primary English · 1-Month Trial",
    category: "course",
    price: 100,
    age: "Ages 4–12",
    schedule: "Weekday afternoons or Saturdays",
    image: "poster-cambridge.avif",
    badge: null,
    blurb: "Four weeks of reading, writing and speaking practice with certified teachers, on the road to real Cambridge qualifications.",
    details: [
      "Reading, writing, listening and speaking with certified teachers, working toward real Cambridge qualifications from Pre A1 Starters up to B1 Preliminary.",
      "Small groups, plenty of talking, and the confidence to sit an exam like it's nothing.",
      "Four weeks to see whether it fits. It usually does.",
    ],
  },
  {
    id: "piano-trial",
    name: "Piano Course · 1-Month Trial",
    category: "course",
    price: 100,
    age: "Ages 4 and up",
    schedule: "Wednesdays & Saturdays",
    image: "poster-piano.avif",
    badge: null,
    blurb: "Wednesdays and Saturdays at the keys, solo or in a small group — from first fingers to first recital.",
    details: [
      "Wednesdays and Saturdays at the keys, solo or in a small group, from first fingers to first recital.",
      "Ages four and up. Bring the enthusiasm; we've got the piano.",
      "One month, four lessons, and one very proud parent by the end.",
    ],
  },
  {
    id: "young-musicians-trial",
    name: "Young Musicians · 1-Month Trial",
    category: "course",
    price: 120,
    age: "Ages 1–18",
    schedule: "Group or individual, weekday & weekend slots",
    image: "banner-music-school.avif",
    badge: null,
    blurb: "Violin, ukulele, guitar or voice. Classes that end the term on an actual stage.",
    details: [
      "Pick an instrument — violin, ukulele, guitar — or train the voice. Classes end the term on an actual stage.",
      "Ages one to eighteen, group or individual, with weekday and weekend slots.",
      "A month is enough to find out what your child loves.",
    ],
  },
  {
    id: "daycare-month",
    name: "After-School Daycare & Tuition · 1 Month",
    category: "course",
    price: 650,
    age: "Ages 7–12",
    schedule: "After school until 6.30pm, Mon–Fri",
    image: "poster-daycare.avif",
    badge: null,
    blurb: "School pick-up, homework done, tuition in five subjects, proper meals — and care that runs till 6.30pm.",
    details: [
      "We collect from school, get the homework done, run tuition in five subjects, and feed everyone properly.",
      "Tuition covers Chinese, English, Bahasa Melayu, Maths and Science, with meals and transport available.",
      "Care runs till 6.30pm — dinner-time meltdowns not included.",
    ],
  },

  /* ---------------- Goodies (inline SVG) ---------------- */
  {
    id: "school-tee",
    name: "VIS School Tee",
    category: "goodie",
    price: 39,
    age: null,
    schedule: null,
    image: null,
    badge: null,
    blurb: "Soft cotton in butter yellow with the puzzle-piece crest. Survives paint day — ask us how we know.",
    details: [
      "Soft cotton in butter yellow with the puzzle-piece crest on the chest.",
      "It survives paint day, mud day, and the wash after both — ask us how we know.",
    ],
  },
  {
    id: "library-tote",
    name: "Canvas Library Tote",
    category: "goodie",
    price: 29,
    age: null,
    schedule: null,
    image: null,
    badge: null,
    blurb: "Flat-bottomed and toddler-proof. Fits five library books and one emergency dinosaur.",
    details: [
      "Flat-bottomed canvas that stands up on its own and takes a beating.",
      "Fits five library books and one emergency dinosaur, with room to spare.",
    ],
  },
  {
    id: "crayon-set",
    name: "Jumbo Crayon & Sketchbook Set",
    category: "goodie",
    price: 25,
    age: null,
    schedule: null,
    image: null,
    badge: null,
    blurb: "Chunky crayons for small fists, and a sketchbook thick enough for masterpieces on both sides.",
    details: [
      "Chunky crayons sized for small fists, plus a sketchbook thick enough for masterpieces on both sides.",
      "Washable-ish. We're honest about these things.",
    ],
  },
  {
    id: "water-bottle",
    name: "Sip-Top Water Bottle",
    category: "goodie",
    price: 32,
    age: null,
    schedule: null,
    image: null,
    badge: null,
    blurb: "500ml, a name-tag window, and a cap that doesn't end up under the cubbies. Usually.",
    details: [
      "500ml with a name-tag window and a cap that mostly stays out from under the cubbies.",
      "Easy for little hands to open, and harder to lose.",
    ],
  },
  {
    id: "percy-plush",
    name: "Percy the Pony Plush",
    category: "goodie",
    price: 55,
    age: null,
    schedule: null,
    image: null,
    badge: "New",
    blurb: "Our shire-pony mascot in huggable form. Machine washable, nap approved.",
    details: [
      "Our shire-pony mascot in huggable form — Victoriashire's own Percy.",
      "Machine washable and nap approved. He's been field-tested.",
    ],
  },
  {
    id: "workbook-set",
    name: "Holiday Activity Workbook Set",
    category: "goodie",
    price: 45,
    age: null,
    schedule: null,
    image: null,
    badge: null,
    blurb: "Three books of mazes, phonics and counting games for the school break — made by our own teachers.",
    details: [
      "Three books of mazes, phonics and counting games for the school break.",
      "Made by our own teachers, so they match what your child is already learning.",
    ],
  },
];

/* Per-category cart / product line notes (§5.1) */
export const NOTE_COURSE = "Trials start the Monday after you enrol.";
export const NOTE_GOODIE = "Collect at the front desk — we don't post (yet).";

/* Helpers */
export function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}
/* Stable colour-block tint per product id (Direction A — no flyers/cartoons) */
export function productTint(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return ["peri", "sage", "sand"][h % 3];
}
export function formatRM(n) {
  return "RM " + Number(n).toLocaleString("en-MY");
}
export function formatRM2(n) {
  return "RM " + Number(n).toFixed(2);
}

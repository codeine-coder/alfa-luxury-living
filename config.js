/* =========================================================
   PROPERTY CONFIG — 337 East Blackwell Street
   Everything on the site is driven from this file.
   Items marked TODO still need real info.
   ========================================================= */
window.PROPERTY = {
  name: "337 East Blackwell",
  shortName: "337",
  logoSub: "EAST BLACKWELL",
  city: "Dover, NJ",
  seoDescription: "19 completely remodeled, modern 1- and 2-bedroom apartments at 337 East Blackwell Street in Dover, NJ. 1-bedrooms from $1,795, 2-bedrooms from $2,450. Marble/granite countertops, stainless steel appliances, gas stove, dishwasher, and in-unit washer/dryer. Pet friendly, with one free parking space per residence. Apply online today.",

  hero: {
    headline: "Welcome to Your New Standard of Living in Dover.",
    sub: "19 Completely Remodeled, Modern Residences at 337 East Blackwell Street.",
    image: "images/hero.jpg"
  },

  address: { street: "337 East Blackwell Street", cityStateZip: "Dover, NJ 07801" },
  phone: "973-288-3384",
  email: "AlfaLuxuryLiving@gmail.com",

  manager: {
    name: "Elvin Ruiz",
    title: "Leasing Consultant",
    company: "Cultura United Realty",
    slogan: "Where Everyone Belongs.",
    logo: "",                                 // removed per request (file kept at images/cur-logo-light.png)
    logoAlt: "Cultura United Realty — Where Everyone Belongs",
    partnerLogo: "images/alfa-logo.png",     // Alfa Luxury Living
    partnerName: "Alfa Luxury Living",
    phone: "973-288-3384",
    email: "AlfaLuxuryLiving@gmail.com"
  },

  /* ---------- RENTAL APPLICATION ----------
     Paste the TenantCloud application link into applyUrl.
     Until it's added, every Apply button emails Elvin directly
     with the applicant's info and chosen floor plan.            */
  applyUrl: "",           // TODO: TenantCloud application link
  listingsUrl: "",        // TODO: TenantCloud listings link ("See All Availability & Pricing")
  residentPortalUrl: "",  // TODO: TenantCloud resident login (rent, maintenance)

  vibe: {
    headline: "Fresh Design. Unmatched Convenience.",
    body: "Step into a community built for the modern renter. Located in the vibrant heart of Dover, 337 East Blackwell offers an exclusive collection of 19 beautifully updated 1- and 2-bedroom residences. With sleek finishes and bright open-concept layouts, this is more than just an apartment — it's your ultimate home base.",
    image: "images/full/p18.jpg"
  },

  features: {
    headline: "Built for Your Lifestyle.",
    items: [
      { title: "Modern Layouts", body: "Spacious 1-bedroom, 2-bedroom, and bonus-office floor plans designed to maximize your space.", icon: "layout" },
      { title: "Premium Finishes", body: "Marble/granite countertops and updated stainless steel appliances in completely refreshed interiors.", icon: "sparkle" },
      { title: "Prime Location", body: "Minutes away from Dover's best dining, shopping, and major transit routes.", icon: "pin" },
      { title: "Free Parking", body: "Every residence comes with one free parking space. Need another? Additional spaces are $100/month, as available.", icon: "car" },
      { title: "Accessible Living", body: "Our building is wheelchair accessible, with one accessible residence still available. Contact us for details.", icon: "access" }
    ]
  },

  /* Included in every residence — shown in Features and in each floor plan */
  inEveryResidence: [
    "Marble/granite countertops",
    "Updated stainless steel appliances",
    "Gas stove",
    "Dishwasher",
    "In-unit washer & dryer"
  ],

  /* ---------- PETS / PARKING / UTILITIES / ACCESSIBILITY ---------- */
  pets: {
    headline: "We love our fuzzy friends.",
    body: "Your four-legged family member is welcome at 337 East Blackwell. To keep our community comfortable and quiet for every neighbor, we welcome one small pet per residence, 14 lbs or under.",
    terms: [
      { label: "One-time pet fee", value: "$300 (non-refundable)" },
      { label: "Monthly pet rent", value: "$50" },
      { label: "Size limit", value: "14 lbs or under" },
      { label: "Pets per residence", value: "1 maximum" }
    ],
    note: "No exotic pets or birds — no exceptions.",
    noteSub: "To keep our community safe and comfortable for everyone, birds, reptiles, and other exotic animals are not permitted.",
    image: "images/full/p90.jpg"
  },
  parking: { included: 1, extraPrice: 100 },
  utilitiesNote: "Utilities are not included; costs vary by residence.",
  accessibility: "Wheelchair-accessible building with one accessible residence still available. Please contact us for more information.",

  pricingTeaser: {
    headline: "Find Your Perfect Fit.",
    body: "Whether you need a compact, efficient space or a sprawling 2-bedroom with a dedicated home office, we have a layout that fits your life.",
    lines: [
      { label: "1-Bedroom Residences", price: "starting at $1,795" },
      { label: "2-Bedroom Residences", price: "starting at $2,450" }
    ],
    flagship: { price: 1895, label: "Featured Residence", image: "images/full/p52.jpg" }
  },

  /* ---------- FLOOR PLANS ----------
     Layouts from the Estate Media floor plans.
     sqft / units / available: set to null to hide until known.   */
  floorPlans: [
    { id: "One Bedroom", beds: 1, baths: 1, office: false, sqft: null, price: 1795, priceFrom: true, units: null, available: "Now", image: "images/plans/one-bedroom.jpg",
      blurb: "Open-concept living and kitchen with a private bedroom. Featured residences from $1,895.",
      rooms: ["Living room 18'2\" x 9'6\"", "Kitchen 14'11\" x 10'11\"", "Bedroom 12'3\" x 15'0\"", "Walk-in closet", "In-unit laundry"] },
    { id: "Two Bedroom", beds: 2, baths: 1, office: false, sqft: null, price: 2450, priceFrom: true, units: null, available: "Now", image: "images/plans/two-bedroom.jpg",
      blurb: "Two bedrooms with a separate dining area.",
      rooms: ["Primary bedroom 18'6\" x 10'1\"", "Bedroom 12'4\" x 10'2\"", "Living room 9'11\" x 15'2\"", "Dining area 8'2\" x 8'0\"", "Kitchen 8'2\" x 8'8\"", "In-unit laundry"] },
    { id: "Two Bedroom + Office", beds: 2, baths: 1, office: true, sqft: null, price: 2795, priceFrom: true, units: null, available: "Now", image: "images/plans/two-bedroom-office.jpg",
      blurb: "Two bedrooms plus a bonus room for a dedicated home office.",
      rooms: ["Primary bedroom 12'0\" x 16'2\"", "Primary walk-in closet", "Bedroom 12'9\" x 11'1\"", "Bonus room / office 12'9\" x 6'9\"", "Living room 19'7\" x 7'1\"", "Kitchen 10'9\" x 9'11\""] },
    { id: "Two Bedroom, Two Bath", beds: 2, baths: 2, office: false, sqft: null, price: 2795, priceFrom: true, units: null, available: "Now", image: "images/plans/two-bedroom-two-bath.jpg",
      blurb: "Two bedrooms, two full baths, and a private entry porch.",
      rooms: ["Bedroom 15'5\" x 14'11\"", "Bedroom 14'3\" x 11'11\"", "Living room 18'8\" x 10'7\"", "Kitchen 9'6\" x 9'3\"", "Two walk-in closets", "Private porch", "In-unit laundry"] }
  ],
  totalUnits: 19,
  pricingNote: "Rents shown are starting prices; final rent varies by unit and floor. Utilities not included; costs vary. Pricing and availability are subject to change. Room dimensions are approximate. Contact us for current availability.",

  /* ---------- GALLERY (96 professional photos) ---------- */
  gallery: (() => {
    const staged = [16,18,20,26,28,31,36,38,41,48,50,52,54,56,61,63,69,71,73,75,77,79,81,82,84,87];
    const ext = [0,1,2,3,4,5,6,7,8,9,10,88,89,90,91,92,93,94,95];
    const common = [11,12,13,33,59];
    const baths = [29,45,46,57,58,65,66,85];
    const out = [];
    for (let k = 0; k < 96; k++) {
      const n = String(k).padStart(2, "0");
      const category = ext.includes(k) ? "Exterior" : common.includes(k) ? "Common Areas" : baths.includes(k) ? "Bathrooms" : "Residences";
      out.push({ src: `images/full/p${n}.jpg`, thumb: `images/thumb/p${n}.jpg`, category, staged: staged.includes(k) });
    }
    // lead with the strongest shots
    const lead = [93, 18, 52, 2, 36, 22, 26, 92, 63, 43, 71, 58];
    return [...lead.map((k) => out[k]), ...out.filter((_, k) => !lead.includes(k))];
  })(),
  videoTour: { src: "images/tour.mp4", poster: "images/hero.jpg" },
  map: { lat: 40.8852132, lng: -74.5418024 }
};

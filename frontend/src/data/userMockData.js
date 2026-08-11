export const INITIAL_USER = {
  name: "Aditya Sharma",
  email: "aditya.traveler@bharatyatra.in",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  location: "New Delhi, India",
  joinedDate: "January 2024",
  bio: "Passionate Indian traveler exploring ancient heritage, mountain treks, and local cuisines across all 28 states.",
  travelStyle: "Balanced",
  preferredInterests: ["Spiritual", "Heritage", "Adventure", "Food"],
  stats: {
    tripsPlanned: 12,
    destinationsExplored: 34,
    statesVisited: 14,
    totalBudgetSaved: 42500
  },
  badges: [
    { title: "Himalayan Explorer", icon: "🏔️", desc: "Visited 5+ mountain passes" },
    { title: "Ghat Wanderer", icon: "🛕", desc: "Attended Varanasi & Rishikesh Ganga Aarti" },
    { title: "Foodie Yatri", icon: "🍛", desc: "Tasted 15+ regional dishes" },
    { title: "Culture Enthusiast", icon: "🏛️", desc: "Explored 10 UNESCO World Heritage sites" }
  ]
};

export const INITIAL_SAVED_TRIPS = [
  {
    id: "trip-rishikesh-5day",
    title: "5-Day Rishikesh Spiritual & Rafting Escape",
    destinationId: "rishikesh",
    destinationName: "Rishikesh, Uttarakhand",
    days: 5,
    budget: 12500,
    travelStyle: "Friends",
    interests: ["Spiritual", "Adventure", "Food"],
    createdDate: "2026-07-20",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
    itineraryDays: [
      {
        day: 1,
        title: "Arrival & Sacred Sunset Ganga Aarti",
        activities: [
          { time: "Morning (09:00 AM)", title: "Arrival at Rishikesh & check-in at riverside hostel", cost: 1200, category: "Stay", transport: "Auto" },
          { time: "Afternoon (02:00 PM)", title: "Café hopping near Laxman Jhula & Wood-fired Pizza", cost: 600, category: "Food", transport: "Walking" },
          { time: "Evening (06:00 PM)", title: "Attend sacred Triveni Ghat Ganga Aarti with floating lamps", cost: 100, category: "Spiritual", transport: "Scooty" }
        ]
      },
      {
        day: 2,
        title: "White Water Rafting & Cliff Jumping",
        activities: [
          { time: "Morning (08:30 AM)", title: "Drive to Shivpuri for 16km Grade-III Ganges Rafting", cost: 1000, category: "Adventure", transport: "Shared SUV" },
          { time: "Afternoon (01:30 PM)", title: "Garhwali Thali Lunch at Chotiwala", cost: 400, category: "Food", transport: "Walking" },
          { time: "Evening (05:00 PM)", title: "Beatles Ashram graffiti walk & meditation", cost: 300, category: "Heritage", transport: "Scooty" }
        ]
      },
      {
        day: 3,
        title: "Sunrise Waterfall Trek & Yoga Session",
        activities: [
          { time: "Morning (06:00 AM)", title: "Trek to Neer Garh Waterfall & morning mountain dip", cost: 200, category: "Nature", transport: "Scooty" },
          { time: "Afternoon (02:00 PM)", title: "Ayurvedic massage & herbal tea tasting", cost: 1500, category: "Wellness", transport: "Walking" }
        ]
      }
    ]
  },
  {
    id: "trip-goa-4day",
    title: "4-Day Sun, Sand & Latin Quarter Tour",
    destinationId: "goa",
    destinationName: "Goa (North & South)",
    days: 4,
    budget: 16000,
    travelStyle: "Couple",
    interests: ["Nature", "Food", "Heritage"],
    createdDate: "2026-08-01",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop",
    itineraryDays: [
      {
        day: 1,
        title: "Fontainhas Heritage Walk & Mandovi Cruise",
        activities: [
          { time: "Morning", title: "Check-in at Portuguese villa in Panjim", cost: 2500, category: "Stay", transport: "Cab" },
          { time: "Afternoon", title: "Photowalk through colorful Fontainhas Latin Quarter", cost: 0, category: "Heritage", transport: "Walking" },
          { time: "Evening", title: "Sunset Mandovi River Catamaran Cruise", cost: 800, category: "Adventure", transport: "Scooter" }
        ]
      }
    ]
  }
];

export const INITIAL_WISHLIST = [
  { id: "ladakh", collection: "Dream Destinations" },
  { id: "kashmir", collection: "Dream Destinations" },
  { id: "varanasi", collection: "Spiritual Trips" },
  { id: "chopta", collection: "Weekend Trips" },
  { id: "jaipur", collection: "Weekend Trips" }
];

export const MOCK_NOTIFICATIONS = [
  { id: 1, text: "Your Rishikesh trip is coming up in 5 days! Weather looks clear and pleasant (22°C).", date: "2 hours ago", read: false, type: "info" },
  { id: 2, text: "Diwali festival booking season is open for Varanasi river ghat boat cruises.", date: "1 day ago", read: false, type: "warning" },
  { id: 3, text: "New transport update: Vande Bharat Express introduced on Delhi-Amritsar route.", date: "3 days ago", read: true, type: "success" }
];

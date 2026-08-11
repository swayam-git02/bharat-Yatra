export const DESTINATIONS = [
  {
    id: "rishikesh",
    name: "Rishikesh",
    state: "Uttarakhand",
    region: "North India",
    category: "Spiritual & Adventure",
    tagline: "Yoga Capital of the World & Gateway to Garhwal Himalayas",
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1609828913664-85d5272a5b67?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewsCount: 1420,
    bestSeason: "Oct - Apr",
    peakMonths: ["October", "November", "March", "April"],
    avgBudgetPerDay: 2500,
    estimatedBudget3Days: 7500,
    recommendedDays: 3,
    weather: { temp: "15°C - 28°C", condition: "Pleasant & Breezy" },
    popularity: "Very High",
    type: "Mountains",
    interests: ["Spiritual", "Adventure", "Nature", "Photography"],
    travelStyle: ["Solo", "Friends", "Couple"],
    transport: {
      primary: "Scooty Rental",
      estimatedCost: "₹400 - ₹600/day",
      convenience: 5,
      description: "Renting a scooty is the fastest, cheapest way to navigate Rishikesh's narrow bridges, cafes, and ghats.",
      options: ["Scooty Rental", "Auto Rickshaw", "Walking", "Shared Cab"]
    },
    topAttractions: [
      { name: "Triveni Ghat Ganga Aarti", desc: "Mesmerizing evening prayer ceremony with floating lamps.", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600&auto=format&fit=crop" },
      { name: "Laxman Jhula & Ram Jhula", desc: "Iconic suspension bridges overlooking the holy Ganga river.", image: "https://images.unsplash.com/photo-1609828913664-85d5272a5b67?q=80&w=600&auto=format&fit=crop" },
      { name: "Beatles Ashram", desc: "Historic ashram where Maharishi Mahesh Yogi taught transcendental meditation to The Beatles.", image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=600&auto=format&fit=crop" },
      { name: "Neer Garh Waterfall", desc: "Cascading turquoise waterfalls perfect for morning treks and refreshing dips.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop" }
    ],
    thingsToDo: [
      "White Water River Rafting (16km from Shivpuri)",
      "Bungee Jumping at Jumpin Heights",
      "Attend Sunset Ganga Aarti at Triveni Ghat",
      "Café Hopping in Tapovan & Laxman Jhula area",
      "Early Morning Yoga by the Ganga River"
    ],
    localFood: [
      { name: "Aloo Puri at Chotiwala", desc: "Classic traditional North Indian thali and puri bhaji." },
      { name: "Ayurvedic Herbal Teas", desc: "Infused with ginger, tulsi, cardamom, and mountain honey." },
      { name: "Wood-fired Pizza at Beatles Café", desc: "Crispy crust pizzas with views of the Ganga." }
    ],
    nearbyPlaces: ["Haridwar (20 km)", "Dehradun (45 km)", "Mussoorie (75 km)", "Tehri Dam (85 km)"],
    description: "Nestled in the foothills of the Himalayas along the sacred Ganges, Rishikesh seamlessly combines spiritual tranquillity with high-octane adventure sports. From soul-soothing evening Ganga Aartis to adrenaline-pumping white water rafting, Rishikesh offers an authentic Indian mountain experience."
  },
  {
    id: "goa",
    name: "Goa",
    state: "Goa",
    region: "West India",
    category: "Beach & Nightlife",
    tagline: "Sun, Sand, Portuguese Heritage & Serene Backwaters",
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.7,
    reviewsCount: 3100,
    bestSeason: "Nov - Feb",
    peakMonths: ["November", "December", "January", "February"],
    avgBudgetPerDay: 3500,
    estimatedBudget3Days: 10500,
    recommendedDays: 4,
    weather: { temp: "22°C - 31°C", condition: "Sunny & Tropical" },
    popularity: "Extremely High",
    type: "Beaches",
    interests: ["Nature", "Food", "Adventure", "Shopping"],
    travelStyle: ["Friends", "Couple", "Solo"],
    transport: {
      primary: "Scooter / Self-Drive Thar",
      estimatedCost: "₹500 - ₹1200/day",
      convenience: 5,
      description: "Cruising coastal palm-lined roads on a scooter is the definitive Goa travel experience.",
      options: ["Scooter Rental", "Self-Drive Car", "Goa Miles App Taxi"]
    },
    topAttractions: [
      { name: "Palolem & Agonda Beach", desc: "Pristine white sand crescent beaches in South Goa.", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600&auto=format&fit=crop" },
      { name: "Fontainhas Latin Quarter", desc: "Charming Portuguese colonial colorful villas and art galleries.", image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?q=80&w=600&auto=format&fit=crop" },
      { name: "Dudhsagar Waterfalls", desc: "Four-tiered majestic milky waterfall amidst lush Bhagwan Mahaveer Sanctuary.", image: "https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=600&auto=format&fit=crop" },
      { name: "Basilica of Bom Jesus", desc: "UNESCO World Heritage 16th-century church holding mortal remains of St. Francis Xavier.", image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600&auto=format&fit=crop" }
    ],
    thingsToDo: [
      "Sunset Sailing Cruise on Mandovi River",
      "Scuba Diving at Grande Island",
      "Explore Spice Plantation & Organic Lunch",
      "Heritage Walking Tour in Fontainhas, Panjim",
      "Seafood Shack Dining at Anjuna Beach"
    ],
    localFood: [
      { name: "Goan Fish Curry Rice", desc: "Tangy coconut gravy flavored with kokum and fresh kingfish." },
      { name: "Bebinca", desc: "Traditional multi-layered Goan coconut milk dessert." },
      { name: "Pork / Veg Vindaloo", desc: "Rich garlic, vinegar and spicy roasted chili curry." }
    ],
    nearbyPlaces: ["Gokarna (130 km)", "Dandeli (125 km)", "Chorla Ghats (65 km)"],
    description: "India's coastal sunshine capital offers far more than nightlife. Discover 100+ kilometers of golden coastline, emerald backwaters, spice plantations, 400-year-old Portuguese churches, and a laid-back 'Susegad' lifestyle."
  },
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    region: "North West India",
    category: "Heritage & Royalty",
    tagline: "The Pink City of Forts, Palaces & Royal Grandeur",
    heroImage: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewsCount: 2850,
    bestSeason: "Oct - Mar",
    peakMonths: ["November", "December", "January", "February"],
    avgBudgetPerDay: 3000,
    estimatedBudget3Days: 9000,
    recommendedDays: 3,
    weather: { temp: "12°C - 26°C", condition: "Pleasant & Sunny" },
    popularity: "Extremely High",
    type: "Heritage",
    interests: ["Heritage", "Food", "Shopping", "Photography"],
    travelStyle: ["Family", "Couple", "Friends", "Solo"],
    transport: {
      primary: "E-Auto & Cab App",
      estimatedCost: "₹300 - ₹800/day",
      convenience: 4,
      description: "Auto-rickshaws navigate the old pink city markets with ease, while Uber/Ola cab apps serve outlying forts like Amer & Nahargarh.",
      options: ["E-Auto", "Ola / Uber", "Hop-On Hop-Off City Tour Bus"]
    },
    topAttractions: [
      { name: "Hawa Mahal", desc: "Palace of Winds featuring 953 intricately carved honeycomb windows.", image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=600&auto=format&fit=crop" },
      { name: "Amer Fort", desc: "Majestic hilltop fortress overlooking Maota Lake with Sheesh Mahal mirror palace.", image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=600&auto=format&fit=crop" },
      { name: "City Palace", desc: "Opulent residence of royal lineage showcasing Rajput architecture.", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=600&auto=format&fit=crop" },
      { name: "Nahargarh Fort Sunset Point", desc: "Panoramic hilltop view over the entire illuminated Pink City skyline.", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600&auto=format&fit=crop" }
    ],
    thingsToDo: [
      "Hot Air Balloon Ride over Amer Fort",
      "Shopping for Block-print Textiles & Blue Pottery in Johari Bazaar",
      "Sunset Dinner at Padao Restaurant in Nahargarh Fort",
      "Elefantastic Elephant Sanctuary Experience",
      "Traditional Puppet Show & Folk Dance"
    ],
    localFood: [
      { name: "Dal Baati Churma", desc: "Lentil stew served with baked wheat balls soaked in pure desi ghee." },
      { name: "Pyaaz Kachori at Rawat", desc: "Crispy fried pastry stuffed with spiced onion filling." },
      { name: "Ghevar", desc: "Disc-shaped sweet cake soaked in sugar syrup and topped with rabri." }
    ],
    nearbyPlaces: ["Ajmer & Pushkar (130 km)", "Ranthambore National Park (160 km)", "Agra (240 km)"],
    description: "Part of India's famed Golden Triangle, Jaipur is a vibrant pink canvas of royal history, towering forts, marble palaces, bustling bazaars bursting with textiles, and warm Rajasthani hospitality."
  },
  {
    id: "varanasi",
    name: "Varanasi",
    state: "Uttar Pradesh",
    region: "North India",
    category: "Spiritual & Ancient Heritage",
    tagline: "World's Oldest Living City & Spiritual Heart of India",
    heroImage: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewsCount: 2400,
    bestSeason: "Oct - Mar",
    peakMonths: ["November", "December", "January"],
    avgBudgetPerDay: 2000,
    estimatedBudget3Days: 6000,
    recommendedDays: 3,
    weather: { temp: "14°C - 25°C", condition: "Crisp & Spiritual" },
    popularity: "Extremely High",
    type: "Spiritual",
    interests: ["Spiritual", "Heritage", "Food", "Photography"],
    travelStyle: ["Solo", "Family", "Couple"],
    transport: {
      primary: "Walking & Wooden Boat Rides",
      estimatedCost: "₹200 - ₹500/day",
      convenience: 4,
      description: "Varanasi's ancient alleys (Galis) are best explored on foot, combined with sunrise rowboats along the Ganga ghats.",
      options: ["Walking", "Sunrise/Sunset Rowing Boat", "E-Rickshaw"]
    },
    topAttractions: [
      { name: "Dashashwamedh Ghat", desc: "The main ghat famous for the grand daily evening Ganga Aarti.", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=600&auto=format&fit=crop" },
      { name: "Kashi Vishwanath Corridor", desc: "Holy shrine of Lord Shiva transformed into a grand marble riverfront corridor.", image: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=600&auto=format&fit=crop" },
      { name: "Assi Ghat", desc: "Southernmost ghat vibrant with morning yoga, Subah-e-Banaras concerts, and art.", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=600&auto=format&fit=crop" },
      { name: "Sarnath Deer Park", desc: "Where Lord Buddha gave his first sermon after enlightenment.", image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=600&auto=format&fit=crop" }
    ],
    thingsToDo: [
      "Sunrise Boat Ride across 84 Ghats from Assi to Manikarnika",
      "Evening Ganga Aarti Ceremony at Dashashwamedh Ghat",
      "Explore narrow heritage galis (lanes) for silk sarees and street food",
      "Visit Sarnath Stupa and Archaeological Museum",
      "Listen to classical Banarasi classical music concerts"
    ],
    localFood: [
      { name: "Banarasi Paan", desc: "Iconic betel leaf stuffed with gulkand, spices, and mouth-fresheners." },
      { name: "Malaiyo", desc: "Seasonal winter dessert made of saffron-flavored foamed milk topped with pistachios." },
      { name: "Kachori Jalebi at Ram Bhandar", desc: "Spiced lentil puri served with hot crispy sweet jalebis." }
    ],
    nearbyPlaces: ["Ayodhya (200 km)", "Prayagraj (120 km)", "Bodhgaya (250 km)"],
    description: "Continuously inhabited for over 3,000 years, Kashi (Varanasi) is the spiritual epicenter of India. Experience mystical morning boat rides on the Ganges, reverberating chantings, ancient ghats, and divine energy."
  },
  {
    id: "kerala",
    name: "Kerala Backwaters & Munnar",
    state: "Kerala",
    region: "South India",
    category: "Nature & Wellness",
    tagline: "God's Own Country of Houseboats, Tea Gardens & Ayurveda",
    heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewsCount: 3400,
    bestSeason: "Sep - Mar",
    peakMonths: ["October", "November", "December", "January"],
    avgBudgetPerDay: 4000,
    estimatedBudget3Days: 12000,
    recommendedDays: 5,
    weather: { temp: "20°C - 29°C", condition: "Tropical & Lush Green" },
    popularity: "Extremely High",
    type: "Nature",
    interests: ["Nature", "Food", "Spiritual", "Photography"],
    travelStyle: ["Couple", "Family", "Relaxed"],
    transport: {
      primary: "Houseboat & Private Taxi",
      estimatedCost: "₹2000 - ₹5000/day",
      convenience: 5,
      description: "Cruising palm-fringed backwater canals on a private traditional Kettuvallam houseboat.",
      options: ["Houseboat / Shikara", "Private AC Cab", "KSRTC State Bus"]
    },
    topAttractions: [
      { name: "Alleppey Backwaters", desc: "Serene emerald water canals dotted with coconut groves and traditional homes.", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600&auto=format&fit=crop" },
      { name: "Munnar Tea Plantations", desc: "Rolling misty hills blanketed with manicured emerald tea gardens.", image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=600&auto=format&fit=crop" },
      { name: "Fort Kochi Chinese Fishing Nets", desc: "Historic maritime port with centuries-old cantilevered fishing nets.", image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=600&auto=format&fit=crop" },
      { name: "Periyar Wildlife Sanctuary", desc: "Protected tiger reserve offering bamboo rafting and elephant spot boat safaris.", image: "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?q=80&w=600&auto=format&fit=crop" }
    ],
    thingsToDo: [
      "Overnight Luxury Houseboat Cruise in Vembanad Lake",
      "Authentic Ayurvedic Rejuvenation Massage",
      "Watch Kalaripayattu Martial Arts & Kathakali Dance Performance",
      "Tea Tasting & Factory Tour in Munnar",
      "Sunset Walk at Varkala Cliff Beach"
    ],
    localFood: [
      { name: "Appam with Stew", desc: "Soft fluffy rice pancakes served with coconut milk vegetable stew." },
      { name: "Karimeen Pollichathu", desc: "Pearl spot fish marinated in spices and grilled wrapped in banana leaf." },
      { name: "Kerala Sadhya", desc: "Grand vegetarian feast served on a fresh banana leaf with 24+ dishes." }
    ],
    nearbyPlaces: ["Wayanad (180 km)", "Kanyakumari (220 km)", "Madurai (210 km)"],
    description: "From the cool misty tea gardens of Munnar to the languid backwater palm-fringed lagoons of Alleppey and the cliffside beaches of Varkala, Kerala is a tranquil paradise for nature lovers and soul seekers."
  },
  {
    id: "ladakh",
    name: "Leh & Ladakh",
    state: "Ladakh",
    region: "North India",
    category: "High Altitude Desert",
    tagline: "Land of High Passes, Turquoise Lakes & Buddhist Monasteries",
    heroImage: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewsCount: 1980,
    bestSeason: "May - Sep",
    peakMonths: ["June", "July", "August", "September"],
    avgBudgetPerDay: 4500,
    estimatedBudget3Days: 13500,
    recommendedDays: 6,
    weather: { temp: "5°C - 20°C", condition: "Crisp, Sunny & Cool" },
    popularity: "High",
    type: "Mountains",
    interests: ["Adventure", "Nature", "Photography", "Spiritual"],
    travelStyle: ["Solo", "Friends", "Adventure"],
    transport: {
      primary: "Royal Enfield Himalayan / 4x4 SUV",
      estimatedCost: "₹1800 - ₹3500/day",
      convenience: 5,
      description: "Riding a bike across Khardung La pass is the ultimate bucket-list Indian road trip.",
      options: ["Royal Enfield Bike Rental", "Local 4x4 SUV Taxi Union"]
    },
    topAttractions: [
      { name: "Pangong Tso Lake", desc: "Magical high-altitude lake that changes color from cyan to cobalt blue.", image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=600&auto=format&fit=crop" },
      { name: "Nubra Valley & Hunder Sand Dunes", desc: "Cold desert dunes featuring double-humped Bactrian camel rides.", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=600&auto=format&fit=crop" },
      { name: "Thiksey Monastery", desc: "12-story monastery resembling Tibet's Potala Palace housing a 49ft Maitreya Buddha.", image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=600&auto=format&fit=crop" },
      { name: "Khardung La Pass", desc: "One of the highest motorable passes in the world at 17,982 ft.", image: "https://images.unsplash.com/photo-1596700770677-400d3a9505c6?q=80&w=600&auto=format&fit=crop" }
    ],
    thingsToDo: [
      "Motorcycle Expedition across Khardung La & Chang La",
      "Stargazing under crystal clear skies in Hanle Dark Sky Reserve",
      "Bactrian Camel Safari in Hunder Sand Dunes",
      "Attend Morning Chanting at Thiksey Monastery",
      "Experience Magnetic Hill gravity illusion"
    ],
    localFood: [
      { name: "Thukpa", desc: "Hearty Himalayan noodle soup with fresh vegetables and Tibetan spices." },
      { name: "Momo Dumplings", desc: "Steamed flour dumplings filled with minced spiced filling served with chili chutney." },
      { name: "Butter Tea (Gur Gur Chai)", desc: "Warm salty tea churned with yak butter." }
    ],
    nearbyPlaces: ["Zanskar Valley (250 km)", "Kargil (210 km)", "Manali via Atal Tunnel (420 km)"],
    description: "Framed by the Karakoram and Himalayan ranges, Ladakh is a surreal stark high-altitude desert. Home to ancient Buddhist gompas, crystalline high alpine lakes, and dramatic winding mountain passes."
  },
  {
    id: "manali",
    name: "Manali & Solang Valley",
    state: "Himachal Pradesh",
    region: "North India",
    category: "Mountains & Snow",
    tagline: "Valley of the Gods & Alpine Adventure Haven",
    heroImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.7,
    reviewsCount: 2900,
    bestSeason: "Oct - Jun",
    peakMonths: ["December", "January", "May", "June"],
    avgBudgetPerDay: 2800,
    estimatedBudget3Days: 8400,
    recommendedDays: 4,
    weather: { temp: "-2°C - 20°C", condition: "Snowy in Winters, Crisp Summers" },
    popularity: "Very High",
    type: "Mountains",
    interests: ["Adventure", "Nature", "Food", "Photography"],
    travelStyle: ["Friends", "Couple", "Family"],
    transport: {
      primary: "Scooty / Local Taxi",
      estimatedCost: "₹500 - ₹1500/day",
      convenience: 4,
      description: "Scooter rental for Old Manali & Solang Valley; local cabs for snow point Atal Tunnel & Rohtang Pass.",
      options: ["Scooty Rental", "Local Taxi Union", "Himachal Volvo Bus"]
    },
    topAttractions: [
      { name: "Solang Valley", desc: "Adventure haven for paragliding, zorbing, skiing, and snow ropeway rides.", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=600&auto=format&fit=crop" },
      { name: "Atal Tunnel & Sissu", desc: "9.02km engineering marvel connecting lush Kullu Valley to snowy Lahaul Sissu waterfall.", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop" },
      { name: "Old Manali Wooden Cafes", desc: "Charming Bohemian village surrounded by pine forests and apple orchards.", image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=600&auto=format&fit=crop" },
      { name: "Hadimba Temple", desc: "Ancient 1553 AD wooden pagoda temple built in the middle of dense Dhungri Van Vihar forest.", image: "https://images.unsplash.com/photo-1607619662634-305e66014e7a?q=80&w=600&auto=format&fit=crop" }
    ],
    thingsToDo: [
      "Trek to Jogini Waterfall & Hadimba Forest",
      "Drive through Atal Tunnel to Sissu, Lahaul",
      "Paragliding & Ziplining in Solang Valley",
      "Café Hopping in Old Manali (Dylan's & Cafe 1947)",
      "Dip in Vashisht Natural Hot Sulfur Springs"
    ],
    localFood: [
      { name: "Siddu", desc: "Traditional Himachali steamed sourdough bread stuffed with spiced poppy seeds and walnuts served with ghee." },
      { name: "Trout Fish", desc: "Fresh river trout pan-fried in butter with local herbs." },
      { name: "Himachali Dham", desc: "Festive thali cooked in brass pots featuring madra and khatta pulses." }
    ],
    nearbyPlaces: ["Kasol & Manikaran (75 km)", "Jibhi & Tirthan (100 km)", "Shimla (240 km)"],
    description: "Manali offers the perfect mountain escape with snow-capped Himalayan peaks, pine forests, rushing Beas river, ancient timber temples, and thrilling winter adventure sports."
  },
  {
    id: "kashmir",
    name: "Srinagar & Gulmarg",
    state: "Jammu & Kashmir",
    region: "North India",
    category: "Paradise & Alpine Beauty",
    tagline: "Paradise on Earth — Shikara Rides & Snowy Gondolas",
    heroImage: "https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewsCount: 3200,
    bestSeason: "Year Round",
    peakMonths: ["April", "May", "December", "January"],
    avgBudgetPerDay: 4200,
    estimatedBudget3Days: 12600,
    recommendedDays: 5,
    weather: { temp: "-4°C - 24°C", condition: "Snowy Winters, Tulip Springs" },
    popularity: "Extremely High",
    type: "Mountains",
    interests: ["Nature", "Food", "Heritage", "Photography"],
    travelStyle: ["Couple", "Family", "Relaxed"],
    transport: {
      primary: "Shikara Boat & Private Tourist Taxi",
      estimatedCost: "₹1500 - ₹3000/day",
      convenience: 5,
      description: "Cruising Dal Lake on decorated wooden Shikaras and private cabs for Gulmarg Gondola.",
      options: ["Shikara Wooden Boat", "Pre-booked Private Cab", "Shared Union Taxi"]
    },
    topAttractions: [
      { name: "Dal Lake & Houseboats", desc: "Iconic mirror lake featuring floating vegetable markets and wooden houseboats.", image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=600&auto=format&fit=crop" },
      { name: "Gulmarg Gondola Ride", desc: "World's highest cable car taking travelers up to 13,780ft Apharwat Peak.", image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=600&auto=format&fit=crop" },
      { name: "Mughal Gardens (Shalimar & Nishat)", desc: "17th century terraced royal gardens featuring fountains and Chinar trees.", image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600&auto=format&fit=crop" },
      { name: "Pahalgam Betaab Valley", desc: "Lush green pine valleys framed by snow-covered mountain peaks and Lidder River.", image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=600&auto=format&fit=crop" }
    ],
    thingsToDo: [
      "Stay in a traditional carved Walnut Wood Houseboat on Nigeen Lake",
      "Ride Gulmarg Gondola Cable Car Phase 1 & Phase 2",
      "Shop for authentic Pashmina Shawls & Kashmiri Saffron",
      "Sip Saffron Kahwa tea on a Shikara Ride at Sunset",
      "Pony Ride & River Rafting in Pahalgam Valley"
    ],
    localFood: [
      { name: "Kashmiri Wazwan (Rogan Josh & Gushtaba)", desc: "Grand 36-course royal banquet cooked by master chefs (Wazas)." },
      { name: "Kashmiri Kahwa", desc: "Fragrant green tea brewed with saffron, almonds, cinnamon, and cardamom." },
      { name: "Modur Pulao", desc: "Sweet fragrant saffron rice cooked with dry fruits and ghee." }
    ],
    nearbyPlaces: ["Sonamarg (80 km)", "Pahalgam (90 km)", "Doodhpathri (42 km)"],
    description: "True to its legend as Earth's paradise, Kashmir enchants with tranquil mirror lakes, traditional wooden houseboats, vibrant tulip gardens, world-class snow skiing in Gulmarg, and unmatched Kashmiri warmth."
  },
  {
    id: "udaipur",
    name: "Udaipur",
    state: "Rajasthan",
    region: "North West India",
    category: "Heritage & Romance",
    tagline: "The City of Lakes & Venice of the East",
    heroImage: "https://images.unsplash.com/photo-1615837136890-a3520cf8713d?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1615837136890-a3520cf8713d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewsCount: 2200,
    bestSeason: "Sep - Mar",
    peakMonths: ["October", "November", "December", "February"],
    avgBudgetPerDay: 3200,
    estimatedBudget3Days: 9600,
    recommendedDays: 3,
    weather: { temp: "15°C - 28°C", condition: "Romantic & Breezy" },
    popularity: "Very High",
    type: "Heritage",
    interests: ["Heritage", "Food", "Photography", "Nature"],
    travelStyle: ["Couple", "Family", "Solo"],
    transport: {
      primary: "E-Auto & Boat Cruises",
      estimatedCost: "₹300 - ₹800/day",
      convenience: 4,
      description: "Auto rickshaws for narrow heritage streets; public/private solar boats across Lake Pichola.",
      options: ["Auto Rickshaw", "Lake Pichola Boat", "Ola Cab"]
    },
    topAttractions: [
      { name: "City Palace Udaipur", desc: "Magnificent palace complex built over 400 years on the banks of Lake Pichola.", image: "https://images.unsplash.com/photo-1615837136890-a3520cf8713d?q=80&w=600&auto=format&fit=crop" },
      { name: "Lake Pichola Boat Cruise", desc: "Picturesque boat ride taking in Jag Mandir palace island and Taj Lake Palace.", image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=600&auto=format&fit=crop" },
      { name: "Monsoon Palace (Sajjangarh)", desc: "Hilltop palace offering breathtaking sunset views over the lakes and Aravalli hills.", image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=600&auto=format&fit=crop" },
      { name: "Saheliyon Ki Bari", desc: "18th-century lush garden built for royal maidens with marble fountains and lotus pools.", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600&auto=format&fit=crop" }
    ],
    thingsToDo: [
      "Sunset Boat Ride on Lake Pichola to Jagmandir",
      "Dharohar Folk Dance Show at Bagore Ki Haveli",
      "Rooftop Lakeside Candlelight Dinner",
      "Vintage Car Museum Tour",
      "Explore Aravalli Hills & Fatehsagar Lake Walk"
    ],
    localFood: [
      { name: "Dal Baati Churma & Laal Maas", desc: "Royal fiery mutton gravy flavored with Mathania red chilies." },
      { name: "Kulhad Coffee at Fatehsagar Lake", desc: "Thick creamy cold coffee served in terracotta clay cups." },
      { name: "Kachori at Jagdish Chowk", desc: "Crispy savory fried snacks served with sweet mint chutneys." }
    ],
    nearbyPlaces: ["Kumbhalgarh Fort (85 km)", "Chittorgarh Fort (115 km)", "Mount Abu (160 km)"],
    description: "Renowned as India's most romantic city, Udaipur glitters with shimmering blue lakes, white marble palaces, ornate temples, rooftop restaurants overlooking water reflections, and royal Rajasthani heritage."
  },
  {
    id: "hampi",
    name: "Hampi",
    state: "Karnataka",
    region: "South India",
    category: "UNESCO Heritage & Boulders",
    tagline: "Lost Empire of Vijayanagara & Boulder Landscape",
    heroImage: "https://images.unsplash.com/photo-1600100397608-f010f423b971?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600100397608-f010f423b971?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewsCount: 1750,
    bestSeason: "Oct - Mar",
    peakMonths: ["November", "December", "January"],
    avgBudgetPerDay: 2200,
    estimatedBudget3Days: 6600,
    recommendedDays: 3,
    weather: { temp: "18°C - 30°C", condition: "Warm & Sunny" },
    popularity: "High",
    type: "Heritage",
    interests: ["Heritage", "Adventure", "Photography", "Nature"],
    travelStyle: ["Solo", "Friends", "Couple"],
    transport: {
      primary: "Bicycle / Moped Rental",
      estimatedCost: "₹150 - ₹400/day",
      convenience: 5,
      description: "Renting a bicycle or moped is the ultimate hippie way to explore Hampi's vast ruins and banana plantations.",
      options: ["Bicycle Rental", "Moped / Scooty", "Coracle Boat Across River", "Auto Rickshaw"]
    },
    topAttractions: [
      { name: "Virupaksha Temple", desc: "7th-century active temple tower dominating the main Hampi bazaar.", image: "https://images.unsplash.com/photo-1600100397608-f010f423b971?q=80&w=600&auto=format&fit=crop" },
      { name: "Vittala Temple Stone Chariot", desc: "UNESCO World Heritage stone chariot and musical pillars.", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=600&auto=format&fit=crop" },
      { name: "Hemakuta Hill Sunset", desc: "Sloping granite hill offering magical sunset views over ancient temple clusters.", image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600&auto=format&fit=crop" },
      { name: "Sanapur Lake & Hippie Island", desc: "Tranquil cliff diving lake surrounded by massive natural boulder piles.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop" }
    ],
    thingsToDo: [
      "Coracle (round woven boat) Ride on Tungabhadra River",
      "Watch Sunset from Matanga Hill or Hemakuta Hill",
      "Bicycle tour through Royal Enclosure and Lotus Mahal",
      "Boulder Climbing & Rock Scrambling in Anegundi",
      "Café hopping across banana plantations"
    ],
    localFood: [
      { name: "South Indian Thali", desc: "Unlimited rice served with sambar, rasam, payasam, and banana chips." },
      { name: "Mango Lassi & Israeli Shakshuka", desc: "Pop popular in Hampi's multicultural Hippie Island cafes." },
      { name: "Bisi Bele Bath", desc: "Flavorful Karnataka spiced rice cooked with lentils and vegetables." }
    ],
    nearbyPlaces: ["Badami Cave Temples (140 km)", "Pattadakal (130 km)", "Gokarna (310 km)"],
    description: "A surreal open-air museum of stone, Hampi features dramatic golden boulder mountains interspersed with grand stone chariots, carved Vijayanagara palaces, banana groves, and ancient river crossings."
  },
  {
    id: "amritsar",
    name: "Amritsar",
    state: "Punjab",
    region: "North India",
    category: "Spiritual & Culinary",
    tagline: "Holy City of the Golden Temple & Warm Punjabi Heritage",
    heroImage: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewsCount: 2600,
    bestSeason: "Oct - Mar",
    peakMonths: ["November", "December", "January"],
    avgBudgetPerDay: 2200,
    estimatedBudget3Days: 6600,
    recommendedDays: 2,
    weather: { temp: "10°C - 24°C", condition: "Cool & Vibrant" },
    popularity: "Very High",
    type: "Spiritual",
    interests: ["Spiritual", "Food", "Heritage", "Shopping"],
    travelStyle: ["Family", "Solo", "Friends"],
    transport: {
      primary: "E-Rickshaw & Auto",
      estimatedCost: "₹200 - ₹500/day",
      convenience: 5,
      description: "E-rickshaws connect the pedestrian Heritage Street directly to the Golden Temple complex.",
      options: ["E-Rickshaw", "Auto Rickshaw", "Hop-On Hop-Off Bus"]
    },
    topAttractions: [
      { name: "Sri Harmandir Sahib (Golden Temple)", desc: "The holiest Sikh shrine coated in gold leaf surrounding the sacred Amrit Sarovar.", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop" },
      { name: "Attari-Wagah Border Ceremony", desc: "Patriotic daily military retreat ceremony at the India-Pakistan border.", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=600&auto=format&fit=crop" },
      { name: "Jallianwala Bagh Memorial", desc: "Historic memorial park commemorating the 1919 national independence movement.", image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600&auto=format&fit=crop" },
      { name: "Partition Museum", desc: "World's first museum dedicated to the stories and memories of the 1947 Partition.", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=600&auto=format&fit=crop" }
    ],
    thingsToDo: [
      "Voluntary Seva Service at Guru Ka Langar (World's largest free community kitchen)",
      "Watch Sunset and Night Illumination at Golden Temple",
      "Attend Wagah Border Flag Lowering Parade",
      "Heritage Walking Tour in Amritsar Old City Lanes",
      "Shop for Phulkari Suits & Juttis in Hall Bazaar"
    ],
    localFood: [
      { name: "Amritsari Stuffed Kulcha", desc: "Crispy layered sourdough bread stuffed with spiced potatoes and baked in tandoor served with chole." },
      { name: "Gigantic Glass of Lassi at Ahuja", desc: "Thick creamy sweet yogurt drink topped with a dollop of fresh butter." },
      { name: "Makki Di Roti & Sarson Da Saag", desc: "Traditional Punjabi mustard greens curry served with cornbread and jaggery." }
    ],
    nearbyPlaces: ["Dharamshala (200 km)", "Dalhousie (190 km)", "Chandigarh (230 km)"],
    description: "Amritsar warms the heart with the sublime spirituality of the Golden Temple, the World's largest free kitchen feeding 100,000 daily, electric energy at Wagah Border, and legendary Punjabi cuisine."
  },
  {
    id: "darjeeling",
    name: "Darjeeling",
    state: "West Bengal",
    region: "East India",
    category: "Tea Hills & Kanchenjunga",
    tagline: "Queen of the Hills & Toy Train Heritage",
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.7,
    reviewsCount: 1620,
    bestSeason: "Oct - May",
    peakMonths: ["October", "November", "March", "April"],
    avgBudgetPerDay: 2600,
    estimatedBudget3Days: 7800,
    recommendedDays: 3,
    weather: { temp: "8°C - 18°C", condition: "Crisp & Misty" },
    popularity: "High",
    type: "Mountains",
    interests: ["Nature", "Food", "Heritage", "Photography"],
    travelStyle: ["Family", "Couple", "Solo"],
    transport: {
      primary: "UNESCO Toy Train & Shared Taxi",
      estimatedCost: "₹300 - ₹800/day",
      convenience: 4,
      description: "Historic steam Toy Train for scenic Joyrides; shared Jeeps for Tiger Hill sunrise.",
      options: ["Darjeeling Himalayan Railway Toy Train", "Shared Jeep / Taxi Union"]
    },
    topAttractions: [
      { name: "Tiger Hill Sunrise", desc: "Witness golden sunlight illumination over Mt. Kanchenjunga (3rd highest mountain).", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600&auto=format&fit=crop" },
      { name: "Darjeeling Himalayan Railway Toy Train", desc: "UNESCO World Heritage narrow gauge steam locomotive ride across Batasia Loop.", image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=600&auto=format&fit=crop" },
      { name: "Happy Valley Tea Estate", desc: "Lush terraced tea estate producing world-famous aromatic Champagne of Teas.", image: "https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=600&auto=format&fit=crop" },
      { name: "Peace Pagoda & Japanese Temple", desc: "Tranquil Buddhist stupa offering panoramic mountain valley views.", image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=600&auto=format&fit=crop" }
    ],
    thingsToDo: [
      "Early Morning 4 AM Trip to Tiger Hill for Kanchenjunga Sunrise",
      "Steam Engine Toy Train Ride from Darjeeling to Ghoom",
      "Tea Tasting Session at Glenary's Bakery & Cafe",
      "Visit Himalayan Mountaineering Institute & Snow Leopard Zoo",
      "Stroll along Mall Road & Chowrasta Market"
    ],
    localFood: [
      { name: "Darjeeling First Flush Tea", desc: "World-renowned aromatic floral orthodox black tea." },
      { name: "Tibetan Thukpa & Shaphaley", desc: "Warm piping noodles and crispy meat/veg stuffed pasties." },
      { name: "Steamed Momos with Churpi Chutney", desc: "Fresh local momos served with fiery yak cheese chili dip." }
    ],
    nearbyPlaces: ["Gangtok Sikkim (100 km)", "Kalimpong (50 km)", "Mirik Lake (45 km)"],
    description: "Perched high in the Eastern Himalayas, Darjeeling charms visitors with panoramic views of Mt. Kanchenjunga, emerald tea gardens, colonial heritage cafes, and the nostalgic UNESCO Toy Train."
  },
  {
    id: "ooty",
    name: "Ooty & Nilgiri Hills",
    state: "Tamil Nadu",
    region: "South India",
    category: "Nilgiri Mountains",
    tagline: "Queen of Hill Stations & Nilgiri Mountain Railway",
    heroImage: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.6,
    reviewsCount: 1890,
    bestSeason: "Oct - Jun",
    peakMonths: ["April", "May", "October", "November"],
    avgBudgetPerDay: 2700,
    estimatedBudget3Days: 8100,
    recommendedDays: 3,
    weather: { temp: "12°C - 22°C", condition: "Pleasant & Mist Covered" },
    popularity: "High",
    type: "Mountains",
    interests: ["Nature", "Food", "Heritage", "Photography"],
    travelStyle: ["Family", "Couple", "Friends"],
    transport: {
      primary: "Nilgiri Toy Train & Cab",
      estimatedCost: "₹400 - ₹1000/day",
      convenience: 4,
      description: "Historic rack-and-pinion toy train between Mettupalayam, Coonoor, and Ooty.",
      options: ["Nilgiri Mountain Railway", "Private Sightseeing Cab", "Rental Scooty"]
    },
    topAttractions: [
      { name: "Nilgiri Mountain Railway", desc: "UNESCO mountain steam train passing through 16 tunnels and 250 bridges.", image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=600&auto=format&fit=crop" },
      { name: "Doddabetta Peak", desc: "Highest peak in the Nilgiri Hills (8,652 ft) offering telescope views.", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600&auto=format&fit=crop" },
      { name: "Ooty Botanical Gardens & Lake", desc: "55-acre manicured gardens featuring fossil trees and serene boating.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop" }
    ],
    thingsToDo: [
      "Toy Train Ride from Coonoor to Ooty",
      "Visit Homemade Chocolate Factory & Tea Museum",
      "Boating at Pykara Lake & Waterfalls",
      "Trek in Pine Forest Shooting Spot"
    ],
    localFood: [
      { name: "Ooty Handmade Chocolates", desc: "Rich fudge, truffles, and rum raisins chocolate bars." },
      { name: "Nilgiri Tea & Varkey", desc: "Crispy traditional Nilgiri tea biscuit dipped in fresh black tea." }
    ],
    nearbyPlaces: ["Coonoor (18 km)", "Mysore (125 km)", "Wayanad (110 km)"],
    description: "Nestled in the blue Nilgiri mountains, Ooty captivates with rolling eucalyptus hills, pine forests, manicured botanical lawns, artisan homemade chocolates, and tea gardens."
  },
  {
    id: "agra",
    name: "Agra",
    state: "Uttar Pradesh",
    region: "North India",
    category: "Mughal Architecture",
    tagline: "Home of the Taj Mahal — Symbol of Eternal Love",
    heroImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewsCount: 4100,
    bestSeason: "Oct - Mar",
    peakMonths: ["November", "December", "January", "February"],
    avgBudgetPerDay: 2800,
    estimatedBudget3Days: 8400,
    recommendedDays: 2,
    weather: { temp: "11°C - 25°C", condition: "Sunny & Historic" },
    popularity: "Extremely High",
    type: "Heritage",
    interests: ["Heritage", "Photography", "Food"],
    travelStyle: ["Couple", "Family", "Solo"],
    transport: {
      primary: "E-Auto Rickshaw",
      estimatedCost: "₹300 - ₹600/day",
      convenience: 5,
      description: "Pollution-free electric rickshaws around Taj Mahal UNESCO heritage zone.",
      options: ["E-Rickshaw", "App Taxi", "Battery Bus"]
    },
    topAttractions: [
      { name: "Taj Mahal", desc: "7th Wonder of the World built in white marble by Emperor Shah Jahan.", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600&auto=format&fit=crop" },
      { name: "Agra Fort", desc: "Massive red sandstone Mughal fortress housing royal palaces and halls.", image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600&auto=format&fit=crop" },
      { name: "Mehtab Bagh", desc: "Charbagh garden complex giving unobstructed sunset reflections of Taj Mahal over Yamuna river.", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=600&auto=format&fit=crop" }
    ],
    thingsToDo: [
      "Sunrise Visit to Taj Mahal (Fewer crowds & soft marble glow)",
      "Sunset View of Taj Mahal from Mehtab Bagh across Yamuna River",
      "Explore Fatehpur Sikri ancient abandoned Mughal city",
      "Petha Tasting Tour at Panchhi Petha"
    ],
    localFood: [
      { name: "Agra Petha", desc: "Translucent candy dessert made from ash gourd infused with saffron and nuts." },
      { name: "Bedai & Aloo Sabzi", desc: "Puffed wheat puris stuffed with spiced lentils served with tangy potato gravy." }
    ],
    nearbyPlaces: ["Mathura & Vrindavan (55 km)", "Fatehpur Sikri (35 km)", "Delhi (210 km)"],
    description: "Agra stands proud as the historic heartland of Mughal splendor, housing three UNESCO World Heritage Sites including the Taj Mahal, Agra Fort, and Fatehpur Sikri."
  },
  {
    id: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    region: "East India",
    category: "City of Joy & Culture",
    tagline: "City of Joy, Tram Heritage, Art & Culinary Passion",
    heroImage: "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.7,
    reviewsCount: 2300,
    bestSeason: "Oct - Mar",
    peakMonths: ["October (Durga Puja)", "November", "December", "January"],
    avgBudgetPerDay: 2300,
    estimatedBudget3Days: 6900,
    recommendedDays: 3,
    weather: { temp: "16°C - 28°C", condition: "Warm & Culturally Vibrant" },
    popularity: "High",
    type: "Heritage",
    interests: ["Heritage", "Food", "Spiritual", "Photography"],
    travelStyle: ["Solo", "Friends", "Family"],
    transport: {
      primary: "Kolkata Metro & Tram",
      estimatedCost: "₹150 - ₹400/day",
      convenience: 5,
      description: "India's oldest underground metro and historic yellow taxis / wooden trams.",
      options: ["Kolkata Metro", "Yellow Taxi", "Heritage Tram", "Ferry on Hooghly River"]
    },
    topAttractions: [
      { name: "Victoria Memorial", desc: "Grand white marble monument built between 1906 and 1921 surrounded by lush gardens.", image: "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=600&auto=format&fit=crop" },
      { name: "Howrah Bridge & Hooghly Ghats", desc: "Iconic cantilever bridge spanning the Hooghly river.", image: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=600&auto=format&fit=crop" },
      { name: "Dakshineswar & Belur Math", desc: "Spiritual temple complex dedicated to Goddess Kali and Swami Vivekananda.", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=600&auto=format&fit=crop" }
    ],
    thingsToDo: [
      "Sunset Ferry Ride on Hooghly River under Howrah Bridge",
      "Heritage Walk through College Street Book Market & Indian Coffee House",
      "Experience Grand Durga Puja Pandal Hopping (in Autumn)",
      "Visit Kumartuli Idol Makers Village"
    ],
    localFood: [
      { name: "Kolkata Kathi Roll at Nizam's", desc: "Flaky paratha wrapped with spiced kebab meat, onions, and chutneys." },
      { name: "Rosogolla & Mishti Doi", desc: "Spongy cottage cheese balls soaked in syrup and sweetened baked yogurt." },
      { name: "Macher Jhol", desc: "Authentic mustard seed fish curry served with steamed rice." }
    ],
    nearbyPlaces: ["Sundarbans Tiger Reserve (100 km)", "Digha Beach (180 km)", "Shantiniketan (160 km)"],
    description: "Kolkata, the intellectual and cultural capital of India, enchants with its grand colonial architecture, iconic Howrah Bridge, historic yellow cabs, literary heritage, and culinary passion."
  },
  {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    region: "West India",
    category: "Cosmopolitan & Heritage",
    tagline: "The City of Dreams, Marine Drive & Bollywood",
    heroImage: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewsCount: 3800,
    bestSeason: "Nov - Feb",
    peakMonths: ["November", "December", "January", "February"],
    avgBudgetPerDay: 4000,
    estimatedBudget3Days: 12000,
    recommendedDays: 3,
    weather: { temp: "22°C - 32°C", condition: "Warm Coastal Breeze" },
    popularity: "Extremely High",
    type: "Beaches",
    interests: ["Heritage", "Food", "Shopping", "Photography"],
    travelStyle: ["Solo", "Friends", "Couple"],
    transport: {
      primary: "Mumbai Local Train & Auto",
      estimatedCost: "₹200 - ₹600/day",
      convenience: 4,
      description: "Fast local AC train network and Black-and-Yellow Kaali Peeli taxis.",
      options: ["Mumbai Local Train", "Kaali Peeli Taxi", "Mumbai Metro", "Uber"]
    },
    topAttractions: [
      { name: "Gateway of India & Taj Mahal Palace Hotel", desc: "26m high basalt arch monument overlooking Mumbai Harbor.", image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=600&auto=format&fit=crop" },
      { name: "Marine Drive (Queen's Necklace)", desc: "3.6km C-shaped coastal boulevard offering stunning sunset views.", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=600&auto=format&fit=crop" },
      { name: "Elephanta Caves", desc: "UNESCO rock-cut cave temples dedicated to Lord Shiva accessible by ferry.", image: "https://images.unsplash.com/photo-1600100397608-f010f423b971?q=80&w=600&auto=format&fit=crop" }
    ],
    thingsToDo: [
      "Stroll along Marine Drive at Sunset",
      "Ferry ride to Elephanta Caves from Gateway of India",
      "Street food tour at Juhu Beach and Girgaon Chowpatty",
      "Heritage Walking Tour in Kala Ghoda & Colaba"
    ],
    localFood: [
      { name: "Vada Pav at Ashok Vada Pav", desc: "Mumbai's favorite burger: spiced potato dumpling in bread bun with garlic chili chutney." },
      { name: "Pav Bhaji at Cannon", desc: "Mashed vegetable curry topped with melted butter served with toasted buns." },
      { name: "Bombay Sandwich & Irani Chai", desc: "Vegetable cheese grilled sandwich with hot Irani bun maska chai." }
    ],
    nearbyPlaces: ["Lonavala & Khandala (80 km)", "Alibaug (95 km)", "Matheran (85 km)"],
    description: "Mumbai is a sprawling metropolis where high-octane modern energy seamlessly blends with Victorian Gothic architecture, seaside promenades, Bollywood glamour, and irresistible street food."
  },
  {
    id: "chopta",
    name: "Chopta & Tungnath",
    state: "Uttarakhand",
    region: "North India",
    category: "Hidden Gem & Treks",
    tagline: "Mini Switzerland of India & World's Highest Shiva Temple",
    heroImage: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewsCount: 890,
    bestSeason: "Apr - Nov",
    peakMonths: ["May", "June", "October", "November"],
    avgBudgetPerDay: 2000,
    estimatedBudget3Days: 6000,
    recommendedDays: 3,
    weather: { temp: "5°C - 18°C", condition: "Alpine & Pristine" },
    popularity: "Moderate",
    type: "Mountains",
    interests: ["Adventure", "Nature", "Spiritual", "Photography"],
    travelStyle: ["Solo", "Friends", "Adventure"],
    transport: {
      primary: "Private Cab / Trekking",
      estimatedCost: "₹1000 - ₹2000/day",
      convenience: 4,
      description: "Cabs connect Rishikesh/Haridwar to Chopta baseline, followed by scenic Himalayan treks.",
      options: ["Private Mountain Cab", "Trekking on Foot"]
    },
    topAttractions: [
      { name: "Tungnath Temple Trek", desc: "3.5km trek to the highest Shiva temple in the world at 12,073 ft.", image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=600&auto=format&fit=crop" },
      { name: "Chandrashila Peak", desc: "Summit offering 360-degree views of Nanda Devi, Chaukhamba, and Trishul peaks.", image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=600&auto=format&fit=crop" },
      { name: "Deoriatal Alpine Lake", desc: "Crystal clear lake reflecting Chaukhamba snow peaks in its calm waters.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop" }
    ],
    thingsToDo: [
      "Trek to Tungnath & Chandrashila Peak at Sunrise",
      "Camping under clear starry skies in Chopta Bugyal meadows",
      "Bird watching in Kedarnath Wildlife Sanctuary",
      "Trek to Deoriatal Lake from Sari Village"
    ],
    localFood: [
      { name: "Garhwali Mandua ki Roti", desc: "Ragi millet flatbread served with homemade white butter and pahadi dal." },
      { name: "Rhododendron (Buransh) Juice", desc: "Refreshing sweet red flower juice rich in antioxidants." }
    ],
    nearbyPlaces: ["Badrinath (100 km)", "Kedarnath (60 km to Sonprayag)", "Joshimath (90 km)"],
    description: "An unspoiled offbeat paradise, Chopta is known as the Mini Switzerland of Uttarakhand. Offering lush evergreen pine meadows, snow alpine views, and access to the sacred Tungnath-Chandrashila trek."
  },
  {
    id: "ziro",
    name: "Ziro Valley",
    state: "Arunachal Pradesh",
    region: "North East India",
    category: "Hidden Gem & Culture",
    tagline: "Unspoiled Tribal Haven & Organic Pine Valleys",
    heroImage: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewsCount: 650,
    bestSeason: "Sep - Apr",
    peakMonths: ["September (Ziro Music Fest)", "October", "March"],
    avgBudgetPerDay: 2500,
    estimatedBudget3Days: 7500,
    recommendedDays: 3,
    weather: { temp: "10°C - 22°C", condition: "Fresh & Emerald" },
    popularity: "Moderate",
    type: "Nature",
    interests: ["Nature", "Heritage", "Food", "Photography"],
    travelStyle: ["Solo", "Friends", "Adventure"],
    transport: {
      primary: "Shared Sumo Taxi",
      estimatedCost: "₹500 - ₹1200/day",
      convenience: 3,
      description: "Tata Sumo 4x4s connect Guwahati and Naharlagun train station to Ziro Valley.",
      options: ["Shared Tata Sumo 4x4", "Local Taxi"]
    },
    topAttractions: [
      { name: "Apatani Tribal Villages (Hong & Hari)", desc: "UNESCO tentative heritage villages known for organic paddy-fish farming.", image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=600&auto=format&fit=crop" },
      { name: "Tarin Fish Farm & Pine Groves", desc: "Organic pine tree groves surrounding terraced paddy fields.", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600&auto=format&fit=crop" }
    ],
    thingsToDo: [
      "Attend Ziro Festival of Music in September",
      "Interact with Apatani elders and learn traditional bamboo craft",
      "Trek to Kile Pakho ridge for valley views"
    ],
    localFood: [
      { name: "Pike Pila", desc: "Organic Apatani dish made of smoked pork, bamboo shoot, and local spices." },
      { name: "Apong (Rice Beer)", desc: "Traditional sweet fermented rice beverage brewed in bamboo." }
    ],
    nearbyPlaces: ["Itanagar (115 km)", "Majuli (180 km)", "Guwahati (450 km)"],
    description: "Ziro Valley is an enchanting offbeat plateau in Arunachal Pradesh, home to the UNESCO-recognized Apatani tribe, lush pine hills, organic paddy-cum-fish farms, and world-renowned outdoor music festivals."
  }
];

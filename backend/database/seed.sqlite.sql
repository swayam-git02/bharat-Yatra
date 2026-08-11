-- BHARAT YATRA DATABASE SEED DATA (SQLite)

-- 1. SEED STATES & UNION TERRITORIES (28 States + 8 UTs)
INSERT INTO `states` (`id`, `name`, `type`, `capital`) VALUES
(1, 'Andhra Pradesh', 'STATE', 'Amaravati'),
(2, 'Arunachal Pradesh', 'STATE', 'Itanagar'),
(3, 'Assam', 'STATE', 'Dispur'),
(4, 'Bihar', 'STATE', 'Patna'),
(5, 'Chhattisgarh', 'STATE', 'Raipur'),
(6, 'Goa', 'STATE', 'Panaji'),
(7, 'Gujarat', 'STATE', 'Gandhinagar'),
(8, 'Haryana', 'STATE', 'Chandigarh'),
(9, 'Himachal Pradesh', 'STATE', 'Shimla'),
(10, 'Jharkhand', 'STATE', 'Ranchi'),
(11, 'Karnataka', 'STATE', 'Bengaluru'),
(12, 'Kerala', 'STATE', 'Thiruvananthapuram'),
(13, 'Madhya Pradesh', 'STATE', 'Bhopal'),
(14, 'Maharashtra', 'STATE', 'Mumbai'),
(15, 'Manipur', 'STATE', 'Imphal'),
(16, 'Meghalaya', 'STATE', 'Shillong'),
(17, 'Mizoram', 'STATE', 'Aizawl'),
(18, 'Nagaland', 'STATE', 'Kohima'),
(19, 'Odisha', 'STATE', 'Bhubaneswar'),
(20, 'Punjab', 'STATE', 'Chandigarh'),
(21, 'Rajasthan', 'STATE', 'Jaipur'),
(22, 'Sikkim', 'STATE', 'Gangtok'),
(23, 'Tamil Nadu', 'STATE', 'Chennai'),
(24, 'Telangana', 'STATE', 'Hyderabad'),
(25, 'Tripura', 'STATE', 'Agartala'),
(26, 'Uttar Pradesh', 'STATE', 'Lucknow'),
(27, 'Uttarakhand', 'STATE', 'Dehradun'),
(28, 'West Bengal', 'STATE', 'Kolkata'),
(29, 'Andaman and Nicobar Islands', 'UT', 'Port Blair'),
(30, 'Chandigarh', 'UT', 'Chandigarh'),
(31, 'Dadra and Nagar Haveli and Daman and Diu', 'UT', 'Daman'),
(32, 'Delhi NCR', 'UT', 'New Delhi'),
(33, 'Jammu and Kashmir', 'UT', 'Srinagar/Jammu'),
(34, 'Ladakh', 'UT', 'Leh'),
(35, 'Lakshadweep', 'UT', 'Kavaratti'),
(36, 'Puducherry', 'UT', 'Puducherry')
ON CONFLICT(`id`) DO UPDATE SET `name` = excluded.`name`;

-- 2. SEED CATEGORIES
INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Adventure'),
(2, 'Beach'),
(3, 'Mountains'),
(4, 'Spiritual'),
(5, 'Heritage'),
(6, 'Wildlife'),
(7, 'Nature'),
(8, 'Food'),
(9, 'Shopping'),
(10, 'Photography'),
(11, 'Family'),
(12, 'Romantic'),
(13, 'Offbeat'),
(14, 'Cultural'),
(15, 'Wellness')
ON CONFLICT(`id`) DO UPDATE SET `name` = excluded.`name`;

-- 3. SEED CORE DESTINATIONS
INSERT INTO `destinations` (`id`, `name`, `state_id`, `city`, `description`, `latitude`, `longitude`, `average_budget`, `recommended_days`, `best_time`, `rating`, `image_url`) VALUES
(1, 'Rishikesh', 27, 'Rishikesh', 'Yoga Capital of the World along holy Ganges featuring Ganges Rafting, Beatles Ashram, and Triveni Ghat Aarti.', 30.0869, 78.2676, 2500, 3, 'Oct - Apr', 4.8, 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop'),
(2, 'Goa (North & South)', 6, 'Panaji', 'Golden palm beaches, Portuguese heritage architecture, Mandovi cruises, and seafood shacks.', 15.2993, 74.1240, 3500, 4, 'Nov - Feb', 4.7, 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop'),
(3, 'Jaipur', 21, 'Jaipur', 'The Pink City of Rajasthan showcasing Hawa Mahal, Amer Fort, City Palace, and block-print textiles.', 26.9124, 75.7873, 3000, 3, 'Oct - Mar', 4.9, 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1200&auto=format&fit=crop'),
(4, 'Varanasi (Kashi)', 26, 'Varanasi', 'Ancient spiritual capital of India featuring 84 Ganga ghats, Kashi Vishwanath corridor, and sunrise rowboats.', 25.3176, 82.9739, 2000, 3, 'Oct - Mar', 4.9, 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1200&auto=format&fit=crop'),
(5, 'Alleppey & Munnar', 12, 'Alleppey', 'God’s Own Country of Vembanad luxury houseboats, emerald tea gardens, and authentic Ayurveda.', 9.4981, 76.3388, 4000, 5, 'Sep - Mar', 4.9, 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop'),
(6, 'Leh & Ladakh', 34, 'Leh', 'High altitude stark cold desert featuring Pangong Tso Lake, Khardung La pass, and Buddhist gompas.', 34.1526, 77.5771, 4500, 6, 'May - Sep', 4.9, 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200&auto=format&fit=crop'),
(7, 'Manali & Solang', 9, 'Manali', 'Valley of the Gods with snowy Solang Valley adventures, Atal Tunnel, and pine forests.', 32.2432, 77.1892, 2800, 4, 'Oct - Jun', 4.7, 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop'),
(8, 'Srinagar & Gulmarg', 33, 'Srinagar', 'Paradise on Earth with Dal Lake Dal Shikaras, wooden houseboats, and Gulmarg Gondola cable car.', 34.0837, 74.7973, 4200, 5, 'Year Round', 4.9, 'https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=1200&auto=format&fit=crop'),
(9, 'Udaipur', 21, 'Udaipur', 'City of Lakes featuring Lake Pichola boat cruises, City Palace, and romantic sunset views.', 24.5854, 73.7125, 3200, 3, 'Sep - Mar', 4.8, 'https://images.unsplash.com/photo-1615837136890-a3520cf8713d?q=80&w=1200&auto=format&fit=crop'),
(10, 'Hampi', 11, 'Hampi', 'Lost empire of Vijayanagara, ancient stone chariot, granite boulder landscapes, and river coracles.', 15.3350, 76.4600, 2200, 3, 'Oct - Mar', 4.8, 'https://images.unsplash.com/photo-1600100397608-f010f423b971?q=80&w=1200&auto=format&fit=crop'),
(11, 'Amritsar', 20, 'Amritsar', 'Holy city of the Golden Temple (Harmandir Sahib), Wagah Border parade, and Amritsari kulcha.', 31.6340, 74.8723, 2200, 2, 'Oct - Mar', 4.9, 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop'),
(12, 'Darjeeling', 28, 'Darjeeling', 'Queen of the Hills featuring Mt. Kanchenjunga sunrise from Tiger Hill and UNESCO Toy Train.', 27.0410, 88.2663, 2600, 3, 'Oct - May', 4.7, 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop'),
(13, 'Ooty & Nilgiris', 23, 'Ooty', 'Queen of Hill Stations surrounded by eucalyptus hills, botanical lawns, and toy train.', 11.4102, 76.6950, 2700, 3, 'Oct - Jun', 4.6, 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop'),
(14, 'Agra', 26, 'Agra', 'Home of the Taj Mahal 7th wonder of the world, Agra Fort, and Fatehpur Sikri.', 27.1767, 78.0081, 2800, 2, 'Oct - Mar', 4.9, 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop'),
(15, 'Kolkata', 28, 'Kolkata', 'City of Joy featuring Victoria Memorial, iconic Howrah Bridge, Durga Puja, and Kathi rolls.', 22.5726, 88.3639, 2300, 3, 'Oct - Mar', 4.7, 'https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=1200&auto=format&fit=crop'),
(16, 'Mumbai', 14, 'Mumbai', 'City of Dreams showcasing Gateway of India, Marine Drive Queen’s Necklace, and street vada pav.', 18.9220, 72.8347, 4000, 3, 'Nov - Feb', 4.8, 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200&auto=format&fit=crop'),
(17, 'Chopta & Tungnath', 27, 'Chopta', 'Mini Switzerland of Uttarakhand with trek to Tungnath, the highest Shiva temple in the world.', 30.4870, 79.1800, 2000, 3, 'Apr - Nov', 4.9, 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200&auto=format&fit=crop'),
(18, 'Ziro Valley', 2, 'Ziro', 'Unspoiled plateau home to the Apatani tribe, organic rice-fish farming, and music festival.', 27.6000, 93.8333, 2500, 3, 'Sep - Apr', 4.8, 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop'),
(19, 'Havelock (Swaraj Dweep)', 29, 'Havelock', 'Radhanagar white sand beach, scuba diving in turquoise coral reefs, and sea kayaking.', 11.9760, 92.9876, 4500, 4, 'Oct - May', 4.9, 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop'),
(20, 'Puducherry', 36, 'Puducherry', 'French colonial quarter villas, Promenade beach, Auroville dome, and bakery cafes.', 11.9416, 79.8083, 2500, 3, 'Oct - Mar', 4.6, 'https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=1200&auto=format&fit=crop'),
(32, 'Delhi NCR', 32, 'New Delhi', 'Capital city of India featuring Red Fort, Qutub Minar, India Gate, and Chandni Chowk street food.', 28.6139, 77.2090, 3000, 3, 'Oct - Mar', 4.8, 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200&auto=format&fit=crop')
ON CONFLICT(`id`) DO UPDATE SET `name` = excluded.`name`;

-- 4. SEED TRANSPORT OPTIONS
INSERT INTO `transport_options` (`destination_id`, `transport_type`, `name`, `estimated_cost`, `travel_time`, `description`, `recommended`) VALUES
(1, 'Scooty Rental', 'Rishikesh Scooty', '₹400 - ₹600 / day', 'Flexible', 'Best mode for navigating narrow suspension bridges & Tapovan cafes.', 1),
(2, 'Scooter / Thar', 'Goa Bike & Self-Drive Thar', '₹400 - ₹2500 / day', 'Flexible', 'Cruising coastal roads between North & South Goa beaches.', 1),
(3, 'E-Auto & Cab', 'Jaipur Pink City E-Auto', '₹300 - ₹800 / day', 'Flexible', 'Navigating old city bazaars and hilltop Amer fort.', 1),
(4, 'Rowboat & Walking', 'Varanasi Ghat Rowboats', '₹200 - ₹500 / ride', '1 Hour', 'Exploring ancient heritage galis and Ganges ghats.', 1),
(5, 'Houseboat', 'Alleppey Kettuvallam Houseboat', '₹6000 - ₹14000 / night', 'Full Day', 'Cruising palm-fringed backwaters of Vembanad lake.', 1),
(6, 'Royal Enfield 4x4', 'Ladakh Himalayan Bike', '₹1800 - ₹3500 / day', 'Full Day', 'High-altitude mountain road trip across Khardung La.', 1),
(12, 'Toy Train', 'Darjeeling Steam Toy Train', '₹300 - ₹800 / trip', '2 Hours', 'UNESCO heritage narrow gauge Joyride across Batasia Loop.', 1),
(16, 'AC Local Train', 'Mumbai Local & Kaali Peeli', '₹15 - ₹100 / trip', '30 Mins', 'Fast AC commuter train and iconic meter taxis.', 1),
(32, 'Delhi Metro', 'Delhi Metro System', '₹20 - ₹60 / trip', '30 Mins', 'Clean AC subway connecting heritage monuments & airport express.', 1);

-- 5. SEED LOCAL FOODS
INSERT INTO `foods` (`destination_id`, `name`, `description`, `image_url`) VALUES
(1, 'Aloo Puri & Herbal Tea', 'Traditional North Indian puri bhaji and mountain ginger-tulsi chai.', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop'),
(2, 'Goan Fish Curry Rice', 'Tangy yellow coconut gravy with bedgi chilies and fresh kingfish.', 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop'),
(3, 'Dal Baati Churma', 'Baked wheat balls drenched in ghee served with 5-lentil dal and sweet churma.', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop'),
(4, 'Banarasi Paan & Malaiyo', 'Iconic betel leaf stuffed with gulkand and winter saffron milk foam.', 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=800&auto=format&fit=crop'),
(5, 'Kerala Appam with Stew', 'Lacy fermented rice pancake served with creamy coconut milk vegetable stew.', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop'),
(11, 'Amritsari Kulcha', 'Crispy tandoor sourdough flatbread stuffed with spiced potato and paneer.', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop'),
(15, 'Kolkata Kathi Roll & Rosogolla', 'Flaky paratha wrapped with skewer grilled kebabs and spongy sweet cheese balls.', 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop'),
(16, 'Mumbai Vada Pav & Misal', 'Spiced fried potato burger served with dry garlic chili chutney.', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop');

-- 6. SEED FESTIVALS
INSERT INTO `festivals` (`id`, `name`, `description`, `start_date`, `end_date`, `state_id`, `image_url`) VALUES
(1, 'Holi — Festival of Colors', 'Experience Holi at Mathura & Vrindavan where Lord Krishna played Lathmar & Phoolon ki Holi.', 'March', 'March', 26, 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?q=80&w=1200&auto=format&fit=crop'),
(2, 'Dev Deepawali & Diwali', '1 Million oil diyas illuminate 84 heritage river ghats of Kashi in a celestial spectacle.', 'October', 'November', 26, 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1200&auto=format&fit=crop'),
(3, 'Durga Puja', 'UNESCO Intangible Cultural Heritage with thousands of artistic pandals in Kolkata.', 'October', 'October', 28, 'https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=1200&auto=format&fit=crop'),
(4, 'Hornbill Festival', 'Grand extravaganza showcasing 17 Naga warrior tribes at Kisama heritage village.', 'December 1', 'December 10', 18, 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop'),
(5, 'Onam & Snake Boat Races', 'Harvest festival featuring Nehru trophy Vallamkali boat races on Vembanad lake.', 'August', 'September', 12, 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop'),
(6, 'Pushkar Camel Fair', 'World’s largest camel fair featuring hot air balloons and sacred lake dips.', 'November', 'November', 21, 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1200&auto=format&fit=crop')
ON CONFLICT(`id`) DO UPDATE SET `name` = excluded.`name`;

-- 7. SEED SPIRITUAL CIRCUITS
INSERT INTO `spiritual_circuits` (`id`, `name`, `description`, `duration`, `best_season`, `image_url`) VALUES
(1, 'Char Dham Yatra', 'Yamunotri, Gangotri, Kedarnath & Badrinath in Garhwal Himalayas.', '10-12 Days', 'May - Oct', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop'),
(2, '12 Jyotirlinga Circuit', '12 Holy Radiant Shrines of Lord Shiva across India including Somnath, Mahakaleshwar, Vishwanath.', '7-14 Days', 'Oct - Mar', 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1200&auto=format&fit=crop'),
(3, 'The Buddha Heritage Trail', 'Lumbini, Bodhgaya, Sarnath & Kushinagar in the footsteps of Gautama Buddha.', '6-8 Days', 'Oct - Mar', 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200&auto=format&fit=crop'),
(4, 'Panj Takht Sikh Circuit', 'The 5 Sacred Seats of Sikh Authority including Akal Takht Golden Temple Amritsar.', '7 Days', 'Oct - Mar', 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop')
ON CONFLICT(`id`) DO UPDATE SET `name` = excluded.`name`;

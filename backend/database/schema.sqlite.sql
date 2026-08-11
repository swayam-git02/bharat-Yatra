-- BHARAT YATRA DATABASE SCHEMA (SQLite)

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS `users` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `name` TEXT NOT NULL,
  `email` TEXT NOT NULL UNIQUE,
  `password_hash` TEXT NOT NULL,
  `profile_image` TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. STATES & UNION TERRITORIES TABLE
CREATE TABLE IF NOT EXISTS `states` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `name` TEXT NOT NULL UNIQUE,
  `type` TEXT NOT NULL DEFAULT 'STATE' CHECK(`type` IN ('STATE', 'UT')),
  `capital` TEXT NOT NULL
);

-- 3. DESTINATIONS TABLE
CREATE TABLE IF NOT EXISTS `destinations` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `name` TEXT NOT NULL,
  `state_id` INTEGER NOT NULL,
  `city` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `latitude` REAL DEFAULT NULL,
  `longitude` REAL DEFAULT NULL,
  `average_budget` INTEGER NOT NULL DEFAULT 2500,
  `recommended_days` INTEGER NOT NULL DEFAULT 3,
  `best_time` TEXT NOT NULL,
  `rating` REAL NOT NULL DEFAULT 4.5,
  `image_url` TEXT NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`state_id`) REFERENCES `states`(`id`) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS `idx_dest_name` ON `destinations`(`name`);
CREATE INDEX IF NOT EXISTS `idx_dest_state` ON `destinations`(`state_id`);
CREATE INDEX IF NOT EXISTS `idx_dest_rating` ON `destinations`(`rating`);
CREATE INDEX IF NOT EXISTS `idx_dest_budget` ON `destinations`(`average_budget`);

-- 4. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS `categories` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `name` TEXT NOT NULL UNIQUE
);

-- 5. DESTINATION CATEGORIES (MANY-TO-MANY)
CREATE TABLE IF NOT EXISTS `destination_categories` (
  `destination_id` INTEGER NOT NULL,
  `category_id` INTEGER NOT NULL,
  PRIMARY KEY (`destination_id`, `category_id`),
  FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE
);

-- 6. ATTRACTIONS TABLE
CREATE TABLE IF NOT EXISTS `attractions` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `destination_id` INTEGER NOT NULL,
  `name` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `image_url` TEXT DEFAULT NULL,
  `entry_fee` TEXT DEFAULT 'Free',
  `recommended_duration` TEXT DEFAULT '1-2 Hours',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON DELETE CASCADE
);

-- 7. ACTIVITIES TABLE
CREATE TABLE IF NOT EXISTS `activities` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `destination_id` INTEGER NOT NULL,
  `name` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `estimated_cost` INTEGER NOT NULL DEFAULT 500,
  `duration` TEXT DEFAULT '2 Hours',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON DELETE CASCADE
);

-- 8. TRANSPORT OPTIONS TABLE
CREATE TABLE IF NOT EXISTS `transport_options` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `destination_id` INTEGER NOT NULL,
  `transport_type` TEXT NOT NULL,
  `name` TEXT NOT NULL,
  `estimated_cost` TEXT NOT NULL,
  `travel_time` TEXT DEFAULT NULL,
  `description` TEXT NOT NULL,
  `recommended` INTEGER DEFAULT 1,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON DELETE CASCADE
);

-- 9. LOCAL FOOD TABLE
CREATE TABLE IF NOT EXISTS `foods` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `destination_id` INTEGER NOT NULL,
  `name` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `image_url` TEXT DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON DELETE CASCADE
);

-- 10. FESTIVALS TABLE
CREATE TABLE IF NOT EXISTS `festivals` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `name` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `start_date` TEXT NOT NULL,
  `end_date` TEXT DEFAULT NULL,
  `state_id` INTEGER DEFAULT NULL,
  `image_url` TEXT DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`state_id`) REFERENCES `states`(`id`) ON DELETE SET NULL
);

-- 11. DESTINATION FESTIVALS (MANY-TO-MANY)
CREATE TABLE IF NOT EXISTS `destination_festivals` (
  `destination_id` INTEGER NOT NULL,
  `festival_id` INTEGER NOT NULL,
  PRIMARY KEY (`destination_id`, `festival_id`),
  FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`festival_id`) REFERENCES `festivals`(`id`) ON DELETE CASCADE
);

-- 12. SPIRITUAL CIRCUITS TABLE
CREATE TABLE IF NOT EXISTS `spiritual_circuits` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `name` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `duration` TEXT NOT NULL,
  `best_season` TEXT NOT NULL,
  `image_url` TEXT DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 13. CIRCUIT DESTINATIONS (MANY-TO-MANY WITH SEQUENCE)
CREATE TABLE IF NOT EXISTS `circuit_destinations` (
  `circuit_id` INTEGER NOT NULL,
  `destination_id` INTEGER NOT NULL,
  `sequence_number` INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (`circuit_id`, `destination_id`),
  FOREIGN KEY (`circuit_id`) REFERENCES `spiritual_circuits`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON DELETE CASCADE
);

-- 14. USER PREFERENCES TABLE
CREATE TABLE IF NOT EXISTS `user_preferences` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `user_id` INTEGER NOT NULL UNIQUE,
  `travel_style` TEXT DEFAULT 'Balanced',
  `budget_preference` INTEGER DEFAULT 15000,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- 15. WISHLIST TABLE
CREATE TABLE IF NOT EXISTS `wishlist` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `user_id` INTEGER NOT NULL,
  `destination_id` INTEGER NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (`user_id`, `destination_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON DELETE CASCADE
);

-- 16. SAVED TRIPS TABLE
CREATE TABLE IF NOT EXISTS `saved_trips` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `user_id` INTEGER NOT NULL,
  `trip_name` TEXT NOT NULL,
  `destination_id` INTEGER NOT NULL,
  `duration` INTEGER NOT NULL DEFAULT 3,
  `budget` INTEGER NOT NULL DEFAULT 10000,
  `travel_style` TEXT DEFAULT 'Friends',
  `interests` TEXT DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON DELETE CASCADE
);

-- 17. SAVED TRIP DAYS TABLE
CREATE TABLE IF NOT EXISTS `saved_trip_days` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `trip_id` INTEGER NOT NULL,
  `day_number` INTEGER NOT NULL,
  `date` TEXT DEFAULT NULL,
  FOREIGN KEY (`trip_id`) REFERENCES `saved_trips`(`id`) ON DELETE CASCADE
);

-- 18. SAVED TRIP ACTIVITIES TABLE
CREATE TABLE IF NOT EXISTS `saved_trip_activities` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `trip_day_id` INTEGER NOT NULL,
  `activity_name` TEXT NOT NULL,
  `description` TEXT DEFAULT NULL,
  `time_slot` TEXT DEFAULT 'Morning',
  `estimated_cost` INTEGER DEFAULT 0,
  `transport` TEXT DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`trip_day_id`) REFERENCES `saved_trip_days`(`id`) ON DELETE CASCADE
);

-- 19. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `user_id` INTEGER NOT NULL,
  `title` TEXT NOT NULL,
  `message` TEXT NOT NULL,
  `type` TEXT DEFAULT 'info',
  `is_read` INTEGER DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

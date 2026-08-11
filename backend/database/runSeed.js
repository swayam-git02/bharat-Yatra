const fs = require('fs');
const path = require('path');
const { db } = require('../config/database');

async function runSeed() {
  console.log('🌱 Starting Bharat Yatra SQLite Database Initialization & Seeding...');

  try {
    // 1. Read and run schema.sqlite.sql
    const schemaPath = path.join(__dirname, 'schema.sqlite.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    db.exec(schemaSql);
    console.log('✅ SQLite database schema created/verified (`bharat_yatra.db`).');

    // 2. Read and run seed.sqlite.sql
    const seedPath = path.join(__dirname, 'seed.sqlite.sql');
    const seedSql = fs.readFileSync(seedPath, 'utf8');
    db.exec(seedSql);
    console.log('✅ Seed data inserted successfully (States, Destinations, Transport, Food, Festivals, Circuits).');

    console.log('🎉 Database setup completed!');
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    process.exit(1);
  }
}

runSeed();

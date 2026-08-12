const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const dbPath = process.env.SQLITE_DB_PATH || path.join(__dirname, '../database/bharat_yatra.db');

// Ensure directory exists
const dbDir = path.dirname(path.resolve(dbPath));
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(path.resolve(dbPath));

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Auto-initialize SQLite Database Schema & Seed Data if missing (e.g. fresh Render deployment)
try {
  const tableCheck = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='users'").get();
  if (!tableCheck) {
    console.log('📦 Database missing `users` table. Auto-initializing schema from schema.sqlite.sql...');
    const schemaPath = path.join(__dirname, '../database/schema.sqlite.sql');
    if (fs.existsSync(schemaPath)) {
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      db.exec(schemaSql);
      console.log('✅ SQLite database schema created successfully!');
    }
    const seedPath = path.join(__dirname, '../database/seed.sqlite.sql');
    if (fs.existsSync(seedPath)) {
      const seedSql = fs.readFileSync(seedPath, 'utf8');
      db.exec(seedSql);
      console.log('✅ SQLite database seed data inserted successfully!');
    }
  }
} catch (initErr) {
  console.error('⚠️ Database auto-initialization error:', initErr.message);
}

/**
 * Promise-wrapped query helper to keep compatibility with existing async/await controllers
 */
async function query(sql, params = []) {
  try {
    const trimmed = sql.trim().toUpperCase();
    if (trimmed.startsWith('SELECT') || trimmed.startsWith('PRAGMA') || trimmed.startsWith('WITH')) {
      const stmt = db.prepare(sql);
      return stmt.all(...params);
    } else {
      const stmt = db.prepare(sql);
      const info = stmt.run(...params);
      return {
        insertId: Number(info.lastInsertRowid),
        affectedRows: info.changes
      };
    }
  } catch (error) {
    console.error('Database Query Error:', error.message || error);
    throw error;
  }
}

/**
 * Pool connection interface emulator for controller transactions
 */
const pool = {
  getConnection: async () => {
    return {
      query: async (sql, params) => query(sql, params),
      beginTransaction: async () => query('BEGIN TRANSACTION'),
      commit: async () => query('COMMIT'),
      rollback: async () => query('ROLLBACK'),
      release: () => {}
    };
  }
};

module.exports = {
  db,
  pool,
  query
};

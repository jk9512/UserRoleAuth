require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const connectDB = require('./config/db');
const User = require('./models/User');
const Role = require('./models/Role');

const seededPath = path.join(__dirname, 'seeded_users.json');

async function run() {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/user_role_auth';
  await connectDB(MONGO_URI);

  const data = JSON.parse(fs.readFileSync(seededPath, 'utf8'));

  const rolesSet = new Set();
  data.forEach(u => (u.roles || []).forEach(r => rolesSet.add(r)));
  for (const r of rolesSet) {
    const exists = await Role.findOne({ name: r });
    if (!exists) await new Role({ name: r }).save();
  }

  for (const u of data) {
    const exists = await User.findOne({ email: u.email });
    if (exists) {
      console.log(`Skipping existing user: ${u.email}`);
      continue;
    }
    const hashed = await bcrypt.hash(u.password, 10);
    const user = new User({ name: u.name, email: u.email, password: hashed, roles: u.roles });
    await user.save();
    console.log(`Created user: ${u.email}`);
  }

  console.log('Done seeding users.');
  process.exit(0);
}

run().catch(err => {
  console.error('Seeding error', err);
  process.exit(1);
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json());

connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/user_role_auth')
  .catch(err => console.error('DB connect error', err));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

const Role = require('./models/Role');
app.post('/seed-roles', async (req, res) => {
  try {
    const roles = ['user', 'admin'];
    for (const r of roles) {
      const exists = await Role.findOne({ name: r });
      if (!exists) await new Role({ name: r }).save();
    }
    res.json({ message: 'Roles seeded' });
  } catch (err) {
    res.status(500).json({ message: 'Error seeding roles' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

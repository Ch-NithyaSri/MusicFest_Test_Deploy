const sequelize = require('./config/config');
const User = require('./models/User');

(async () => {
  try {
    await sequelize.sync({ force: false }); // `force: false` prevents dropping tables
    console.log('Database synced successfully');
    process.exit();
  } catch (error) {
    console.error('Error syncing database:', error);
    process.exit(1);
  }
})();

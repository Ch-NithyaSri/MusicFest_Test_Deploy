const User = require('./models/User');

async function createUser() {
  try {
    const newUser = await User.create({
      userName: 'puji24',
      emailID: 'puji@gmail.com',
      name: 'puji',
      phone: '1253654560',
      password: 'Puji@24',
    });
    console.log('User created:', newUser.toJSON());
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

createUser();

async function getUsers() {
    try {
      const users = await User.findAll();
      console.log('Users:', users.map(user => user.toJSON()));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  
getUsers();
  
async function updateUser(userName, newEmail) {
    try {
      const user = await User.findByPk(userName);
      if (user) {
        user.emailID = 'strawberry@gmail.com';
        await user.save();
        console.log('User updated:', user.toJSON());
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
}
  
updateUser('Sri1024', 'pineapple@gmail.com');
getUsers();
  
async function deleteUser(userName) {
    try {
      const user = await User.findByPk(userName);
      if (user) {
        await user.destroy();
        console.log('User deleted:', userName);
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
}
  
deleteUser('Sahithya03');
  
getUsers();
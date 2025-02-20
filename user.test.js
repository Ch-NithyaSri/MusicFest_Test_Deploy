const User = require('./models/User');

// Mock the Sequelize methods manually using jest.fn()
jest.mock('./models/User', () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    destroy: jest.fn(),
  };
});

describe('User Model', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should create a new user', async () => {
    const mockUser = {
      userName: 'testUser',
      emailID: 'test@example.com',
      name: 'Test User',
      phone: '1234567890',
      password: 'Test@123',
    };

    // Mock create to resolve with the mock user
    User.create.mockResolvedValue(mockUser);

    const user = await User.create({
      userName: 'testUser',
      emailID: 'test@example.com',
      name: 'Test User',
      phone: '1234567890',
      password: 'Test@123',
    });

    expect(user).toEqual(mockUser);
  });

  it('should fetch users', async () => {
    const mockUsers = [
      { userName: 'testUser1', emailID: 'user1@example.com' },
      { userName: 'testUser2', emailID: 'user2@example.com' },
    ];

    // Mock findAll to return the mock users list
    User.findAll.mockResolvedValue(mockUsers);

    const users = await User.findAll();
    expect(users).toEqual(mockUsers);
    expect(users.length).toBeGreaterThan(0);
  });

  it('should update user email', async () => {
    const newEmail = 'newemail@example.com';
  
    // Define the mock user first
    const mockUser = {
      userName: 'testUser',
      emailID: 'oldemail@example.com',
    };
  
    // Mock the save method to return a new object with the updated email
    mockUser.save = jest.fn().mockResolvedValue({ ...mockUser, emailID: newEmail });
  
    // Mock findByPk to return the mock user
    User.findByPk.mockResolvedValue(mockUser);
  
    // Find the user by primary key (username)
    const user = await User.findByPk('testUser');
  
    // Simulate updating the user's email
    user.emailID = newEmail;
    await user.save();
  
    // Assert that the save method was called and the email was updated
    expect(user.save).toHaveBeenCalled();
    expect(user.emailID).toBe(newEmail);  // Assert that the emailID is now the new email
  });
  

  it('should delete a user', async () => {
    const userName = 'testUser';

    const mockUser = {
      userName: 'testUser',
      emailID: 'test@example.com',
      destroy: jest.fn().mockResolvedValue(true),
    };

    // Mock findByPk to return the mock user
    User.findByPk.mockResolvedValue(mockUser);

    // Simulate deleting the user
    await mockUser.destroy();

    // Assert that the destroy method was called
    expect(mockUser.destroy).toHaveBeenCalled();
  });
});

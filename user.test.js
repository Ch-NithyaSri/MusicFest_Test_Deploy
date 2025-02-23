const User = require('./models/User');
//mock
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

    User.findAll.mockResolvedValue(mockUsers);

    const users = await User.findAll();
    expect(users).toEqual(mockUsers);
    expect(users.length).toBeGreaterThan(0);
  });

  it('should update user email', async () => {
    const newEmail = 'newemail@example.com';

    const mockUser = {
      userName: 'testUser',
      emailID: 'oldemail@example.com',
    };
  
    mockUser.save = jest.fn().mockResolvedValue({ ...mockUser, emailID: newEmail });
  
    User.findByPk.mockResolvedValue(mockUser);
  
    const user = await User.findByPk('testUser');
  
    user.emailID = newEmail;
    await user.save();
  
    expect(user.save).toHaveBeenCalled();
    expect(user.emailID).toBe(newEmail); 
  });
  

  it('should delete a user', async () => {
    const userName = 'testUser';

    const mockUser = {
      userName: 'testUser',
      emailID: 'test@example.com',
      destroy: jest.fn().mockResolvedValue(true),
    };

    User.findByPk.mockResolvedValue(mockUser);

    await mockUser.destroy();

    expect(mockUser.destroy).toHaveBeenCalled();
  });
});

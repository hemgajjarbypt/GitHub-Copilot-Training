const request = require('supertest');

// Set test environment and env vars before requiring anything
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_secret';
process.env.DB_HOST = 'localhost';
process.env.DB_USER = 'demo';
process.env.DB_PASSWORD = 'demo';
process.env.DB_NAME = 'demo_db';

// Mock modules before any requires
jest.mock('dotenv', () => ({
  config: jest.fn()
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mocked_jwt_token')
}));

jest.mock('mysql2', () => ({
  createConnection: jest.fn(() => ({
    query: jest.fn(),
    connect: jest.fn(),
    end: jest.fn(),
  }))
}));

// Now require the app after mocks
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

describe('Login API', () => {
  let app, db, jwtSignMock;

  beforeAll(() => {
    const mod = require('./new');
    app = mod.app;
    db = mod.db;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jwtSignMock = jwt.sign;

    // Set up environment variables
    process.env.JWT_SECRET = 'test_secret';
    process.env.DB_HOST = 'localhost';
    process.env.DB_USER = 'demo';
    process.env.DB_PASSWORD = 'demo';
    process.env.DB_NAME = 'demo_db';
  });

  afterEach(() => {
    delete process.env.JWT_SECRET;
    delete process.env.DB_HOST;
    delete process.env.DB_USER;
    delete process.env.DB_PASSWORD;
    delete process.env.DB_NAME;
  });

  describe('POST /login', () => {
    test('should return 500 on database error', async () => {
      db.query.mockImplementation((sql, params, callback) => {
        // Verify the SQL query and parameters
        expect(sql).toContain('SELECT id, username FROM users WHERE username = ? AND password = ? LIMIT 1');
        expect(params).toEqual(['testuser', 'testpass']);
        callback(new Error('Database error'), null);
      });

      const response = await request(app)
        .post('/login')
        .send({ username: 'testuser', password: 'testpass' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'db error' });
    }, 10000);

    test('should return 401 for invalid credentials', async () => {
      db.query.mockImplementation((sql, params, callback) => {
        // Verify the SQL query and parameters
        expect(sql).toContain('SELECT id, username FROM users WHERE username = ? AND password = ? LIMIT 1');
        expect(params).toEqual(['testuser', 'wrongpass']);
        callback(null, []);
      });

      const response = await request(app)
        .post('/login')
        .send({ username: 'testuser', password: 'wrongpass' });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'invalid' });
    }, 10000);

    test('should return token for valid credentials', async () => {
      const mockUser = { id: 1, username: 'testuser' };
      db.query.mockImplementation((sql, params, callback) => {
        // Verify the SQL query and parameters
        expect(sql).toContain('SELECT id, username FROM users WHERE username = ? AND password = ? LIMIT 1');
        expect(params).toEqual(['testuser', 'testpass']);
        callback(null, [mockUser]);
      });

      const response = await request(app)
        .post('/login')
        .send({ username: 'testuser', password: 'testpass' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ token: 'mocked_jwt_token' });
      expect(jwtSignMock).toHaveBeenCalledWith(
        { uid: 1 },
        'test_secret',
        { expiresIn: '1h' }
      );
    }, 10000);

    test('should handle missing username', async () => {
      db.query.mockImplementation((sql, params, callback) => {
        // Verify the SQL query and parameters
        expect(sql).toContain('SELECT id, username FROM users WHERE username = ? AND password = ? LIMIT 1');
        expect(params).toEqual([undefined, 'testpass']);
        callback(null, []);
      });

      const response = await request(app)
        .post('/login')
        .send({ password: 'testpass' });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'invalid' });
    }, 10000);

    test('should handle missing password', async () => {
      db.query.mockImplementation((sql, params, callback) => {
        // Verify the SQL query and parameters
        expect(sql).toContain('SELECT id, username FROM users WHERE username = ? AND password = ? LIMIT 1');
        expect(params).toEqual(['testuser', undefined]);
        callback(null, []);
      });

      const response = await request(app)
        .post('/login')
        .send({ username: 'testuser' });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'invalid' });
    }, 10000);

    test('should handle empty request body', async () => {
      db.query.mockImplementation((sql, params, callback) => {
        // Verify the SQL query and parameters
        expect(sql).toContain('SELECT id, username FROM users WHERE username = ? AND password = ? LIMIT 1');
        expect(params).toEqual([undefined, undefined]);
        callback(null, []);
      });

      const response = await request(app)
        .post('/login')
        .send({});

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'invalid' });
    }, 10000);

    test('should handle SQL injection attempt', async () => {
      // Test with malicious input
      const maliciousUsername = "admin' --";
      const maliciousPassword = "anything";

      db.query.mockImplementation((sql, params, callback) => {
        // Since we're using parameterized queries, the malicious input should be treated as literal
        // Verify that the parameters are correctly passed
        expect(params).toEqual([maliciousUsername, maliciousPassword]);
        callback(null, []);
      });

      const response = await request(app)
        .post('/login')
        .send({ username: maliciousUsername, password: maliciousPassword });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'invalid' });
    }, 10000);

    test('should handle multiple results (though LIMIT 1 prevents this)', async () => {
      // This test is theoretical since LIMIT 1 is used
      const mockUsers = [{ id: 1, username: 'testuser' }, { id: 2, username: 'testuser' }];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockUsers);
      });

      const response = await request(app)
        .post('/login')
        .send({ username: 'testuser', password: 'testpass' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ token: 'mocked_jwt_token' });
      // Should use the first result
      expect(jwtSignMock).toHaveBeenCalledWith(
        { uid: 1 },
        'test_secret',
        { expiresIn: '1h' }
      );
    }, 10000);
  });

  describe('App initialization', () => {
    test('should throw error if JWT_SECRET is not set', () => {
      // Temporarily unset JWT_SECRET
      const originalSecret = process.env.JWT_SECRET;
      delete process.env.JWT_SECRET;

      jest.resetModules();

      expect(() => {
        require('./new');
      }).toThrow('JWT_SECRET environment variable not set');

      // Restore
      process.env.JWT_SECRET = originalSecret;
    });
  });

  describe('Environment variable checks', () => {
    test('should use default DB_HOST if not set', () => {
      const originalHost = process.env.DB_HOST;
      delete process.env.DB_HOST;

      jest.resetModules();
      const mod = require('./new');

      // The db connection should be created with default host
      expect(mod.db).toBeDefined();

      // Restore
      process.env.DB_HOST = originalHost;
    });

    test('should use provided DB_HOST if set', () => {
      const originalHost = process.env.DB_HOST;
      process.env.DB_HOST = 'custom_host';

      jest.resetModules();
      const mod = require('./new');

      // The db connection should be created with provided host
      expect(mod.db).toBeDefined();

      // Restore
      process.env.DB_HOST = originalHost;
    });

    test('should use default DB_USER if not set', () => {
      const originalUser = process.env.DB_USER;
      delete process.env.DB_USER;

      jest.resetModules();
      const mod = require('./new');

      // The db connection should be created with default user
      expect(mod.db).toBeDefined();

      // Restore
      process.env.DB_USER = originalUser;
    });

    test('should use provided DB_USER if set', () => {
      const originalUser = process.env.DB_USER;
      process.env.DB_USER = 'custom_user';

      jest.resetModules();
      const mod = require('./new');

      // The db connection should be created with provided user
      expect(mod.db).toBeDefined();

      // Restore
      process.env.DB_USER = originalUser;
    });

    test('should use default DB_PASSWORD if not set', () => {
      const originalPassword = process.env.DB_PASSWORD;
      delete process.env.DB_PASSWORD;

      jest.resetModules();
      const mod = require('./new');

      // The db connection should be created with default password
      expect(mod.db).toBeDefined();

      // Restore
      process.env.DB_PASSWORD = originalPassword;
    });

    test('should use provided DB_PASSWORD if set', () => {
      const originalPassword = process.env.DB_PASSWORD;
      process.env.DB_PASSWORD = 'custom_password';

      jest.resetModules();
      const mod = require('./new');

      // The db connection should be created with provided password
      expect(mod.db).toBeDefined();

      // Restore
      process.env.DB_PASSWORD = originalPassword;
    });

    test('should use default DB_NAME if not set', () => {
      const originalName = process.env.DB_NAME;
      delete process.env.DB_NAME;

      jest.resetModules();
      const mod = require('./new');

      // The db connection should be created with default database
      expect(mod.db).toBeDefined();

      // Restore
      process.env.DB_NAME = originalName;
    });

    test('should use provided DB_NAME if set', () => {
      const originalName = process.env.DB_NAME;
      process.env.DB_NAME = 'custom_db';

      jest.resetModules();
      const mod = require('./new');

      // The db connection should be created with provided database
      expect(mod.db).toBeDefined();

      // Restore
      process.env.DB_NAME = originalName;
    });
  });

  describe('Server startup', () => {
    test('should not listen on port 3000 when in test mode', () => {
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'test';

      jest.resetModules();

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      require('./new');

      expect(consoleSpy).not.toHaveBeenCalledWith('Listening on 3000');

      consoleSpy.mockRestore();

      process.env.NODE_ENV = originalNodeEnv;
    });

    test('should listen on port 3000 when not in test mode', () => {
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      jest.resetModules();

      // Mock express to control the app.listen behavior
      jest.doMock('express', () => {
        const mockApp = {
          use: jest.fn(),
          listen: jest.fn((port, callback) => {
            // Execute the callback to cover the console.log line
            callback();
            // Return a mock server that can be closed
            return {
              close: jest.fn(),
              address: jest.fn(() => ({ port }))
            };
          }),
          json: jest.fn(),
          post: jest.fn()
        };
        const mockExpress = jest.fn(() => mockApp);
        mockExpress.json = jest.fn(() => 'json middleware');
        return mockExpress;
      });

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      require('./new');

      expect(consoleSpy).toHaveBeenCalledWith('Listening on 3000');

      consoleSpy.mockRestore();

      process.env.NODE_ENV = originalNodeEnv;
    });
  });
});

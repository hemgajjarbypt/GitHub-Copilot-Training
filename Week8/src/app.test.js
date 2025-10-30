import request from "supertest";

describe("App", () => {
  it("should export the app", async () => {
    const { default: app } = await import('./app.js');
    expect(app).toBeDefined();
  });

  describe("Server start", () => {
    it("calls app.listen and logs message when NODE_ENV is not 'test'", async () => {
      const mockConsoleLog = jest.fn();
      jest.spyOn(console, 'log').mockImplementation(mockConsoleLog);
      const mockListen = jest.fn((port, callback) => {
        callback(); // Simulate the server starting and calling the callback
      });

      jest.resetModules();

      const actualExpress = jest.requireActual('express');
      const mockExpress = jest.fn(() => {
        const app = actualExpress();
        app.listen = mockListen;
        return app;
      });
      mockExpress.Router = actualExpress.Router;

      jest.doMock('express', () => mockExpress);
      jest.doMock('./routes/weather.js', () => actualExpress.Router());
      jest.doMock('./config/index.js', () => ({ config: { PORT: 3000 } }));

      process.env.NODE_ENV = 'development';

      await import('./app.js');

      expect(mockListen).toHaveBeenCalledWith(3000, expect.any(Function));
      expect(mockConsoleLog).toHaveBeenCalledWith('Server running on http://localhost:3000');

      jest.restoreAllMocks();
    });

    it("does not call app.listen when NODE_ENV is 'test'", async () => {
      const mockListen = jest.fn();

      jest.resetModules();

      const actualExpress = jest.requireActual('express');
      const mockExpress = jest.fn(() => {
        const app = actualExpress();
        app.listen = mockListen;
        return app;
      });
      mockExpress.Router = actualExpress.Router;

      jest.doMock('express', () => mockExpress);
      jest.doMock('./routes/weather.js', () => actualExpress.Router());
      jest.doMock('./config/index.js', () => ({ config: { PORT: 3000 } }));

      process.env.NODE_ENV = 'test';

      await import('./app.js');

      expect(mockListen).not.toHaveBeenCalled();

      jest.restoreAllMocks();
    });
  });
});

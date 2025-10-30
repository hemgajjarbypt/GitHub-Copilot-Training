describe("Cache Utils", () => {
  let getCache, setCache;
  let mockGet, mockSet;

  beforeEach(async () => {
    const mockNodeCache = jest.fn();
    mockGet = jest.fn();
    mockSet = jest.fn();
    const mockInstance = { get: mockGet, set: mockSet };
    mockNodeCache.mockImplementation(() => mockInstance);

    jest.doMock("node-cache", () => mockNodeCache);
    jest.resetModules();

    const module = await import("./cache.js");
    getCache = module.getCache;
    setCache = module.setCache;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get data from cache", () => {
    const key = "test_key";
    const value = "test_value";
    mockGet.mockReturnValue(value);

    const result = getCache(key);

    expect(mockGet).toHaveBeenCalledWith(key);
    expect(result).toBe(value);
  });

  it("should return undefined if key not found", () => {
    const key = "nonexistent_key";
    mockGet.mockReturnValue(undefined);

    const result = getCache(key);

    expect(mockGet).toHaveBeenCalledWith(key);
    expect(result).toBeUndefined();
  });

  it("should set data in cache", () => {
    const key = "test_key";
    const data = { some: "data" };

    setCache(key, data);

    expect(mockSet).toHaveBeenCalledWith(key, data);
  });

  it("should handle setting null data", () => {
    const key = "test_key";
    const data = null;

    setCache(key, data);

    expect(mockSet).toHaveBeenCalledWith(key, data);
  });

  it("should handle setting undefined data", () => {
    const key = "test_key";
    const data = undefined;

    setCache(key, data);

    expect(mockSet).toHaveBeenCalledWith(key, data);
  });

  it("should handle empty string key", () => {
    const key = "";
    const data = "some data";

    setCache(key, data);

    expect(mockSet).toHaveBeenCalledWith(key, data);
  });

  it("should handle numeric keys", () => {
    const key = 123;
    const data = "some data";

    setCache(key, data);

    expect(mockSet).toHaveBeenCalledWith(key, data);
  });

  it("should handle object keys", () => {
    const key = { id: 1 };
    const data = "some data";

    setCache(key, data);

    expect(mockSet).toHaveBeenCalledWith(key, data);
  });
});

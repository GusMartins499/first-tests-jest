const request = require("supertest");

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should authenticate with valid credentials", async () => {
    const user = await factory.create("User", {
      password: "1234",
    });

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "1234",
    });

    expect(response.status).toBe(200);
  });

  it("Should not authenticate with invalid credentials (password)", async () => {
    const user = await factory.create("User");

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "123456789",
    });

    expect(response.status).toBe(401);
  });

  it("Should return JWT token when authenticated", async () => {
    const user = await factory.create("User", {
      password: "1234",
    });

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "1234",
    });

    expect(response.body).toHaveProperty("token");
  });

  it("Should be able to access private routes when authenticated", async () => {
    const user = await factory.create("User", {
      password: "1234",
    });

    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it("Should not be able to access private routes without JWT token", async () => {
    const response = await request(app).get("/dashboard");

    expect(response.status).toBe(401);
  });

  it("Shoult not be able to access private routes with invalid JWT token", async () => {
    const user = await factory.create("User", {
      password: "1234",
    });

    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer ufh793bhfe`);

    expect(response.status).toBe(401);
  });

  it("Should not authenticate with invalid credentials (email)", async () => {
    const user = await factory.create("User");
    
    const response = await request(app).post("/sessions").send({
      email: "example@gmail.com",
      password: user.password_hash,
    });
    expect(response.status).toBe(401);
  });
});

import request from "supertest";
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from "vitest";
import { registerUseCase } from "../src/useCases/register.usecase.ts";
import { loginUseCase } from "../src/useCases/login.usecase.ts";
import { verifyToken } from "../src/infra/token/JWT.ts";

// Mocks hoisted by Vitest
vi.mock("../src/useCases/register.usecase.ts", () => ({
  registerUseCase: vi.fn(),
}));

vi.mock("../src/useCases/login.usecase.ts", () => ({
  loginUseCase: vi.fn(),
}));

const prismaMock = {
  user: {
    findUnique: vi.fn(),
  },
};

vi.mock("../src/lib/prisma.ts", () => ({
  prisma: prismaMock,
}));

vi.mock("../src/infra/token/JWT.ts", () => ({
  verifyToken: vi.fn(),
}));

const registerUseCaseMock = registerUseCase as unknown as Mock;
const loginUseCaseMock = loginUseCase as unknown as Mock;
const verifyTokenMock = verifyToken as unknown as Mock;

describe("Auth API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NODE_ENV = "test";
    process.env.SECRET = process.env.SECRET ?? "test-secret";
    // Set dummy DATABASE_URL for tests (Prisma is mocked, but initialization still reads env)
    process.env.DATABASE_URL =
      process.env.DATABASE_URL ?? "postgresql://test:test@localhost:5432/test";
  });

  afterEach(() => {
    prismaMock.user.findUnique.mockReset();
  });

  const getApp = async () => {
    const mod = await import("../src/server.ts");
    return mod.app;
  };

  it("GET / should respond with health message", async () => {
    const app = await getApp();

    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.text).toContain("Hello, the api is running!");
  });

  it("POST /register should create user and return id", async () => {
    const app = await getApp();
    registerUseCaseMock.mockResolvedValueOnce({ id: 1 });

    const payload = {
      name: "Test User",
      email: "user@example.com",
      password: "secret123",
    };

    const res = await request(app).post("/register").send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      message: "Usuário criado com sucesso!",
      userId: 1,
    });
    expect(registerUseCaseMock).toHaveBeenCalledWith(payload);
  });

  it("POST /register should return 400 on failure", async () => {
    const app = await getApp();
    registerUseCaseMock.mockRejectedValueOnce(new Error("db error"));

    const res = await request(app).post("/register").send({
      name: "Test User",
      email: "user@example.com",
      password: "secret123",
    });

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({ error: "Erro ao criar usuário" });
  });

  it("POST /login should return token on success", async () => {
    const app = await getApp();
    loginUseCaseMock.mockResolvedValueOnce("token-123");

    const res = await request(app).post("/login").send({
      email: "user@example.com",
      password: "secret123",
    });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ token: "token-123" });
  });

  it("POST /login should return 401 on auth error", async () => {
    const app = await getApp();
    loginUseCaseMock.mockRejectedValueOnce(new Error("bad credentials"));

    const res = await request(app).post("/login").send({
      email: "user@example.com",
      password: "wrong",
    });

    expect(res.status).toBe(401);
    expect(res.body).toMatchObject({ error: "Erro interno do servidor" });
  });

  it("GET /profile should return 401 when token is missing", async () => {
    const app = await getApp();

    const res = await request(app).get("/profile");

    expect(res.status).toBe(401);
    expect(res.body).toMatchObject({ error: "Token não fornecido" });
  });

  it("GET /profile should return user data when token is valid", async () => {
    const app = await getApp();
    verifyTokenMock.mockReturnValueOnce("user@example.com");
    prismaMock.user.findUnique.mockResolvedValueOnce({
      id: 1,
      email: "user@example.com",
      name: "Test User",
    });

    const res = await request(app)
      .get("/profile")
      .set("Authorization", "Bearer valid-token");

    expect(verifyTokenMock).toHaveBeenCalledWith("valid-token");
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: "user@example.com" },
      select: { id: true, email: true, name: true },
    });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      message: "Perfil do usuário",
      user: {
        id: 1,
        email: "user@example.com",
        name: "Test User",
      },
    });
  });
});

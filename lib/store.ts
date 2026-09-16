import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

export type UserRole = "member" | "admin";

export type User = {
  id: string;
  username: string;
  passwordHash: string;
  role: UserRole;
  referralCode: string | null;
  createdAt: string;
  active: boolean;
};

export type ReferralCode = {
  code: string;
  maxUses: number;
  usedCount: number;
  createdAt: string;
  active: boolean;
};

export type StoreData = {
  users: User[];
  referralCodes: ReferralCode[];
};

const dataDir = path.join(process.cwd(), "data");
const storePath = path.join(dataDir, "store.json");

function emptyStore(): StoreData {
  return { users: [], referralCodes: [] };
}

export function ensureStore(): StoreData {
  // ponytail: serverless(Vercel)는 읽기전용 FS — 쓰기 시도가 EROFS로 죽으므로
  // 읽기 실패 시 쓰지 않고 시드만 반환한다. 영속화가 필요하면 DB로 이전(README 참고).
  try {
    const raw = fs.readFileSync(storePath, "utf8");
    const parsed = JSON.parse(raw) as StoreData;
    if (Array.isArray(parsed.users) && Array.isArray(parsed.referralCodes)) {
      return parsed;
    }
  } catch {
    // 파일 없음/손상 — 아래에서 시드 반환
  }
  return seedStore();
}

function seedStore(): StoreData {
  const allowDevFallback = process.env.NODE_ENV !== "production";
  const adminUser =
    process.env.ADMIN_USERNAME?.trim() || (allowDevFallback ? "admin" : "");
  const adminPass =
    process.env.ADMIN_PASSWORD?.trim() ||
    (allowDevFallback ? "ChangeMeAdmin123!" : "");

  const passwordHash = bcrypt.hashSync(adminPass, 10);
  const now = new Date().toISOString();

  const codes: ReferralCode[] = [
    { code: "HJ-START-01", maxUses: 50, usedCount: 0, createdAt: now, active: true },
    { code: "HJ-FIELD-02", maxUses: 30, usedCount: 0, createdAt: now, active: true },
    { code: "HJ-WRITE-03", maxUses: 30, usedCount: 0, createdAt: now, active: true },
    { code: "HJ-LABOR-04", maxUses: 20, usedCount: 0, createdAt: now, active: true },
    { code: "HJ-GUEST-05", maxUses: 10, usedCount: 0, createdAt: now, active: true },
  ];

  const users: User[] = adminUser && adminPass
    ? [
        {
          id: "admin-1",
          username: adminUser,
          passwordHash,
          role: "admin",
          referralCode: null,
          createdAt: now,
          active: true,
        },
      ]
    : [];

  return { users, referralCodes: codes };
}

export function readStore(): StoreData {
  return ensureStore();
}

export function writeStore(data: StoreData): boolean {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(storePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch {
    // ponytail: 파일 저장소의 한계 — 실패를 호출자에게 알려 성공 위장을 막고, 운영 DB로 이전한다.
    return false;
  }
}

export function findUserByUsername(username: string): User | undefined {
  const store = readStore();
  return store.users.find(
    (u) => u.username.toLowerCase() === username.toLowerCase() && u.active,
  );
}

export function findReferral(code: string): ReferralCode | undefined {
  const store = readStore();
  return store.referralCodes.find(
    (c) => c.code.toUpperCase() === code.toUpperCase(),
  );
}

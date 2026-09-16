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
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(storePath)) {
    const seeded = seedStore();
    writeStore(seeded);
    return seeded;
  }

  try {
    const raw = fs.readFileSync(storePath, "utf8");
    const parsed = JSON.parse(raw) as StoreData;
    if (!parsed.users || !parsed.referralCodes) {
      const seeded = seedStore();
      writeStore(seeded);
      return seeded;
    }
    if (parsed.users.length === 0) {
      const seeded = seedStore();
      writeStore(seeded);
      return seeded;
    }
    return parsed;
  } catch {
    const seeded = seedStore();
    writeStore(seeded);
    return seeded;
  }
}

function seedStore(): StoreData {
  const adminUser =
    process.env.ADMIN_USERNAME?.trim() || "admin";
  const adminPass =
    process.env.ADMIN_PASSWORD?.trim() || "ChangeMeAdmin123!";

  const passwordHash = bcrypt.hashSync(adminPass, 10);
  const now = new Date().toISOString();

  const codes: ReferralCode[] = [
    { code: "HJ-START-01", maxUses: 50, usedCount: 0, createdAt: now, active: true },
    { code: "HJ-FIELD-02", maxUses: 30, usedCount: 0, createdAt: now, active: true },
    { code: "HJ-WRITE-03", maxUses: 30, usedCount: 0, createdAt: now, active: true },
    { code: "HJ-LABOR-04", maxUses: 20, usedCount: 0, createdAt: now, active: true },
    { code: "HJ-GUEST-05", maxUses: 10, usedCount: 0, createdAt: now, active: true },
  ];

  const users: User[] = [
    {
      id: "admin-1",
      username: adminUser,
      passwordHash,
      role: "admin",
      referralCode: null,
      createdAt: now,
      active: true,
    },
  ];

  return { users, referralCodes: codes };
}

export function readStore(): StoreData {
  return ensureStore();
}

export function writeStore(data: StoreData): void {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(storePath, JSON.stringify(data, null, 2), "utf8");
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

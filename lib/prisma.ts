import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Required for Neon to work in local Node.js environments (Bloemfontein/Local Dev)
if (typeof window === 'undefined') {
  neonConfig.webSocketConstructor = ws;
}

// 1. Setup the connection string
const connectionString = process.env.DATABASE_URL!;

// 2. Create the Pool (PrismaNeon requires a Pool, not the neon() HTTP client)
const pool = new Pool({ connectionString });
// Faster alternative for Prisma 7.8.0
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
// 3. Prevent multiple instances of Prisma Client in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = 
  globalForPrisma.prisma || 
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
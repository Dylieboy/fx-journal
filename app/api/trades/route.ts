// app/api/trades/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Only fetch trades belonging to this specific user
  const trades = await prisma.trade.findMany({
    where: { userId: userId },
    orderBy: { date: 'desc' }
  });
  
  return NextResponse.json(trades);
}

export async function POST(request: Request) {
  const body = await request.json();
  const trade = await prisma.trade.create({
    data: {
      market: body.market,
      lots: body.lots,
      date: body.date,
      lose: body.lose,
      target: body.target,
      actual: body.actual,
      outcome: body.outcome,
      setup: body.setup,
      notes: body.notes,
      userId: body.userId, // Link to the current user
    }
  });
  return NextResponse.json(trade);
}
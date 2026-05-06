import { sql } from '@vercel/postgres';

export interface Trade {
  id?: number;
  pair: string;
  lot_size: number;
  entry_price: number;
  exit_price?: number;
  status: 'WIN' | 'LOSS' | 'OPEN';
  profit_loss: number;
  created_at?: string;
}

// This is for your local testing before Vercel is connected
export const mockTrades: Trade[] = [
  { pair: 'XAUUSD', lot_size: 0.5, entry_price: 2350.50, status: 'WIN', profit_loss: 150.00 },
  { pair: 'EURUSD', lot_size: 1.0, entry_price: 1.0850, status: 'LOSS', profit_loss: -80.00 },
];
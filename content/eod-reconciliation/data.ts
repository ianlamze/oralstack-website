import type { ModeSummary, Transaction } from "./types";

// 14 transactions across the day. One PayNow row at 14:32 has invoice=null —
// that's the demo's mismatch. The summary expects an invoice match for every
// payment, so the variance flags as S$50 unaccounted.

export const transactions: Transaction[] = [
  {
    id: "t1",
    time: "09:14",
    mode: "PayNow",
    amount: 180,
    patientName: "A. Tan",
    invoice: "INV-0418",
  },
  {
    id: "t2",
    time: "09:42",
    mode: "Card",
    amount: 220,
    patientName: "Devi K.",
    invoice: "INV-0419",
  },
  {
    id: "t3",
    time: "10:18",
    mode: "Cash",
    amount: 80,
    patientName: "Aaron T.",
    invoice: "INV-0420",
  },
  {
    id: "t4",
    time: "10:55",
    mode: "PayNow",
    amount: 1700,
    patientName: "Lim Wei Jian",
    invoice: "INV-0421",
  },
  {
    id: "t5",
    time: "11:30",
    mode: "Card",
    amount: 450,
    patientName: "Mei Lin Tan",
    invoice: "INV-0422",
  },
  {
    id: "t6",
    time: "12:05",
    mode: "Cash",
    amount: 120,
    patientName: "Hafiz Y.",
    invoice: "INV-0423",
  },
  {
    id: "t7",
    time: "13:22",
    mode: "PayNow",
    amount: 380,
    patientName: "K. Lee",
    invoice: "INV-0424",
  },
  {
    id: "t8",
    time: "13:55",
    mode: "Card",
    amount: 220,
    patientName: "J. Ong",
    invoice: "INV-0425",
  },
  // The mismatch — PayNow received but no invoice on file
  {
    id: "t9",
    time: "14:32",
    mode: "PayNow",
    amount: 50,
    patientName: "Walk-in (unknown)",
    invoice: null,
  },
  {
    id: "t10",
    time: "14:50",
    mode: "Bank",
    amount: 850,
    patientName: "Dr Pereira (provider draw)",
    invoice: "INV-0426",
  },
  {
    id: "t11",
    time: "15:20",
    mode: "Cash",
    amount: 60,
    patientName: "M. Devi",
    invoice: "INV-0427",
  },
  {
    id: "t12",
    time: "15:48",
    mode: "Card",
    amount: 980,
    patientName: "Dr Lim's patient",
    invoice: "INV-0428",
  },
  {
    id: "t13",
    time: "16:30",
    mode: "PayNow",
    amount: 140,
    patientName: "Aaron T. (recall)",
    invoice: "INV-0429",
  },
  {
    id: "t14",
    time: "17:05",
    mode: "PayNow",
    amount: 280,
    patientName: "S. Chong",
    invoice: "INV-0430",
  },
];

export function summarize(txs: Transaction[]): {
  byMode: ModeSummary[];
  collected: number;
  expected: number;
  unmatched: Transaction[];
  invoicesIssued: number;
  gst: number;
} {
  const byModeMap = new Map<string, ModeSummary>();
  let collected = 0;
  let expected = 0;
  const unmatched: Transaction[] = [];
  const invoicesSet = new Set<string>();

  for (const t of txs) {
    collected += t.amount;
    if (t.invoice) {
      expected += t.amount;
      invoicesSet.add(t.invoice);
    } else {
      unmatched.push(t);
    }

    const cur = byModeMap.get(t.mode) ?? {
      mode: t.mode as ModeSummary["mode"],
      collected: 0,
      expected: 0,
      count: 0,
    };
    cur.collected += t.amount;
    if (t.invoice) cur.expected += t.amount;
    cur.count += 1;
    byModeMap.set(t.mode, cur);
  }

  return {
    byMode: Array.from(byModeMap.values()),
    collected,
    expected,
    unmatched,
    invoicesIssued: invoicesSet.size,
    gst: Math.round((expected / 1.09) * 0.09 * 100) / 100,
  };
}

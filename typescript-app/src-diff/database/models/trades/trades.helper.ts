interface IBaseHelperParameters {
  tp: number;
  sl: number;
  entry: number;
}

interface IModifier extends IBaseHelperParameters {
  shortLong: boolean;
}

interface ICalculator extends IBaseHelperParameters {
  wl: boolean;
  size?: number;
}

export function modifier({ shortLong, tp, sl, entry }: IModifier) {
  if (shortLong !== undefined) {
    if (shortLong) {
      if (tp && sl) {
        if (entry > tp) throw new Error("TP must be greater than from entry point!");
        if (entry < sl) throw new Error("SL must be less than from entry point!");
      }
    } else {
      if (tp && sl) {
        if (entry < tp) throw new Error("TP must be less than from entry point!");
        if (entry > sl) throw new Error("SL must be greater than from entry point!");
      }
    }
  }
}

export function calculateProfit({ entry, tp, sl, size, wl }: ICalculator): number {
  if (!tp || !sl || !size) throw new Error("TP, SL AND SIZE required!");
  if (wl === false) return Math.abs(size * (entry - sl)) * -1;
  return Math.abs(size * (tp - entry));
}

export function calculateR({ entry, tp, sl, wl }: ICalculator): number {
  if (!tp || !sl) throw new Error("TP AND SL required!");
  if (wl === false) return -1;
  return Math.abs((tp - entry) / (entry - sl));
}

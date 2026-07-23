import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return format(date, "yyyy年MM月dd日", { locale: zhCN });
}

export function formatDateISO(dateStr: string): string {
  return new Date(dateStr).toISOString();
}

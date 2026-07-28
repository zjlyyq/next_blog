import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

export function formatDate(dateStr: string): string {
  if (!dateStr) return "未知日期";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "未知日期";
  return format(date, "yyyy年MM月dd日", { locale: zhCN });
}

export function formatDateISO(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  return date.toISOString();
}

export function apiResponse<T>(
  data?: T,
  message?: string,
  meta?: Record<string, any>,
) {
  const out: any = { success: true };
  if (message) out.message = message;
  if (meta) out.meta = meta;
  out.data = data === undefined ? null : data;
  return out;
}

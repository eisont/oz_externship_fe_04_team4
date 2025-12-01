// src/utils/format.ts

/**
 * ISO 날짜/시간 문자열을 원하는 길이만큼 잘라주는 유틸
 * 예: '2025-11-20T00:00:05.875842+09:00' → size=16 → '2025-11-20T00:00'
 */
export function sliceDateTime(value?: string | null, size = 16): string {
  if (!value) return ''

  const normalized = value.replace('T', ' ')

  if (normalized.length <= size) return normalized

  return normalized.slice(0, size)
}

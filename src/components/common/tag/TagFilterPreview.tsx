import type { RecruitmentTag } from '@/mocks/types/accounts'

const WRAPPER_STYLE = 'flex gap-0.5 truncate text-sm text-[#374151]'

type Props = {
  tags: RecruitmentTag[]
}

export default function TagFilterPreview({ tags }: Props) {
  const joined = tags.join('')
  const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(tags.join(''))
  const hasTags = tags.length > 0
  const isMultiTag = tags.length > 1

  if (!hasTags) {
    return (
      <div className={WRAPPER_STYLE}>
        {tags.length
          ? tags.map((el) => (
              <div
                key={el.id}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
              >
                {el.name}
              </div>
            ))
          : '태그 입력'}
      </div>
    )
  }
  if (!isKorean) {
    const isLong = joined.length > 30
    if (isLong && isMultiTag) {
      const englishVisible = tags.join('&^').slice(0, 25).split('&^')

      const restCount = tags.length - englishVisible.length

      return (
        <div className={WRAPPER_STYLE}>
          {englishVisible.map((el) => (
            <div
              key={el}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
            >
              {el}
            </div>
          ))}
          {restCount > 0 && (
            <div className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
              {`+ ${restCount}`}
            </div>
          )}
        </div>
      )
    } // (2) 한 개만 있고 길이 김 → 한 개만 길이 제한해서 보여주기
    if (isLong && !isMultiTag) {
      return (
        <div className={WRAPPER_STYLE}>
          {tags.map((el) => (
            <div
              key={el.id}
              className="max-w-[210px] truncate rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
            >
              {el.name}
            </div>
          ))}
        </div>
      )
    }

    // (3) 길이도 안 김 → 전부 그대로 노출
    return (
      <div className={WRAPPER_STYLE}>
        {tags.map((el) => (
          <div
            key={el.id}
            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
          >
            {el.name}
          </div>
        ))}
      </div>
    )
  }

  // -----------------------------
  // 2) 한글이 포함된 경우
  // -----------------------------
  const isLongKorean = joined.length > 16

  if (isLongKorean) {
    const koreanVisible = tags.join('&^').slice(0, 16).split('&^')

    const restCount = tags.length - koreanVisible.length

    return (
      <div className={WRAPPER_STYLE}>
        {koreanVisible.map((el) => (
          <div
            key={el}
            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
          >
            {el}
          </div>
        ))}
        {restCount > 0 && (
          <div className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
            {`+ ${restCount}`}
          </div>
        )}
      </div>
    )
  }

  // (한글인데 전체 길이는 안 김) → 그대로 노출
  return (
    <div className={WRAPPER_STYLE}>
      {tags.map((el) => (
        <div
          key={el.id}
          className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
        >
          {el.name}
        </div>
      ))}
    </div>
  )
}

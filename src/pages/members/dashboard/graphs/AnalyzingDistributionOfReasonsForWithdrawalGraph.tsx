import axios from 'axios'
import { useEffect, useState } from 'react'

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import type {
  PieApiItem,
  PieApiResponse,
  PieChartProps,
} from '@/pages/members/dashboard/graphs/types'

const COLORS = [
  '#6366F1',
  '#FACC15',
  '#EF4444',
  '#10B981',
  '#3B82F6',
  '#F97316',
  '#8B5CF6',
  '#14B8A6',
  '#A3E635',
]

export default function AnalyzingDistributionOfReasonsForWithdrawalGraph({
  isAnimationActive = true,
  apiUrl,
  title,
  height = 320,
}: PieChartProps) {
  const [data, setData] = useState<PieApiItem[]>([])
  const [_rawData, setRawData] = useState<PieApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setErrorMessage(null)
    axios
      .get<PieApiResponse>(apiUrl, {
        headers: {
          Authorization: 'Bearer token_value',
        },
      })
      .then((res) => {
        const mapped = res.data.items.map((item) => ({
          label: item.reason_label,
          value: item.percentage,
        }))

        setRawData(res.data)
        setData(mapped)
      })
      .catch((error) => {
        console.error(error)
        setErrorMessage('데이터를 불러오는 중 오류가 발생했습니다.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [apiUrl])

  if (loading) {
    return (
      <div
        className="flex w-full items-center justify-center"
        style={{ height }}
      >
        <p className="text-sm text-gray-500">로딩중...</p>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div
        className="flex w-full items-center justify-center"
        style={{ height }}
      >
        <p className="text-sm text-red-500">{errorMessage}</p>
      </div>
    )
  }

  if (!data.length) {
    return (
      <div
        className="flex w-full items-center justify-center"
        style={{ height }}
      >
        <p className="text-sm text-gray-400">표시할 데이터가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="border-box mx-auto flex w-full flex-col">
      {title && (
        <h2 className="mb-7 text-lg font-semibold text-gray-800">{title}</h2>
      )}

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius="50%"
              outerRadius="80%"
              fill="#82ca9d"
              label={({ value }) => `${value}%`}
              isAnimationActive={isAnimationActive}
              paddingAngle={4}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend
              align="right"
              layout="vertical"
              verticalAlign="middle"
              iconType="circle"
              content={<CustomLegend />}
            />
            <Tooltip
              formatter={(value: number, name: string, props: any) => {
                const { payload } = props
                return [`${value}%`, payload.label]
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export const CustomLegend = ({ payload }: any) => {
  return (
    <ul className="">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center gap-2">
          <span
            className="inline-block h-3 w-3 rounded-sm"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-600">{entry.value}</span>
        </li>
      ))}
    </ul>
  )
}

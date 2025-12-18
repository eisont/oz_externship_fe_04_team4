import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { axiosInstance } from '@/api/axios'
import { API_URL } from '@/config/api'

export interface PresignedUrlRequest {
  type: 'USER_PROFILE_IMAGE'
  content_type: string
  file_name: string
  file_ext: string
}

export interface PresignedUrlResponse {
  upload_url: string
  file_url: string
}

const getPresignedUrl = async (
  params: PresignedUrlRequest
): Promise<PresignedUrlResponse> => {
  const response = await axiosInstance.get(`${API_URL}/s3-presigned-url`, {
    params,
  })

  console.log('서버에서 온 데이터:', `${API_URL}/s3-presigned-url`) // 여기서 구조를 눈으로 확인하세요!
  console.log('서버에서 온 데이터:', response.data) // 여기서 구조를 눈으로 확인하세요!
  return response.data
}
const uploadFileToS3 = async (uploadUrl: string, file: File) => {
  // 🔥 S3 업로드는 '순수 axios'를 사용해야 합니다. (BaseURL 영향 방지)
  await axios.put(uploadUrl, file, {
    headers: { 'Content-Type': file.type },
  })
}

export const useS3Upload = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      // 1. URL 가져오기
      const response = await getPresignedUrl({
        type: 'USER_PROFILE_IMAGE',
        content_type: file.type,
        file_name: file.name,
        file_ext: file.name.split('.').pop() || '',
      })

      const { upload_url, file_url } = response

      // 2. S3 업로드
      await uploadFileToS3(upload_url, file)

      // 3. 최종 URL 반환
      return file_url
    },
    onSuccess: (_fileUrl) => {
      alert(`업로드 완료!`)
    },
    onError: (_error) => {
      alert('업로드에 실패했습니다. 다시 시도해주세요.')
    },
  })
}

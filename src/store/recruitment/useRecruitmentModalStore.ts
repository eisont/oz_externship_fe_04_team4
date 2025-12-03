import { create } from 'zustand'

type TagFilterModalState = {
  isTagFilterModalOpen: boolean

  openTagFilterModalModal: () => void
  closeTagFilterModalModal: () => void
  toggleTagFilterModalModal: () => void
}
type DetailModalState = {
  isDetailOpen: boolean

  openDetailModal: () => void
  closeDetailModal: () => void
  toggleDetailModal: () => void
}

export const useTagFilterModalModalStore = create<TagFilterModalState>(
  (set) => ({
    isTagFilterModalOpen: false,

    openTagFilterModalModal: () => set({ isTagFilterModalOpen: true }),
    closeTagFilterModalModal: () => set({ isTagFilterModalOpen: false }),
    toggleTagFilterModalModal: () =>
      set((state) => ({ isTagFilterModalOpen: !state.isTagFilterModalOpen })),
  })
)

export const useDetailModalStore = create<DetailModalState>((set) => ({
  isDetailOpen: false,

  openDetailModal: () => set({ isDetailOpen: true }),
  closeDetailModal: () => set({ isDetailOpen: false }),
  toggleDetailModal: () =>
    set((state) => ({ isDetailOpen: !state.isDetailOpen })),
}))

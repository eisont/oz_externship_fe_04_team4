import { create } from 'zustand'

type DetailModalState = {
  isDetailModalOpen: boolean
  application_id: number | null

  openDetailModal: (value: number) => void
  closeDetailModal: () => void
  toggleDetailModal: () => void
}

export const useApplicationDetailModalStore = create<DetailModalState>(
  (set) => ({
    isDetailModalOpen: false,
    application_id: null,

    openDetailModal: (id) =>
      set({ isDetailModalOpen: true, application_id: id }),

    closeDetailModal: () => set({ isDetailModalOpen: false }),

    toggleDetailModal: () =>
      set((state) => ({ isDetailModalOpen: !state.isDetailModalOpen })),
  })
)

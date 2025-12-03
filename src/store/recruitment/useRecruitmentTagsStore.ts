import { create } from 'zustand'

import type { RecruitmentTag } from '@/mocks/types/accounts'

type TagsState = {
  selectedTags: RecruitmentTag[]

  setSelectedTags: (tags: RecruitmentTag[]) => void
  toggleTag: (tag: RecruitmentTag) => void
  deleteSelectedTag: (tag: RecruitmentTag) => void
  resetSelectedTags: () => void
}

export const useRecruitmentTagsStore = create<TagsState>((set) => ({
  selectedTags: [],

  setSelectedTags: (tags) => set({ selectedTags: tags }),

  toggleTag: (tag) =>
    set((state) => {
      const isSelectedID = state.selectedTags.find((t) => t.id === tag.id)

      if (isSelectedID) {
        return {
          selectedTags: state.selectedTags.filter((t) => t.id !== tag.id),
        }
      }

      return {
        selectedTags: [...state.selectedTags, tag],
      }
    }),

  deleteSelectedTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.filter((t) => t.id !== tag.id),
    })),

  resetSelectedTags: () => set({ selectedTags: [] }),
}))

type TagsResultState = {
  selectedTagsResult: RecruitmentTag[]

  setSelectedTagsResult: (tags: RecruitmentTag[]) => void
}

export const useRecruitmentTagListStore = create<TagsResultState>((set) => ({
  selectedTagsResult: [],

  setSelectedTagsResult: (tags) => set({ selectedTagsResult: tags }),
}))

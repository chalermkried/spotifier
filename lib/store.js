import create from 'zustand'

const useStore = create((set) => ({
  search: undefined,
  setSearch: (newQuery) => set(() => ({ search: newQuery })),
}))

export default useStore

import { defineStore } from 'pinia'
import { getApiList } from '@/server'
import type { RootObject,Children } from './type'

export const useStore = defineStore({
  id: 'counter',
  state: () => ({
    list: <RootObject>{},
    item:<Children[]>[],
  }),
  getters: {
  },
  actions: {
    async getList() {
      this.list = await getApiList()
    }
  }
})

import { defineStore } from 'pinia'
import { getApiList } from '@/server'
import type { RootObject } from './type'

export const useStore = defineStore({
  id: 'counter',
  state: () => ({
    list: <RootObject>{}
  }),
  getters: {
  },
  actions: {
    async getList() {
      this.list = await getApiList()
    }
  }
})

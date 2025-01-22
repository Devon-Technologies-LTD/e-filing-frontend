import { userConfig } from "@/lib/_api/user-config"
import { TActivatorPayload, TDeleteObjectFormPayload, TSectionCreateFormPayload } from "@/lib/_definitions"

const SectionService = {
  async getSection(NEXT_PUBLIC_SECTION_ID: string) {
    return await userConfig.get(`/sections/${NEXT_PUBLIC_SECTION_ID}`)
  },
  async getSections(size = 1000, page = 1) {
    return await userConfig.get(`/sections?page=${page}${size && `&size=${size}`}`)
  },
  async createSection(payload: TSectionCreateFormPayload) {
    return await userConfig.post(`/sections`, payload)
  },
  async updateSection(id: string, payload: Partial<TSectionCreateFormPayload>) {
    return await userConfig.patch(`/sections/${id}`, payload)
  },
  async updateSectionStatus(id: string, payload: TActivatorPayload) {
    return await userConfig.patch(`/sections/activate/${id}`, payload)
  },
  async deleteSection(payload: TDeleteObjectFormPayload) {
    return await userConfig.delete(`/sections/${payload.id}`)
  },
  async searchSection(query: string) {
    return await userConfig.get(`/sections?${query}`)
  },
  async generateQRCode(id: string) {
    return await userConfig.get(`/sections/generate_qr/${id}`, {
      headers: {
        Accept: 'image/png',
        'Content-Type': 'image/png',
      },
      responseType: 'arraybuffer',
    })
  },
}

export default SectionService


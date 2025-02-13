import { userConfig } from "@/lib/_api/user-config"
import { TActivatorPayload, TDeleteObjectFormPayload, TStaffCreate } from "@/lib/_definitions"

const UserService = {
  async getUser(id: string) {
    return await userConfig.get(`/staffs/${id}`)
  },
  async getUsers() {
    return await userConfig.get(`/staffs`)
  },
  async createUser(payload: TStaffCreate) {
    return await userConfig.post(`/staffs`, payload)
  },
  async getGenders() {
    return await userConfig.get(`/staffs/genders`)
  },
  async getUserRoles() {
    return await userConfig.get(`/staffs/staff_roles`)
  },
  async deleteUser(payload: TDeleteObjectFormPayload) {
    return await userConfig.delete(`/staffs/${payload.id}`)
  },
  async updateUser(payload: Partial<TStaffCreate>, id: string) {
    return await userConfig.patch(`/staffs/${id}`, payload)
  },
  async uploadImage(id: string, formData: FormData) {
    return await userConfig.patch(`/staffs/upload_passport/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  async updateStaffStatus(id: string, payload: TActivatorPayload) {
    return await userConfig.patch(`/staffs/activate/${id}`, payload)
  },
}

export default UserService

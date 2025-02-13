import axios from "axios"
import { NEXT_BASE_URL } from "@/lib/_constants"

const authConfig = axios.create({
  baseURL: NEXT_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})
export { authConfig }

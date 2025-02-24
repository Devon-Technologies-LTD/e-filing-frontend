import axios from "axios"
import { NEXT_BASE_URL } from "@/lib/_constants"
import { cookies } from "next/headers";


const authConfig = axios.create({
  baseURL: NEXT_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

const token = cookies().get("TempToken")?.value;
console.log("temp tokens "+token);
const authTemp = axios.create({
  baseURL: NEXT_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    Authorization: {token},
  },
})



export { authConfig, authTemp }

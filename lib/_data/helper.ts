import { redirect } from 'next/navigation'
import { deleteSession, verifySession } from '../server/auth'

export async function validateRequest() {
  const session = await verifySession()
  if (!session) {
    deleteSession()
    redirect('/login')
  }
}


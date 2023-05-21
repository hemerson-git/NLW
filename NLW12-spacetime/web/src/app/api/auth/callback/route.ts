import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const redirectTo = request.cookies.get('redirectTo')?.value

  console.log(redirectTo)

  const registerResponse = await api.post('/register', {
    code,
  })

  const token = registerResponse.data

  const redirectUrl = redirectTo ?? new URL('/', request.url)

  const cookiesExpiresInSeconds = 60 * 60 * 24 * 7 // Sec * min * hours * days

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookiesExpiresInSeconds}`,
    },
  })
}

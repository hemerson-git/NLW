import { ReactNode } from 'react'
import { cookies } from 'next/headers'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'

import '../style/globals.css'

import { Copyright } from '@/components/Copyright'
import { Hero } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { SignIn } from '@/components/SignIn'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-bai-jamjuree',
})

export const metadata = {
  title: 'NLW Spacetime',
  description: 'Uma capsula do tempo construída com React, NextJS e tailwind',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('token')

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-rows-2 lg:grid-cols-2 lg:grid-rows-none">
          {/* Left */}
          <div className="relative flex flex-col items-start  justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] px-28 py-16">
            <div className="absolute right-0 top-1/2 h-[278px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />
            <div className="absolute bottom-0 right-2 top-0 w-2  bg-stripes pr-2" />

            {isAuthenticated ? <Profile /> : <SignIn />}

            <Hero />

            <Copyright />
          </div>

          {/* Right */}
          <div className="flex flex-col overflow-y-scroll bg-[url(../assets/bg-stars.svg)] md:max-h-screen">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}

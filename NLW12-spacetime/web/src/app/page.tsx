import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import { ArrowRight } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

type Memory = {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

const dateFormat = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) return <EmptyMemories />

  const token = cookies().get('token')?.value

  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories: Memory[] = response.data

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => {
        const date = dateFormat.formatToParts(new Date(memory.createdAt))

        return (
          <div key={memory.id} className="space-y-4">
            <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
              {`${date[0].value} de ${date[2].value}, ${date[4].value}`}
            </time>

            <Image
              src={memory.coverUrl}
              width={592}
              height={280}
              alt=""
              className="aspect-video w-full rounded-lg object-cover"
            />

            <p className="text-lg leading-relaxed text-gray-100">
              {memory.excerpt}
            </p>

            <Link
              href={`/memories/${memory.id}`}
              className="
                  flex items-center gap-2 text-sm text-gray-200 transition-colors 
                  hover:text-gray-100
                "
            >
              Ler mais
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )
      })}
    </div>
  )
}

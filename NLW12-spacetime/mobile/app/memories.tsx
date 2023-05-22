import { useEffect, useState, useCallback } from 'react'
import { View, TouchableOpacity, ScrollView, Text, Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from '@expo/vector-icons/Feather'
import * as SecureStore from 'expo-secure-store'
import { Link, useRouter } from 'expo-router'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'

import Logo from '../src/assets/logo.svg'
import { api } from '../src/services/api'

dayjs.locale(ptBr)

type Memory = {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

export default function Memories() {
  const { top, bottom } = useSafeAreaInsets()
  const [memories, setMemories] = useState<Memory[]>([])
  const router = useRouter()

  async function handleLogOut() {
    await SecureStore.deleteItemAsync('token')
    router.push('/')
  }

  const getMemories = useCallback(async () => {
    const token = await SecureStore.getItemAsync('token')

    const resp = await api.get('/memories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log(resp.data)

    setMemories(resp.data)
  }, [])

  useEffect(() => {
    getMemories()
  }, [getMemories])

  if (!(memories.length > 0)) return null

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingTop: top, paddingBottom: bottom + 40 }}
    >
      <View className="mt-4 flex-row items-center justify-between px-8">
        <Logo />

        <TouchableOpacity
          onPress={handleLogOut}
          className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
        >
          <Icon name="log-out" size={16} color="#000" />
        </TouchableOpacity>

        <Link href="/new" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
            <Icon name="plus" size={16} color="#000" />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6 space-y-10">
        {memories.map((memory) => (
          <View className="space-y-4" key={memory.id}>
            <View className="flex-row items-center gap-2">
              <View className="h-px w-5 bg-gray-50" />
              <Text className="font-body text-xs text-gray-100">
                {dayjs(memory.createdAt).format('D [ de ] MMMM [, ] YYYY')}
              </Text>
            </View>
            <View className="space-y-4 px-8">
              <Image
                source={{ uri: memory.coverUrl }}
                alt=""
                className="aspect-video w-full rounded-lg"
              />

              <Text className="font-body text-base leading-relaxed text-gray-100">
                {memory.excerpt}
              </Text>

              <Link href="/memories/id" asChild>
                <TouchableOpacity className="flex-row items-center gap-2">
                  <Text className="font-body text-sm text-gray-200">
                    Ler mais
                  </Text>
                  <Icon name="arrow-right" size={16} color="#9E9ea8" />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

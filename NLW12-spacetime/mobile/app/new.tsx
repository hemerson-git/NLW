import { useState } from 'react'
import {
  View,
  TouchableOpacity,
  Switch,
  Text,
  TextInput,
  ScrollView,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from '@expo/vector-icons/Feather'

import Logo from '../src/assets/logo.svg'
import { Link } from 'expo-router'

export default function NewMemories() {
  const { top, bottom } = useSafeAreaInsets()
  const [isPublic, setIsPublic] = useState(false)

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingTop: top, paddingBottom: bottom }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <Logo />

        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={16} color="#FFF" />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            thumbColor={isPublic ? '#9b79ea' : '#9e9ea0'}
            trackColor={{ false: '#767577', true: '#372560' }}
          />
          <Text>Tornar memória pública</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="h-32 justify-center rounded-lg border-dashed border-gray-500 bg-black/20"
        >
          <View className="flex-row items-center justify-center gap-2">
            <Icon name="image" color="#FFF" />
            <Text className="font-body text-sm text-gray-200">
              Adicionar fot ou vídeo de capa
            </Text>
          </View>
        </TouchableOpacity>

        <TextInput
          multiline
          className="p-0 font-body text-lg text-gray-50"
          placeholderTextColor={'#56565a'}
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que 
            você quer lembrar para sempre"
        />

        <TouchableOpacity
          className="items-center rounded-full bg-green-500 px-5 py-2"
          activeOpacity={0.7}
          onPress={() => {}}
        >
          <Text className="font-alt text-sm uppercase text-black">Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

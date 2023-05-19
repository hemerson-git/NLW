import { useEffect } from 'react'
import { Text, ImageBackground, View, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'
import { styled } from 'nativewind'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session'
import * as SecureStore from 'expo-secure-store'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'
import Logo from '../src/assets/logo.svg'
import { api } from '../src/services/api'

const StyledStripes = styled(Stripes)
const StyledLogo = styled(Logo)

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/06a93d7b3788425e565f',
}

export default function App() {
  const router = useRouter()

  const [hasLoadedFonts] = useFonts({
    BaiJamjuree_700Bold,
    Roboto_400Regular,
    Roboto_700Bold,
  })

  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '06a93d7b3788425e565f',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime',
      }),
    },
    discovery,
  )

  async function handleGithubOAuthCode(code: string) {
    try {
      const apiResponse = await api.post('/register', {
        code,
      })

      const token = apiResponse.data

      await SecureStore.setItemAsync('token', token)

      console.log('TOKEN: ', token)

      router.push('/memories')
    } catch (err) {
      console.log('Error: ' + err)
    }
  }

  useEffect(() => {
    ;(async () => {
      if (response?.type === 'success') {
        const { code } = response.params
        handleGithubOAuthCode(code)
      }
    })()
  }, [response])

  if (!hasLoadedFonts) return null

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 items-center bg-gray-900 px-8 py-10"
      imageStyle={{
        position: 'absolute',
        left: '-100%',
      }}
    >
      <StyledStripes className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <StyledLogo />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>

          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          className="rounded-full bg-green-500 px-5 py-2"
          activeOpacity={0.7}
          onPress={() => signInWithGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>

      <StatusBar style="light" backgroundColor="transparent" translucent />
    </ImageBackground>
  )
}

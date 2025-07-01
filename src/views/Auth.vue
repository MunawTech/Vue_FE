<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-200">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-cyan-700 mb-6">
        {{ isLogin ? 'Login to Daily Life' : 'Register New Account' }}
      </h2>

      <form @submit.prevent="isLogin ? login() : register()" class="space-y-4">
        <input v-model="email" type="email" placeholder="Email"
          class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-cyan-400" />
        <input v-model="password" type="password" placeholder="Password"
          class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-cyan-400" />

        <button type="submit"
          class="w-full bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700 transition">
          {{ isLogin ? 'Login' : 'Register' }}
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
        <button @click="toggleForm" class="text-cyan-700 font-semibold ml-1 hover:underline">
          {{ isLogin ? 'Register' : 'Login' }}
        </button>
      </p>

      <p v-if="errorMessage" class="mt-4 text-center text-red-500">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase' // pastikan path ini benar

export default {
  name: "AuthView",
  data() {
    return {
      email: '',
      password: '',
      isLogin: true,
      errorMessage: ''
    }
  },
  methods: {
    async login() {
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password)
        this.$router.push('/dashboard')
      } catch (error) {
        this.errorMessage = error.message
      }
    },
    async register() {
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password)
        this.$router.push('/dashboard')
      } catch (error) {
        this.errorMessage = error.message
      }
    },
    toggleForm() {
      this.isLogin = !this.isLogin
      this.errorMessage = ''
    }
  }
}
</script>


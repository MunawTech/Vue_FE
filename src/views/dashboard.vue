<template>
  <div class="min-h-[100vh] bg-gradient-to-br from-blue-100 to-cyan-200 pb-20">
    <!-- Navbar -->
    <nav class="bg-cyan-700 text-white py-4 shadow-md">
      <div class="container mx-auto px-6">
        <h1 class="text-2xl font-bold">Daily Life</h1>
      </div>
    </nav>

    <!-- Main Container -->
    <div class="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <!-- Add Task -->
      <h2 class="text-xl font-semibold text-cyan-700 mb-4">Add Your Task</h2>
      <form @submit.prevent="addTask" class="space-y-4">
        <input v-model="newTask.title" type="text" placeholder="Activity Title"
          class="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-cyan-400" />
        <input v-model="newTask.date" type="date"
          class="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-cyan-400" />
        <button type="submit"
          class="w-full bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700 transition">Add Task</button>
      </form>

      <!-- Notification -->
      <div v-if="notifMessage" class="mt-4 px-4 py-2 bg-green-100 text-green-700 rounded-md shadow">
        {{ notifMessage }}
      </div>
    </div>

    <!-- Task List -->
    <div class="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg mb-12">
      <h2 class="text-xl font-semibold text-cyan-700 mb-4">Your Task</h2>

      <div v-if="tasks.length === 0" class="text-gray-500 italic">No tasks yet.</div>

      <div v-else>
        <div
          v-for="(task, index) in tasks"
          :key="task.id || index"
          class="flex items-center justify-between bg-cyan-50 p-4 mb-3 rounded-md shadow-sm hover:shadow-md transition"
        >
          <!-- Left (checkbox + text) -->
          <div class="flex items-center gap-3">
            <input
            type="checkbox"
            :checked="task.completed == 1"
            @change="toggleComplete(task)"
            class="h-5 w-5 text-cyan-600"
            />

            <div :class="{ 'line-through text-gray-400': task.completed }" class="text-base">
              {{ task.title }}
              <p class="text-sm text-gray-500 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="currentColor" class="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                {{ task.date }}
              </p>
            </div>
          </div>

         <!-- Right (edit/delete buttons) -->
        <div class="flex gap-2">
          <button @click="editTask(index)"
            class="bg-gray-200 hover:bg-gray-300 p-2 rounded-md text-blue-600 hover:text-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
            stroke-width="1.5" stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" 
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>

          </button>
          <button @click="deleteTask(task.id)"
            class="bg-red-100 hover:bg-red-200 p-2 rounded-md text-red-600 hover:text-red-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
            stroke-width="1.5" stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" 
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="isEditing !== null"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-md">
        <h3 class="text-xl font-semibold text-cyan-700 mb-4">Edit Task</h3>
        <input v-model="editedTask.title" type="text" class="w-full mb-3 px-4 py-2 border rounded-md" />
        <input v-model="editedTask.date" type="date" class="w-full mb-4 px-4 py-2 border rounded-md" />
        <div class="flex justify-end gap-2">
          <button @click="saveEdit"
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save</button>
          <button @click="isEditing = null"
            class="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
        </div>
      </div>
    </div>
  </div>
  </div>
  <!-- Footer -->
    <footer class="bg-cyan-500 text-white text-center py-4">
      <p>&copy; 2025 Daily Life. All rights reserved.</p>
    </footer>
</template>

<script>
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCcVdp-V9VFq53_l8IAUsWcwIFK0HjZFH0",
  authDomain: "todolistweb-b95de.firebaseapp.com",
  projectId: "todolistweb-b95de",
  storageBucket: "todolistweb-b95de.firebasestorage.app",
  messagingSenderId: "806838526057",
  appId: "1:806838526057:web:d640d5d3e6c542038182f8",
  measurementId: "G-CV43Q58N5F"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const todosCollection = collection(db, "tasks");

export default {
  name: 'DashboardView',
  data() {
    return {
      tasks: [],
      newTask: { title: '', date: '', completed: false },
      editedTask: { title: '', date: '' },
      isEditing: null,
      notifMessage: ''
    };
  },
  methods: {
    async fetchTasks() {
      const querySnapshot = await getDocs(todosCollection);
      this.tasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    async addTask() {
      if (!this.newTask.title || !this.newTask.date) {
        this.notifMessage = "Please fill out all fields!";
        return;
      }
      await addDoc(todosCollection, this.newTask);
      this.newTask = { title: '', date: '', completed: false };
      this.notifMessage = "Task added successfully!";
      this.fetchTasks();
      setTimeout(() => this.notifMessage = '', 3000);
    },

    async deleteTask(id) {
      await deleteDoc(doc(db, "tasks", id));
      this.notifMessage = "Task deleted!";
      this.fetchTasks();
      setTimeout(() => this.notifMessage = '', 3000);
    },

    async updateTask(task) {
      await updateDoc(doc(db, "tasks", task.id), task);
      this.notifMessage = "Task updated!";
      this.fetchTasks();
      setTimeout(() => this.notifMessage = '', 3000);
    },

    editTask(index) {
      this.isEditing = index;
      this.editedTask = { ...this.tasks[index] };
    },

    saveEdit() {
      this.updateTask(this.editedTask);
      this.isEditing = null;
    },

    toggleComplete(task) {
      const updatedTask = {
        ...task,
        completed: task.completed ? 0 : 1
      };
      this.updateTask(updatedTask);
    }
  },
  mounted() {
    onSnapshot(todosCollection, (snapshot) => {
      this.tasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    });
  }
};
</script>

<style scoped>
/* Tidak perlu styling tambahan, semua diatur dengan Tailwind */
</style>

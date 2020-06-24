<template>
  <div class="container mx-auto p-6 overflow-y-auto">
    <div class="w-full flex">
      <div class="w-1/2 text-black font-bold text-2xl">User Dashboard</div>
      <div class="w-1/2 text-right">
        <button
          class="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
          @click="toggleModal()"
        >Add User</button>
      </div>
    </div>

    <Datatable :columns="datatable.col" :items="datatable.items" 
    :actions="datatable.actions" @edit="openModalEdit" @delete="deleteUser" />

    <!-- Create !-->
    <div
      v-if="createModal"
      class="overflow-x-hidden max-h-screen mx-auto overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center flex"
    >
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <!--content-->
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <!--header-->
          <div
            class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t"
          >
            <h3 class="text-3xl font-semibold">Create user</h3>
            <button
              class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              v-on:click="toggleModal()"
            >
              <span
                class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"
              >×</span>
            </button>
          </div>
          <!--body-->

          <!-- Error message !-->
          <div
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-4 mt-4 rounded relative"
              role="alert"
              :class="{hidden: !createError.isError}"
            >
              <strong class="font-bold">Sorry!</strong>
              <span class="message block sm:inline">{{createError.message}}.</span>
              <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  class="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path
                    d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                  />
                </svg>
              </span>
            </div>
          <!-- Error message !-->
          
          <div class="relative p-6 w-full flex flex-wrap">           
            <div class="p-2 w-1/2">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Email</label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="example@gmail.com"
                v-model="form.email"
              />
            </div>
            <div class="p-2 w-1/2">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="******************"
                v-model="form.password"
              />
            </div>
            <div class="p-2 w-1/2">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Name</label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Your name"
                v-model="form.name"
              />
            </div>
            <div class="p-2 w-1/2">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Phone</label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="082257578916"
                v-model="form.phone"
              />
            </div>
            <div class="p-2 w-1/2">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Level</label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="0-4"
                min="1"
                max="4"
                v-model="form.level"
              />
            </div>
          </div>
          <!--footer-->
          <div
            class="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b"
          >
            <button
              class="text-red-500 bg-transparent font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style="transition: all .15s ease"
              v-on:click="toggleModal()"
            >Close</button>
            <button
              class="text-red-500 bg-transparent border border-solid hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none f
              ocus:outline-none mr-1 mb-1 "
              :class="{'opacity-50 cursor-not-allowed': createError.isLoading}"
              type="button"
              style="transition: all .15s ease"
              v-on:click="createUser()"
              :disabled="createError.isLoading"
            >
              <i v-if="createError.isLoading" class="fas fa-spin fa-circle-notch"></i>
              Crate
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="createModal" @click="toggleModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    <!-- Create !-->


    <!-- Edit !-->
    <div
      v-if="editModal"
      class="overflow-x-hidden max-h-screen mx-auto overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center flex"
    >
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <!--content-->
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <!--header-->
          <div
            class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t"
          >
            <h3 class="text-3xl font-semibold">Edit user</h3>
            <button
              class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              v-on:click="toggleModalEdit()"
            >
              <span
                class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"
              >×</span>
            </button>
          </div>
          <!--body-->

          <!-- Error message !-->
          <div
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-4 mt-4 rounded relative"
              role="alert"
              :class="{hidden: !editError.isError}"
            >
              <strong class="font-bold">Sorry!</strong>
              <span class="message block sm:inline">{{editError.message}}.</span>
              <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  class="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path
                    d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                  />
                </svg>
              </span>
            </div>
          <!-- Error message !-->
          
          <div class="relative p-6 w-full flex flex-wrap">           
            <div class="p-2 w-1/2">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Email</label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="example@gmail.com"
                v-model="editForm.email"
              />
            </div>
            <div class="p-2 w-1/2">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="******************"
                v-model="editForm.password"
              />
            </div>
            <div class="p-2 w-1/2">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Name</label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Your name"
                v-model="editForm.name"
              />
            </div>
            <div class="p-2 w-1/2">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Phone</label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="082257578916"
                v-model="editForm.phone"
              />
            </div>
            <div class="p-2 w-1/2">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Level</label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="0-4"
                min="1"
                max="4"
                v-model="editForm.level"
              />
            </div>
          </div>
          <!--footer-->
          <div
            class="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b"
          >
            <button
              class="text-red-500 bg-transparent font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style="transition: all .15s ease"
              v-on:click="toggleModalEdit()"
            >Close</button>
            <button
              class="text-red-500 bg-transparent border border-solid hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none f
              ocus:outline-none mr-1 mb-1 "
              :class="{'opacity-50 cursor-not-allowed': editError.isLoading}"
              type="button"
              style="transition: all .15s ease"
              v-on:click="editUser()"
              :disabled="editError.isLoading"
            >
              <i v-if="editError.isLoading" class="fas fa-spin fa-circle-notch"></i>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="editModal" @click="toggleModalEdit" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    <!-- Edit !-->

    <!-- Success Alert !-->  
    <ToastSuccess v-if="toastSuccess.isVisible" :message="toastSuccess.message" />  
    <!-- Success Alert !-->
  </div>
</template>

<script>
import Datatable from "~/components/Datatable.vue";
import ToastSuccess from "~/components/ToastSuccess.vue";
import axios from "axios";

export default {
  data: function() {
    return {
      datatable: {
        col: [
          { name: "user_id", label: "Id" },
          { name: "email", label: "Email" },
          { name: "name", label: "Name" }
        ],
        items: [],
        actions: {
          edit: true,
          delete: true
        }
      },
      createModal: false,
      createError: {
        isError: false,
        message: "Please Complete your form",
        isLoading: false
      },      
      form: {
        name: "",
        password: "",
        email: "",
        phone: "",
        level: ""
      },
      toastSuccess: {
        message: "Success create user",
        isVisible: false
      },
      editModal: false,
      editError: {
        isError: false,
        message: "Please Complete your form",
        isLoading: false
      },      
      editForm: {
        name: "",
        password: "",
        email: "",
        phone: "",
        level: "",
        id: 0,
      },
    };
  },
  components: {
    Datatable,
    ToastSuccess
  },
  async fetch({ store, params }) {
    await store.dispatch("users/FETCH_USERS");
  },
  beforeMount() {
    this.datatable.items = this.$store.state.users.users;
  },
  methods: {
    toggleModal: function() {
      this.createModal = !this.createModal;
    },
    toggleModalEdit: function() {
      this.editModal = !this.editModal;
    },
    createUser: function() {
      const form = this.form;
      
      for (let i in this.form) {
        if (!form[i]) {
          this.createError.isError = true
          return;
        }        
      }
      form.level = parseInt(form.level)

      this.createError.isError = false
      this.createError.isLoading = true
      this.$store.dispatch("users/INSERT_USER", form).then(response => {
        this.toggleModal();
        this.toastSuccess.isVisible = true;
      }, error => {
        this.createError.isError = true
        this.createError.message = "Error input to database"
      });
      this.createError.isLoading = false       
    },
    openModalEdit(e) {      
      const selected = this.datatable.items.find(item => item.user_id == e)
      this.editModal = true

      this.editForm = {
        name: selected.name,
        email: selected.email,
        password: selected.password,
        level: selected.level,
        phone: selected.phone,
        id: e
      }
    },
    editUser(e) {
      this.editForm.level = parseInt(this.editForm.level)
      
      let input = this.editForm      

      for (let i in input) {
        if (i == "id") {
          continue;
        }

        if (!input[i]) {
          this.editError.isError = true
          return;
        }        
      }      

      this.editError.isError = false
      this.editError.isLoading = true
      this.$store.dispatch("users/EDIT_USER", input).then(response => {
        this.toggleModal();
        this.toastSuccess.isVisible = true;
        this.toastSuccess.message = "Success edit data";
      }, error => {
        this.editError.isError = true
        this.editError.message = "Error input to database"
      });
      this.editError.isLoading = false       
    },
    deleteUser: function(e) {
      this.$store.dispatch("users/DELETE_USER", e).then(response => {        
        this.toastSuccess.isVisible = true;
        this.toastSuccess.message = "Success delete user";            
      }, error => {
        console.log(error)
      });      
    },
  }
};
</script>
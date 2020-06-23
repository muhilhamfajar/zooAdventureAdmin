<template>
  <div
    class="alert-toast fixed bottom-0 right-0 m-8 w-5/6 md:w-full max-w-sm"
    :class="{hidden: !isVisible}"
    @click="closeToast"
  >    
    <label
      class="close cursor-pointer flex items-start justify-between w-full p-2 bg-green-500 h-24 rounded shadow-lg text-white"
      title="close"
      for="footertoast"
    >
      {{message}}
      <svg
        class="fill-current text-white"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
      >
        <path
          d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
        />
      </svg>
    </label>
  </div>
</template>

<script>
export default {
  name: "ToastSuccess",
  props: ["message"],
  data: function() {
      return {
        isVisible: true        
      }
  },
  methods: {
      closeToast: function() {
          this.isVisible = false
      }
  }
};
</script>

<style scoped>
.alert-toast input:checked ~ * {
  -webkit-animation: fade-out-right 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: fade-out-right 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
</style>
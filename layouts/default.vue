<template>
  <div class="bg-gray-100 font-family-karla flex">
    <aside class="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
      <div class="p-6">
        <a
          href="index.html"
          class="text-white text-3xl font-semibold uppercase hover:text-gray-300"
        >Admin</a>        
      </div>
      <nav class="text-white text-base font-semibold pt-3">
        <a
          href="index.html"
          class="flex items-center active-nav-link text-white py-4 pl-6 nav-item"
        >
          <i class="fas fa-tachometer-alt mr-3"></i>
          Dashboard
        </a>        
      </nav>      
    </aside>

    <div class="w-full flex flex-col h-screen overflow-y-hidden">
      <header class="w-full flex items-center bg-white py-2 px-6 hidden sm:flex">
        <div class="w-1/2"></div>
        <div class="relative w-1/2 flex justify-end">
          <button      
            class="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
          >
            <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" />
          </button>          
          <div class="absolute hidden w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
            <a href="#" class="block px-4 py-2 account-link hover:text-white">Account</a>
            <a href="#" class="block px-4 py-2 account-link hover:text-white">Support</a>
            <a href="#" class="block px-4 py-2 account-link hover:text-white">Sign Out</a>
          </div>
        </div>
      </header>

      <nuxt />
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Karla:400,700&display=swap");
.font-family-karla {
  font-family: karla;
}
.bg-sidebar {
  background: #3d68ff;
}
.cta-btn {
  color: #3d68ff;
}
.upgrade-btn {
  background: #1947ee;
}
.upgrade-btn:hover {
  background: #0038fd;
}
.active-nav-link {
  background: #1947ee;
}
.nav-item:hover {
  background: #1947ee;
}
.account-link:hover {
  background: #3d68ff;
}
</style>
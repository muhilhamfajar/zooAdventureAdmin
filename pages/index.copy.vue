<template>
  <div class="container mx-auto">
    <h3 class="text-teal-500">Hello</h3>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'

import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      allPost: [],
      posts: [],
      current: 9
    }
  },
  methods : {
    loadMore () {
      this.posts = []
      this.current += 9
      this.allPost.map((item, key) => item.description !== null && this.posts.length < this.current ? this.posts.push(item) : '')
    },
    openDetail (data) {      
      this.$store.commit('article/setArticle', data)
      this.$router.replace({ 'path': '/detail' })
    }
  },
  mounted () {
    axios('https://newsapi.org/v2/everything?q=programming&domains=techcrunch.com,techinasia.com&apiKey=fd563cac94ef4bcfb2acd6aa9ee0e7a6', {
      crossDomain: true
    }).then( ({ data }) => {
      this.allPost = data.articles
      this.$store.commit('article/setupArticle', data.articles)
      data.articles.map((item, key) => {
        if (item.description !== null && this.posts.length < 9) {
          this.posts.push(item)
        }
      })


      console.log(this.$store.state.article.articles)
    })
  }  
}
</script>
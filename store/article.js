export const state = () => ({
    article: {},
    articles: []
})

export const mutations = {
    setArticle(state, payload) {
        state.article = payload;
    },
    setupArticle(state, payload) {
        state.articles = payload;
    }
}

export const actions = () => ({
})

export const getters = () => ({
})
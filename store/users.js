import axios from "axios"

export const state = () => ({    
    users: []
})

export const mutations = {
    setUsers(state, payload) {
        state.users = payload;
    },
}

export const actions = {
    async FETCH_USERS({commit}) {
        const { data } = await axios.get('http://147.139.177.164:3018/user/all')
        commit('setUsers', data.data)
    },
    INSERT_USER({commit}, payload) {
        const input = JSON.stringify(payload)        
        
        return new Promise((resolve, reject) => {
            axios.post(`${process.env.apiUrl}/user/create`, input).then(response => {
                resolve(response)
            }, error => {
                reject(error)
            })
        })    
    },
}

export const getters = () => ({
})
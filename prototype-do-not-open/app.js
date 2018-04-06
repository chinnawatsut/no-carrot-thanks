const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        },
        ['increment2'] (state, payload) {
            console.log(payload)
        }
    },
    actions: {
        incrementAction (state) {
            state.commit('increment')
        },
        incremetsAction ({ commit }, { payload }) {
            console.log(payload)
            commit('increment')
        },
        asyncIncrement ({ commit }) {
            setTimeout(() => {
                commit('increment')
            }, 1000)
        },
        delayedPromise () {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve()
                }, 3000)
            })
        },
        calledAxios () {
            return axios.get(`http://jsonplaceholder.typicode.com/posts`)
        }
    },
    getters: {
        counter: function(state) {
            return state.count
        }
    }
})


const Foo = { template: '<div>Foo</div>' }
const Bar = { template: '<div>Bar</div>' }
const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
]
const router = new VueRouter({
    routes
})
const vm = new Vue({
    router,
    store,
    data: {
        amount: 0,
        lastTotalWithTax: 0
    },
    methods: {
        add: function() {
            console.log("add")
            this.amount = this.amount + 1
        },
        remove: function() {
            console.log("remove")
            if (this.amount > 0) {
                this.amount = this.amount - 1
            }
        },
        calculateTotalWithTax: function() {
            console.log("calculateTotalWithTax")
            this.lastTotalWithTax = ( this.amount * 200 ) * 1.07
        },
        ...Vuex.mapMutations({
            adding: 'increment'
        }),
        ...Vuex.mapActions({
            asyncAdd: 'asyncIncrement'
        }),
        inc: function() {
            store.commit('increment')
            store.commit('increment2', 10)
            store.dispatch('incremetsAction', {
                payload: 'dispatch 20'
            })
            console.log(store.state.count)
        },
        async delayBtn() {
            try {
                await store.dispatch('delayedPromise')
                console.log('finished')
            } catch (e) {
                console.log('fail')
            }
        },
        async callaxios() {
            try {
                var result = await store.dispatch('calledAxios')
                console.log(result.data)
            } catch(e) {
                console.log(e)
            }
        }
    },
    computed: {
        ...Vuex.mapGetters([
            'counter'
        ]),
        total: function () {
            return this.amount * 200
        },
        count: function () {
            return store.state.count
        }
    },
    watch: {
        total: function () {
            console.log("total watched")
            this.calculateTotalWithTax()
        }
    }
}).$mount('#app')
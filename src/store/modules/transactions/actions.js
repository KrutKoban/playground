export default {
    getTransactionList({ commit }) {
        this._vm.$http.get('https://api.stage.capusta.space/v1/cabinet/protected/transactions/page/1', {
            headers: {
                authorization: 'Bearer 5d370094-57a7-4476-ace4-4f29bfa43d44'
            }
        })
        .then(res => {
            commit('setList', res.data.result);
        });
    }
}
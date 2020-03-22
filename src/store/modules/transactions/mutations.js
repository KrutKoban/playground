export default {
    setList(state, data) {
        let formatNumber = (val) => {
            if(String(val).length < 2) {
                return `0${val}`;
            }
            return val;
        }
        state.list = data.map(el => {
            const created = new Date(el.created_at);
            const year = created.getFullYear();
            let month = formatNumber(created.getMonth() + 1);
            let date = formatNumber(created.getDate());
            const hours = created.getUTCHours();
            let minutes = formatNumber(created.getUTCMinutes());
            const formatDate = [year, month, date].join('-');
            const formatTime = [hours, minutes].join(':');
            return {
                ...el,
                formatDate,
                formatTime
            };
        });
    }
}
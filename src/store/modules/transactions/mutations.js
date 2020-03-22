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
            // if (String(month).length < 2) {
            //     month = `0${month}`;
            // }
            let date = formatNumber(created.getDate());
            // if (String(date).length < 2) {
            //     date = `0${date}`;
            // }
            const hours = created.getUTCHours();
            let minutes = formatNumber(created.getUTCMinutes());
            // if (String(minutes).length < 2) {
            //     minutes = `0${date}`;
            // }
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
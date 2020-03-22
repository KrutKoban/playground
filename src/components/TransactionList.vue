<template>
  <div class="list">
    <div class="list-by-days" v-for="(transactions, index) in transactionsByDays" :key="index">
      <div class="list-by-days__date">{{ transactions[0].localFormatDate }}</div>

      <div class="list-item" v-for="(trn, key) in transactions" :key="key" @click="showDescription(trn.id)">
        <div class="visible-block">
          <div class="status-time-block">
            <div class="item-image">
              <img witdh="25" height="25" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3207673/credit-card--white.svg" />
            </div>
            <div class="status-time">
              <div class="status">
              {{ transictionTypes[trn.type] }}: <span class="id-amount-font-size">{{ trn.id}}</span>
              </div>
              
              <div class="time">
                {{ trn.formatTime }}
              </div>
            </div>
          </div>

          <div class="amount-block">
            <div :class="{'id-amount-font-size': true, 'amount-down': trn.type === 'REFUND', 'amount-up': trn.type !== 'REFUND'}">
              {{ trn.type !== 'REFUND' ? '+ ' : '- '}}
              {{ trn.amount.toLocaleString("ru-RU") }} ₽
            </div>

            <div v-if="trn.account_number">
              {{ trn.account_number.replace(/[^\dX]/g, '*').replace(/(.{4})/g, '$1 ').trim() }}
            </div>
          </div>
        </div>

        

        <div v-if="trn.description && currentIds.includes(trn.id)" class="hidden-block">
          {{ trn.description }}
        </div>
      </div>

    </div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'HelloWorld',
  
  data() {
    return {
      currentIds: [],
      transictionTypes: {
        PURCHASE_BILL: 'Покупка',
        PURCHASE: 'Покупка',
        REFUND: 'Возврат',
        PAYOUT: 'Выплата'
      }
    }
  },

  computed: {
    ...mapState({
      transactions: state => state.transactions.list
    }),

    transactionsByDays() {
      const arrByDays = [];
      let d = 0;
      for(let i = 0; i < this.transactions.length - 1; i++) {
        this.transactions[i].localFormatDate = this.transactions[i].formatDate.split('-').reverse().join('.');
        if (!arrByDays[d]) {
          arrByDays[d] = [];
        }
        arrByDays[d].push(this.transactions[i]);
        if (this.transactions[i].formatDate !== this.transactions[i + 1].formatDate) {
          d++;
        }
        if (i === this.transactions.length - 2) {
          arrByDays[d].push(this.transactions[i + 1]);
        }
      }
      return arrByDays;
    }
  },

  methods: {
    showDescription(id) {
      if (!this.currentIds.includes(id)) {
        this.currentIds.push(id);
      } else {
        this.currentIds = this.currentIds.filter(el => el !== id);
      }
    }
  },

  created() {
    this.$store.dispatch('getTransactionList');
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

.id-amount-font-size {
  font-weight: bold;
  font-size: 18px;
}

.list {
  display: flex;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
}

.list-by-days {
  color: #CCC;
}

.list-by-days__date {
    color: #848497;
    text-align: left;
    padding: 0 10px;
    margin: 0 0 16px;
}

.list-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #27283C;
  padding: 10px;
  margin: 0 0 16px;
}

.visible-block {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.hidden-block {
  background-color: #CCC;
  color: #212121;
  padding: 10px;
  margin: 10px 0 0 0;
  border-radius: 4px;
  text-align: left;
}

.status-time-block {
  display: flex;
  align-items: center;
}

.status-time {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  line-height: 26px;
}

.amount-block {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: 26px;
}

.item-image {
  border-radius: 50%;
  background-color: #24A84D;
  margin: 0 10px 0 0;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.amount-up {
  color: #39b27c;
}

.amount-down {
  color: #D87822;
}
</style>

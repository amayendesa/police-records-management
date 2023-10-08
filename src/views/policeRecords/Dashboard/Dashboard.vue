<template>
  <div class="py-4 container-fluid">

    <div class="mt-1 row">
      <div class="col-lg-4 col-md-6 col-12">
        <mini-statistics-card
            title="Total Number Of Cases"
            :value="totalCases"
            :percentage="{
                value: '+5%',
                color: 'text-success',
              }"
            :icon="{
                component: 'ni ni-chart-bar-32',
                background: iconBackground,
              }"
            direction-reverse
        />
      </div>
      <div class="col-lg-4 col-md-6 col-12 mt-md-0">
        <mini-statistics-card
            title="Closed Cases"
            :value="closedCases"
            :percentage="{
                value: '+5%',
                color: 'text-success',
              }"
            :icon="{
                component: 'ni ni-chart-bar-32',
                background: iconBackground,
              }"
            direction-reverse
        />
      </div>
      <div class=" col-lg-4 col-md-6 col-12 mt-lg-0">
        <mini-statistics-card
            title="Open Cases"
            :value="openCases"
            :percentage="{
                value: '+5%',
                color: 'text-success',
              }"
            :icon="{
                component: 'ni ni-chart-bar-32',
                background: iconBackground,
              }"
            direction-reverse
        />
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import {keyCloakFunction} from "@/services/auth-token";
import setTooltip from "@/assets/js/tooltip.js";
import {faCreditCard, faHandPointer, faScrewdriverWrench, faUsers} from "@fortawesome/free-solid-svg-icons";
import US from "@/assets/img/icons/flags/US.png";
import DE from "@/assets/img/icons/flags/DE.png";
import GB from "@/assets/img/icons/flags/GB.png";
import BR from "@/assets/img/icons/flags/BR.png";

import image from "@/assets/img/team-3.jpg";
import Choices from "choices.js";
import Chart from "chart.js/auto";
// import $ from "jquery";

export default {
  name: "ClientDashboard",
  components: {
    MiniStatisticsCard,
  },
  data() {
    return {
      faHandPointer,
      faUsers,
      faCreditCard,
      faScrewdriverWrench,
      iconBackground: "bg-gradient-primary",
      icon: {
        component: 'ni ni-search',
        background: "bg-gradient-primary"
      },
      // date: "",
      endDate: "",
      config: {
        allowInput: true,
      },
      US,
      DE,
      BR,
      GB,
      image,
      totalCases: 0,
      openCases: 0,
      closedCases: 0,
      totalUsdAccountBalance: '$0',
      totalZwlAccountBalance: 'ZWL0',
      microUsdBalance: '$0',
      microZwlBalance: 'ZWL0',
      retailUsdBalance: '$0',
      retailZwlBalance: 'ZWL0',
      name: '',
      search: false,
      all_microplan_loans: [],
      all_retail_loans: [],
      agent_data: null,
      currency: 'ZWL',
      currency_key: 'zwl',
      currencies: ['ZWL', 'USD', 'ZAR', 'GBP'],
      agents: [],
      agents2: [],
      api_stats: [],
      accountsSuspense: {
        usd: {account: '', amount: null},
        zwl: {account: '', amount: null},
        zar: {account: '', amount: null},
        gbp: {account: '', amount: null}
      },
      accountsCommission: {
        usd: {account: '', amount: null},
        zwl: {account: '', amount: null},
        zar: {account: '', amount: null},
        gbp: {account: '', amount: null}
      },
      agent: '',
      firstDay: new Date((new Date()).getFullYear(), (new Date()).getMonth(), 1),
      lastDay: new Date((new Date()).getFullYear(), (new Date()).getMonth() + 1, 0),
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      dates: [],
      barChart: {
        cashIn: {
          label: 'Cash In ',
          labels: [],
          datasets: {
            label: 'Cash In by agent',
            data: [],
          },
        },
        cashOut: {
          label: 'Cash Out ',
          labels: [],
          datasets: {
            label: 'Cash Out by agent',
            data: [],
          },
        },
        remittance: {
          label: 'On Remittance ',
          labels: [],
          datasets: {
            label: 'On Remittance by agent',
            data: [],
          },
        },
        redeem: {
          label: 'On Redeem ',
          labels: [],
          datasets: {
            label: 'On Redeem by agent',
            data: [],
          },
        },
      },
      pieChartData1: {
        labels: ['no loans'],
        value: 'ZWL0',
        datasets: {
          label: 'Micro Plan ZWL Loans',
          data: [1],
          data2: ['ZWL0'],
        },
      },
      pieChartData2: {
        labels: ['no loans'],
        value: '$0',
        datasets: {
          label: 'Micro Plan USD Loans',
          data: [1],
          data2: ['$0'],
        },
      },
      pieChartData3: {
        labels: ['no loans'],
        value: 'ZWL0',
        datasets: {
          label: 'Retail Banking ZWL Loans',
          data: [1],
          data2: ['ZWL0'],
        },
      },
      pieChartData4: {
        labels: ['no loans'],
        value: '$0',
        datasets: {
          label: 'Retail Banking USD Loans',
          data: [1],
          data2: ['$0'],
        },
      },
      backgroundColor: [
        "#397cbd",
        '#3b416f',
        "#A8B8D8",
        "#21d4fd",
        "#98ec2d",
        "#ff667c",
        '#003062',
        '#23bfaa',
        '#cb0b9f',
        '#c79c1c',
        '#470a79',
        '#ee1c24',
        '#02be6e',
        '#0e0e0e',
        '#e08e93',
        '#033b71',
        '#006400',
        '#f76439',
        '#6a419a',
        '#f0f0f0'
      ],
      pieChart: {
        transactionCount: {
          labels: ['Cash In', 'Cash Out', 'Remittance', 'Redeem'],
          datasets: {
            label: 'Transaction Count',
            data: [0, 0, 0, 0],
            labels: [{class: '#18c1e8', label: 'Cash In', value: 0},
              {class: '#cb0b9f', label: 'Cash Out', value: 0},
              {class: '#3b416f', label: 'Remittance', value: 0},
              {class: '#a8b8d8', label: 'Redeem', value: 0}
            ]
          },
        },
        transactionValue: {
          labels: ['Cash In', 'Cash Out', 'Remittance', 'Redeem'],
          datasets: {
            label: 'Transaction Value',
            data: [0, 0, 0, 0],
            labels: [{class: '#18c1e8', label: 'Cash In', value: 0},
              {class: '#cb0b9f', label: 'Cash Out', value: 0},
              {class: '#3b416f', label: 'Remittance', value: 0},
              {class: '#a8b8d8', label: 'Redeem', value: 0}
            ]
          },
        },
      },
      stats: {
        transactionCount:
            {
              value:
                  '',
            },
        totalMovement: {
          value:
              '',
        },
        totalCommission: {
          value:
              '',
        },
        totalFloat: {
          value:
              '',
        }
        ,
      },
      tabs: 0,
      stats_search: {
        startDate: null,
        endDate: null,
        agentCode: null,
      },
      leng: {
        suspense: 0,
        commission: 0,
      },
      leng_default: {
        suspense: 0,
        commission: 0,
      },
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    dialogObligation(val) {
      val || this.closeObligation()
    },
    dialogObligationNew(val) {
      val || this.closeObligationNew()
    },
    dialogDeleteObligationNew(val) {
      val || this.closeDeleteObligationNew()
    },
  },

  computed: {

    dateRangeText() {
      return this.dates.join(' ~ ')
    },

    redeemData() {
      return this.barChart.redeem
    }
  },

  created() {
    this.initialize2()
  },

  mounted() {


  },

  methods: {

    async dateM() {
      const a = [{year: 'numeric'}, {month: '2-digit'}, {day: '2-digit'}]
      var firstDay = this.firstDay
      var lastDay = this.lastDay
      this.dates = [this.join(firstDay, a, '-'), this.join(lastDay, a, '-')]
      this.stats_search.startDate = this.join(firstDay, a, '-')
      this.stats_search.endDate = this.join(lastDay, a, '-')
      this.agent = JSON.parse(localStorage.getItem('user')).agent_id
      this.agent_data = JSON.parse(localStorage.getItem('agent'))
      this.stats_search.agentCode = JSON.parse(localStorage.getItem('user')).agent_id
    },

    async dateM2() {
      const a = [{year: 'numeric'}, {month: '2-digit'}, {day: '2-digit'}]
      var firstDay = this.firstDay
      var lastDay = this.lastDay
      try {
        this.stats_search.startDate = this.join(firstDay, a, '-')
      } catch (e) {
        this.stats_search.startDate = firstDay
      }
      try {
        this.stats_search.endDate = this.join(lastDay, a, '-')
      } catch (e) {
        this.stats_search.endDate = lastDay
      }

      // this.dates = [this.join(firstDay, a, '-'), this.join(lastDay, a, '-')]


    },

    async initialize2() {
      try {
        const v = await keyCloakFunction('GET',
            '/records_server/records',
            {})
        if (v.statusText === 'OK' || v.status === 304) {
          let total = 0
          let open = 0
          let closed = 0
          total = v.data.length
          v.data.forEach(o => {
            if (o.status === 'OPEN')
              open++
            if (o.status === 'CLOSED')
              closed++
          })
          this.totalCases = total
          this.openCases = open
          this.closedCases = closed
        }
      } catch (e) {
        // const instance = Vue.$toast.open({
        //   message: e,
        //   type: 'error',
        // })
      }

    },


    async initialize() {
      // Vue.use(VueToast, {
      //   // One of the options
      //   position: 'top-right',
      // })
      // console.log('this.$store.getters.name', this.$store.getters.name)
      console.log('hie')
      let labels = []
      let data = []
      let data2 = []
      let total = 0
      let totalV = ''
      try {
        const v = await keyCloakFunction('GET',
            '/br_loan_service/brnode/api/r/mobile/loan_details_for_id/420246347R71',
            {}, this.$cookies.get('refresh_token'))
        // console.log(v)
        if (v.statusText === 'OK') {
          this.all_microplan_loans = v.data
          let currency = 'USD'
          let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
          })
          this.all_microplan_loans.forEach(loan => {
            if (loan.CurrencyID === currency) {
              total += loan.TotalOutstandingBalance
              data.push(loan.TotalOutstandingBalance)
              data2.push(formatter.format(parseFloat(loan.TotalOutstandingBalance)))
              labels.push(loan.Description)
            }
          })
          totalV = formatter.format(parseFloat(total))
          this.microUsdBalance = totalV
          this.pieChartData2 = {
            labels: labels,
            value: totalV,
            datasets: {
              label: 'Micro Plan USD Loans',
              data: data,
              data2: data2,
            },
          }

          labels = []
          data = []
          data2 = []
          total = 0
          totalV = ''
          currency = 'ZWL'
          formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
          })
          this.all_microplan_loans.forEach(loan => {

            if (loan.CurrencyID === currency) {
              total += loan.TotalOutstandingBalance
              data.push(loan.TotalOutstandingBalance)
              data2.push(formatter.format(parseFloat(loan.TotalOutstandingBalance)))
              labels.push(loan.Description)
            }
          })
          totalV = formatter.format(parseFloat(total))
          this.microZwlBalance = totalV
          this.pieChartData1 = {
            labels: labels,
            value: totalV,
            datasets: {
              label: 'Micro Plan ZWL Loans',
              data: data,
              data2: data2,
            },
          }

          this.pieChart2('chart-1', this.pieChartData1)
          this.pieChart2('chart-2', this.pieChartData2)
          console.log(this.pieChartData1)
          this.loadTable = false

        }
      } catch (e) {
        console.log(e)
        this.loadTable = false
      }

      // let username = JSON.parse(localStorage.getItem('user')).preferred_username
      // this.loadTable = true
      // try {
      //   const v = await keyCloakFunction('GET',
      //       '/retail_loan_service/loan-service/api/get-client-loans/' + username.toUpperCase().trim(),
      //       {}, false)
      //   // console.log(v)
      //   if (v.statusText === 'OK') {
      //     this.all_retail_loans = v.data
      //     labels = []
      //     data = []
      //     data2 = []
      //     total = 0
      //     totalV = ''
      //     let currency = 'ZWL'
      //     formatter = new Intl.NumberFormat('en-US', {
      //       style: 'currency',
      //       currency: currency,
      //     })
      //     this.all_microplan_loans.forEach(loan => {
      //       if (loan.CurrencyID === currency) {
      //         total += loan.TotalOutstandingBalance
      //         data.push(loan.TotalOutstandingBalance)
      //         data2.push(formatter.format(parseFloat(loan.TotalOutstandingBalance)))
      //         labels.push(loan.Description)
      //       }
      //     })
      //     totalV = formatter.format(parseFloat(total))
      //     this.microUsdBalance = totalV
      //     this.all_retail_loans.forEach(loan => {
      //
      //
      //       loan.amountFinanced = formatter.format(parseFloat(loan.amountFinanced))
      //     })
      //     this.loadTable = false
      //     try {
      //       $('#example').DataTable().destroy();
      //     } catch (e) {
      //       console.log(e)
      //     }
      //     this.tbFunction();
      //   }
      // } catch (e) {
      //   try {
      //     $('#example').DataTable().destroy();
      //   } catch (e) {
      //     console.log(e)
      //   }
      // }


      await this.dateM2();
      this.stats_search.agentCode = this.agent
      this.currency_key = this.currency.toLowerCase()
      try {
        this.agents = []
        this.agents2 = []
        this.agents.push(this.agent)
        this.agents2.push(this.agent_data)
        const v = await keyCloakFunction('GET',
            '/agency_banking/agent/sub-agents/' + this.agent,
            {}, this.$cookies.get('refresh_token'))
        if (v.statusText === 'OK') {
          v.data.forEach(o => {
            this.agents.push(o.id)
            this.agents2.push(o)
          })
        }

      } catch (e) {
        // const instance = Vue.$toast.open({
        //   message: e,
        //   type: 'error',
        // })
      }
      try {
        const v = await keyCloakFunction('GET',
            '/agency_banking/agent/all-agents',
            {}, this.$cookies.get('refresh_token'))
        if (v.statusText === 'OK') {
          this.agent_data = v.data[0]
          this.name = this.agent_data.agentName
          this.agent_data.agentSuspenseAccount.forEach(o => {
            if (o.accountCurrency === 'ZWL') {
              this.accountsSuspense.zwl.account = o.accountNumber
            }
            if (o.accountCurrency === 'USD') {
              this.accountsSuspense.usd.account = o.accountNumber
            }
            if (o.accountCurrency === 'ZAR') {
              this.accountsSuspense.zar.account = o.accountNumber
            }
            if (o.accountCurrency === 'GBP') {
              this.accountsSuspense.gbp.account = o.accountNumber
            }
          })
          this.agent_data.agentCommissionAccount.forEach(o => {
            if (o.accountCurrency === 'ZWL') {
              this.accountsCommission.zwl.account = o.accountNumber
            }
            if (o.accountCurrency === 'USD') {
              this.accountsCommission.usd.account = o.accountNumber
            }
            if (o.accountCurrency === 'ZAR') {
              this.accountsCommission.zar.account = o.accountNumber
            }
            if (o.accountCurrency === 'GBP') {
              this.accountsCommission.gbp.account = o.accountNumber
            }
          })
        }
      } catch (e) {
        // const instance = Vue.$toast.open({
        //   message: e,
        //   type: 'error',
        // })
        console.log('')
      }
      this.leng = this.leng_default
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: this.currency,
      })
      var accFound = false
      for (const [key, value] of Object.entries(this.accountsSuspense)) {
        // console.log(key, value)
        if (value.account !== '' && key === this.currency_key) {
          accFound = true
          try {
            const v = await keyCloakFunction('POST',
                '/keyclock/handler/v2/api/ussd/confirm-balance/',
                value, this.$cookies.get('refresh_token'))
            if (v.statusText === 'OK') {
              this.accountsSuspense[this.currency_key].balance = formatter.format(parseFloat(v.data))
              this.leng.suspense = this.accountsSuspense[this.currency_key].balance.length
              this.stats.totalFloat.value = this.accountsSuspense[this.currency_key].balance
              // this.stats.totalFloat.value = ''
            }
          } catch (e) {
            // const instance = Vue.$toast.open({
            //   message: e,
            //   type: 'error',
            // })
            console.log('')
          }
        }
      }
      if (!accFound) {
        this.stats.totalFloat.value = 'NAN'
        // this.stats.totalFloat.actionText = ''
      }
      accFound = false
      for (const [key, value] of Object.entries(this.accountsCommission)) {
        // console.log(key, value)
        if (value.account !== '' && key === this.currency_key) {
          accFound = true
          try {
            const v = await keyCloakFunction('POST',
                '/keyclock/handler/v2/api/ussd/confirm-balance/',
                value, this.$cookies.get('refresh_token'))
            if (v.statusText === 'OK') {
              this.accountsCommission[this.currency_key].balance = formatter.format(parseFloat(v.data))
              this.leng.commission = this.accountsCommission[this.currency_key].balance.length
              this.stats.totalCommission.value = this.accountsCommission[this.currency_key].balance
              // this.stats.totalCommission.value = ''
            }
          } catch (e) {
            // const instance = Vue.$toast.open({
            //   message: e,
            //   type: 'error',
            // })
            console.log('')
          }
        }
      }
      if (!accFound) {
        this.stats.totalCommission.value = 'NAN'
        // this.stats.totalCommission.actionText = ''
      }
      accFound = false

    },

    join(t, a, s) {
      function format(m) {
        const f = new Intl.DateTimeFormat('en', m)
        return f.format(t)
      }

      return a.map(format).join(s)
    },
  },
};
</script>
<style #scoped>
::-webkit-scrollbar.sc {
  -webkit-appearance: none;
  width: 7px;
}

::-webkit-scrollbar-thumb.sc {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, .5);
  box-shadow: 0 0 1px rgba(255, 255, 255, .5);
}

.wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  text-align: center;
  transform: translateX(-50%);
}

.spanner {
  position: absolute;
  top: 50%;
  left: 0;
  background: #2a2a2a55;
  width: 100%;
  display: block;
  text-align: center;
  height: 300px;
  color: #FFF;
  transform: translateY(-50%);
  z-index: 1000;
  visibility: hidden;
}

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  visibility: hidden;
}

.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}

.loader {
  color: #ffffff;
  font-size: 10px;
  margin: 80px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}

.loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.loader:after {
  left: 3.5em;
}

@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}

@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}

.show {
  visibility: visible;
}

.spanner, .overlay {
  opacity: 0;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}

.spanner.show, .overlay.show {
  opacity: 1
}
</style>

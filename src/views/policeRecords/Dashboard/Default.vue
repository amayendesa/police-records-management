<template>
  <div class="py-4 container-fluid">


    <div class="row mb-3">
      <div class="col-lg-12 col-12">
        <div class="row">
          <div class="mt-4 col-lg-4 col-md-4 mt-lg-0 row">
            <div class="col-6">
              <label class="form-label">Start Date</label>
              <flat-pickr
                  v-model="firstDay"
                  class="form-control datetimepicker"
                  placeholder="Please select start date"
                  :config="config"
              ></flat-pickr>
            </div>
            <div class="col-6">
              <label class="form-label">End Date</label>
              <flat-pickr
                  v-model="lastDay"
                  class="form-control datetimepicker"
                  placeholder="Please select end date"
                  :config="config"
              ></flat-pickr>
            </div>
          </div>
          <div class="mt-4 col-lg-4 col-md-4 mt-lg-0 row">
            <div class="col-6">
              <label class="form-label">Agent</label>
              <select id="choices-stat" v-model="agent" @change="search=true;"
                      class="multisteps-form__select form-control" name="choices-stat">
                <template v-for="(agent,i) in agents" :key="i">
                  <option :value="agent">{{ agent }}</option>
                </template>
              </select>
            </div>
            <div class="col-6">
              <label class="form-label">Currency</label>
              <select id="choices-stat2" v-model="currency" class="multisteps-form__select form-control"
                      name="choices-stat">
                <template v-for="(currency,i) in currencies" :key="i">
                  <option :value="currency">{{ currency }}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="mt-4 col-lg-4 col-md-4 mt-lg-0 row">
            <div class="col-1">
              <label class="form-label">&nbsp;</label>
              <soft-button
                  type="button"
                  color="dark"
                  @click="initialize2();"
                  variant="gradient"
                  class="ms-auto js-btn-next"
              >Search
              </soft-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-8 col-12">
        <div class="row">
          <div class="mt-4 col-lg-6 col-md-6 col-12 mt-lg-0">
            <mini-statistics-card
                title="Transaction Count"
                :value="stats.transactionCount.value"
                :percentage="{
                value: '+55%',
                color: 'text-success',
              }"
                :icon="{
                component: 'ni ni-sound-wave',
                background: iconBackground,
              }"
                direction-reverse
            />
            <mini-statistics-card
                title="Total Movement"
                :value="stats.totalMovement.value"
                :percentage="{
                value: '+3%',
                color: 'text-success',
              }"
                :icon="{
                component: 'ni ni-money-coins',
                background: iconBackground,
              }"
                direction-reverse
            />
          </div>
          <div class="mt-4 col-lg-6 col-md-6 col-12 mt-lg-0">
            <mini-statistics-card
                title="Total Commission"
                :value="stats.totalCommission.value"
                :percentage="{
                value: '-2%',
                color: 'text-danger',
              }"
                :icon="{
                component: 'ni ni-money-coins',
                background: iconBackground,
              }"
                direction-reverse
            />
            <mini-statistics-card
                title="Total Float"
                :value="stats.totalFloat.value"
                :percentage="{
                value: '+5%',
                color: 'text-success',
              }"
                :icon="{
                component: 'ni ni-money-coins',
                background: iconBackground,
              }"
                direction-reverse
            />
          </div>
        </div>
      </div>
      <div class="mt-4 col-lg-4 col-12 mt-lg-0">
        <announcement-card
            title="I need a Ruby developer for my new website."
            description=""
            :by="{
            image: image,
            name: name,
            date: '2h ago',
          }"
            :badge="{ color: 'success', label: 'Active' }"
            :value="{ currency: '$', amount: '3,000', method: 'month' }"
            :action="{ route: 'javascript:;', label: 'Balance' }"
        />
      </div>
    </div>

    <div class="row mb-4">

      <div class="mt-4 col-lg-6 col-md-6 col-12 mt-lg-0">
        <div class="card h-100">
          <div class="p-3 pb-0 card-header">
            <div class="d-flex justify-content-between">
              <h6 class="mb-0">{{ pieChart.transactionCount.datasets.label }}</h6>
              <button
                  type="button"
                  class="mb-0 btn btn-icon-only btn-rounded btn-outline-secondary ms-2 btn-sm d-flex align-items-center justify-content-center"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title=""
                  data-bs-original-title="See traffic channels"
              >
                <i class="fas fa-info" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <div class="p-3 pb-0 pt-0 mt-4 card-body" style="overflow: scroll;">
            <div class="row" style="overflow: scroll;">
              <div class="col-7 text-start" style="overflow: scroll;">
                <div class="chart" style="overflow: scroll;">
                  <canvas id="pieC-1" class="chart-canvas" height="200"></canvas>
                </div>
              </div>
              <div class="my-auto col-5">
          <span v-for="(label,i) in pieChart.transactionCount.datasets.labels" :key="i"
                class="badge badge-md badge-dot me-4 d-block text-start">
            <i :style="{backgroundColor: label.class}"></i>
            <span class="text-xs text-dark">{{ label.label }}&nbsp;&nbsp;<b>{{ label.value }}</b></span>
          </span>
              </div>
            </div>
          </div>
          <div class="p-3 pt-0 card-footer d-flex align-items-center">
            <div class="w-60">
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 col-lg-6 col-md-6 col-12 mt-lg-0">
        <div class="card h-100">
          <div class="p-3 pb-0 card-header">
            <div class="d-flex justify-content-between">
              <h6 class="mb-0">{{ pieChart.transactionValue.datasets.label }}</h6>
              <button
                  type="button"
                  class="mb-0 btn btn-icon-only btn-rounded btn-outline-secondary ms-2 btn-sm d-flex align-items-center justify-content-center"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title=""
                  data-bs-original-title="See traffic channels"
              >
                <i class="fas fa-info" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <div class="p-3 pb-0 pt-0 mt-4 card-body">
            <div class="row">
              <div class="col-7 text-start">
                <div class="chart">
                  <canvas id="pieC-2" class="chart-canvas" height="200"></canvas>
                </div>
              </div>
              <div class="my-auto col-5">
          <span v-for="(label,i) in pieChart.transactionValue.datasets.labels" :key="i"
                class="badge badge-md badge-dot me-4 d-block text-start">
            <i :style="{backgroundColor: label.class}"></i>
            <span
                class="text-xs text-dark">{{ label.label }}&nbsp;&nbsp;<b>{{ this.currency }}&nbsp;{{ label.value }}</b></span>
          </span>
              </div>
            </div>
          </div>
          <div class="p-3 pt-0 card-footer d-flex align-items-center">
            <div class="w-60">
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="row mb-4">

      <div class="mt-4 col-lg-6 col-md-6 col-12 mt-lg-0">
        <div class="card z-index-2">
          <div class="p-3 pb-0 card-header">
            <h6>{{ barChart.cashIn.label }}</h6>
          </div>
          <div class="p-3 card-body">
            <div class="chart">
              <canvas id="bar-1" class="chart-canvas" height="300"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 col-lg-6 col-md-6 col-12 mt-lg-0">
        <div class="card z-index-2">
          <div class="p-3 pb-0 card-header">
            <h6>{{ barChart.cashOut.label }}</h6>
          </div>
          <div class="p-3 card-body">
            <div class="chart">
              <canvas id="bar-2" class="chart-canvas" height="300"></canvas>
            </div>
          </div>
        </div>
      </div>


      <div class="mt-4 col-lg-6 col-md-6 col-12 mt-lg-4 mt-md-4">
        <div class="card z-index-2">
          <div class="p-3 pb-0 card-header">
            <h6>{{ barChart.remittance.label }}</h6>
          </div>
          <div class="p-3 card-body">
            <div class="chart">
              <canvas id="bar-3" class="chart-canvas" height="300"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 col-lg-6 col-md-6 col-12 mt-lg-4 mt-md-4">
        <div class="card z-index-2">
          <div class="p-3 pb-0 card-header">
            <h6>{{ barChart.redeem.label }}</h6>
          </div>
          <div class="p-3 card-body">
            <div class="chart" id="chart-4">
              <canvas id="bar-4" class="chart-canvas" height="300"></canvas>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
// import $ from 'jquery'
import MiniStatisticsCard from "../../../examples/Cards/MiniStatisticsCard.vue";
import SoftButton from "@/components/SoftButton.vue";
// import PieChartCard from "../../dashboards/components/PieChartCard.vue";
import flatPickr from "vue-flatpickr-component";
// import DefaultLineChart from "../../examples/Charts/DefaultLineChart.vue";
// import BarChart from "../../dashboards/components/BarChart.vue";
// import ReportsBarChart from "../../examples/Charts/ReportsBarChart.vue";
// import GradientLineChart from "../../examples/Charts/GradientLineChart.vue";
// import SalesTable from "./components/SalesTable.vue";
// import Choices from "choices.js";
import AnnouncementCard from "../../pages/projects/components/AnnouncementCard.vue";
import US from "@/assets/img/icons/flags/US.png";
import DE from "@/assets/img/icons/flags/DE.png";
import GB from "@/assets/img/icons/flags/GB.png";
import BR from "@/assets/img/icons/flags/BR.png";

import image from "@/assets/img/team-3.jpg";
// import Globe from "../../examples/Globe.vue";
import {
  faHandPointer,
  faUsers,
  faCreditCard,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import {keyCloakFunction} from "@/services/auth-token";
import Choices from "choices.js";
import Chart from "chart.js/auto";

export default {
  name: "DashboardDefault",
  components: {
    MiniStatisticsCard,
    // PieChartCard,
    // DefaultLineChart,
    // BarChart,
    flatPickr,
    SoftButton,
    // ReportsBarChart,
    // GradientLineChart,
    // SalesTable,
    AnnouncementCard,
    // Globe,
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
      name: '',
      search: false,
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

  computed: {

    dateRangeText() {
      return this.dates.join(' ~ ')
    },

    ringChartData() {
      return this.ringChart
    },

    redeemData() {
      return this.barChart.redeem
    }
  },

  created() {
    this.dateM()
    this.initialize()
  },

  mounted() {
    if (document.getElementById("choices-state")) {
      var element = document.getElementById("choices-state");
      new Choices(element, {
        searchEnabled: false,
      });
    }
    this.barChart2('bar-1', this.barChart.cashIn)
    this.barChart2('bar-2', this.barChart.cashOut)
    this.barChart2('bar-3', this.barChart.remittance)
    this.barChart2('bar-4', this.barChart.redeem)
    this.pieChart2('pieC-1', this.pieChart.transactionCount)
    this.pieChart2('pieC-2', this.pieChart.transactionValue)
  },

  methods: {

    pieChart2(id, chart) {
      var pieChart = document.getElementById(id).getContext("2d");

      let chartStatus = Chart.getChart(id);
      if (chartStatus != undefined) {
        chartStatus.destroy();
      }

      new Chart(pieChart, {
        type: "pie",
        data: {
          labels: chart.labels,
          datasets: [
            {
              label: chart.datasets.label,
              weight: 9,
              cutout: 0,
              tension: 0.9,
              pointRadius: 2,
              borderWidth: 2,
              backgroundColor: ["#17c1e8", "#cb0c9f", "#3A416F", "#a8b8d8"],
              data: chart.datasets.data,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
          scales: {
            y: {
              grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
              },
              ticks: {
                display: false,
              },
            },
            x: {
              grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
              },
              ticks: {
                display: false,
              },
            },
          },
        },
      });
    },

    barChart2(id, chart) {
      // Bar chart
      var ctx = document.getElementById(id).getContext("2d");

      let chartStatus = Chart.getChart(id);
      if (chartStatus != undefined) {
        chartStatus.destroy();
      }

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: chart.labels,
          datasets: [
            {
              label: chart.datasets.label,
              weight: 5,
              borderWidth: 0,
              borderRadius: 4,
              backgroundColor: "#3A416F",
              data: chart.datasets.data,
              fill: false,
              maxBarThickness: 35,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              grid: {
                drawBorder: false,
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                borderDash: [5, 5],
              },
              ticks: {
                display: true,
                padding: 10,
                color: "#9ca2b7",
              },
            },
            x: {
              grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: true,
                drawTicks: true,
              },
              ticks: {
                display: true,
                color: "#9ca2b7",
                padding: 10,
              },
            },
          },
        },
      });
    },

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
      // Vue.use(VueToast, {
      //   // One of the options
      //   position: 'top-right',
      // })
      await this.dateM2();
      this.stats_search.agentCode = JSON.parse(localStorage.getItem('user')).agent_id
      this.currency_key = this.currency.toLowerCase()
      try {
        this.agents2.forEach(o => {
          console.log(o.agentName)
          if (o.id === this.agent) {
            this.agent_data = o
          }
        })
      } catch (e) {
        console.log(e)
      }
      try {
        this.agents = []
        this.agents2 = []
        this.agents.push(this.agent)
        this.agents2.push(this.agent_data)
        const v = await keyCloakFunction('GET',
            '/agency_banking/agent/sub-agents/' + JSON.parse(localStorage.getItem('user')).agent_id,
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
      try {
        const v = await keyCloakFunction('POST',
            '/agency_banking/wallet/agent-stats',
            this.stats_search, this.$cookies.get('refresh_token'))
        if (v.statusText === 'OK') {
          this.api_stats = v.data
          console.log(this.api_stats)
        }
      } catch (e) {
        // const instance = Vue.$toast.open({
        //   message: e,
        //   type: 'error',
        // })
        console.log('')
      }
      let val = 0
      this.api_stats.forEach(o => {
        if (o.transaction_currency === this.currency) {
          val += o.tran_count
        }
      })
      this.stats.transactionCount.value = String(val)
      val = 0
      this.api_stats.forEach(o => {
        if (o.transaction_currency === this.currency) {
          val += Math.abs(o.transaction_value)
        }
      })
      this.stats.totalMovement.value = formatter.format(parseFloat(Math.abs(val)))
      var arr = []
      var arr2 = []
      val = 0
      this.api_stats.forEach(o => {
        if (o.transaction_type === 'CASH_IN' && o.transaction_currency === this.currency) {
          val += o.tran_count
        }
      })
      arr.push(val)
      val = 0
      arr2.push({
        values: arr,
        text: 'Cash in',
      })
      // arr = []
      this.api_stats.forEach(o => {
        if (o.transaction_type === 'CASH_OUT' && o.transaction_currency === this.currency) {
          val += o.tran_count
        }
      })
      arr.push(val)
      val = 0
      arr2.push({
        values: arr,
        text: 'Cash Out',
      })
      // arr = []
      this.api_stats.forEach(o => {
        if (o.transaction_type === 'remit_funds' && o.transaction_currency === this.currency) {
          val += o.tran_count
        }
      })
      arr.push(val)
      val = 0
      arr2.push({
        values: arr,
        text: 'On Remittance',
      })
      // arr = []
      this.api_stats.forEach(o => {
        if (o.transaction_type === 'redeem_funds' && o.transaction_currency === this.currency) {
          val += o.tran_count
        }
      })
      arr.push(val)
      val = 0
      arr2.push({
        values: arr,
        text: 'On Redeem',
      })
      this.pieChart.transactionCount = {
        labels: ['Cash In', 'Cash Out', 'Remittance', 'Redeem'],
        datasets: {
          label: 'Transaction Count',
          data: arr,
          labels: [{class: '#18c1e8', label: 'Cash In', value: arr[0]},
            {class: '#cb0b9f', label: 'Cash Out', value: arr[1]},
            {class: '#3b416f', label: 'Remittance', value: arr[2]},
            {class: '#a8b8d8', label: 'Redeem', value: arr[3]}
          ]
        },
      };
      arr = []
      arr2 = []

      this.api_stats.forEach(o => {
        if (o.transaction_type === 'CASH_IN' && o.transaction_currency === this.currency) {
          val += Math.abs(o.transaction_value)
        }
      })
      arr.push(parseFloat(Math.abs(val)))
      val = 0
      arr2.push({
        values: arr,
        text: 'Cash in',
      })
      // arr = []
      this.api_stats.forEach(o => {
        if (o.transaction_type === 'CASH_OUT' && o.transaction_currency === this.currency) {
          val += Math.abs(o.transaction_value)
        }
      })
      arr.push(parseFloat(Math.abs(val)))
      val = 0
      arr2.push({
        values: arr,
        text: 'Cash Out',
      })
      // arr = []
      this.api_stats.forEach(o => {
        if (o.transaction_type === 'remit_funds' && o.transaction_currency === this.currency) {
          val += Math.abs(o.transaction_value)
        }
      })
      arr.push(parseFloat(Math.abs(val)))
      val = 0
      arr2.push({
        values: arr,
        text: 'On Remittance',
      })
      // arr = []
      this.api_stats.forEach(o => {
        if (o.transaction_type === 'redeem_funds' && o.transaction_currency === this.currency) {
          val += Math.abs(o.transaction_value)
        }
      })
      arr.push(parseFloat(Math.abs(val)))
      val = 0
      arr2.push({
        values: arr,
        text: 'On Redeem',
      })
      this.pieChart.transactionValue = {
        labels: ['Cash In', 'Cash Out', 'Remittance', 'Redeem'],
        datasets: {
          label: 'Transaction Value',
          data: arr,
          labels: [{class: '#18c1e8', label: 'Cash In', value: arr[0]},
            {class: '#cb0b9f', label: 'Cash Out', value: arr[1]},
            {class: '#3b416f', label: 'Remittance', value: arr[2]},
            {class: '#a8b8d8', label: 'Redeem', value: arr[3]}
          ]
        },
      };
      arr = []
      arr2 = []
      this.agents.forEach(o2 => {
        this.api_stats.forEach(o => {
          if (o.transaction_type === 'CASH_IN' && o.transaction_currency === this.currency && o.agent_code === o2) {
            val += Math.abs(o.transaction_value)
          }
        })
        arr2.push(val)
        val = 0
      })
      this.barChart.cashIn = {
        label: 'Cash In ' + this.currency,
        labels: this.agents,
        datasets: {
          label: 'Cash In by agent',
          data: arr2,
        },
      }
      arr2 = []
      this.agents.forEach(o2 => {
        this.api_stats.forEach(o => {
          if (o.transaction_type === 'CASH_OUT' && o.transaction_currency === this.currency && o.agent_code === o2) {
            val += Math.abs(o.transaction_value)
          }
        })
        arr2.push(val)
        val = 0
      })

      this.barChart.cashOut = {
        label: 'Cash Out ' + this.currency,
        labels: this.agents,
        datasets: {
          label: 'Cash Out by agent',
          data: arr2,
        },
      }
      arr2 = []
      this.agents.forEach(o2 => {
        this.api_stats.forEach(o => {
          if (o.transaction_type === 'remit_funds' && o.transaction_currency === this.currency && o.agent_code === o2) {
            val += Math.abs(o.transaction_value)
          }
        })
        arr2.push(val)
        val = 0
      })
      this.barChart.remittance = {
        label: 'Remittance ' + this.currency,
        labels: this.agents,
        datasets: {
          label: 'Remittance by agent',
          data: arr2,
        },
      }
      arr2 = []
      this.agents.forEach(o2 => {
        this.api_stats.forEach(o => {
          if (o.transaction_type === 'redeem_funds' && o.transaction_currency === this.currency && o.agent_code === o2) {
            val += Math.abs(o.transaction_value)
          }
        })
        arr2.push(val)
        val = 0
      })
      this.barChart.redeem = {
        label: 'Redeem ' + this.currency,
        labels: this.agents,
        datasets: {
          label: 'Redeem by agent',
          data: arr2,
        },
      }
      this.pieChart2('pieC-1', this.pieChart.transactionCount)
      this.pieChart2('pieC-2', this.pieChart.transactionValue)
      this.barChart2('bar-1', this.barChart.cashIn)
      this.barChart2('bar-2', this.barChart.cashOut)
      this.barChart2('bar-3', this.barChart.remittance)
      this.barChart2('bar-4', this.barChart.redeem)

      // values: '0:' + String(Math.ceil(Math.max(...arr2))) + ':' + String(Math.ceil(Math.ceil(Math.max(...arr2)) / 8)),
    },


    async initialize() {
      // Vue.use(VueToast, {
      //   // One of the options
      //   position: 'top-right',
      // })
      // console.log('this.$store.getters.name', this.$store.getters.name)
      await this.dateM2();
      this.stats_search.agentCode = localStorage.getItem('user').agent_id
      this.currency_key = this.currency.toLowerCase()
      try {
        this.agents = []
        this.agents2 = []
        this.agents.push(this.agent)
        this.agents2.push(this.agent_data)
        const v = await keyCloakFunction('GET',
            '/agency_banking/agent/sub-agents/' + localStorage.getItem('user').agent_id,
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
      try {
        const v = await keyCloakFunction('POST',
            '/agency_banking/wallet/agent-stats',
            this.stats_search, this.$cookies.get('refresh_token'))
        if (v.statusText === 'OK') {
          this.api_stats = v.data
          console.log(this.api_stats)
        }
      } catch (e) {
        // const instance = Vue.$toast.open({
        //   message: e,
        //   type: 'error',
        // })
        console.log('')
      }
      let val = 0
      this.api_stats.forEach(o => {
        if (o.transaction_currency === this.currency) {
          val += o.tran_count
        }
      })
      this.stats.transactionCount.value = String(val)
      val = 0
      this.api_stats.forEach(o => {
        if (o.transaction_currency === this.currency) {
          val += Math.abs(o.transaction_value)
        }
      })
      this.stats.totalMovement.value = formatter.format(parseFloat(Math.abs(val)))
      var arr = []
      var arr2 = []
      val = 0
      this.api_stats.forEach(o => {
        if (o.transaction_type === 'CASH_IN' && o.transaction_currency === this.currency) {
          val += o.tran_count
        }
      })
      arr.push(val)
      val = 0
      arr2.push({
        values: arr,
        text: 'Cash in',
      })
      // arr = []
      this.api_stats.forEach(o => {
        if (o.transaction_type === 'CASH_OUT' && o.transaction_currency === this.currency) {
          val += o.tran_count
        }
      })
      arr.push(val)
      val = 0
      arr2.push({
        values: arr,
        text: 'Cash Out',
      })
      // arr = []
      this.api_stats.forEach(o => {
        if (o.transaction_type === 'remit_funds' && o.transaction_currency === this.currency) {
          val += o.tran_count
        }
      })
      arr.push(val)
      val = 0
      arr2.push({
        values: arr,
        text: 'On Remittance',
      })
      // arr = []
      this.api_stats.forEach(o => {
        if (o.transaction_type === 'redeem_funds' && o.transaction_currency === this.currency) {
          val += o.tran_count
        }
      })
      arr.push(val)
      val = 0
      arr2.push({
        values: arr,
        text: 'On Redeem',
      })
      this.pieChart.transactionCount = {
        labels: ['Cash In', 'Cash Out', 'Remittance', 'Redeem'],
        datasets: {
          label: 'Transaction Count',
          data: arr,
          labels: [{class: '#18c1e8', label: 'Cash In', value: arr[0]},
            {class: '#cb0b9f', label: 'Cash Out', value: arr[1]},
            {class: '#3b416f', label: 'Remittance', value: arr[2]},
            {class: '#a8b8d8', label: 'Redeem', value: arr[3]}
          ]
        },
      };
      arr = []
      arr2 = []

      this.api_stats.forEach(o => {
        if (o.transaction_type === 'CASH_IN' && o.transaction_currency === this.currency) {
          val += Math.abs(o.transaction_value)
        }
      })
      arr.push(parseFloat(Math.abs(val)))
      val = 0
      arr2.push({
        values: arr,
        text: 'Cash in',
      })
      // arr = []
      this.api_stats.forEach(o => {
        if (o.transaction_type === 'CASH_OUT' && o.transaction_currency === this.currency) {
          val += Math.abs(o.transaction_value)
        }
      })
      arr.push(parseFloat(Math.abs(val)))
      val = 0
      arr2.push({
        values: arr,
        text: 'Cash Out',
      })
      // arr = []
      this.api_stats.forEach(o => {
        if (o.transaction_type === 'remit_funds' && o.transaction_currency === this.currency) {
          val += Math.abs(o.transaction_value)
        }
      })
      arr.push(parseFloat(Math.abs(val)))
      val = 0
      arr2.push({
        values: arr,
        text: 'On Remittance',
      })
      // arr = []
      this.api_stats.forEach(o => {
        if (o.transaction_type === 'redeem_funds' && o.transaction_currency === this.currency) {
          val += Math.abs(o.transaction_value)
        }
      })
      arr.push(parseFloat(Math.abs(val)))
      val = 0
      arr2.push({
        values: arr,
        text: 'On Redeem',
      })
      this.pieChart.transactionValue = {
        labels: ['Cash In', 'Cash Out', 'Remittance', 'Redeem'],
        datasets: {
          label: 'Transaction Value',
          data: arr,
          labels: [{class: '#18c1e8', label: 'Cash In', value: arr[0]},
            {class: '#cb0b9f', label: 'Cash Out', value: arr[1]},
            {class: '#3b416f', label: 'Remittance', value: arr[2]},
            {class: '#a8b8d8', label: 'Redeem', value: arr[3]}
          ]
        },
      };
      arr = []
      arr2 = []
      this.agents.forEach(o2 => {
        this.api_stats.forEach(o => {
          if (o.transaction_type === 'CASH_IN' && o.transaction_currency === this.currency && o.agent_code === o2) {
            val += Math.abs(o.transaction_value)
          }
        })
        arr2.push(val)
        val = 0
      })
      this.barChart.cashIn = {
        label: 'Cash In ' + this.currency,
        labels: this.agents,
        datasets: {
          label: 'Cash In by agent',
          data: arr2,
        },
      }
      arr2 = []
      this.agents.forEach(o2 => {
        this.api_stats.forEach(o => {
          if (o.transaction_type === 'CASH_OUT' && o.transaction_currency === this.currency && o.agent_code === o2) {
            val += Math.abs(o.transaction_value)
          }
        })
        arr2.push(val)
        val = 0
      })

      this.barChart.cashOut = {
        label: 'Cash Out ' + this.currency,
        labels: this.agents,
        datasets: {
          label: 'Cash Out by agent',
          data: arr2,
        },
      }
      arr2 = []
      this.agents.forEach(o2 => {
        this.api_stats.forEach(o => {
          if (o.transaction_type === 'remit_funds' && o.transaction_currency === this.currency && o.agent_code === o2) {
            val += Math.abs(o.transaction_value)
          }
        })
        arr2.push(val)
        val = 0
      })
      this.barChart.remittance = {
        label: 'Remittance ' + this.currency,
        labels: this.agents,
        datasets: {
          label: 'Remittance by agent',
          data: arr2,
        },
      }
      arr2 = []
      this.agents.forEach(o2 => {
        this.api_stats.forEach(o => {
          if (o.transaction_type === 'redeem_funds' && o.transaction_currency === this.currency && o.agent_code === o2) {
            val += Math.abs(o.transaction_value)
          }
        })
        arr2.push(val)
        val = 0
      })
      this.barChart.redeem = {
        label: 'Redeem ' + this.currency,
        labels: this.agents,
        datasets: {
          label: 'Redeem by agent',
          data: arr2,
        },
      }
      this.pieChart2('pieC-1', this.pieChart.transactionCount)
      this.pieChart2('pieC-2', this.pieChart.transactionValue)
      this.barChart2('bar-1', this.barChart.cashIn)
      this.barChart2('bar-2', this.barChart.cashOut)
      this.barChart2('bar-3', this.barChart.remittance)
      this.barChart2('bar-4', this.barChart.redeem)

      // values: '0:' + String(Math.ceil(Math.max(...arr2))) + ':' + String(Math.ceil(Math.ceil(Math.max(...arr2)) / 8)),
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

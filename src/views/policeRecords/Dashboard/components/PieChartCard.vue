<template>
  <div class="card h-100">
    <div class="p-3 pb-0 card-header">
      <div class="d-flex justify-content-between">
        <h6 class="mb-0">{{ name }}</h6>
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
          <pie-chart
              :id="id"
              :chart="{
                labels: chart.labels,
                datasets: chart.datasets,
              }"
          />
        </div>
        <div class="my-auto col-5">
          <span v-for="(label,i) in chart.datasets.labels" :key="i"
                class="badge badge-md badge-dot me-4 d-block text-start">
            <i :style="{backgroundColor: label.class}"></i>
            <span class="text-xs text-dark">{{ label.label }}&nbsp;&nbsp;<b>{{ currency }}{{ label.value }}</b></span>
          </span>
        </div>
      </div>
    </div>
    <div class="p-3 pt-0 card-footer d-flex align-items-center">
      <div class="w-60">
        <!--        <label class="text-sm" v-for="(label,i) in chart.datasets.labels" :key="i">-->
        <!--          {{ label.label }}: <b>{{currency}}{{label.value}}</b>;&nbsp;-->
        <!--        </label>-->
      </div>
      <!--      <div class="w-40 text-end">-->
      <!--        <a class="mb-0 btn bg-light text-end" href="javascript:;">Read more</a>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import PieChart from "@/examples/Charts/PieChart.vue";

export default {
  name: "PieChartCard",
  components: {
    PieChart,
  },
  props: {
    id: {
      type: String,
      default: "pie-chart",
    },
    name: {
      type: String,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    chart: {
      type: Object,
      required: true,
      label: String,
      labels: Array,
      datasets: {
        type: Array,
        label: String,
        data: Array,
        labels: {
          type: Array,
          class: String,
          label: String,
        },
      },
    },
  },
};
</script>

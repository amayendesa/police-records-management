<template>
  <li class="nav-item">
    <router-link class="nav-link" :to="to">
      <div
          class="text-center bg-white shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center"
          :class="this.$store.state.isRTL ? ' ms-2' : 'me-2'"
      >
        <slot name="icon"></slot>
      </div>
      <span class="sidenav-normal"> {{ text }} </span>
    </router-link>
  </li>
</template>
<script>
export default {
  name: "SidenavItemTwo",
  props: {
    to: {
      type: [Object, String],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

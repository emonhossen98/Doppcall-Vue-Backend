<template>
  <div
    v-if="breadcrumbs && breadcrumbs.length > 0"
    class="breadcrumb-header example align-items-center justify-content-between p-3 bg-white shadow-sm  d-block"
  >
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb mb-0">
        <li
          v-for="(breadcrumb, index) in breadcrumbs"
          :key="index"
          class="breadcrumb-item text-dark fw-light"
          :class="{ active: index === breadcrumbs.length - 1 }"
          aria-current="page"
        >
          <template v-if="index === breadcrumbs.length - 1">
            {{ breadcrumb.label }}
          </template>
          <template v-else>
            <RouterLink v-if="breadcrumb.url" :to="breadcrumb.url" class="text-dark">{{
              breadcrumb.label
            }}</RouterLink>
            <template v-else>
              {{ breadcrumb.label }}
            </template>
          </template>
        </li>
      </ol>
    </nav>
    <div>
      <!-- Content for the right side of the breadcrumb header -->
      <!-- @yield('breadcrumb-right') -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["breadcrumbs"],
};
</script>
<style scoped>
.text-dark {
  color: rgb(136, 126, 126) !important;
  font-size: 18px !important;
}
.breadcrumb-item.text-dark.fw-light.active {
  color: #514c62 !important;
}
</style>

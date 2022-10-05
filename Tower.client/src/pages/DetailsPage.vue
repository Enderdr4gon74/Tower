<template>
  <div class="about">
    <h1>This is the Details page</h1>
    <p>{{route.params.id}}</p>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    return {
      route:  computed(() => route)
    }
  }
}
</script>

<template>
  <div class="home">
    <loader/>
  </div>
</template>

<script>
// @ is an alias to /src
import Loader from "@/components/Loader.vue";

export default {
  name: "home",
  components: {
    Loader
  }
};
</script>

<template>
  <v-btn class="button" :color="getButtonStyle" rounded="0" flat>
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  props: ["text", "isForward"],
  computed: {
    getButtonStyle() {
      return this.isForward ? "#F72585" : "#8C8C8C";
    },
  },
};
</script>

<style scoped lang="scss">
.button {
  font-family: "Audiowide";
  font-size: 24px;
  text-align: center;
  text-transform: none;
}
</style>

<template>
  <v-container class="bg" fluid>
    <CharacterDialog
      :dialogText="textArray"
      buttonText="Continue"
      backwardText="Back"
      characterSource="./src/assets/characters/celeste.png"
      characterSize="210"
      hasOpacity="true"
      route="/secondScene"
    />
  </v-container>
</template>

<script>
import CharacterDialog from "@/components/CharacterDialog.vue";

export default {
  components: { CharacterDialog },
  data: () => ({
    textArray: [
      "Wow, everything went dark!",
      "What is happening? I am scared…",
    ],
  }),
};
</script>

<style scoped>
.bg {
  background-color: #050023;
  height: 100vh;
}
</style>

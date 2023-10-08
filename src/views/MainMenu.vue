<template>
  <v-container class="bg" fluid>
    <v-col>
      <v-row>
        <v-img src="@/assets/logo.png" height="50" />
      </v-row>
      <v-row justify="center">
        <v-btn
          class="mt-10 fontStyle"
          width="540"
          height="63"
          flat
          @click="this.$router.push('/characterSelect')"
        >
          New Game
        </v-btn>
      </v-row>
      <v-row justify="center">
        <v-btn class="mt-10 fontStyle" width="540" height="63" flat
          >Interesting Facts</v-btn
        >
      </v-row>
      <v-row justify="center">
        <v-btn class="mt-10 fontStyle" width="540" height="63" flat
          >About Us</v-btn
        >
      </v-row>
    </v-col>
  </v-container>
</template>

<script setup></script>

<style scoped>
.bg {
  background: url("@/assets/bgImg.png");
  background-size: cover;
  height: 100vh;
}

.fontStyle {
  color: #f72585;
  font-family: "Audiowide";
  font-size: 24px;
}
</style>

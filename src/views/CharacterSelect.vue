<template>
  <v-container class="bg" fluid>
    <v-col>
      <v-row justify="space-between" align="center" class="mx-6">
        <v-text class="title"> Select your player </v-text>
        <ButtonComponent
          @click="this.$router.push('/firstScene')"
          text="Continue"
          :isForward="true"
        />
      </v-row>
      <v-item-group mandatory class="my-6">
        <v-row class="mx-3">
          <v-col>
            <v-item v-slot="{ isSelected, toggle }">
              <v-card
                class="scale"
                :color="isSelected ? '#827CAB' : '#504D65'"
                @click="toggle"
              >
                <v-img
                  class="imageInvert"
                  src="@/assets/characters/celeste.png"
                  height="340"
                />
                <v-card rounded="0" class="text celeste" flat>Celeste</v-card>
              </v-card>
            </v-item>
          </v-col>
          <v-col>
            <v-item v-slot="{ isSelected, toggle }">
              <v-card
                class="scale"
                :color="isSelected ? '#827CAB' : '#504D65'"
                @click="toggle"
              >
                <v-img
                  class="imageInvert"
                  src="@/assets/characters/fenrir.png"
                  height="340"
                />
                <v-card rounded="0" class="text fenrir" flat>Fenrir</v-card>
              </v-card>
            </v-item>
          </v-col>
          <v-col>
            <v-item v-slot="{ isSelected, toggle }">
              <v-card
                class="scale"
                :color="isSelected ? '#827CAB' : '#504D65'"
                @click="toggle"
              >
                <v-img
                  class="imageInvert"
                  src="@/assets/characters/long.png"
                  height="340"
                />
                <v-card rounded="0" class="text long" flat>Long</v-card>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-col>
  </v-container>
</template>

<script>
import ButtonComponent from "@/components/Dialog/ButtonComponent.vue";

export default {
  data: () => ({
    isSelected: false,
  }),
  methods: {},
  components: { ButtonComponent },
};
</script>

<style scoped>
.title {
  font-family: "Audiowide";
  font-size: 50px;
  color: white;
}

.text {
  font-family: "Audiowide";
  font-size: 50px;
  text-align: center;
}

.celeste {
  color: #3f8a81;
}

.fenrir {
  color: #f72585;
}

.long {
  color: #7209b7;
}

.bg {
  background-color: #050023;
  height: 100%;
}

.scale:hover {
  transform: scale(1.05);
}
</style>

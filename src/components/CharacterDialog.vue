<template>
  <v-row class="mx-4">
    <v-img
      v-if="characterSource && isNewton"
      :class="hasOpacity ? 'imageInvertOpacity' : 'imageInvert'"
      :src="characterSource"
      :height="characterSize"
    />
    <v-col
      class="mt-10"
      :cols="characterSource ? '10' : '12'"
      align-self="center"
    >
      <DialogBalloon
        :isDialog="isDialog"
        :dialogText="dialogText[index]"
        :characterSource="characterSource"
        :characterSize="characterSize"
        :isNewton="isNewton"
      />
      <v-row
        :justify="backwardText && index > 0 ? 'space-between' : 'end'"
        class="mt-2 mr-0"
      >
        <ButtonComponent
          v-if="index > 0"
          class="ml-3"
          :text="backwardText"
          :isForward="false"
          @click="
            {
              index -= 1;
            }
          "
        />
        <ButtonComponent
          :text="buttonText"
          :isForward="true"
          @click="
            {
              index == dialogText.length - 1
                ? this.$router.push(route)
                : (index += 1);
            }
          "
        />
      </v-row>
    </v-col>
    <v-img
      v-if="characterSource && !isNewton"
      :class="hasOpacity ? 'imageInvertOpacity' : 'imageInvert'"
      :src="characterSource"
      :height="characterSize"
    />
  </v-row>
</template>

<script>
import DialogBalloon from "./Dialog/DialogBalloon.vue";
import ButtonComponent from "./Dialog/ButtonComponent.vue";

export default {
  props: [
    "dialogText",
    "buttonText",
    "backwardText",
    "isPlayer",
    "isDialog",
    "route",
    "characterSource",
    "characterSize",
    "isNewton",
    "hasOpacity",
  ],

  data: () => ({
    index: 0,
  }),

  components: { DialogBalloon, ButtonComponent },
};
</script>

<style scoped>
.imageInvert {
  transform: scaleX(-1);
}

.imageInvertOpacity {
  opacity: 50%;
  transform: scaleX(-1);
}
</style>

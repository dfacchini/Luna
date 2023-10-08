<template>
  <v-container class="bg" fluid>
    <v-col cols="12">
      <Transition name="slide-fade">
        <CharacterDialog
          class="align-self-end"
          :dialogText="textArray"
          buttonText="Continue"
          backwardText="Back"
          characterSource="./src/assets/characters/newton.png"
          characterSize="210"
          isNewton="true"
          isDialog="true"
        />
      </Transition>
    </v-col>
  </v-container>
</template>

<script>
import CharacterDialog from "@/components/CharacterDialog.vue";

export default {
  components: { CharacterDialog },
  data: () => ({
    showNewton: false,
    showIntro: true,
    introText: "Hey! I’m Newton, I’ll explain everything to you!",
    textArray: [
      "Stay calm, everything is dark because an eclipse is happening.",
      "Feeling afraid of the dark is a natural thing. Darkness can create a sense of uncertainty and anxiety because our senses becomes limited, and it is difficult to identify our surroundings.",
      "Historically, our ancestors faced real dangers at night. This fear is an evolutionary response that helped us survive.",
      "Would you like to understand what an eclipse is, and why it left you in the darkness?",
      "The Earth rotates around itself, which we call rotation.",
      "The Moon, on the other hand, orbits around the Earth.",
      "Sometimes these movements cause them to line up and one to be in the shadow of the other. This phenomenon is called an eclipse.",
      "When the Earth is between the Sun and the Moon, preventing the Sun's light from reaching the Moon, a lunar eclipse occurs. They are arranged in the following order…",
      "When the sunlight reaching Earth is blocked by the moon, a solar eclipse occurs. They are arranged in the following order...",
    ],
  }),
  methods: {
    onLeave() {
      this.showIntro = false;
      this.showNewton = true;
    },
  },
};
</script>

<style scoped>
.bg {
  background-color: #050023;
  height: 100vh;
}
</style>

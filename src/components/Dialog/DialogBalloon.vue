<template>
  <v-card :class="getDialogStyle">
    <v-card-text class="typing-effect pa-6">
      {{ dialogText }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: [
    "isDialog",
    "dialogText",
    "characterSource",
    "characterSize",
    "isNewton",
  ],
  data: () => ({
    typeEffect: true,
  }),
  watch: {
    dialogText(newText, oldText) {
      if (newText != oldText) {
        this.typeEffect = true;
      }
    },
  },
  computed: {
    getDialogStyle() {
      if (this.isDialog && this.isNewton) {
        return "dialogNewton";
      } else if (this.isDialog) {
        return "dialog";
      } else {
        return "thought";
      }
    },
  },
};
</script>

<style scoped>
.dialog {
  border-radius: 20px 20px 0px 20px !important;
}

.dialogNewton {
  border-radius: 20px 20px 20px 0px !important;
}

.thought {
  border-radius: 20px 20px 20px 20px !important;
}

.typing-effect {
  display: block;
  font-family: "Audiowide";
  font-size: 24px;
}

/* .typewriter {
  font-family: "Audiowide";
  font-size: 24px;
  overflow: hidden;
  white-space: nowrap; /* Keeps the content on a single line
  animation: typing 3.5s steps(40, end), step-end infinite;
} 

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
} */

/* .typing-effect {
  font-family: "Audiowide";
  font-size: 24px;
  width: 100%;
  animation: typing 2.5s steps(35);
  white-space: nowrap;
  overflow: hidden;
}

@keyframes typing {
  from {
    width: 0;
  }
} */
</style>

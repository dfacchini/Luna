<template>
  <v-img :src="imageSource" :height="imageSize" />
</template>

<script>
export default {
  props: ["imageSource", "imageSize"],
};
</script>

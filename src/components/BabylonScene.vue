<template>
  <div class="flex column absolute-center">
    <buttons/>
    <canvas ref="bjsCanvas" style="width: 500px;height: 600px"/>
  </div>
</template>

<script>
import {onMounted, ref} from "@vue/runtime-core";
import {createScene} from "../Scenes/firstscenes";
import Buttons from "components/buttons.vue";

export default {
  name: "BabylonScene",
  components: {Buttons},
  setup() {
    const bjsCanvas = ref(null);

    onMounted(() => {
      if (bjsCanvas.value) {
        createScene(bjsCanvas.value);
      }
    });
    return {
      bjsCanvas,
    };
  },
};
</script>

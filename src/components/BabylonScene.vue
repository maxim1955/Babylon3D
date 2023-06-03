<template>

  <div class="flex q-pa-xl row reverse" style="width: 100%;" >
    <buttons class="col-2 flex column justify-center"/>
    <canvas ref="bjsCanvas" class="col-10" style="height: 600px" />
  </div>
  <div class="createbtn">
    <CreateBtn/>
  </div>
</template>

<script>
import {onMounted, ref} from "@vue/runtime-core";
import {createScene} from "../Scenes/firstscenes";
import Buttons from "components/Gizmobuttons.vue";
import CreateBtn from "components/CreateBtn.vue";

export default {
  name: "BabylonScene",
  components: {CreateBtn, Buttons},
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

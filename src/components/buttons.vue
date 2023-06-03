<template>
  <div class="flex justify-between">
    <q-btn size="30px" color="black" class="q-ml-md" @click="rightHand(event)" id="positionBtn">
      <i class="fa-solid fa-up-down-left-right fa-beat" style="color: #2913ec;"></i>
    </q-btn>
    <q-btn size="30px" color="black" class="q-ml-md" id="rotateBtn">
      <i class="fa-solid fa-rotate fa-spin fa-spin-reverse" style="color: #2913ec;" ></i>
    </q-btn>
    <q-btn size="30px" color="black" class="q-ml-md" id="scaleBtn">
      <i class="fa-solid fa-up-right-and-down-left-from-center" style="color: #2913ec;"></i>
    </q-btn>
    <q-btn size="30px" color="black" class="q-ml-md" id="boundBtn">
      <i class="fa-solid fa-arrows-to-dot fa-beat " style="color: #2913ec;"></i>
    </q-btn>
  </div>
</template>


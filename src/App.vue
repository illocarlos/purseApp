<script setup>
import { ref, reactive } from 'vue';
import Planner from './components/Planner.vue';
import ControlPlanner from './components/ControlPlanner.vue';
import iconExpensive from './assets/img/nuevo-gasto.svg';
import Modal from './components/Modal.vue';

const planner = ref(0);
const aviable = ref(0);
const modal = reactive({
  show: false,
  animate: false,
});

const expens = reactive({
  id: null,
  name: "",
  cuanty: "",
  category: "",
  date: Date.now()
});

const validatePlanner = (count) => {
  planner.value = count;
  aviable.value = count;
};

const showModal = () => {
  modal.show = true;
  setTimeout(() => {
    modal.animate = true;
  }, 300);
};

const closeModal = () => {
  modal.animate = false;
  setTimeout(() => {
    modal.show = false;
  }, 300);
};
</script>

<template>
<header>
  <h1 class="h1-Header">expense planner</h1>
  <div class="container-header container shadow">
    <Planner
    v-if="planner===0"
    @validate-planner="validatePlanner"
    />

  <ControlPlanner
  v-else
  :planner="planner"
  :aviable="aviable"
  />
 
  </div>
</header>
   <div  v-if="planner==0"
    class="createExpensive">
      <img
      @click="showModal"
       :src="iconExpensive" alt="more expensive">
    </div>

    <Modal
    v-if="modal.show " 
    @close-modal="closeModal"
    :modal="modal"
    v-model:name="expens.name"
     v-model:cuanty="expens.cuanty"
      v-model:category="expens.category"
    />
</template>



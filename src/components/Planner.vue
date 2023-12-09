
<script setup>
import { ref } from 'vue';
import Alert from './Alert.vue';



const planner = ref(0)
const error=ref("")
const emit = defineEmits(['validate-planner'])

const validatePlanner = () => {
  if (planner.value <= 0|| planner.value==="") {

    error.value = "Planner not valid"

    setTimeout(() => {
      error.value = ""
    }, 3000)
    return
  } 

  emit('validate-planner', planner.value)
}

</script>

<template>
  <form class="planner" action=""
  @submit.prevent="validatePlanner"
  >
<Alert
v-if="error">
    <p>{{ error }}</p>
</Alert>
<label for="new-Planner">Planner</label>
<input 
class="new-Planner"
id="new-Planner"
placeholder="Add planner"
type="number"
v-model.number="planner"
min="0"
>
<button class="btn-planner" type="submit"> add</button>
  
  </form>
</template>

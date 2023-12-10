<script setup>
import { computed } from 'vue'
import CircleProgress from 'vue3-circle-progress'
import 'vue3-circle-progress/dist/circle-progress.css'
import { formate } from '../helpers/index'

const prop = defineProps({
    planner: {
        type: Number,
        required:true,

    },
    aviable: {
        type: Number,
        required: true, 
    },
    spent:{
    type: Number,
    required: true,
        
    },

})
 defineEmits(['reset'])

const percentage = computed(() => {
    return parseInt(((prop.planner-prop.aviable)/prop.planner)*100)
 })
 </script>


<template>
  <div class="two-column">

<div class="container-grafic">
    <p :class="[percentage<85 ? 'percentage' : 'nopercentage']" >{{ percentage }} %</p>
<CircleProgress
:percent="percentage"
:size="300"
:border-width="25"
:border-bg-width="30"
fill-color="rgb(232, 184, 75)"
empty-color="rgba(76, 101, 141, 0.538)"
/>
</div>

<div class="container-planner">  
    <div class="div-btn">
    <button
class="btn-control"
   @click="$emit('reset')" 
   >reset</button>
    </div>
    <p>
        <span>presupuesto:</span>
        
        {{ formate(planner) }}
    </p>

    <p>
       <span> available:</span>
    {{ formate(aviable) }}
    </p>

    <p>
       <span> expenses:</span>
        {{ formate(spent) }}
    </p> 
</div>
  </div>
</template>



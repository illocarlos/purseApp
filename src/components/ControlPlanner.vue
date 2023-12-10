<script setup>
import img from "../assets/img/grafico.jpg"  
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


 </script>


<template>
  <div class="two-column">

<div class="container-grafic">
<img :src="img" >
</div>

<div class="container-planner">  
    <div class="div-btn">
    <button
class="btn-control"
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



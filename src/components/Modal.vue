<script setup>
import closeModal from "../assets/img/cerrar.svg";
const emit = defineEmits(['close-modal',])

const prop = defineProps({
    modal: {
        type: Object,
        required:true,
    },
    name: {
        type: String,
        required:true,
    },
      cuanty: {
        type: [String,Number],
        required: true,
    },
      category: {
        type: String,
        required: true,
    },
   
 })



</script>

<template>
  <div class="modal">
    <div class="close-modal">
      <img 
      @click="$emit('close-modal')"
       :src="closeModal" alt="close">
    </div>

    <div
    class="container "
    >
<form class="new-quantity  container-form "
:class="[modal.animate? 'active' : 'close']">

    <h1 class="title-legend">add expensive</h1>

   
<div class="camp">

<label for="name">name planner:</label>
<input type="text"
id="name"
placeholder="add planner"
:value="name"
>



    <label for="quantity">quantity planner:</label>
    <input type="number"
    id="quantity"
    min="0"
    placeholder="add quantity"
    :value="quantity"
    >


     <label  id="category" >category</label>
        <select type="number"
        id="category"
        placeholder="add category"
        :value="category"
        >
    <option value="">--Selec category--</option>
      <option value="food">Food</option>
        <option value="house">House</option>
          <option value="several">Several</option>
            <option value="leisure">Leisure</option>
              <option value="healty">Healty</option>
                <option value="suscriptions">Suscriptions</option>
    </select>

    <div class="btn-modal">
        <button type="submit">add quantity</button>
    </div>

  
    </div>
</form>
    </div>
  </div>
</template>

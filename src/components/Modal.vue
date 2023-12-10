
<script setup>
import { computed, ref } from "vue";
import Alert from "./Alert.vue";
import closeModal from "../assets/img/cerrar.svg";


const emit = defineEmits(['close-modal', 'update:name', 'update:quantity', 'update:category', 'save-planner','deleted'])
const error = ref("")

const props = defineProps({
  modal: {
    type: Object,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: [String, Number],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  aviable: {
    type: Number,
    required:true
  },
  id:{
  type: [String, null],
    required:true
  }

})
const old = props.quantity

const addCuantity = () => {
  const { name, quantity, category, aviable, id } = props
  
  if ([name, quantity, category].includes("")) {
    error.value = 'all fields are mandatory'

    setTimeout(() => {
      error.value = ''
    }, 3000);
    return
  } else if (quantity<=0) {
    error.value = 'Invalid quantity'
     setTimeout(() => {
      error.value = ''
    }, 3000);
    return
  }
  if (id) {
    if (quantity>old+ aviable) {
    if (quantity > aviable) {
        error.value = 'You exceeded the budget'
         setTimeout(() => {
          error.value = ''
        }, 3000);
        return
      }
  }
  }else{
   if (quantity > aviable) {
     error.value = 'You exceeded the budget'
        setTimeout(() => {
        error.value = ''
      }, 3000);
      return
    }
}
 
emit('save-planner')

}


const isEdit = computed(() => {
  return props.id
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
:class="[modal.animate? 'active' : 'close']"
@submit.prevent="addCuantity"
>

<Alert v-if="error">{{ error }}</Alert>

<h1
v-if="isEdit" 
 class="title-legend">edit expensive</h1>
    <h1 v-else class="title-legend">add expensive</h1>

   
<div class="camp">

<label for="name">name planner:</label>
<input type="text"
id="name"
placeholder="add planner"
:value="name"
@input="$emit('update:name',$event.target.value)"
>



    <label for="quantity">quantity planner:</label>
    <input type="number"
    id="quantity"
    min="0"
    placeholder="add quantity"
    :value="quantity"
    @input="$emit('update:quantity',+$event.target.value)"
    >


     <label  id="category" >category</label>
        <select 
        id="category"
        placeholder="add category"
        :value="category"
         @input="$emit('update:category', $event.target.value)"
        >
    <option value="">--Selec category--</option>
      <option value="food">Food</option>
        <option value="house">House</option>
          <option value="several">Several</option>
            <option value="leisure">Leisure</option>
              <option value="healty">Healty</option>
                <option value="suscriptions">Suscriptions</option>
    </select>

  <div class="div-btn">
    <div class="btn-modal">
 
            <button
            class="btn-edit-create"
            v-if="isEdit " type="submit">edit quantity</button>
        
        <button
        v-else class="btn-edit-create"
        type="submit">add quantity</button>
  </div>
    
  <button
  v-if="isEdit"
  type="button"
  class="btn-delete "
  @click="$emit('deleted',id)"
  >
    deleted
  </button>
  </div>
    </div>
</form>

    </div>
  </div>
</template>

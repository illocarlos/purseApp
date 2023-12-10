<script setup>
import { ref, reactive,watch,computed, onMounted } from 'vue';
import Planner from './components/Planner.vue';
import ControlPlanner from './components/ControlPlanner.vue';
import iconExpensive from './assets/img/nuevo-gasto.svg';
import Modal from './components/Modal.vue';
import Expend from './components/Expend.vue';
import Filter from './components/Filter.vue';
import { random } from './helpers/index';

const planner = ref(0);
const aviable = ref(0);
const spent = ref(0);
const filter=ref("")
const modal = reactive({
  show: false,
  animate: false,
});

const expens = reactive({
  id: null,
  name: "",
  quantity: "",
  category: "",
  date: Date.now()
});
const expen = ref([])

watch(expen, () => {
const totalSpent = expen.value.reduce((total, exp) => {
return  exp.quantity + total
}, 0)


  aviable.value= planner.value - totalSpent 
  spent.value= totalSpent
}, {
  deep:true,
})

watch(modal, () => {
  if (!modal.show ) {
    resetModal()
  }
})


watch( expen,() => {
  addLocalStorage();
}, { deep: true });

watch(planner, () => {
  addLocalStorage();
}, { deep: true });

onMounted(() => {
  const expenStorage = localStorage.getItem('expen');
  if (expenStorage) {
    expen.value = JSON.parse(expenStorage);
  } else {
    expen.value = [];
  }
});

onMounted(() => {
  const plannerStorage = localStorage.getItem('planner'); 
  if (plannerStorage) {
    planner.value = Number(plannerStorage);
    aviable.value = Number(plannerStorage);
  }
});

const addLocalStorage = () => {
  localStorage.setItem('planner', JSON.stringify(planner.value))
  localStorage.setItem('expen', JSON.stringify(expen.value))
}



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


const savePlanner = () => {
  if (expens.id) {
  const { id } = expens
    const i = expen.value.findIndex((eachExpen) => eachExpen.id === id)
    expen.value[i] = { ...expens }
  } else {
    expen.value.push({
      ...expens,
      id: random()
    })
}
  closeModal()
 resetModal()
}


const resetModal = () => {
   Object.assign(expens, {
    id: null,
    name: "",
    quantity: "",
    category: "",
    date: Date.now()
  })
};


const selectPlanner = id => {

  const oneExpend = expen.value.filter(exp => exp.id === id)[0]
  Object.assign(expens, oneExpend);
  showModal()
}
const deleted = (id) => {
  if (confirm('deleted?')) {
    expen.value = expen.value.filter(elem => elem.id !== id)
    closeModal()
  }
}
const computedFilter = computed(() => {
  if (filter.value) {
    return expen.value.filter(exp=>exp.category===filter.value)
  } else {
    return expen.value
  }
})
const reset = () => {
  if (confirm('reseat ?')) {
    planner.value = 0
    expen.value=[]
    
  }
}
</script>

<template>
  <div 
  :class="{fixed: modal.show }"
  >
<header>
  <h1 class="h1-Header">expense planner</h1>
  <div class="container-header container shadow">

    <Planner
    v-if="planner<=0"
    @validate-planner="validatePlanner"
    />
<div v-else>
  <ControlPlanner
  @reset="reset"
  :planner="planner"
  :aviable="aviable"
  :spent="spent"
  />

    </div>
  </div>
  
</header>
   <div 
       v-if="planner > 0"
       class="expen-list container ">
      <Filter
      v-model:filter="filter"
      />
       <h2>{{ computedFilter.length >0?'expend':'there are no expenses'}}</h2>
             <Expend
             v-for="exp in computedFilter"
             :key="exp.id"
             :exp="exp"
                @select-Planner="selectPlanner"
             />
              </div>
   <main  v-if="planner>0"
    class="createExpensive">
    
      <img
      @click="showModal"
       :src="iconExpensive" alt="more expensive">
 
   </main>
    <Modal
    v-if="modal.show " 
    @close-modal="closeModal"
    @save-planner="savePlanner"
    @deleted="deleted"
    :modal="modal"
    :aviable="aviable"
    :id="expens.id"
    v-model:name="expens.name"
     v-model:quantity="expens.quantity"
      v-model:category="expens.category"
    />
  
  </div>
</template>



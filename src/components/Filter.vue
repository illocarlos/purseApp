        <script setup>
        defineProps(['filter'])
        defineEmits(['update:filter'])
        </script>
<template>
  <div class="shadow container filter">
<form >
    <div class="camp">
    <label for="filter">Filter</label>
    <select 
       id="filter"
            placeholder="add category"
            :value="filter"
             @input="$emit('update:filter', $event.target.value)"
    >
        <option value="">--Selec category--</option>
          <option value="food">Food</option>
            <option value="house">House</option>
              <option value="several">Several</option>
                <option value="leisure">Leisure</option>
                  <option value="healty">Healty</option>
                    <option value="suscriptions">Suscriptions</option>
    </select>
        </div>
</form>
  </div>
  
</template>



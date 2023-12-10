        <script setup>
        import { formate, formateDate } from '../helpers/index'
        import IconoCasa from '../assets/img/icono_casa.svg'
        import IconoComida from '../assets/img/icono_comida.svg'
        import IconoGastos from '../assets/img/icono_gastos.svg'
        import IconoOcio from '../assets/img/icono_ocio.svg'
        import IconoSalud from '../assets/img/icono_salud.svg'
        import IconoSuscripciones from '../assets/img/icono_suscripciones.svg'
       
        const props = defineProps({
                    exp: {
                        type: Object,
                        required: true,
            

                    }
        })


        const dictionaryIconos = {
            food: IconoComida,
            house: IconoCasa,
            several: IconoGastos,
            leisure: IconoOcio,
            healty: IconoSalud,
            suscriptions: IconoSuscripciones
        }
        defineEmits(['select-Planner'])

        </script>
<template>
  

  <div class="expen shadow"
  @click="$emit('select-Planner', exp.id)">
<div class="expe-conten">
    <img :src="dictionaryIconos[exp.category]" 
    alt="icon" class="iconImg">
<div class="details">
<p class="category">{{ exp.category }}</p>
<p class="name">{{ exp.name }}</p>
<p class="date">
    Date:
    <span>{{ formateDate( exp.date) }}</span>
</p>
</div>
    </div>


<p class="quantity">{{ formate(exp.quantity) }}</p>
  
  </div>
</template>



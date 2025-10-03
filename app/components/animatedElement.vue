<template>
  <div ref="targetElement">
    <slot /> 
  </div>
</template>

<script setup >
import { ScrollTrigger } from 'gsap/ScrollTrigger'

onBeforeMount(() => {
  useGSAP().registerPlugin(ScrollTrigger)
})

const targetElement = ref(null)

const props = defineProps({
  from: { 
    type: Object, 
    default: () => ({ opacity: 0, y: 100 }) 
  },
  to: { 
    type: Object, 
    default: () => ({ opacity: 1, y: 0 }) 
  },
  duration: { 
    type: Number, 
    default: 1 
  },
  ease: { 
    type: String, 
    default: 'power3.out' 
  }
})

onMounted(() => {
  const animationOptions = {
    ...props.to,
    duration: props.duration,
    ease: props.ease,
    scrollTrigger: {
      trigger: targetElement.value,
      start: 'top 100%',
      toggleActions: 'play reverse play reverse',
    }
  };
  useGSAP().fromTo(targetElement.value, props.from, animationOptions)
});
</script>
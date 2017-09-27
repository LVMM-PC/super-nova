<template>
    <h2 class="i-header" v-bind:id="model.value">
      {{model.value}}
      <a v-bind:href="'#'+model.value">&para;</a>
    </h2>
</template>

<script>
  export default {
    name: 'ih2',
    props: ['model']
  }
</script>

<style lang="scss">

</style>

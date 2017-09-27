<template>
    <h1 class="i-header" v-bind:id="model.value">
      {{model.value}}
      <a v-bind:href="'#'+model.value">&para;</a>
    </h1>
</template>

<script>
  export default {
    name: 'ih1',
    props: ['model']
  }
</script>

<style lang="scss">

</style>

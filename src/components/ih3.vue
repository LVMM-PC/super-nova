<template>
    <h3 class="i-header" v-bind:id="model.value">
      {{model.value}}
      <a v-bind:href="'#'+model.value">&para;</a>
    </h3>
</template>

<script>
  export default {
    name: 'ih3',
    props: ['model']
  }
</script>

<style lang="scss">

</style>

<template>
  <div id="app">
    <div v-katex:display="'\\frac{a_i}{1+x}'" />
    <div v-katex="'\\frac{a_i}{1+x}'" />
    <div v-katex="{ expression: '\\frac{a_i}{1+x}', options: { throwOnError: false }}" />
  </div>
</template>

<script>

export default {
  name: 'App',
};
</script>

<style>
</style>

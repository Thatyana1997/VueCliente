<script> 
  import EstudiantesList from './components/EstudiantesList.vue'
  import CursosList from './components/CursosList.vue';
  import MatriculaForm from './components/MatriculaForm.vue';

  export default {
    components: {
      EstudiantesList,
      CursosList,
      MatriculaForm
    }
  };

</script>

<template>
  <div id="app">
    <h1>Sistema de Matrícula</h1>
    <EstudiantesList />
    <CursosList />
    <MatriculaForm />
  </div>
</template>

<style scoped>
   
</style>

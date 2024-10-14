<template>
  <div>
    <h2>Cursos</h2>
    <ul>
      <li v-for="curso in cursos" :key="curso.id">
        {{ curso.nombre }} - {{ curso.descripcion }}
      </li>
    </ul>
  </div>
</template>

<script>
  import apiService from '../services/apiService.js';

  export default {
    data() {
      return {
        cursos: []
      };
    },
    created() {
      apiService.getCursos()
        .then(response => {
          this.cursos = response.data;
        })
        .catch(error => {
          console.error('Error obteniendo cursos:', error);
        });
    }
  };
</script>

<style>
</style>

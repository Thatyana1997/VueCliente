<template>
  <div>
    <h2>Estudiantes</h2>
    <ul>
      <li v-for="estudiante in estudiantes" :key="estudiante.id">
        {{ estudiante.nombre }} {{ estudiante.primer_apellido }} {{ estudiante.segundo_apellido }}
      </li>
    </ul>
  </div>
</template>

<script>
  import apiService from '../services/apiService.js';

  export default {
    data() {
      return {
        estudiantes: []
      };
    },
    created() {
      apiService.getEstudiantes()
        .then(response => {
          this.estudiantes = response.data;
        })
        .catch(error => {
          console.error('Error obteniendo estudiantes:', error);
        });
    }
  };
</script>

<style>
</style>

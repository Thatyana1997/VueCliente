
<template>
  <div>
    <h2>Matricular Estudiante</h2>
    <form @submit.prevent="submitMatricula">
      <div>
        <label for="estudiante">Estudiante:</label>
        <select v-model="matricula.estudiante_id">
          <option v-for="estudiante in estudiantes" :value="estudiante.id" :key="estudiante.id">
            {{ estudiante.nombre }} {{ estudiante.primer_apellido }}
          </option>
        </select>
      </div>
      <div>
        <label for="curso">Curso:</label>
        <select v-model="matricula.curso_id">
          <option v-for="curso in cursos" :value="curso.id" :key="curso.id">
            {{ curso.nombre }}
          </option>
        </select>
      </div>
      <button type="submit">Matricular</button>
    </form>
  </div>
</template>

<script>
  import apiService from '../services/apiService.js';

  export default {
    data() {
      return {
        estudiantes: [],
        cursos: [],
        matricula: {
          estudiante_id: '',
          curso_id: '',
          fecha_matricula: new Date().toISOString().slice(0, 10), // Fecha de matriculación actual
          adicionado_por: 'Admin',
          fecha_adicion: new Date().toISOString().slice(0, 10), // Fecha de matriculación actual

        }
      };
    },
    created() {
      this.loadEstudiantes();
      this.loadCursos();
    },
    methods: {
      loadEstudiantes() {
        apiService.getEstudiantes()
          .then(response => {
            this.estudiantes = response.data;
          })
          .catch(error => {
            console.error('Error obteniendo estudiantes:', error);
          });
      },
      loadCursos() {
        apiService.getCursos()
          .then(response => {
            this.cursos = response.data;
          })
          .catch(error => {
            console.error('Error obteniendo cursos:', error);
          });
      },
      submitMatricula() {
        apiService.matricularEstudiante(this.matricula)
          .then(() => {
            alert('Estudiante matriculado con éxito');
          })
          .catch(error => {
            console.error('Error al matricular:', error);
          });
      }
    }
  };
</script>

<style>
</style>

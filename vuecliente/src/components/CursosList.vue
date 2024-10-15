<template>
  <div>
    <h2>Cursos</h2>
    <ul>
      <li v-for="curso in cursos" :key="curso.id">
        {{ curso.nombre }} - {{ curso.descripcion }}
        <button @click="editarCurso(curso)" class="btn editar">Editar</button>
        <button @click="eliminarCurso(curso)" class="btn eliminar">Eliminar</button>
      </li>
    </ul>

    <!-- Formulario para agregar/editar curso -->
    <div>
      <h3>{{ cursoForm.id ? 'Editar' : 'Agregar' }} Curso</h3>
      <form @submit.prevent="guardarCurso">
        <div>
          <label for="nombre">Nombre:</label>
          <input v-model="cursoForm.nombre" type="text" required />
        </div>
        <div>
          <label for="primer_apellido">Descripción:</label>
          <input v-model="cursoForm.descripcion" type="text" required />
        </div>
        <button class="btn editar" type="submit">{{ cursoForm.id ? 'Actualizar' : 'Crear' }} Curso</button>
        <button type="button" @click="limpiarFormulario" class="btn cancelar">Cancelar</button>
      </form>
    </div>

  </div>
</template>

<script>
  import apiService from '../services/apiService.js';

  export default {
    data() {
      return {
        cursos: [],
        cursoForm: {
          id: 0,
          nombre: '',
          descripcion: '',
          adicionado_por: 'Admin',
          fecha_adicion: new Date().toISOString().slice(0, 10), // Fecha de nacimiento actual
        }
      };
    },
    created() {
      this.cargarCursos();
    },
    methods: {
      // Cargar cursos
      cargarCursos() {
        apiService.getCursos()
          .then(response => {
            this.cursos = response.data;
          })
          .catch(error => {
            console.error('Error obteniendo cursos:', error);
          });
      },

      // Guardar curso (crear o actualizar)
      guardarCurso() {
        if (this.cursoForm.id) {
          // Si tiene id, actualizamos
          apiService.actualizarCurso(this.cursoForm)
            .then(() => {
              this.cargarCursos();
              this.limpiarFormulario();
            })
            .catch(error => {
              console.error('Error actualizando curso:', error);
            });
        } else {
          // Si no tiene id, creamos
          apiService.crearCurso(this.cursoForm)
            .then(() => {
              this.cargarCursos();
              this.limpiarFormulario();
            })
            .catch(error => {
              console.error('Error creando curso:', error);
            });
        }
      },

      // Editar Curso
      editarCurso(curso) {
        this.cursoForm = { ...curso }; // Copiamos el curso seleccionado en el formulario
      },

      // Eliminar Curso
      eliminarCurso(curso) {
        if (confirm('¿Estás seguro de que quieres eliminar este curso?')) {
          apiService.eliminarCurso(curso.id)
            .then(() => {
              this.cargarCursos();
            })
            .catch(error => {
              console.error('Error eliminando curso:', error);
            });
        }
      },

      // Limpiar formulario
      limpiarFormulario() {
        this.cursoForm = {
          id: 0,
          nombre: '',
          descripcion: '',
          adicionado_por: 'Admin',
          fecha_adicion: new Date().toISOString().slice(0, 10), // Fecha de nacimiento actual
        };
      }
    }
  };
</script>

<style>
</style>

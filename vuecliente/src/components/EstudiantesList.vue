<template>
  <div>
    <h2>Estudiantes</h2>
    <ul>
      <li v-for="estudiante in estudiantes" :key="estudiante.id">
        {{ estudiante.nombre }} {{ estudiante.primer_apellido }} {{ estudiante.segundo_apellido }}
        <button @click="editarEstudiante(estudiante)" class="btn editar">Editar</button>
        <button @click="eliminarEstudiante(estudiante)" class="btn eliminar">Eliminar</button>
      </li>
    </ul>

    <!-- Formulario para agregar/editar estudiante -->
    <div>
      <h3>{{ estudianteForm.id ? 'Editar' : 'Agregar' }} Estudiante</h3>
      <form @submit.prevent="guardarEstudiante">
        <div>
          <label for="identificacion">Identificación:</label>
          <input v-model="estudianteForm.identificacion" type="text" required />
        </div>
        <div>
          <label for="nombre">Nombre:</label>
          <input v-model="estudianteForm.nombre" type="text" required />
        </div>
        <div>
          <label for="primer_apellido">Primer Apellido:</label>
          <input v-model="estudianteForm.primer_apellido" type="text" required />
        </div>
        <div>
          <label for="segundo_apellido">Segundo Apellido:</label>
          <input v-model="estudianteForm.segundo_apellido" type="text" required />
        </div>
        <button class="btn editar" type="submit">{{ estudianteForm.id ? 'Actualizar' : 'Crear' }} Estudiante</button>
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
        estudiantes: [],
        estudianteForm: {
          id: 0,
          identificacion: '',
          nombre: '',
          primer_apellido: '',
          segundo_apellido: '',
          fecha_nacimiento: new Date().toISOString().slice(0, 10), // Fecha de nacimiento actual
          adicionado_por: 'Admin',
          fecha_adicion: new Date().toISOString().slice(0, 10), // Fecha de nacimiento actual
          "modificado_por": '' ,
          "fecha_modificacion": null
        }
      };
    },
    created() {  
      this.cargarEstudiantes();
    },
    methods: {
      // Cargar estudiantes
      cargarEstudiantes() {
        apiService.getEstudiantes()
          .then(response => {
            this.estudiantes = response.data;
          })
          .catch(error => {
            console.error('Error obteniendo estudiantes:', error);
          });
      },

      // Guardar estudiante (crear o actualizar)
      guardarEstudiante() {
        if (this.estudianteForm.id) {
          // Si tiene id, actualizamos
          apiService.actualizarEstudiante(this.estudianteForm)
            .then(() => {
              this.cargarEstudiantes();
              this.limpiarFormulario();
            })
            .catch(error => {
              console.error('Error actualizando estudiante:', error);
            });
        } else {
          console.log('Formulario a enviar:', this.estudianteForm);
          // Si no tiene id, creamos
          apiService.crearEstudiante(this.estudianteForm)
            .then(() => {
              this.cargarEstudiantes();
              this.limpiarFormulario();
            })
            .catch(error => {
              console.error('Error creando estudiante:', error);
            });
        }
      },

      // Editar estudiante
      editarEstudiante(estudiante) {
        this.estudianteForm = { ...estudiante }; // Copiamos el estudiante seleccionado en el formulario
      },

      // Eliminar estudiante
      eliminarEstudiante(estudiante) {
        if (confirm('¿Estás seguro de que quieres eliminar este estudiante?')) {
          apiService.eliminarEstudiante(estudiante.id)
            .then(() => {
              this.cargarEstudiantes();
            })
            .catch(error => {
              console.error('Error eliminando estudiante:', error);
            });
        }
      },

      // Limpiar formulario
      limpiarFormulario() {
        this.estudianteForm = {
          id: 0,
          identificacion: '',
          nombre: '',
          primer_apellido: '',
          segundo_apellido: '',
          fecha_nacimiento: new Date().toISOString().slice(0, 10), // Fecha de nacimiento actual
          adicionado_por: 'Admin',
          fecha_adicion: new Date().toISOString().slice(0, 10), // Fecha de nacimiento actual
          "modificado_por": '',
          "fecha_modificacion": null
        };
      }
    }
  };
</script>

<style>
</style>

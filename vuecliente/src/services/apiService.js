import axios from 'axios';


const API_URL = 'https://localhost:7285/api';

export default {
  // Obtener todos los estudiantes
  getEstudiantes() {
    return axios.get(`${API_URL}/estudiante/listar`);
  },

  // Crear un estudiante nuevo
  crearEstudiante(estudiante) {
    return axios.post(`${API_URL}/estudiante/crear`, estudiante);
  },

  // Actualizar un estudiante existente
  actualizarEstudiante(estudiante) {
    return axios.put(`${API_URL}/estudiante/actualizar/${estudiante.id}`, estudiante);
  },

  // Eliminar un estudiante
  eliminarEstudiante(id) {
    return axios.delete(`${API_URL}/estudiante/eliminar/${id}`);
  },

  // Obtener todos los cursos
  getCursos() {
    return axios.get(`${API_URL}/curso/listar`);
  },
  // Crear un Curso nuevo
  crearCurso(curso) {
    return axios.post(`${API_URL}/curso/crear`, curso);
  },

  // Actualizar un curso existente
  actualizarCurso(curso) {
    return axios.put(`${API_URL}/curso/actualizar/${curso.id}`, curso);
  },

  // Eliminar un curso
  eliminarCurso(id) {
    return axios.delete(`${API_URL}/curso/eliminar/${id}`);
  },

  // Obtener todas las matrículas
  getMatriculas() {
    return axios.get(`${API_URL}/matricula/listar`);
  },

  // Matricular estudiante en un curso
  matricularEstudiante(matricula) {
    return axios.post(`${API_URL}/matricula/crear`, matricula);
  }
};

import axios from 'axios';


const API_URL = 'https://localhost:7285/api';

export default {
  // Obtener todos los estudiantes
  getEstudiantes() {
    return axios.get(`${API_URL}/estudiante/listar`);
  },

  // Obtener todos los cursos
  getCursos() {
    return axios.get(`${API_URL}/curso/listar`);
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

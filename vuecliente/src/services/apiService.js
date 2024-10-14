import axios from 'axios';


const API_URL = 'https://localhost:7285/api';

export default {
  // Obtener todos los estudiantes
  getEstudiantes() {
    return axios.get(`${API_URL}/estudiantes`);
  },

  // Obtener todos los cursos
  getCursos() {
    return axios.get(`${API_URL}/cursos`);
  },

  // Obtener todas las matrículas
  getMatriculas() {
    return axios.get(`${API_URL}/matriculas`);
  },

  // Matricular estudiante en un curso
  matricularEstudiante(matricula) {
    return axios.post(`${API_URL}/matriculas`, matricula);
  }
};

import axios from 'axios';

const API_URL = 'http://100.30.153.63:8080/api/usuarios';

export async function getUsuarios() {
    try {

        const response = await axios.get(API_URL);
        return response.data;
    
    }catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

export async function postUsuario() {
    try {

        const response = await axios.post(API_URL);
        return response.data;

    }catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
    }
}
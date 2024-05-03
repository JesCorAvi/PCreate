import { create } from 'zustand';
import axios from 'axios';

const useCarritoStore = create(set => ({
    cantidadArticulos: 0,
    actualizarCantidadArticulos: () => {
        axios.get("/carritoActualizar").then(response => {
            set({ cantidadArticulos: response.data.cantidad });
        }).catch(error => {
            console.error('Error al cargar los artículos:', error);
        });
    },
}));

export default useCarritoStore;

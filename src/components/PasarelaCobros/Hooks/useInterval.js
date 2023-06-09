import { useEffect } from "react";

export const useInterval = (callback, delay) => {
    useEffect(() => {
        const interval = setInterval(callback, delay);

        // Retornar una función de limpieza para detener el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, [callback, delay]);
};
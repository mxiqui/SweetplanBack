import fetch from 'node-fetch';

export const changeService = async (divisa, divisa2, cantidad) => {
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_CONVERSOR}/latest/${divisa}`);
        const data = await response.json();

        if (data.conversion_rates && data.conversion_rates[divisa2]) {
            const tasaConversion = data.conversion_rates[divisa2];
            const cantidadConvertida = cantidad / tasaConversion; // Usar la tasa inversa
            console.log(`Cantidad: ${cantidad}, Tasa de Conversión (inversa): 1/${tasaConversion}, Cantidad Convertida: ${cantidadConvertida}`);
            return cantidadConvertida;
        } else {
            throw new Error(`No se encontró la tasa de conversión para ${divisa2}`);
        }
    } catch (error) {
        console.error('Error al realizar la conversión:', error);
        throw error;
    }
};

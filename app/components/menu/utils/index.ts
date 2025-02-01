export const formatNumberWithDots = (value: string) => {
    if (!value) return ''; // Handle empty or undefined input
    const numericValue = parseFloat(value.toString().replace(/\D/g, '')) || 0;
    return new Intl.NumberFormat('es-AR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(numericValue);
}
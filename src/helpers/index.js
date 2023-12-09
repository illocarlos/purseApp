export const formate = count => {
    return Number(count).toLocaleString('es-US', {
        style: 'currency',
        currency: 'USD'
    })
}

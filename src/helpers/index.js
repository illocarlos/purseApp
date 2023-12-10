export const formate = count => {
    return Number(count).toLocaleString('es-US', {
        style: 'currency',
        currency: 'USD'
    })
}
export const random = () => {
    const date = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2)
    return random + date
}

export const formateDate = date => {
    const newDate = new Date(date)
    const option = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    return newDate.toLocaleDateString('en-US', option)
}
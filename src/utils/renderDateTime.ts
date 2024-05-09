export const renderDate = (date: Date) => {
    return new Date(date).toLocaleDateString()
}

export const renderTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
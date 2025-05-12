export const formatDate = (date: string | Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };
    
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("fr-FR", options);
    }
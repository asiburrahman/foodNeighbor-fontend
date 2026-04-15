const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const myRequest = (id, accessToken) => {
    return fetch(`${baseUrl}/taskDetail/${id}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    }).then(res => res.json())
}
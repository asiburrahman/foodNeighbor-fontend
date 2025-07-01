export const myRequest = (id, accessToken) => {
    return fetch(`https://food-neighbor-backend.vercel.app/taskDetail/${id}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    }).then(res => res.json())
}
export const myRequest = (id, accessToken) => {
    return fetch(`http://localhost:3000/taskDetail/${id}`,{
         method:"GET",
        headers:{
            authorization:`Bearer ${accessToken}`
        }
    }).then(res => res.json())
}
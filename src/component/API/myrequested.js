export const myRequest = (id, accessToken) => {
    return fetch(`https://foodsharing-ce4a2.web.app/taskDetail/${id}`,{
         method:"GET",
        headers:{
            authorization:`Bearer ${accessToken}`
        }
    }).then(res => res.json())
}
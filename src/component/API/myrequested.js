export const myRequest = (email, accessToken) => {
    return fetch(`http://localhost:3000/requestFood/${email}`,{
         method:"GET",
        headers:{
            authorization:`Bearer ${accessToken}`
        }
    }).then(res => res.json())
}
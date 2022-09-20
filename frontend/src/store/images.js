// import { csrfFetch } from "./csrf"

// const UPDATE_IMAGE = 'images/UPDATE_IMAGE'


// const updateImage = (spot) => ({
//     type: UPDATE_IMAGE,
//     spot
// })



// export const thunkUpdateImage = (spotId, imageId, url) => async (dispatch) => {
//     const deleteRes = await csrfFetch(`/api/image/${imageId}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': "application/json"
//         }
//     })

//     let response;
//     if (deleteRes.ok){
//         response = await csrfFetch(`/api/spots/${spotId}/images`, {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({url, previewImage: true})
//         })

//         if (response.ok){
//             const newImage = await response.json()
//             dispatch((updateImage(newImage, spotId)))
//         }
//     }
// }

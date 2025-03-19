import { BaseUrl } from "../../utils/shareed.js";


const getAllCities = async() => {

    const res = await fetch(`${BaseUrl}/location/`)
    const result = await res.json()
    

    return result
    
}

const getPostsFormCitys = async (CitiesID) => {
    let res = await fetch(`${BaseUrl}/post/?city=${CitiesID}`)
    let result = await res.json()
    
    return result
 }
 
const getCateguryPosts = async () => {
    let res = await fetch(`${BaseUrl}/category`)
    let result = await res.json()

    return result

}

// const getCateguryById = async(categuryID) => {
//     const res = await fetch(`${BaseUrl}/category/sub/${categuryID}`)
//     const result = await res.json()

//     return result
// }

const calculateRelativeTimedDifference = (createdAt) => {
    let currentTime = new Date()
    let createdTime = new Date(createdAt)
    const timeDifference = currentTime - createdTime
    const hours = Math.floor(timeDifference / (60 * 60 * 100));
    const day = Math.floor(hours / 24)
    if (hours < 24){
        return `${hours} ساعت پیش`
    }

    else{
        return `${day} روز پیش`

    }

    
    
    // const timeDifference = 
    

}




export {getAllCities , getPostsFormCitys , calculateRelativeTimedDifference , getCateguryPosts }
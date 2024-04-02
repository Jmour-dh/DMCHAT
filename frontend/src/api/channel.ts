import axios from 'axios';
import env from 'react-dotenv'

export const createChannel = async (data:string) => {

   return await axios({
      method: 'post',
      url: `http://localhost:3000/channel`,
      data: data
   })
   .then((res) => {
      if (res.status === 200) {
        return res.data
      }
   })
   .catch((e) => {
      console.log(e);
   })
}

export const getAll = async () => {

    return await axios({
       method: 'get',
       url: `http://localhost:3000/channel`,
    })
    .then((res) => {
        console.log(res.data)
        return res.data.channels 
    })
    .catch((e) => {
       console.log(e);
    })
}

export const getOneChannel = async (id:number) => {

    return await axios({
       method: 'get',
       url: `http://localhost:3000/channel/${id}`,
    })
    .then((res) => {
        console.log(res.data)
       return res.data.channel
    })
    .catch((e) => {
       console.log(e);
    })
}

export const deleteChannel = async (id) => {

    return await axios({
       method: 'delete',
       url: `http://localhost:3000/channel/${id}`,
    })
    .then((res) => {
        console.log(res.data)
       return res.data
    })
    .catch((e) => {
       console.log(e);
    })
}

export const updateChannel = async (id:number , data:string) => {

    return await axios({
       method: 'put',
       url: `http://localhost:3000/channel/${id}`,
       data:data
    })
    .then((res) => {
        console.log(res.data)
       return res.data
    })
    .catch((e) => {
       console.log(e);
    })
}
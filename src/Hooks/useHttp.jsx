import { useEffect, useState,useCallback } from "react";

async function sendHttpRequest(url,config){

const response = await fetch(url,config)
const resData = await response.json()

if(!response.ok){
    throw new Error(
        resData.message || "something went wrong,failed to send request."
    )
}
return resData;
}


export default function useHttp(url,config,firstData){
const[error,setError] = useState()
const[loading,setLoading] = useState(false)
const [data,setData] = useState(firstData);

function clearData(){
    setData(firstData);
}

 const sendRequest = useCallback(async function sendRequest (data){
    setLoading(true)
 try{
    const resData =  await sendHttpRequest(url,{...config,body: data})
    setData(resData)
 } catch(error){
    setError(error.message || "something went wrong.")
 }
 setLoading(false)
},[url,config])


useEffect(()=>{
    if(config && (config.method === "GET" || !config.method || !config)) {
        sendRequest()
    }
},[sendRequest,config])

return{
    data,
    loading,
    error,
    sendRequest,
    clearData
}

}
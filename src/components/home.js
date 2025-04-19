import { useEffect, useState } from "react";

import axios from 'axios'



const Home = () => {
const [data, setData] = useState([]);
const [apiUrl, setApiUrl] = useState('https://hcs-dev.1coophealth.com/api/admin-get?page=all');


const [pages,setPage] = useState([]);
const length = 5;

useEffect(() => {
  let isMounted = true; // Flag to prevent duplicate alerts
  alert(apiUrl)
  setData([]);
  axios.get(apiUrl, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then((response) => {
    console.log(response.data);
    if (isMounted) {
      setData(response.data.data);
      setPage(Array.from({length: response.data.total_page}, (_,i)=> i+1));
      
     

    }
  })
  .catch((error) => console.log(error));

  return () => {
    isMounted = false; // Cleanup flag on unmount
  };
}, [apiUrl]);


const handlePageChange =(page) =>{
  setApiUrl(`https://hcs-dev.1coophealth.com/api/admin-get?page=${page}`)

}
const editValue = (id ,referencenumber) =>{
  setData(data.map((key,index)=> key.documentcode=== id? {...key, referencenumber} : key))
}

const deleteValue =(id)=>{
  setData(data.filter((key,index) => key.documentcode !== id))
}
  return (
    <div>
      {JSON.stringify(data)}
      {apiUrl}
     
     <table>
   
    <thead>
    <tr>
      <th>id</th>
      <th>firstData</th>
    </tr>

    </thead>

    <tbody>

      {data.map((item , index)=>(
        <tr key ={item.documentcode}>
        <td >{item.documentcode}</td>
        <td >{item.referencenumber}</td>
        <td><input type="text" value={item.referencenumber} onChange={(e) =>editValue(item.documentcode, e.target.value)} /></td>
        <td><button key={index}  onClick={() => deleteValue(item.documentcode)}>delete</button></td>
        </tr>
        
      ))}
     
    </tbody>
     </table>


<div>
  { pages.map((item,index) =>(
    <button key={index} >{item}</button>
  ))}
</div>

<div>
     {Array.from({length}).map((_, index)=>(

     <button key={index} onClick={() => handlePageChange(index+1)} >page {index+1}</button>

    ))}
    </div>

    </div>
  );
}

export default Home;
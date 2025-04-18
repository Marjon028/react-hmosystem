import { useEffect, useState } from "react";

import axios from 'axios'




const Home = () => {
const [data, setData] = useState([]);
const apiUrl='https://hcs-dev.1coophealth.com/api/admin-get?page=all';

useEffect(() => {
  let isMounted = true; // Flag to prevent duplicate alerts

  axios.get(apiUrl, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then((response) => {
    if (isMounted) {
      setData(response.data.data);
      alert('data fetched');
    }
  })
  .catch((error) => console.log(error));

  return () => {
    isMounted = false; // Cleanup flag on unmount
  };
}, []);
const editValue = (id ,referencenumber) =>{
  setData(data.map((key,index)=> key.documentcode=== id? {...key, referencenumber} : key))
}

const deleteValue =(id)=>{
  setData(data.filter((key,index) => key.documentcode !== id))
}
  return (
    <div>
      {JSON.stringify(data)}
     <table>
   
    <thead>
      <th>id</th>
      <th>firstData</th>

    </thead>

    <tbody>

      {data.map((item , index)=>(
        <tr key ={item.documentcode}>
        <td >{item.documentcode}</td>
        <td >{item.referencenumber}</td>
        <td><input type="text" value={item.referencenumber} onChange={(e) =>editValue(item.documentcode, e.target.value)} /></td>
        <td><button onClick={() => deleteValue(item.documentcode)}>delete</button></td>
        </tr>
        
      ))}
     

  

    </tbody>


     </table>
      
    </div>
  );
}

export default Home;
import { useContext, useEffect, useReducer, useState } from "react";

import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';


import '../style/home-table.css'
import ParentDocument from "./ContextPages/parentDocuments";
import ChildContext from "./ContextPages/childDocument";
import documentData from '../context/documentData'
const reducers = (state,action) =>{
  switch(action.type){
    case "insert":
      
      return {set : state.set}
  }

}
const Home = () => {

  const dataTrigger= {}
  const dataTriggers= {}
  const [state,dispatch] = useReducer(reducers,dataTrigger)

const [data, setData] = useState([]);
const [apiUrl, setApiUrl] = useState('http://localhost:8000/api/admin-get?page=all');
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

const addValue = (type,referencenumber) =>{
  dispatch({type:type})
  const newData = {referencenumber: referencenumber, documentcode: uuidv4()}
  setData([newData, ...data])
}


  return (
    <>
    
    <ParentDocument data={JSON.stringify(data)}><ChildContext /></ParentDocument>
    <div>
     
   
    
     
     <div className="table-header">
     <table>
    <thead>
    <tr>
      <th>id</th>
      <th>Reference Number</th>
      <th>Value Edited</th>
    </tr>

    </thead>

    <tbody>

      {data.map((item , index)=>(
        <tr key ={item.documentcode}>
        <td >{item.documentcode}</td>
        <td >{item.referencenumber}</td>
        <td><input type="text" value={item.referencenumber} onChange={(e) =>editValue(item.documentcode, e.target.value)} />
        <button key={index}  onClick={() => deleteValue(item.documentcode)}>delete</button></td>
        </tr>
        
      ))}
     
    </tbody>
     </table>
  </div>


<div>
<button onClick={() =>addValue("insert","data1")}>addData</button>

</div>
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
    </>
  );
}

export default Home;
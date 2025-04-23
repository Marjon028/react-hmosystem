
import { useEffect, useState } from 'react'
import documentData from '../../context/documentData'


const ParentDocument = ({children,data}) =>{

    const [response , setResponse] = useState([])
    useEffect(()=>{
        setResponse(data)
    }, [data])
   return(
    <>

    <documentData.Provider  value ={{response, setResponse}}>
        {children}

    </documentData.Provider>
    </>
   )
    

}

export default ParentDocument


import documentData from '../../context/documentData'
import { useContext } from 'react'
const ChildContext = ()=>{
  const {response , setResponse} = useContext(documentData)
    return(

    <div>
        {response}
        </div>
    )
}
export default ChildContext
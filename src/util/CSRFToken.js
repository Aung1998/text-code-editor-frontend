import {useState, useEffect} from "react";
import {getCSRF} from "./auth";

const CSRFToken = () => {
  const [csrf, setCsrfToken] = useState([])
  useEffect(() => {
    const fetchCSRF = async() =>{
      const csrf = await getCSRF()
      setCsrfToken(csrf)
    }
    fetchCSRF()
  }, []);
}

export default CSRFToken
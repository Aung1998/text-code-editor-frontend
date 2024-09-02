import {useState, useEffect} from "react";
import {getCSRF} from "./auth";

const CSRFToken = () => {
  const [csrf, setCsrfToken] = useState([])
  useEffect(() => {
    getCSRF()
  }, []);
}

export default CSRFToken
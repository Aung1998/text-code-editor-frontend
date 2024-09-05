import {useEffect, useState} from "react";

export const OutputDisplay = ({result}) => {
  const [displayText, setDisplayText] = useState()
  useEffect(() => {
    if (result){
      const r = result
      setDisplayText(r)
    }
  }, [result]);
  return (
    <div className='bg-black max-w-96 max-h-96 h-96'>
      <p className='output-text text-green-600'>
        {displayText}
      </p>
    </div>)
}
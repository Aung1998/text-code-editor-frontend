export const OutputDisplay = (props) => {
  return (
    <div className='bg-black max-w-96 max-h-96 h-96'>
      <p className='text-green-600'>
        {props.result}
      </p>
    </div>)
}
function Square({val, onSquareClick}:any) {

  return (
    <button className='square' onClick={onSquareClick}>{val}</button>
  )
}

export default Square

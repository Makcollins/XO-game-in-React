const GameState = ({ status, statusTitle }: any) => {
    let gameStatus = '';
    let statusT = ''
    if(statusTitle === 'Game Over' ){
        statusT = statusTitle;
        gameStatus = `${status}!`;
    }
    
    return (
        <div className='game-state'>
            <h1 className='status-title'>{statusT}</h1>
            <h3 className='game-status'>{gameStatus}</h3>
        </div>
    )
}

export default GameState

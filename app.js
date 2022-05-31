let board;
const COLUMNS = 4;
const ROWS = 4
let score = 0
let pY = 0
let pX = 0
let mY = 0
let mX = 0
function responsive(){
    if(window.innerWidth>=window.innerHeight){
        document.body.setAttribute('style',`flex-direction : row;`)
        document.querySelector("html").style.fontSize = window.innerHeight/100+"px"
        document.querySelector('.board').setAttribute('style',`width : ${window.innerHeight*0.5}px;height : ${window.innerHeight*0.5}px;`)
        document.querySelector('.scoreboard').setAttribute('style',`width : ${window.innerHeight*0.5}px;height : ${window.innerHeight*0.5}px;`)
    }
    else{
        document.body.setAttribute('style',`flex-direction : column;`)
        document.querySelector("html").style.fontSize = window.innerWidth/100+"px"
        document.querySelector('.board').setAttribute('style',`width : ${window.innerWidth*0.5}px;height : ${window.innerWidth*0.5}px;`)
        document.querySelector('.scoreboard').setAttribute('style',`width : ${window.innerWidth*0.5}px;height : ${window.innerWidth*0.5}px;`)
    }
}
window.addEventListener('load',()=>{
    responsive()
})
window.addEventListener('resize',()=>{
    responsive()
})
window.addEventListener('load',()=>{
    Game()
})

function Game(){
    board= [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    for( let row = 0; row < ROWS; row++){
        for( let column = 0; column < COLUMNS; column++){
            let tile = document.createElement('div')
            tile.id = `${row}-${column}`
            let num = board[row][column]
            updateTile(tile,num)
            document.querySelector('.board').append(tile)
            
        }
    }
    setTwo()
    setTwo()
}
function HasEmptyTile(){
    for(let r = 0; r < ROWS; r++){
        for(let c = 0; c< COLUMNS; c++){
            if (board[r][c] == 0){
                return true
            }
        }
    }
    return false
}
function setTwo(){
    if(!HasEmptyTile()){
        return
    }

    let found = false
    while(!found){
        let r = Math.floor(Math.random() * ROWS)
        let c = Math.floor(Math.random() * COLUMNS)
        if(board[r][c] == 0){
            board[r][c] = 2
            let tile = document.getElementById(`${r}-${c}`)
            tile.innerText = "2"
            tile.classList.add('x2')
            found = true
        }
    }
}

function updateTile(tile,num){
    tile.innerText = ""
    tile.classList.value = ""
    tile.classList.add("tile")
    if(num > 0){
        tile.innerText = num
        if(num <= 4096){
            tile.classList.add(`x${num}`)
        }
        else{
            tile.classList.add(`x8192`)
        }
        
    }
}
function triche(){
    setInterval(()=>{score++},500)
    
}
document.addEventListener('keyup',(e)=>{
    console.log(e.code)
    if(e.code=="ArrowLeft"){
         slideLeft()
         setTwo()
    }
    else if(e.code=="ArrowRight"){
        slideRight()
        setTwo()
    }
    else if(e.code=="ArrowUp"){
        slideUp()
        setTwo()
    }
    else if(e.code=="ArrowDown"){
        slideDown()
        setTwo()
    }
    else if(e.code=="KeyP"){
        triche()
        board=[
            2048,2048,2048,2048,
            2048,2048,2048,2048,
            2048,2048,2048,2048,
            2048,2048,2048,2048
            ]
    }
    document.querySelector('.scoreText').innerText = score
})

function filterZero(row){
    return row.filter(num => num!=0)
}

function slide(row){
    row = filterZero(row)
    for(let i = 0; i < row.length-1; i++){
        if(row[i] == row[i+1]){
            row[i] *= 2
            row[i+1] = 0
            score+=row[i]
        }
    }
    row = filterZero(row)
    while(row.length < COLUMNS){
        row.push(0)
    }
    return row
}

function slideLeft(){
    for(let r = 0; r < ROWS; r++){
        let row = board[r]
        row = slide(row)
        board[r] = row
        for(let c = 0; c < COLUMNS; c++){
            let tile = document.getElementById(`${r}-${c}`)
            let num = board[r][c]
            updateTile(tile,num)
        }
    }
       
}
function slideRight(){
    for(let r = 0; r < ROWS; r++){
        let row = board[r]
        row.reverse()
        row = slide(row)
        row.reverse()
        board[r] = row
        for(let c = 0; c < COLUMNS; c++){
            let tile = document.getElementById(`${r}-${c}`)
            let num = board[r][c]
            updateTile(tile,num)
        }
    }
    
}
function slideUp(){
    for (let c = 0; c < COLUMNS; c++){
        let row = [board[0][c],board[1][c],board[2][c],board[3][c]]
        row = slide(row)
        for(let r = 0; r < ROWS; r++){
            board[r][c] = row[r]
            let tile = document.getElementById(`${r}-${c}`)
            let num = board[r][c]
            updateTile(tile,num)
        }
    }
}
function slideDown(){
    for (let c = 0; c < COLUMNS; c++){
        let row = [board[0][c],board[1][c],board[2][c],board[3][c]]
        row.reverse()
        row = slide(row)
        row.reverse()
        for(let r = 0; r < ROWS; r++){
            board[r][c] = row[r]
            let tile = document.getElementById(`${r}-${c}`)
            let num = board[r][c]
            updateTile(tile,num)
        }
    }
}

document.addEventListener('touchstart',(e)=>{
    pX = e.changedTouches[0].clientX
    pY = e.changedTouches[0].clientY
})
document.addEventListener('touchend',(e)=>{
    mX = e.changedTouches[0].clientX - pX
    mY = e.changedTouches[0].clientY - pY
    if(Math.abs(mX)>=Math.abs(mY)){
        if(Math.sign(mX) == -1){
            slideLeft()
            setTwo()
        }
        else if(Math.sign(mX) == 1){
            slideRight()
            setTwo()
        }
    }
    else{
        if(Math.sign(mY) == -1){
            slideUp()
            setTwo()
        }
        else if(Math.sign(mY) == 1){
            slideDown()
            setTwo()
        }
    }
    document.querySelector('.scoreText').innerText = score
})

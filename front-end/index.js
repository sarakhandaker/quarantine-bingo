const board= document.getElementById("bingo_board")
const btn=document.getElementById("generate")


function fetchAllSquares(){
fetch("http://localhost:3000/bingo_squares")
.then(resp=> resp.json())
.then(resp=> make_squares(resp.slice(0,25)))
}

function make_squares(array){
    
    array.forEach(text => {
        let div= document.createElement("div")
        div.innerText=text
        div.className="square"
        board.appendChild(div)
        div.addEventListener("click", function(e){
            let newdiv= document.createElement('div')
            newdiv.innerText="X"
            newdiv.className
            div.appendChild(newdiv)
            div.classList.toggle("clicked")
        })
    })
}

fetchAllSquares()
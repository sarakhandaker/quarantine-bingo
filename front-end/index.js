const board= document.getElementById("bingo_board")
const btn=document.getElementById("generate")
// const form=document.getElementById('comment')

//ADD COMMENT STUFF

// form.addEventListener("submit", function(event){
//     event.preventDefault()
//     makeComment(event.target.text.value)
//     event.target.reset()
// })

function makeComment(text){
    fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text: text, likes: 0}),
    })
    .then((response) => response.json())
    .then((data) => {
        makeCommentCard(data)
      console.log('Success:', data)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function makeCommentCard(data){

    const div=document.getElementById("comments_show")
    const commentDiv=document.createElement("div")
    commentDiv.className='card'
    commentDiv.innerHTML= data.text
    let button= document.createElement("button")
    button.innerText= "Like"
    button.className="like-btn"
    commentDiv.appendChild(button)
    div.appendChild(commentDiv)
}

//BINGO STUFF

let check=true
const winners = [
    ['0','1','2','3','4'],
    ['5','6','7','8','9'],
    ['10','11','12','13','14'],
    ['14','15','16','17','18'],
    ['19','20','21','22','23'],
    ['0','5','10','15','20'],
    ['1','6','11','16','21'],
    ['2','7','12','17','22'],
    ['3','8','13','18','23'],
    ['4','9','14','19','24'],
    ['0','6','12','18','24'],
    ['4','8','12','16','20']
]
const selected=[]

btn.addEventListener('click', ()=> {
    fetchAllSquares()
}
)

function fetchAllSquares(){
fetch("http://localhost:3000/bingo_squares")
.then(resp=> resp.json())
.then(resp=> make_squares(resp.slice(0,25)))
}

function make_squares(array){
    board.innerHTML=""
    let i=0
    array.forEach(text => {
        let div= document.createElement("div")
        div.innerText=text
        div.className="square"
        div.id=`${i}`
        i++
        board.appendChild(div)
        div.addEventListener("click", function(e){
            if (div.classList.contains("clicked")){
                div.classList.toggle("clicked")
                div.getElementsByTagName('div')[0].remove()

                //remove from array
                for(var i = selected.length - 1; i >= 0; i--) {
                    if(selected[i] === div.id) {
                        selected.splice(i, 1);
                    }
                }
            }
            else {
            
            let newdiv= document.createElement('div')
            newdiv.innerText="X"
            newdiv.className="X"
            div.appendChild(newdiv)
            div.classList.toggle("clicked")

            checkBingo(div)
            }
        })
    })
}

fetchAllSquares()



function checkBingo(div) {
    selected.push((div.id))
    //for each combo
    if (check==false) {
    }
    else {
    for(let i = 0; i < winners.length; i++) {
        //check how many of the same numbers exist in selected
        let cellExists = 0
        selected.forEach(num=> {
            if(winners[i].includes(num)) {
                cellExists++
                if(cellExists == 5) {
                    alert('Winner!')
                    check=false
                }
            }
        })
    }
}
}

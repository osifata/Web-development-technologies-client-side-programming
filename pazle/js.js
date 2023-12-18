const H = 6
const W = 9
const SIZE = H * W
let puzzle = []
let choosen_puzzle
let retrieved_puzzles

function start() {
    const left_place = document.querySelector('.left-place')
    const right_place = document.querySelector('.right-place')
    left_place.replaceChildren()
    right_place.replaceChildren()
    retrieved_puzzles = 0
    choosen_puzzle = 0
    createLeftPlace(left_place)
    createRightPlace(right_place)
    const p = document.getElementsByTagName('p')[0]
    p.style.display = 'none'
  }
  start()

function createLeftPlace(left_place){   
    let indices = Array.from(Array(SIZE + 1).keys()).slice(1) 
    swap(indices)
    for (let i = 0; i < SIZE; i++){
        const puzzle = document.createElement('img')
        puzzle.setAttribute('src', `./images/part_${indices[i]}.jpg`)
        puzzle.setAttribute('data-idx', indices[i])
        left_place.appendChild(puzzle)
      }
    puzzle = indices
}

function createRightPlace(right_place){
    for (let i = 0; i < SIZE; i++){
        const puzzle = document.createElement('div')
        puzzle.setAttribute('data-idx', i+1)
        right_place.appendChild(puzzle)
        
      }
}


document.onclick = function(e){
    const target = e.target
    if(target.nodeName == "IMG" && !target.hasAttribute('data-sel')){
        if (choosen_puzzle != 0) {
            const img = document.querySelector(`[data-idx="${choosen_puzzle}"]`)
            img.style["boxShadow"] = null
        }
        const Idx = target.getAttribute('data-idx')
        target.style["boxShadow"] = "0px 0px 15px 5px #E97600"                    
        choosen_puzzle = Idx
    }else if((target.classList.contains('left-place') 
    || target.classList.contains('right-place')) && choosen_puzzle != 0){
        const img = document.querySelector(`[data-idx="${choosen_puzzle}"]`)
        img.style["boxShadow"] = null  
        choosen_puzzle = 0
    }else if (choosen_puzzle != 0 && !target.classList.contains('left-place') 
    && !target.classList.contains('right-place') && target.nodeName != "IMG"){
        const Idx = target.getAttribute('data-idx')
        target.setAttribute('data-sel', Idx)
        target.style.backgroundImage = `url('./images/part_${choosen_puzzle}.jpg')`
        target.style.backgroundSize = 'cover'
        const img1 = document.querySelector(`[data-idx="${choosen_puzzle}"]`)
        img1.style["boxShadow"] = null
        const img = document.querySelector(`[data-idx="${choosen_puzzle}"]`)
        const IdxImg = img.getAttribute('data-idx')
        img.style.opacity = 0     
        img.setAttribute('data-sel', Idx)
        choosen_puzzle = 0
        if (Idx == IdxImg){
            retrieved_puzzles += 1
            console.log(retrieved_puzzles)
            if (retrieved_puzzles == SIZE){
                const p = document.getElementsByTagName('p')[0]
                console.log(p)
                p.style.display = 'block'
            }
        }
    }
}

document.oncontextmenu = function(e){
    const target = e.target
    if (target.hasAttribute('data-sel') && target.nodeName != "IMG"){
        const IdxSel = target.getAttribute('data-idx')
        const img = document.querySelector(`[data-sel="${IdxSel}"]`)
        const IdxImg = img.getAttribute('data-idx')
        target.removeAttribute('data-sel')
        target.style.backgroundImage = null
        target.style.backgroundSize = null
        img.style.opacity = 1
        img.removeAttribute('data-sel')
        if (IdxSel == IdxImg){
            retrieved_puzzles -= 1
        }
    }
}


function swap(array){
    for (let i = array.length - 1 ; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }


function bgChange() {
    var sectionHome = document.querySelector('.right-place'); 
    sectionHome.classList.add('bg-none');

}
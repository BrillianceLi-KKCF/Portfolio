window.addEventListener("load", function () {
  document.getElementById("drop").classList.add("active");
});

const buttons = document.querySelectorAll(".gridBtn");

const play = document.getElementById("play");
const playBtn = document.createElement("button");
playBtn.textContent = "Play";
play.appendChild(playBtn);

const clearBtn = document.createElement("button");
clearBtn.textContent = "Clear";
play.appendChild(clearBtn);

let inPlay = false;
let clearBoard = false;
let selected = "";


const winPatterns = [
 
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8]
]



playBtn.addEventListener("click", () => {
      inPlay = !inPlay;
      if(inPlay){
        const oBtn = document.createElement("button");
        const xBtn = document.createElement("button");
        oBtn.id = "o";
        xBtn.id = "x";
        oBtn.textContent = "O";
        xBtn.textContent = "X";
        play.appendChild(oBtn);
        play.appendChild(xBtn);
        xBtn.addEventListener("click", () => {
            selected = "X";
            console.log(selected);
           }
         )
        oBtn.addEventListener("click", () => {
            selected = "O";
            console.log(selected);
           }
         )  
     }
      else{
        const oBtn = document.getElementById("o");
        const xBtn = document.getElementById("x");
        oBtn.remove();
        xBtn.remove();
        selected = "";

        
      }
  
  
  }                                               )
 
clearBtn.addEventListener("click", () => {
  buttons.forEach(btn => btn.textContent ="");
})


for(let i = 0; i < 9; i++){
  let currentBtn = buttons[i];
  currentBtn.textContent = "";
  currentBtn.addEventListener("click", () => {
    if(selected != "" && currentBtn.textContent === "")
    { currentBtn.textContent = selected;
    }
   }
                    
  )
   
}


import { useEffect } from "react";
import "./App.css"
import { useState } from "react";
import Scoreboard from "./component/Scoreboard";
import bluecandy from "./images/blue-candy.png"
import greencandy from "./images/green-candy.png"
import orangecandy from "./images/orange-candy.png"
import purplecandy from "./images/purple-candy.png"
import redcandy from "./images/red-candy.png"
import yellowcandy from "./images/yellow-candy.png"
import blank from "./images/blank.png"

const width=8;
const candycolor=[
  bluecandy,
  greencandy,
  orangecandy,
  purplecandy,
  redcandy,
  yellowcandy,
  
]
function App() {
  const[currentColorArrangement,setCurrentColorArrangement]=useState([]);
  const[squareBeingDragged,setSquareBeingDragged]=useState(null);
  const[squareBeingRepalaced,setSquareBeingReplaced]=useState(null);
  const[scoreDisplay,setScoreDisplay]=useState(0)

  const checkForColumnOfThree=()=>{
    for(let i=0;i<=47;i++){
      const columnOfThree=[i,i+width,i+width*2];
      const decidedColor=currentColorArrangement[i];
      const isBlank=currentColorArrangement[i]===blank

        if(columnOfThree.every(number=>currentColorArrangement[number]  === decidedColor && !isBlank)){
          setScoreDisplay((score)=> score + 3)
          columnOfThree.forEach(number=>currentColorArrangement[number]=blank);
        return true;

        }
      }
  }
 
  const checkForColumnOfFour=()=>{
    for(let i=0;i<=39;i++){
      const columnOfFour=[i,i+width,i+width*2,i+width*3];
      const decidedColor=currentColorArrangement[i]
      const isBlank=currentColorArrangement[i]===blank
        if(columnOfFour.every(number=>currentColorArrangement[number]  === decidedColor && !isBlank)){
          setScoreDisplay((score)=>score+4)

          columnOfFour.forEach(number=>currentColorArrangement[number]=blank);
        return true;

        }
      }
  }
  const checkForRowOfThree=()=>{
    for(let i=0;i<64;i++){
      const rowOfThree=[i,i+1,i+2];
      const decidedColor=currentColorArrangement[i];
      const isBlank=currentColorArrangement[i]===blank

      const notValid=[6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
      if(notValid.includes[i]) continue
        if(rowOfThree.every(number=>currentColorArrangement[number]  === decidedColor && !isBlank)){
          setScoreDisplay((score)=>score+3)

          rowOfThree.forEach(number=>currentColorArrangement[number]=blank)
        return true;

        }
      }
  }  
  const checkForRowOfFour=()=>{
    for(let i=0;i<64;i++){
      const rowOfFour=[i,i+1,i+2];
      const decidedColor=currentColorArrangement[i];
      const isBlank=currentColorArrangement[i]===blank

      const notValid=[5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]
      if(notValid.includes[i]) continue
        if(rowOfFour.every(number=>currentColorArrangement[number]  === decidedColor && !isBlank)){
          setScoreDisplay((score)=>score+4)
          rowOfFour.forEach(number=>currentColorArrangement[number]=blank)
        return true;

        }
      }
  }  
  const moveIntoSquareBelow=()=>{
    for(let i=0;i<=55;i++){
      const firstRow=[0,1,2,3,4,5,6,7];
      const isFirstRow=firstRow.includes(i)

      if(firstRow && currentColorArrangement[i]===blank){
        const randomColor=Math.floor(Math.random()*candycolor.length);
        currentColorArrangement[i]=candycolor[randomColor]
      }

      if(currentColorArrangement[i+width]===blank){
        currentColorArrangement[i+ width]=currentColorArrangement[i]
        currentColorArrangement[i]=blank;
      }
    }
  }
  const dragstart=(e)=>{
    console.log(e.target);
    console.log("drag start")
    setSquareBeingDragged(e.target);
  }
  const dragDrop=(e)=>{
    console.log(e.target);

    console.log("drag drop");
    setSquareBeingReplaced(e.target);
  }
  const dragEnd=()=>{

    console.log("drag end");
   const squareBeingDraggedId=parseInt(squareBeingDragged.getAttribute('data-id'));

   const squareBeingRepalacedId=parseInt(squareBeingRepalaced.getAttribute('data-id'));

   currentColorArrangement[squareBeingRepalacedId]=squareBeingDragged.getAttribute("src");
   currentColorArrangement[squareBeingDraggedId]=squareBeingRepalaced.getAttribute("src");

   
       
      const validMoves=[
        squareBeingDragged -1,
        squareBeingDragged -width,
        squareBeingDragged +1,
        squareBeingDragged +width,

      ]
      const validMove=validMoves.includes(squareBeingRepalacedId);
     const isColumnOfFour= checkForColumnOfFour();
     const isColumnOfThree= checkForColumnOfThree();
      const isRowOfFour= checkForRowOfFour();
      const isRowOfThree=checkForRowOfThree();
      if(squareBeingRepalacedId && validMove &&(isColumnOfFour||isColumnOfThree||isRowOfThree||isRowOfFour)){
        setSquareBeingDragged(null);
        setSquareBeingReplaced(null);
      }else{
        currentColorArrangement[squareBeingRepalacedId]=squareBeingRepalaced.getAttribute("src");
        currentColorArrangement[squareBeingDraggedId]=squareBeingDragged.getAttribute("src");
          setCurrentColorArrangement([...currentColorArrangement])
      }

  }
      const createBoard=()=>{
        const randomColorArrangement= [];
          for(let i=1;i<=width*width;i++){
            const randomNumberFrom0to5=Math.floor(Math.random()*candycolor.length);
              const  randomColor=candycolor[randomNumberFrom0to5];
              randomColorArrangement.push(randomColor);
          }
          setCurrentColorArrangement(randomColorArrangement);
      }
console.log(scoreDisplay)
 useEffect(()=>{
  createBoard();
 },[])
 useEffect(()=>{
const timer=setInterval(()=>{
  checkForColumnOfFour();
  checkForRowOfFour();
  checkForColumnOfThree();
  checkForRowOfThree();
  moveIntoSquareBelow();
  setCurrentColorArrangement([...currentColorArrangement])


},100)
return()=>clearInterval(timer)

 },[checkForColumnOfFour, checkForColumnOfThree,checkForRowOfFour, checkForRowOfThree ,moveIntoSquareBelow,currentColorArrangement])
//  console.log(currentColorArrangement)

  return (
    <div className="App">
     <div className="game">
         {currentColorArrangement.map((candycolor,index)=>{
         return( <img
          key={index}
           src={candycolor}
           alt={candycolor}  
          data-id={index}
          draggable={true}
          onDragStart={dragstart}
          onDragOver={(e)=>{e.preventDefault()}}
          onDragEnter={(e)=>{e.preventDefault()}}
          onDragLeave={(e)=>{e.preventDefault()}}
          onDrop={dragDrop}
          onDragEnd={dragEnd}
          />)
         })}
     </div>
     <Scoreboard score={scoreDisplay}/>
    </div>
  );
}

export default App;

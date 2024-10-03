import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public randomNumbers : Div[] = new Array<Div>;
  public isSorting : boolean = false;

  public ngOnInit(){
    this.generateRandomArray();
  }

  public bubbleSort(){
    this.isSorting = true;

    for(let i = 0; i < this.randomNumbers.length; i++){
      for(let j = 0; j < this.randomNumbers.length - 1 - i; j++){          
        setTimeout( () => {   
          console.log(i + " " + j) ;
          //visualizes the divs that are gonna be compared 
          this.randomNumbers[j].divColor = 'red';
          this.randomNumbers[j + 1].divColor = 'red';
          
          //resets the color of the trailing div
          if(j > 0){
            this.randomNumbers[j - 1].divColor = 'blueviolet' ;            
          }
          
          //resets the end of the array colors
          if(j == 0 && i != 0){
            this.randomNumbers[this.randomNumbers.length - i].divColor = 'blueviolet' ;  
            this.randomNumbers[this.randomNumbers.length - 1 - i].divColor = 'blueviolet' ;           
          }

          //switches numbers if the left one is bigger
          if(this.randomNumbers[j].heightValue > this.randomNumbers[j + 1].heightValue){
            let temp : number = this.randomNumbers[j].heightValue;
            this.randomNumbers[j].heightValue = this.randomNumbers[j + 1].heightValue;
            this.randomNumbers[j + 1].heightValue = temp;
          }

          j == this.randomNumbers.length - 2 - i && i > 0 ? this.randomNumbers[this.randomNumbers.length - i].divColor = 'lime' : '';
          
          if(i == this.randomNumbers.length - 2 && j == this.randomNumbers.length - 2 - i){
            this.randomNumbers[0].divColor = 'lime';
            this.randomNumbers[1].divColor = 'lime';
            this.isSorting = false;
          }

        }, i * 350 - i + j);        
      }
    }
  }

  public radixSort(){
    let radixArray : number[][] = [[],[],[],[],[],[],[],[],[],[]],
    biggestNumber = this.randomNumbers[0].heightValue,
    biggestNumberDigitCount = 0,
    arrayLenght = this.randomNumbers.length,
    exp = 1;

    this.isSorting = true;
    
    for(let i = 1; i < this.randomNumbers.length; i++){
      if(biggestNumber < this.randomNumbers[i].heightValue){
        biggestNumber = this.randomNumbers[i].heightValue;
      }
    }

    while(biggestNumber > 0){
      biggestNumber = Math.floor(biggestNumber/10);
      biggestNumberDigitCount++;
    }

    for(let k = 0; k < biggestNumberDigitCount; k++){
      setTimeout(() =>{
        for(let i = 0; i < arrayLenght; i++){
          let radixIndex = Math.floor(this.randomNumbers[i].heightValue / exp) % 10;
          radixArray[radixIndex].push(this.randomNumbers[i].heightValue);
        }
        
        let tempRadixArray : number[] = [arrayLenght];

        let counter : number = 0;
        for(let i = 0; i < radixArray.length; i++){  
          for(let j = 0; j < radixArray[i].length; j++){           
            tempRadixArray[counter] = radixArray[i][j].valueOf();
            counter++;
          }
        }

        for(let i = 0; i < tempRadixArray.length; i++){            
          setTimeout(() => {
            this.randomNumbers[i] = (new Div(tempRadixArray[i], 'blueviolet'));   
          }, i * 9.5);   
        }
          
        radixArray = [[],[],[],[],[],[],[],[],[],[]]
        exp *= 10
        biggestNumber = Math.floor(biggestNumber / 10);
        if(k == biggestNumberDigitCount - 1){
          this.isSorting = false;
        }
      }, k * arrayLenght * 10)
    }
  }

  public generateRandomArray(){
    this.randomNumbers = new Array<Div>;

    for(let i = 0; i < 350; i++){
      this.randomNumbers.push(new Div(Math.floor((Math.random() * 500) + 1), 'blueviolet'));
    }
  }

  
}
class Div{
  constructor(heightValue: number, divColor: String) {
    this.heightValue = heightValue;
    this.divColor = divColor;
  }
  public  heightValue: number;
  public  divColor: String;
}

import {Component, OnInit} from '@angular/core';
import {ServiceService} from "./service/service.service";
import {Average, Coords, MyMatrix} from "./model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'nordeus-job-fair-2024';

  matrix: string=""

  table: number[][] = [];

  traveled: number[][] = [];

  flag: boolean=false;

  life: number = 3

  win: boolean=false

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.resetTraveled()
    this.getMatrix()
  }

  getMatrix(){
    this.service.getMatrix().subscribe((matrix: string) => {
      this.matrix = matrix
      this.generateTable(30, 30);
    });
  }

  generateTable(rows: number, cols: number): void {
    this.matrix= this.matrix.replaceAll("\n"," ")
    const numbersArray = this.matrix.split(" ");
    var br=0;
    for (let i = 0; i < rows; i++) {
      const row: number[] = [];
      for (let j = 0; j < cols; j++) {
        row.push(Number(numbersArray[br]));
        br++;
      }
      this.table.push(row);
    }
  }

  getColor(cell: number): string {
    if(cell==0){
      return 'rgb(36, 186, 255)';
    }
    const green = Math.floor((cell / 1000) * 180);
    return `rgb(0, ${255-green}, 0)`;
  }

  isRight(rowIndex: number, colIndex: number, cell: number): boolean{
    this.resetTraveled()
    const coords = this.goodIsland();
    this.resetTraveled()
    this.win = this.dfs2(coords.xcord,coords.ycord,rowIndex,colIndex)
    this.flag=false
    console.log(this.win)
    if(this.life==0){
      return false
    }
    if(!this.win){
      this.life--
    }
    return this.win
  }

  dfs(x: number, y: number): Average {
    let sum = 0;
    let count = 0;
    const a: Average = { sum: 0, count: 0 };

    if (this.traveled[x][y] === 0 && this.table[x][y] !== 0) {
      a.sum += this.table[x][y];
      a.count++;
      this.traveled[x][y] = 1;

      // Proverava sve susede
      if (this.isValid(x + 1, y)) {
        const a1 = this.dfs(x + 1, y);
        a.sum += a1.sum;
        a.count += a1.count;
      }
      if (this.isValid(x - 1, y)) {
        const a1 = this.dfs(x - 1, y);
        a.sum += a1.sum;
        a.count += a1.count;
      }
      if (this.isValid(x, y + 1)) {
        const a1 = this.dfs(x, y + 1);
        a.sum += a1.sum;
        a.count += a1.count;
      }
      if (this.isValid(x, y - 1)) {
        const a1 = this.dfs(x, y - 1);
        a.sum += a1.sum;
        a.count += a1.count;
      }
    }

    return a;
  }

  isValid(x: number, y: number): boolean {
    return x >= 0 && x < this.table.length && y >= 0 && y < this.table[0].length;
  }

  goodIsland(): Coords{
    let max = 0
    const coords: Coords = {xcord: 0, ycord:0 }
    for (let i=0;i<30;i++){
      for(let j=0;j<30;j++){
        if(this.table[i][j]!=0){
          const rez: Average = this.dfs(i,j)
          if(rez.sum!=0){
            if(max<rez.sum/rez.count){
              max=rez.sum/rez.count
              coords.xcord=i
              coords.ycord=j
            }
          }
        }
      }
    }
    return coords
  }

  resetTraveled(){
    this.traveled=Array.from({ length: 30 }, () => Array(30).fill(0));
  }

  dfs2(x: number,y: number,rowIndex: number,colIndex: number): boolean{
    if(this.traveled[x][y]==0 && this.table[x][y]!=0){
      if(x==rowIndex && y==colIndex){
        this.flag=true
      }
      this.traveled[x][y]=1

      if(this.isValid(x-1,y)){
        this.dfs2(x-1,y,rowIndex,colIndex);
      }
      if(this.isValid(x+1,y)){
        this.dfs2(x+1,y,rowIndex,colIndex);
      }
      if(this.isValid(x,y-1)){
        this.dfs2(x,y-1,rowIndex,colIndex);
      }
      if(this.isValid(x,y+1)){
        this.dfs2(x,y+1,rowIndex,colIndex);
      }
    }
    return this.flag
  }

  refreshPage(): void {
    window.location.reload();
  }

  onMouseEnter(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    target.style.boxShadow = 'inset 0 0 0 1px black';
  }

  onMouseLeave(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    target.style.boxShadow = 'inset 0 0 0 0px transparent';
  }
}



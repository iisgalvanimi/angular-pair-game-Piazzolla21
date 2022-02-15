import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  contr : boolean = false
  giusto : boolean = false
  cartaAdesso : number = 0
  punteggio : number = 0
  gira : number = 0
  title = 'angular-card-game';
  cards:{ cardID: number , status:string , path:string, check:boolean, img : number}[]=[ 
    { cardID:0 , status:'default' , path: './assets/default.png', check:false,img : 0},
    { cardID:1 , status:'default' , path: './assets/default.png', check:false, img : 0}
  ] 
  pos:{x:number,nV : number}[] = []
  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      this.pos.push({x:i, nV:0}
        );
    }
    for (let i = 0; i < 20; i++) {
      let x = Math.floor(Math.random() * 10); 
      while (this.pos[x].nV == 2) {
        x = Math.floor(Math.random() * 10);
      }
      this.pos[x].nV += 1;
      this.cards.push({
        cardID: i, status:'default', path:'./assets/images/default.png', check:false, img : x
      });
  }
}
fromFiglioEvntHandlr( evntData: { cardID: number , status:string , path:string, check:boolean,img : number } ){
  console.log("Sono il padre: dal figlio numero " + evntData.cardID+  " ho ricevuto status="+evntData.status )
    if (this.cards[evntData.cardID].status=='default') {
      this.cards[evntData.cardID].status='flipped'
      this.cards[evntData.cardID].path='./assets/3cuori.png'
    } else {
      this.cards[evntData.cardID].status='default'
      this.cards[evntData.cardID].path='./assets/default.png'
    }
    
    console.log(evntData)
}
}
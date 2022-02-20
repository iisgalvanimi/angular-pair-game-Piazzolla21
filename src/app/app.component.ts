import { Component } from '@angular/core';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  carte : string[] = ["2_of_clubs.png","3_of_clubs.png","4_of_clubs.png","5_of_clubs.png","6_of_clubs.png","7_of_clubs.png","8_of_clubs.png","king_of_clubs.png"]
  contr : boolean = false
  giusto : boolean = false
  cartaAdesso : number = 0
  punteggio : number = 0
  gira : number = 0
  win : boolean
  title = 'angular-card-game';
  cards:{ cardID: number , status:string , path:string, check:boolean, img : string}[]=[ 
  ] 
  pos:{x:number,nV : number}[] = []
  ngOnInit(): void {
    for (let i = 0; i < 8; i++) {
      this.pos.push({x:i, nV:0}
        );
    }
    for (let i = 0; i < 16; i++) {
      let x = Math.floor(Math.random() * 8); 
      while (this.pos[x].nV == 2) {
        x = Math.floor(Math.random() * 8);
      }
      this.pos[x].nV += 1;
      this.cards.push({cardID: i, status:'default', path:'./assets/default.png', check:false, img : this.carte[x] })
      
      //this.cards.push({
        //cardID: i, status:'default', path:'./assets/default.png', check:false, img : x
      //});
  }

}
fromFiglioEvntHandlr( evntData: { cardID: number , status:string , path:string, check:boolean,img : number } ){
  console.log("Sono il padre: dal figlio numero " + evntData.cardID+  " ho ricevuto status="+evntData.status )
  console.log(this.cards)
    
      if (this.cards[evntData.cardID].status=='default' && this.cards[evntData.cardID].check==false) {
        this.cards[evntData.cardID].status='flipped'
        this.cards[evntData.cardID].path='./assets/carte/' + evntData.img 
        console.log("ciao")
        console.log(this.cards[evntData.cardID].path)
        
        this.cards.forEach(s => {
          if(s.status == 'flipped' ){
            if(s.cardID !=this.cards[evntData.cardID].cardID){
              if(s.path == this.cards[evntData.cardID].path){
                this.cards[evntData.cardID].check = true
                s.check = true
              }else if(s.check == false){
                setTimeout(()=>{
                  s.status = 'default'
                  s.path = './assets/default.png'
                  this.cards[evntData.cardID].path='./assets/default.png'
                  this.cards[evntData.cardID].status ='default'
                },1000)
              }
            }
          }
        })
        this.vinto()
      }
    
    console.log(evntData)
    
  }
  vinto(){
    this.win = true
    this.cards.forEach(s => {if(!s.check){this.win = false}})
    if (this.win){
      alert("Bravo hai vinto");
    }
  }
}

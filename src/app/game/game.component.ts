import { style } from '@angular/animations';
import { STRING_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Gamelogic } from '../gamelogic';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [Gamelogic]
})
export class GameComponent implements OnInit {

  constructor(public game: Gamelogic) { }

  ngOnInit(): void {
  }

  startGame(): void {
    this.game.gameStart();
    const currentPlayer = "Current turn: Player: " + this.game.currentTurn;
    const information = document.querySelectorAll('.current-status');
    information[0].innerHTML = currentPlayer;
  }

  //ADD A CHECK TO SEE THAT A PLAYER HAS NOT PLAYED IN THE SUBFIELD BEFORE
  async clickSubfield(subfield: any): Promise<void> {

    const position = subfield.currentTarget.getAttribute('position');   //This sets the postion on the board that the player clicked

    if (this.game.gameStatus === 1) {
      //if the gameboard array contains a zero the player can play his move
      if (this.game.gameField[position] === 0) {

        this.game.setField(position, this.game.currentTurn);  //sets the position and changes the colour of the tile to the player's colour
        const color = this.game.getPlayerColorClass();
        subfield.currentTarget.classList.add(color);

        const currentPlayer = this.game.getCurrentPlayerClass();

        let highlightPlayer = document.querySelector('.player-one');
        // highlightPlayer = style( { color:'rgb(83, 169, 83)' } );
        // currentPlayer[0].innerHTML = style( { color:'rgb(83, 169, 83)' } );

        await this.game.checkGameEndWinner().then((end: boolean) => {

          if (this.game.gameStatus === 0 && end) {
            const information = document.querySelectorAll('.current-status');
            information[0].innerHTML = "The winner is Player: " + this.game.currentTurn;  //Tell the players who won
          }
        });

        await this.game.checkkGameEndFull().then((end: boolean) => {

          if (this.game.gameStatus === 0 && end) {
            const information = document.querySelectorAll('.current-status');
            information[0].innerHTML = "No winner, draw";   //Tell the players its a draw
          }
        });

        this.game.changePlayer(); //change the player

        if (this.game.gameStatus === 1) {
          const currentPlayer = 'Current turn : Player ' + this.game.currentTurn;
          const information = document.querySelectorAll('.current-status');

          information[0].innerHTML = currentPlayer;   //change the current players turn 
        }
      }
      else{
        if (this.game.gameStatus === 1) {
          const currentPlayer = 'Tile has already been played! '+ 'Current turn: Player ' + this.game.currentTurn;
          const information = document.querySelectorAll('.current-status');
          information[0].innerHTML = currentPlayer;   //change the current players turn
        }
      }
    }

  }
}

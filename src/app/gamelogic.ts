import { __values } from 'tslib';
import { Status } from './gamestatus'

export class Gamelogic {

    gameField: Array<number> = [];

    currentTurn: number;

    gameStatus: Status;

    winSituations: Array<Array<number>> = [
        [2, 2, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 2, 2, 0, 0, 0, 0, 0, 0],
        [2, 0, 0, 2, 0, 0, 2, 0, 0],
        [0, 2, 0, 0, 2, 0, 0, 2, 0],
        [0, 0, 2, 0, 0, 2, 0, 0, 2],
        [2, 0, 0, 0, 2, 0, 0, 0, 2],
        [0, 0, 2, 0, 2, 0, 2, 0, 0]
    ];

    public constructor() {
        this.gameStatus = Status.STOP;
        this.currentTurn = this.randomPlayerStart();
        //0 1 2
        //3 4 5
        //6 7 8
        this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    gameStart(): void {
        this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.currentTurn = this.randomPlayerStart();
        this.gameStatus = Status.START;
    }

    //make a random player start
    randomPlayerStart(): number {
        const startPlayer = Math.floor(Math.random() * 2) + 1;
        return startPlayer;
    }

    //update the gameboard and insert the player's number into the gameboard array
    setField(position: number, value: number): void {
        this.gameField[position] = value;
    }

    //change the tile color
    getPlayerColorClass(): string {
        const colorClass = (this.currentTurn === 2) ? 'player-two' : 'player-one';
        return colorClass;
    }

    getCurrentPlayerClass(): string {
        const playerClass = (this.currentTurn === 2) ? '.player-two' : '.player-one';
        return playerClass;
    }

    changePlayer(): void {
        this.currentTurn = (this.currentTurn === 2) ? 1 : 2;
    }

    arrayEquals(a: Array<any>, b: Array<any>): boolean {
        return Array.isArray(a) && Array.isArray(b) && a.length === b.length
            && a.every((value, index) => value === b[index]);
    }

    async checkGameEndWinner(): Promise<boolean> {
        let isWinner = false;

        const currentArray: number[] = [];

        let winNumber: number = 0

        //Converts the array to the current players number
        this.gameField.forEach((subfield, index) => {
            if (subfield !== this.currentTurn) {  //if the subfield/tile is not the current players number, make it a zero
                currentArray[index] = 0;
            } else {
                currentArray[index] = 2;
            }
        });

        this.winSituations.forEach((winArray) => {
            winArray.forEach( (tile, i) => {
                if(tile === currentArray[i] && tile !== 0 && currentArray[i] !== 0){
                    winNumber++;
                    if(winNumber === 3){
                        isWinner = true;
                    }
                }
            });
            winNumber = 0;
        });

        

        if (isWinner) {
            this.gameEnd();
            return true;
        } else {
            winNumber = 0;
            return false;
        }
    }

    //Checks the gamefield if there are zeros still left or positions people can play.
    //if there are no zeros meeans the array is full/ gameboard is full
    async checkkGameEndFull(): Promise<boolean> {
        let isfull = true;

        if (this.gameField.includes(0)) {
            isfull = false;
        }

        if (isfull) {
            console.log('Field is full');
            this.gameEnd();
            return true;
        } else {
            return false;
        }
    }

    gameEnd(): void {
        this.gameStatus = Status.STOP;
    }

}

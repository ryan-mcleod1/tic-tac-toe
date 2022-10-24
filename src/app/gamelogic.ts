import { __values } from 'tslib';
import { Status } from './gamestatus'

export class Gamelogic {

    gameField: Array<number> = [];

    currentTurn: number;

    gameStatus: Status;

    //change the array to abd algorithm
    winSituationsOne: Array<Array<number>> = [
        [1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1],
        [0, 0, 1, 0, 1, 0, 1, 0, 0],
        [1, 1, 1, 0, 0, 1, 0, 0, 0],
        [0, 1, 0, 1, 1, 0, 0, 1, 0]
    ];

    winSituationsTwo: Array<Array<number>> = [
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
        console.log(this.currentTurn);
        this.gameStatus = Status.START;

    }

    //make a random player start
    randomPlayerStart(): number {
        const startPlayer = Math.floor(Math.random() * 2) + 1;
        return startPlayer;
    }

    //update the gameboard and insert the player's number into the gameboard array
    setField(position: number, value: number): void {
        if(this.gameField[position] === 1 || this.gameField[position] === 2 ){

        }
        else{
            this.gameField[position] = value;
        }
    }

    //change the tile color
    getPlayerColorClass(): string {
        const colorClass = (this.currentTurn === 2) ? 'player-two' : 'player-one';
        return colorClass;
    }

    changePlayer(): void {
        this.currentTurn = (this.currentTurn === 2) ? 1 : 2;
    }

    arrayEquals( a : Array<any> , b: Array<any>): boolean{
        return Array.isArray(a) && Array.isArray(b) && a.length === b.length
        && a.every( (value, index) => value === b[index]) ;
    }

    async checkGameEndWinner(): Promise<boolean> {
        let isWinner = false;

        const checkArray = ( this.currentTurn === 1 ) ? this.winSituationsOne : this.winSituationsTwo;

        const currentArray: number[] = [];

        //Converts the array to the current players number
        this.gameField.forEach( ( subfield, index ) => {
            if ( subfield !== this.currentTurn ) {  //if the subfield/tile is not the current players number, make it a zero
                currentArray[index] = 0;
            } else {
                currentArray[ index ] = subfield;
            }
        });

        //Then compairs the array of the current player to the array of possible wins
        checkArray.forEach( ( checkfield ) => {
            if( this.arrayEquals(checkfield, currentArray)  ){
                isWinner = true;
            }
        });

        console.log(currentArray);

        if (isWinner) {
            this.gameEnd();
            return true;
        } else {
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



export class Actor {

    public id: number
    
    public name: string
    public x: number
    public y: number

    public initiative: number

    public constructor(id: number, name: string, x: number = 0, y: number = 0) {
        this.id = id
        this.name = name
        this.x = x
        this.y = y
        this.initiative = Math.floor(Math.random() * 20) + 1
    }

}


export class Actor {
    
    public name: string
    public x: number
    public y: number

    public initiative: number

    public constructor(name: string, x: number = 0, y: number = 0) {
        this.name = name
        this.x = x
        this.y = y
    }

}
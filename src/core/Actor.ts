

export class Actor
{
    public id: number
    
    public name: string
    public initiative: number

    public x: number
    public y: number

    public constructor(
      id: number,
      name: string,
      initiative: number,
      x: number = 0,
      y: number = 0)
    {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.initiative = initiative;
    }
}

import { Actor } from "./Actor"


export default class TurnEntry {
    public actorId: number

    public constructor({ id }: Actor) {
        this.actorId = id
    }
}
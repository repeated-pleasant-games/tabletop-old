
import { Actor } from "./Actor"


export default class TurnEntry {
    public actorId: string

    public constructor({ id }: Actor) {
        this.actorId = id
    }
}
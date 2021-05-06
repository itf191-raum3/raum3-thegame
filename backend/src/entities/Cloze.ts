import {ChildEntity, Column} from "typeorm";
import {Exercise} from "@/entities/Exercise";

@ChildEntity()
export class Cloze extends Exercise {
    @Column()
    options: Array<string>;

    @Column()
    isMultipleChoice: boolean;
}
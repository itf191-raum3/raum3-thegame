import {ChildEntity, Column} from "typeorm";
import {Exercise} from "@/entities/Exercise";
import {ICloze} from "@common/entities/ICloze";

@ChildEntity()
export class Cloze extends Exercise implements ICloze {
    @Column("json")
    options: Array<string>;

    @Column()
    isMultipleChoice: boolean;
}
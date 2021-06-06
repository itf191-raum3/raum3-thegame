import {ChildEntity, Column} from "typeorm";
import {Exercise} from "@/entities/Exercise";
import {IChoice} from "@common/entities/IChoice";

@ChildEntity()
export class Choice extends Exercise implements IChoice {
    @Column()
    isMultipleChoice: boolean;
}
import {ChildEntity, Column} from "typeorm";
import {Exercise} from "@/entities/Exercise";

@ChildEntity()
export class Choice extends Exercise {
    @Column()
    isMultipleChoice: boolean;
}
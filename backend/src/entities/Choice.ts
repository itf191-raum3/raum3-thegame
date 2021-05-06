import {ChildEntity, Column} from "typeorm";
import {Exercise} from "@/entities/Exercise";

@ChildEntity()
export class Choice extends Exercise {
    @Column()
    options: Array<string>

    @Column()
    isDropDown: boolean
}
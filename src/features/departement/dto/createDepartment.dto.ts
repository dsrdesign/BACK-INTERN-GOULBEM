import { IsNotEmpty } from "class-validator";

export class CreateDepartmentDto{
     @IsNotEmpty()
     readonly codeDepartement  : string;
     @IsNotEmpty()
     readonly nom : string
}
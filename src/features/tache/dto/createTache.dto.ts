import { IsNotEmpty } from "class-validator";

export class CreateTacheDto{
     @IsNotEmpty()
     readonly description: string
     @IsNotEmpty()
     readonly dureeTache: number
     // @IsNotEmpty()
     readonly idProjet: number
     // @IsNotEmpty()
     readonly idStagiaire: number
}
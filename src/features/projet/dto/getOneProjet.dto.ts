import { IsNotEmpty } from "class-validator"

export class GetOneProjetDto {
     @IsNotEmpty()
     readonly nom: string
     @IsNotEmpty()
     readonly description: string
     @IsNotEmpty()
     readonly dureeProjet: number
}
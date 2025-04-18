import { IsNotEmpty } from "class-validator";

export class CreateStagiaireDto{
     @IsNotEmpty()
     readonly matriculeStagiaire: string
     @IsNotEmpty()
     readonly nom : string
     @IsNotEmpty()
     readonly prenom : string
     @IsNotEmpty()
     readonly linkedin : string
     @IsNotEmpty()
     readonly statut : string
     @IsNotEmpty()
     readonly debutStage : string
     @IsNotEmpty()
     readonly finStage : string
     @IsNotEmpty()
     readonly idResponsable : number
     @IsNotEmpty()
     readonly codeDepartement : string
     
}
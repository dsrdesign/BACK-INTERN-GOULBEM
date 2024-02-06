import { IsNotEmpty } from "class-validator";

export class SupprimerResponsableDto{
     @IsNotEmpty()
     readonly motDePasse: string
}
import { IsNotEmpty } from "class-validator"

export class SignupDto { 
     @IsNotEmpty()
     readonly nom : string 
     @IsNotEmpty()
     readonly prenom : string
     @IsNotEmpty()
     readonly poste : string
     @IsNotEmpty()
     readonly nomUtilisateur : string 
     @IsNotEmpty()
     readonly motDePasse : string
     @IsNotEmpty()
     readonly codeDepartement : string
}

export class LoginDto { 
     readonly nomUtilisateur : string 
     @IsNotEmpty()
     readonly motDePasse : string
}

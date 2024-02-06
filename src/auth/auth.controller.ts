import { Body, Controller, Delete, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { LoginDto, SignupDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { SupprimerResponsableDto } from './dto/supprimerResponsable.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Authentification")
@Controller('auth')
export class AuthController{

     private readonly logger = new Logger(AuthController.name);

     constructor(private readonly authservice: AuthService){}

     @Post("signup")
     signup(@Body() signupDto: SignupDto){
          this.logger.log("Creation d'un responsable !")
          return this.authservice.creerResponsable(signupDto)
     }

     @Post("login")
     login(@Body() loginDto: LoginDto){
          this.logger.log("Connexion d'un responsable !")
          return this.authservice.seConnecter(loginDto)
     }

     @UseGuards(AuthGuard("jwt"))
     @Delete("delete")
     deleteResponsable(@Req() request: Request, @Body() supprimerResponsableDto: SupprimerResponsableDto){
          const idResponsable = request.user["idResponsable"]
          this.logger.log("Suppression d'un responsable !")
          return this.authservice.supprimerResponsable(idResponsable, supprimerResponsableDto)
     }
}

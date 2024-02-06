import { Body, Controller, Get, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { StagiaireService } from './stagiaire.service';
import { CreateStagiaireDto } from './dto/createStagiaire.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth("jwt")
@ApiTags("Stagiaire")
@Controller('stagiaire')
export class StagiaireController {

     private readonly logger = new Logger(StagiaireController.name);

     constructor(private readonly stagiaireService: StagiaireService){}

     @UseGuards(AuthGuard("jwt"))
     @Post("create")
     createStagiaire(@Body() createStagiaireDto: CreateStagiaireDto, @Req() request: Request){
          this.logger.log("Creation d'un stagiaire !")
          // const ID_RESPONSABLE = parseInt(request.user["idResponsable"])
          return this.stagiaireService.createStagiaire(createStagiaireDto)
     }

     @UseGuards(AuthGuard("jwt"))
     @Get("detail")
     getOneStagiaire(@Req() request: Request){
          this.logger.log("Detail d'un stagiaire !")
          const MATRICULE_STAGIAIRE = request.query["matriculeStagiaire"].toString()
          return this.stagiaireService.findOneStagiaire(MATRICULE_STAGIAIRE)
     }

     @UseGuards(AuthGuard("jwt"))
     @Get("All")
     getAllStagiaire(){
          this.logger.log("Liste de tous les stagiaires !")
          return this.stagiaireService.findAllStagiaire()
     }

     @UseGuards(AuthGuard("jwt"))
     @Get("AllByDepartment")
     getAllStagiaireByDepartment(@Req() request: Request){
          this.logger.log("Liste de tous les stagiaire d'un departement !")
          const CODE_DEPARTEMENT = request.query["codeDepartement"].toString()
          return this.stagiaireService.findAllStagiaireByDepartment(CODE_DEPARTEMENT)
     }

     @UseGuards(AuthGuard("jwt"))
     @Get("AllByResponsable")
     getAllStagiaireByResponsable(@Req() request: Request){
          this.logger.log("Liste de tous les stagiaire d'un responsable !")
          const ID_RESPONSABLE = parseInt(request.user["idResponsable"])
          return this.stagiaireService.findAllStagiaireByResponsable(ID_RESPONSABLE)
     }
}

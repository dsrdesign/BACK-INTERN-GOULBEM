import { Body, Controller, Get, Logger, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ProjetService } from './projet.service';
import { Request } from 'express';
import { CreateProjetDto } from './dto/createProjet.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth("jwt")
@ApiTags("Projet")
@Controller('projet')
export class ProjetController {

     private readonly logger = new Logger(ProjetController.name);

     constructor(private readonly projetService: ProjetService) { }

     @UseGuards(AuthGuard("jwt"))
     @Post("create")
     createProjet(@Body() createProjetDto: CreateProjetDto, @Req() request: Request) {
          const ID_RESPONSABLE = parseInt(request.user["idResponsable"])
          this.logger.log("Creation d'un projet !")
          return this.projetService.createProjet(createProjetDto, ID_RESPONSABLE)
     }


     @UseGuards(AuthGuard("jwt"))
     @Get("all")
     getAllProjet() {
          this.logger.log("Liste de tous les projets !")
          return this.projetService.findAllProjet()
     }

     @UseGuards(AuthGuard("jwt"))
     @Get(":idProjet")
     getOneProjet(@Param("idProjet", ParseIntPipe) idProjet: number) {
          console.log("Mon id : ", idProjet);
          
          this.logger.log("Recherche d'un projet !")
          return this.projetService.findOneProjet(idProjet)
     }
     @UseGuards(AuthGuard("jwt"))
     @Get("allByStagiaire")
     getAllProjetByStagiaire(@Req() request: Request) {
          this.logger.log("Liste de tous les projets d'un satgiaire !")
          const ID_STAGIAIRE = parseInt(request.query["idStagiaire"].toString())
          return this.projetService.findAllProjetByStagiaire(ID_STAGIAIRE)
     }
}

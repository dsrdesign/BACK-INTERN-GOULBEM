import { Body, Controller, Get, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { TacheService } from './tache.service';
import { Request } from 'express';
import { CreateTacheDto } from './dto/createTache.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth("jwt")
@ApiTags("Tâche")
@Controller('tache')
export class TacheController {

     private readonly logger = new Logger(TacheController.name);

     constructor(private readonly tacheService: TacheService) { }

     @UseGuards(AuthGuard("jwt"))
     @Post("create")
     createTache(@Body() createTacheDto: CreateTacheDto, @Req() request: Request) {
          this.logger.log("Creation d'une tache !")
          const ID_STAGIAIRE = parseInt(request.query["idStagiaire"].toString())
          const ID_PROJET = parseInt(request.query["idProjet"].toString())
          return this.tacheService.createTache(createTacheDto, ID_STAGIAIRE, ID_PROJET)
     }

     @UseGuards(AuthGuard("jwt"))
     @Get("allTacheByStagiare")
     getAllTacheByStagiaireProjet(@Req() request: Request) {
          this.logger.log("Liste de toutes les taches d'un stagiaire sur un projet !")
          const ID_PROJET = parseInt(request.query["idProjet"].toString())
          const ID_STAGIAIRE = parseInt(request.query["idStagiaire"].toString())
          return this.tacheService.findAllTacheByStagiaireProjet(ID_PROJET, ID_STAGIAIRE)
     }
}

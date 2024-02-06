import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTacheDto } from './dto/createTache.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class TacheService {


     constructor(private readonly prismaService: PrismaService) { }

     async createTache(createTacheDto: CreateTacheDto, idStagiaire: number, idProjet: number) {
          const { description, dureeTache } = createTacheDto;
          const TACHE = await this.prismaService.tache.findMany({where: {idStagiaire, idProjet}})
          // if(TACHE) throw new ConflictException("Cette tache existe deja")
          const PROJET = await this.prismaService.projet.findUnique({
               where: { idProjet }
          }).catch(error => { throw new ForbiddenException("Oups une erreur c'est produite, veuillez réessayer plustard !") })
          if (!PROJET) throw new NotFoundException("Ce projet n'existe pas !")
          const STAGIAIRE = await this.prismaService.stagiaire.findUnique({
               where: { idStagiaire }
          }).catch(error => { throw new ForbiddenException("Oups une erreur c'est produite, veuillez réessayer plustard !") })
          if (!STAGIAIRE) throw new NotFoundException("Ce stagiare n'existe pas !")
          await this.prismaService.tache.create({
               data: { description, dureeTache, idProjet, idStagiaire }
          }).catch(error => { throw new ForbiddenException("Oups une erreur c'est produite, veuillez réessayer plustard !") })

          return{message: "La tache a bien été crée !"}
     }

     async findAllTacheByStagiaireProjet(idProjet: number, idStagiaire: number) {
          const PROJET = await this.prismaService.projet.findUnique({
               where: { idProjet }
          }).catch(error => { throw new ForbiddenException("Oups une erreur c'est produite, veuillez réessayer plustard !") });
          if (!PROJET) throw new NotFoundException("Ce projet n'existe pas !")
          const STAGIAIRE = await this.prismaService.stagiaire.findUnique({
               where: { idStagiaire }
          }).catch(error => { throw new ForbiddenException("Oups une erreur c'est produite, veuillez réessayer plustard !") });
          if (!STAGIAIRE) throw new NotFoundException("Ce stagiaire n'existe pas !")
          const TACHES = await this.prismaService.tache.findMany({
               where: { idProjet, idStagiaire }
          }).catch(error => { throw new ForbiddenException("Oups une erreur c'est produite, veuillez réessayer plustard !") });

          return { data: TACHES, message: "Les taches ont bien été récupéré !" }
     }
}

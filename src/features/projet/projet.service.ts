import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { CreateProjetDto } from './dto/createProjet.dto';

@Injectable()
export class ProjetService {
    


     constructor(private readonly prismaService: PrismaService) { }

     async createProjet(createProjetDto: CreateProjetDto, idResponsable: number) {
          const { nom, description, dureeProjet } = createProjetDto
          const RESPONSABLE = await this.prismaService.responsable.findUnique({
               where: { idResponsable }
          }).catch(error => { throw new ForbiddenException("Oups une erreur c'est produite, veuillez réessayer plustard !") })
          if (!RESPONSABLE) throw new NotFoundException("Ce responsable n'existe pas !")
          await this.prismaService.projet.create({
               data: { nom, description, dureeProjet, idResponsable }
          }).catch(error => { throw new ForbiddenException("Une erreur est survenu !") })

          return { message: "Projet cree avec sucess !" }
     }

     async findOneProjet(idProjet: number) {
          console.log("OOOHH : ", idProjet);
          
          const PROJET = await this.prismaService.projet.findUnique({ 
               where: { idProjet },
               include: {taches: true, responsable: true} 
          }).catch(error => {throw new ForbiddenException(error, "Oupssss une erreur c'est produite, veuillez réessayer plustard !")})
          if(!PROJET) throw new NotFoundException("Ce projet n'existe pas !")

          return {data: PROJET, message: "Projet recupéré avec succès !"}
          
     }

     async findAllProjet() {
          const PROJETS = await this.prismaService.projet.findMany()
               .catch(error => { throw new ForbiddenException("Oups une erreur c'est produite, veuillez réessayer plustard !") })
          if (PROJETS.length <= 0) throw new NotFoundException("Aucun projet n'existe !")

          return { data: PROJETS, message: "La liste de projet a bien été récuperé !" }
     }

     async findAllProjetByStagiaire(idStagiaire: number) {
          const STAGIAIRE = await this.prismaService.stagiaire.findUnique({ where: { idStagiaire } })
          if (!STAGIAIRE) throw new NotFoundException("Ce stagiaire n'existe pas !")
          const PROJETS = await this.prismaService.tache.findMany({
               where: { idStagiaire }, select: { projet: true, },
          }).then(taches => taches.map(tache => tache.projet))
               .catch(error => { throw new ForbiddenException( error, "Oups une erreur c'est produite, veuillez réessayer plustard !") });

          return { data: PROJETS }
     }
}

import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStagiaireDto } from './dto/createStagiaire.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class StagiaireService {

     constructor(private readonly prismaService: PrismaService) { }

     async createStagiaire(createStagiaireDto: CreateStagiaireDto) {
          const { matriculeStagiaire, nom, prenom, linkedin, debutStage, finStage, codeDepartement, idResponsable, statut } = createStagiaireDto;
          const _debutStage = debutStage+"T00:00:00.000Z"
          const _finStage = finStage+"T00:00:00.000Z"
          const STAGIAIRE = await this.prismaService.stagiaire.findUnique({
               where: { matriculeStagiaire}
          }).catch(error => { throw new ForbiddenException("Oupsss une erreur c'est produite, veuillez réessayer plustard oooo!") })
          if (STAGIAIRE) throw new ConflictException("Ce matricule est deja utilisé !")
          // const STAGIAIRE_LINKEDIN = await this.prismaService.stagiaire.findUnique({
          //      where: { idStagiaire}
          // }).catch(error => { throw new ForbiddenException("Oups une erreur c'est produite, veuillez réessayer plustard oooo!") })
          // if (STAGIAIRE_LINKEDIN) throw new ConflictException("Ce compte linkedin est deja utilisé !")
          await this.prismaService.stagiaire.create({
               data: { matriculeStagiaire, nom, prenom, linkedin, debutStage: _debutStage, finStage: _finStage, codeDepartement, idResponsable: parseInt(`${idResponsable}`), statut }
          }).catch(error => { throw new ForbiddenException(error) })

          return { message: "Stagiaire creer avec succes" }
     }

     async findOneStagiaire(idStagiaire: number) {
          const STAGIAIRE = await this.prismaService.stagiaire.findUnique({
               where: { idStagiaire },
               include: {responsable: true, departement: true},
          
          }).catch(error => { throw new ForbiddenException("Oups une erreur c'est produite, veuillez réessayer plustard !") })
          if (!STAGIAIRE) throw new NotFoundException("Aucune stagiaire trouvé !")

          const PROJETS = await this.prismaService.tache.findMany({
               where: { idStagiaire }, select: { projet: true, },
          }).then(taches => taches.map(tache => tache.projet))
          .catch(error => {throw new ForbiddenException("Oups une erreur c'est produite, veuillez réessayer plustard !")});

          return { data: {stagiaire: STAGIAIRE, projet: PROJETS}, message: "Le stagiaire a bien été récupéré !" }
     }

     async findAllStagiaire() {
          const STAGIAIRES = await this.prismaService.stagiaire.findMany(
          ).catch(error => { throw new ForbiddenException("Oups une erreur c'est produite, veuillez réessayer plustard !") })
          if (STAGIAIRES.length <= 0) throw new NotFoundException("Aucune stagiaire trouvé !")

          return { data: STAGIAIRES, message: "La liste a bien été récupéré !" }
     }

     async findAllStagiaireByDepartment(codeDepartement: string) {
          const CODE_DEPARTEMENT = await this.prismaService.departement.findUnique({
               where: { codeDepartement }
          }).catch(error => { throw new ForbiddenException("Oups une erreur c'est produite, veuillez réessayer plustard !") })
          if (!CODE_DEPARTEMENT) throw new NotFoundException("Ce departement n'existe pas !")
          const STAGIAIRES = await this.prismaService.stagiaire.findMany({
               where: { codeDepartement }
          }).catch(error => { throw new ForbiddenException("Oups une erreur c'est produite, veuillez réessayer plustard !") })
          if (STAGIAIRES.length <= 0) throw new NotFoundException("Aucune stagiaire trouvé !")

          return { data: STAGIAIRES, message: "La liste des statigiaires par departement a bien été récupéré !" };
     }

     async findAllStagiaireByResponsable(idResponsable: number) {
          const RESPONSABLE = await this.prismaService.responsable.findUnique({
               where: { idResponsable }
          }).catch(error => { throw new ForbiddenException("Oups une erreur c'est produite, veuillez réessayer plustard !") })
          if (!RESPONSABLE) throw new NotFoundException("Ce responsable n'existe pas !")
          const STAGIAIRES = await this.prismaService.stagiaire.findMany({
               where: { idResponsable }
          }).catch(error => { throw new ForbiddenException("Oups une erreur c'est produite, veuillez réessayer plustard !") })
          if (STAGIAIRES.length <= 0) throw new NotFoundException("Aucune stagiaire trouvé !")

          return { data: STAGIAIRES, message: "La liste des stagiaires par responsable a bien été récupéré !" };
     }

}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class DashboardService {

     constructor(private readonly prismaService: PrismaService) { }
     async findDataDashboard(idResponsable: number) {
          const TOTAL_PROJETS = await this.prismaService.projet.count()
          const TOTAL_STAGIAIRE = await this.prismaService.stagiaire.count()
          const TOTAL_STAGIAIRE_ACTIF = await this.prismaService.stagiaire.count({where: {statut: "ACTIF"}})
          const TOTAL_STAGIAIRE_RESPONSABLE = await this.prismaService.stagiaire.count({where: {statut: "ACTIF", idResponsable}})

          console.log("Nombre de projet : ", TOTAL_PROJETS);

          return {
               data: {
                    totalProjet: TOTAL_PROJETS,
                    totalStagiaire: TOTAL_STAGIAIRE,
                    totalStagiaireActif: TOTAL_STAGIAIRE_ACTIF,
                    totalStagiaireDuResponsable: TOTAL_STAGIAIRE_RESPONSABLE,
               }
          };

     }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './db/prisma/prisma.module';
import { DepartementModule } from './features/departement/departement.module';
import { StagiaireModule } from './features/stagiaire/stagiaire.module';
import { ProjetModule } from './features/projet/projet.module';
import { TacheModule } from './features/tache/tache.module';
import { DashboardModule } from './features/dashboard/dashboard.module';

@Module({
  imports: [ ConfigModule.forRoot({isGlobal : true}), AuthModule, PrismaModule, DepartementModule, StagiaireModule, ProjetModule, TacheModule, DashboardModule],
})
export class AppModule {}

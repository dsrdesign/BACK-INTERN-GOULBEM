import { Module } from '@nestjs/common';
import { StagiaireController } from './stagiaire.controller';
import { StagiaireService } from './stagiaire.service';

@Module({
  controllers: [StagiaireController],
  providers: [StagiaireService]
})
export class StagiaireModule {}

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Application, MediaClientProvider } from '@v2-comic-be/core';
import { AppModule } from './infra/app.module';

Application.bootstrapMicroservice({
  module: AppModule,
  provider: MediaClientProvider,
});

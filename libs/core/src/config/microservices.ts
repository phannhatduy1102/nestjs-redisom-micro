/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  ClientProvider,
  ClientProviderOptions,
  Transport,
} from '@nestjs/microservices';

export const AuthClientProvider: ClientProvider = {
  transport: Transport.TCP,
  options: {
    port: +process.env['AUTH_SERVICE_PORT']!,
  },
};

export const AuthClientProviderOptions: ClientProviderOptions = {
  name: 'AuthServiceProvider',
  ...AuthClientProvider,
};

export const UserClientProvider: ClientProvider = {
  transport: Transport.TCP,
  options: {
    port: +process.env['USER_SERVICE_PORT']!,
  },
};

export const UserClientProviderOptions: ClientProviderOptions = {
  name: 'UserServiceProvider',
  ...UserClientProvider,
};

export const MediaClientProvider: ClientProvider = {
  transport: Transport.TCP,
  options: {
    port: +process.env['MEDIA_SERVICE_PORT']!,
  },
};

export const MediaClientProviderOptions: ClientProviderOptions = {
  name: 'MediaServiceProvider',
  ...MediaClientProvider,
};

export const CommonClientProvider: ClientProvider = {
  transport: Transport.TCP,
  options: {
    port: +process.env['COMMON_SERVICE_PORT']!,
  },
};

export const CommonClientProviderOptions: ClientProviderOptions = {
  name: 'CommonServiceProvider',
  ...AuthClientProvider,
};

export const WriterClientProvider: ClientProvider = {
  transport: Transport.TCP,
  options: {
    port: +process.env['WRITER_SERVICE_PORT']!,
  },
};

export const WriterClientProviderOptions: ClientProviderOptions = {
  name: 'WriterServiceProvider',
  ...WriterClientProvider,
};

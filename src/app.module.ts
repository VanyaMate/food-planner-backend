import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET_KEY } from '@/domain/consts/env';


@Module({
    imports    : [
        ConfigModule.forRoot({
            envFilePath: `.env.${ process.env.NODE_ENV }`,
            isGlobal   : true,
        }),
        JwtModule.registerAsync({
            global    : true,
            imports   : [ ConfigModule ],
            inject    : [ ConfigService ],
            useFactory: async (config: ConfigService) => ({
                global: true,
                secret: config.get<string>(JWT_SECRET_KEY),
            }),
        }),
    ],
    controllers: [],
    providers  : [],
})
export class AppModule {
}

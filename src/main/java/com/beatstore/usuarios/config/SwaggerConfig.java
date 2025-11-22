package com.beatstore.usuarios.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "BeatStore - Microservicio de Usuarios",
                version = "2.0"
        )
)

public class SwaggerConfig {
}

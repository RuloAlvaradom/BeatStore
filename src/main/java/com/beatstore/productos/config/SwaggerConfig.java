package com.beatstore.productos.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "BeatStore - Microservicio de Usuarios"
        )
)

public class SwaggerConfig {
}

package com.beatstore.usuarios.config;

import com.beatstore.usuarios.security.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    //filtro que valida los tokens jwt en cada peticion
    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                //desactiva csrf para usar api rest
                .csrf(csrf -> csrf.disable())

                //desactiva cors aqui porque usamos @CrossOrigin directamente en los controladores
                .cors(cors -> cors.disable())

                //configurar permisos de acceso
                .authorizeHttpRequests(auth -> auth
                        //rutas publicas que no necesitan token
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/doc/**",
                                "/api/usuarios/register",
                                "/api/usuarios/login"
                        ).permitAll()
                        //cualquier otra ruta requiere estar autenticado
                        .anyRequest().authenticated()
                )
                //agregar el filtro jwt para que se ejecute antes del filtro normal de login
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        //construir la configuracion final
        return http.build();
    }
}

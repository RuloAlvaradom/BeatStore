package com.beatstore.usuarios.config;

import com.beatstore.usuarios.model.Usuario;
import com.beatstore.usuarios.repository.UsuarioRepository;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner cargarDatosIniciales(UsuarioRepository usuarioRepository) {
        return args -> {

            if (usuarioRepository.count() == 0) {

                Faker faker = new Faker();

                for (int i = 0; i < 5; i++) {

                    Usuario usuario = new Usuario();

                    usuario.setNombre(faker.name().firstName());
                    usuario.setApodo(faker.superhero().name());
                    usuario.setRut(faker.regexify("\\d{7,8}-[0-9Kk]"));
                    usuario.setTelefono("+569" + faker.number().digits(8));
                    usuario.setEmail(faker.internet().emailAddress());

                    usuario.setRegion("Valparaíso");
                    usuario.setCiudad("Viña del Mar");
                    usuario.setCalle(faker.address().streetName());
                    usuario.setNumeroDireccion(String.valueOf(faker.number().numberBetween(100, 999)));

                    usuario.setPassword("123456");

                    usuarioRepository.save(usuario);
                }

                System.out.println("✔ Usuarios iniciales insertados (BeatStore)");
            }
        };
    }
}

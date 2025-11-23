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

            //Solo crea datos si la tabla esta vacia
            if (usuarioRepository.count() == 0) {

                Faker faker = new Faker();


                //ADMIN del proyecto
                Usuario admin1 = new Usuario();
                admin1.setNombre("Raúl");
                admin1.setApodo("Raulito");
                admin1.setRut("20456789-3");
                admin1.setTelefono("+569" + faker.number().digits(8));
                admin1.setEmail("raul.alvarado@beatstore.cl");
                admin1.setRegion("Valparaíso");
                admin1.setCiudad("Viña del Mar");
                admin1.setCalle("Calle Los Aromos");
                admin1.setNumeroDireccion("123");
                admin1.setPassword("admin123");
                admin1.setRol("ADMIN");

                usuarioRepository.save(admin1);

                Usuario admin2 = new Usuario();
                admin2.setNombre("Matías");
                admin2.setApodo("MatPadilla");
                admin2.setRut("21456789-7");
                admin2.setTelefono("+569" + faker.number().digits(8));
                admin2.setEmail("matias.padilla@beatstore.cl");
                admin2.setRegion("Valparaíso");
                admin2.setCiudad("Viña del Mar");
                admin2.setCalle("Calle Los Aromos");
                admin2.setNumeroDireccion("456");
                admin2.setPassword("admin123");
                admin2.setRol("ADMIN");

                usuarioRepository.save(admin2);


                //5 usuarios falsos (USER)
                for (int i = 0; i < 5; i++) {

                    Usuario usuario = new Usuario();

                    usuario.setNombre(faker.name().firstName());
                    usuario.setApodo(faker.superhero().name());
                    usuario.setRut(faker.regexify("\\d{7,8}-[0-9Kk]"));
                    usuario.setTelefono("+569" + faker.number().digits(8));
                    usuario.setEmail(faker.internet().emailAddress());

                    usuario.setRegion("Valparaiso");
                    usuario.setCiudad("Viña del Mar");
                    usuario.setCalle(faker.address().streetName());
                    usuario.setNumeroDireccion(
                            String.valueOf(faker.number().numberBetween(100, 999))
                    );

                    usuario.setPassword("123456");
                    usuario.setRol("USER");

                    usuarioRepository.save(usuario);
                }

                System.out.println("Usuarios iniciales insertados (BeatStore)");
            }
        };
    }
}

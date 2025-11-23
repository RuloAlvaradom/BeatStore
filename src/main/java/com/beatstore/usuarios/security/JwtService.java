package com.beatstore.usuarios.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
public class JwtService {

    //clave usada para firmar los tokens
    private static final String SECRET_KEY = "CLAVE_SUPER_SECRETA_BEATSTORE_123";

    //metodo para crear un token
    //el token guarda email, rol, fecha de creacion y fecha de expiracion
    public String generarToken(String email, String rol) {

        Instant ahora = Instant.now(); //hora actual

        return JWT.create()
                .withSubject(email)                                                     //guarda el email del usuario
                .withClaim("rol", rol)                                             //guarda el rol del usuario
                .withIssuedAt(Date.from(ahora))                                         //fecha en que el token fue creado
                .withExpiresAt(Date.from(ahora.plus(1, ChronoUnit.HOURS))) //fecha en que el token expira
                .sign(Algorithm.HMAC256(SECRET_KEY));                                   //firmar el token con la clave secreta
    }

    //metodo para validar el token
    //se revisa si el token esta bien firmado y si no ha expirado
    public DecodedJWT validarToken(String token) {
        return JWT.require(Algorithm.HMAC256(SECRET_KEY))
                .build()
                .verify(token); //verify lanza error si el token es invalido
    }

    //obtener el email guardado dentro del token
    public String obtenerEmail(String token) {
        return validarToken(token).getSubject();
    }

    //obtener el rol guardado dentro del token
    public String obtenerRol(String token) {
        return validarToken(token).getClaim("rol").asString();
    }
}

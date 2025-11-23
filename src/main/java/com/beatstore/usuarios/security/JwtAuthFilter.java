package com.beatstore.usuarios.security;

import com.beatstore.usuarios.repository.UsuarioRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UsuarioRepository usuarioRepository;

    public JwtAuthFilter(JwtService jwtService, UsuarioRepository usuarioRepository) {
        this.jwtService = jwtService;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        //Si no viene token o no tiene el formato correcto, no hacemos autenticacion
        //Dejamos que la peticion siga su camino
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        //Extraer solo el token
        String token = authHeader.substring(7);

        try {
            //Obtener datos desde el token.
            String email = jwtService.obtenerEmail(token);
            String rol = jwtService.obtenerRol(token);

            //Verifica que nadie este autenticado aun
            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                //Valida que el usuario realmente exista en la base de datos
                var usuario = usuarioRepository.findByEmail(email).orElse(null);

                if (usuario != null) {

                    //crear un objeto de autenticacion con el email y el rol
                    var auth = new UsernamePasswordAuthenticationToken(
                            email,
                            null,                     //No necesitamos password
                            List.of(new SimpleGrantedAuthority("ROLE_" + rol)) //Rol convertido a autoridad
                    );

                    //Registrar al usuario como autenticado dentro del contexto de la aplicación
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }

        } catch (Exception e) {
            //Si el token es invalido o algo fallo, simplemente no autenticamos
            //La peticion igual continua, pero como no autenticada
        }

        //Continuar con el siguiente filtro o controlador
        filterChain.doFilter(request, response);
    }
}

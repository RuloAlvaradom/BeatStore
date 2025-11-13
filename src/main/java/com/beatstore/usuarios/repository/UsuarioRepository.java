package com.beatstore.usuarios.repository;

import com.beatstore.usuarios.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // Buscar por email (para login)
    Optional<Usuario> findByEmail(String email);

    // Validar si un email ya existe
    boolean existsByEmail(String email);

    // Validar si un RUT ya existe
    boolean existsByRut(String rut);
}

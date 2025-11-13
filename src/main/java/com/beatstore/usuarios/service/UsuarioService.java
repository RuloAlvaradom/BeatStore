package com.beatstore.usuarios.service;

import com.beatstore.usuarios.dto.UsuarioLoginRequest;
import com.beatstore.usuarios.dto.UsuarioRegisterDTO;
import com.beatstore.usuarios.dto.UsuarioResponse;
import com.beatstore.usuarios.model.Usuario;
import com.beatstore.usuarios.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Registrar nuevo usuario
    public UsuarioResponse registrar(UsuarioRegisterDTO req) {

        if (usuarioRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("El correo ya está registrado");
        }

        if (usuarioRepository.existsByRut(req.getRut())) {
            throw new RuntimeException("El RUT ya está registrado");
        }

        Usuario nuevo = Usuario.builder()
                .nombre(req.getNombre())
                .apodo(req.getApodo())
                .rut(req.getRut())
                .telefono(req.getTelefono())
                .email(req.getEmail())
                .region(req.getRegion())
                .ciudad(req.getCiudad())
                .calle(req.getCalle())
                .numeroDireccion(req.getNumeroDireccion())
                .password(req.getPassword()) // Luego se puede encriptar
                .build();

        usuarioRepository.save(nuevo);

        return mapToResponse(nuevo);
    }

    // Login
    public UsuarioResponse login(UsuarioLoginRequest req) {

        Usuario usuario = usuarioRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!usuario.getPassword().equals(req.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        return mapToResponse(usuario);
    }

    // Buscar por ID
    public UsuarioResponse buscarPorId(Long id) {
        Usuario u = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return mapToResponse(u);
    }

    // Listar todos
    public List<UsuarioResponse> listarTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // Convertir entidad → DTO
    private UsuarioResponse mapToResponse(Usuario u) {
        return UsuarioResponse.builder()
                .id(u.getId())
                .nombre(u.getNombre())
                .apodo(u.getApodo())
                .email(u.getEmail())
                .rut(u.getRut())
                .telefono(u.getTelefono())
                .region(u.getRegion())
                .ciudad(u.getCiudad())
                .calle(u.getCalle())
                .numeroDireccion(u.getNumeroDireccion())
                .build();
    }
}

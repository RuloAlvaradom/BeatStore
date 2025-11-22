package com.beatstore.usuarios.service;

import com.beatstore.usuarios.dto.UsuarioLoginRequest;
import com.beatstore.usuarios.dto.UsuarioRegisterDTO;
import com.beatstore.usuarios.dto.UsuarioResponse;
import com.beatstore.usuarios.model.Usuario;
import com.beatstore.usuarios.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final RestTemplate restTemplate;

    public UsuarioService(UsuarioRepository usuarioRepository, RestTemplate restTemplate) {
        this.usuarioRepository = usuarioRepository;
        this.restTemplate = restTemplate;
    }

    //CRUD USUARIOS

    //REGISTRAR USUARIO
    public UsuarioResponse register(UsuarioRegisterDTO dto) {

        if (usuarioRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("El correo ya está registrado");
        }

        if (usuarioRepository.existsByRut(dto.getRut())) {
            throw new RuntimeException("El RUT ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(dto.getNombre());
        usuario.setApodo(dto.getApodo());
        usuario.setRut(dto.getRut());
        usuario.setEmail(dto.getEmail());
        usuario.setPassword(dto.getPassword());
        usuario.setTelefono(dto.getTelefono());
        usuario.setRegion(dto.getRegion());
        usuario.setCiudad(dto.getCiudad());
        usuario.setCalle(dto.getCalle());
        usuario.setNumeroDireccion(dto.getNumeroDireccion());

        Usuario guardado = usuarioRepository.save(usuario);

        return UsuarioResponse.from(guardado);
    }

    //LOGIN
    public UsuarioResponse login(UsuarioLoginRequest dto) {

        Usuario usuario = usuarioRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (usuario.getPassword() == null || !usuario.getPassword().equals(dto.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        return UsuarioResponse.from(usuario);
    }

    //LISTAR TODOS
    public List<UsuarioResponse> findAll() {
        return usuarioRepository.findAll()
                .stream()
                .map(UsuarioResponse::from)
                .collect(Collectors.toList());
    }

    //BUSCAR POR ID
    public UsuarioResponse findById(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return UsuarioResponse.from(usuario);
    }

    //ACTUALIZAR
    public UsuarioResponse updateUser(Long id, UsuarioRegisterDTO dto) {

        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!usuario.getEmail().equals(dto.getEmail()) &&
                usuarioRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("El correo ya está registrado por otro usuario");
        }

        if (!usuario.getRut().equals(dto.getRut()) &&
                usuarioRepository.existsByRut(dto.getRut())) {
            throw new RuntimeException("El RUT ya está registrado por otro usuario");
        }

        usuario.setNombre(dto.getNombre());
        usuario.setApodo(dto.getApodo());
        usuario.setRut(dto.getRut());
        usuario.setEmail(dto.getEmail());
        usuario.setPassword(dto.getPassword());
        usuario.setTelefono(dto.getTelefono());
        usuario.setRegion(dto.getRegion());
        usuario.setCiudad(dto.getCiudad());
        usuario.setCalle(dto.getCalle());
        usuario.setNumeroDireccion(dto.getNumeroDireccion());

        Usuario actualizado = usuarioRepository.save(usuario);

        return UsuarioResponse.from(actualizado);
    }

    //ELIMINAR
    public void deleteUser(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuario no existe");
        }
        usuarioRepository.deleteById(id);
    }

    //MICROSERVICIO PRODUCTOS

    public String consultarProductoDesdeMicroservicio(Long idProducto) {

        String url = "http://localhost:8081/api/productos/" + idProducto;

        try {
            ResponseEntity<String> respuesta =
                    restTemplate.getForEntity(url, String.class);

            if (respuesta.getStatusCode().is2xxSuccessful()) {
                return respuesta.getBody();
            }

            return "Producto no encontrado";

        } catch (Exception e) {
            return "Error conectando con microservicio PRODUCTOS: " + e.getMessage();
        }
    }
}

package com.beatstore.usuarios.controller;

import com.beatstore.usuarios.dto.AuthResponse;
import com.beatstore.usuarios.dto.UsuarioLoginRequest;
import com.beatstore.usuarios.dto.UsuarioRegisterDTO;
import com.beatstore.usuarios.dto.UsuarioResponse;
import com.beatstore.usuarios.service.UsuarioService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@SecurityRequirement(name = "bearerAuth")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    //REGISTRO
    @PostMapping("/register")
    public ResponseEntity<UsuarioResponse> registerUser(@RequestBody UsuarioRegisterDTO dto) {
        return ResponseEntity.ok(usuarioService.register(dto));
    }

    //LOGIN con JWT
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody UsuarioLoginRequest dto) {
        return ResponseEntity.ok(usuarioService.login(dto));
    }

    //LISTAR
    @GetMapping
    public ResponseEntity<List<UsuarioResponse>> findAll() {
        return ResponseEntity.ok(usuarioService.findAll());
    }

    //BUSCAR POR ID
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.findById(id));
    }

    //ACTUALIZAR
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponse> updateUser(
            @PathVariable Long id,
            @RequestBody UsuarioRegisterDTO dto) {

        return ResponseEntity.ok(usuarioService.updateUser(id, dto));
    }

    // ELIMINAR
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        usuarioService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    //CONEXON CON PRODUCTOS
    @GetMapping("/producto/{idProducto}")
    public ResponseEntity<String> consultarProducto(@PathVariable Long idProducto) {
        return ResponseEntity.ok(
                usuarioService.consultarProductoDesdeMicroservicio(idProducto)
        );
    }
}

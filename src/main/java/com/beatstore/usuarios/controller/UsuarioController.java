package com.beatstore.usuarios.controller;

import com.beatstore.usuarios.dto.UsuarioLoginRequest;
import com.beatstore.usuarios.dto.UsuarioRegisterDTO;
import com.beatstore.usuarios.dto.UsuarioResponse;
import com.beatstore.usuarios.model.Usuario;
import com.beatstore.usuarios.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*") // Permite conexión desde tu frontend React
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // ===============================
    // 📌 REGISTRO
    // ===============================
    @PostMapping("/register")
    public ResponseEntity<UsuarioResponse> registerUser(@RequestBody UsuarioRegisterDTO dto) {
        UsuarioResponse nuevo = usuarioService.register(dto);
        return ResponseEntity.ok(nuevo);
    }

    // ===============================
    // 📌 LOGIN
    // ===============================
    @PostMapping("/login")
    public ResponseEntity<UsuarioResponse> login(@RequestBody UsuarioLoginRequest dto) {
        UsuarioResponse usuario = usuarioService.login(dto);
        return ResponseEntity.ok(usuario);
    }

    // ===============================
    // 📌 LISTAR TODOS
    // ===============================
    @GetMapping
    public ResponseEntity<List<UsuarioResponse>> findAll() {
        return ResponseEntity.ok(usuarioService.findAll());
    }

    // ===============================
    // 📌 BUSCAR POR ID
    // ===============================
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.findById(id));
    }

    // ===============================
    // 📌 ACTUALIZAR USUARIO
    // ===============================
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponse> updateUser(
            @PathVariable Long id,
            @RequestBody UsuarioRegisterDTO dto) {

        return ResponseEntity.ok(usuarioService.updateUser(id, dto));
    }

    // ===============================
    // 📌 ELIMINAR USUARIO
    // ===============================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        usuarioService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}

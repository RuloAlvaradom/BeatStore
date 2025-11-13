package com.beatstore.usuarios.controller;

import com.beatstore.usuarios.dto.UsuarioLoginRequest;
import com.beatstore.usuarios.dto.UsuarioRegisterDTO;
import com.beatstore.usuarios.dto.UsuarioResponse;
import com.beatstore.usuarios.service.UsuarioService;
import com.beatstore.usuarios.assembler.UsuarioModelAssembler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/v2/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Usuarios", description = "Operaciones del microservicio de usuarios en BeatStore")
public class UsuarioControllerV2 {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioModelAssembler assembler;

    // REGISTRO
    @Operation(summary = "Registrar un nuevo usuario")
    @PostMapping("/registro")
    public ResponseEntity<EntityModel<UsuarioResponse>> registrar(
            @RequestBody UsuarioRegisterDTO req) {

        UsuarioResponse response = usuarioService.registrar(req);
        return ResponseEntity.ok(assembler.toModel(response));
    }

    // LOGIN
    @Operation(summary = "Iniciar sesión")
    @PostMapping("/login")
    public ResponseEntity<EntityModel<UsuarioResponse>> login(
            @RequestBody UsuarioLoginRequest req) {

        UsuarioResponse response = usuarioService.login(req);
        return ResponseEntity.ok(assembler.toModel(response));
    }

    // OBTENER POR ID
    @Operation(summary = "Obtener usuario por ID")
    @GetMapping("/{id}")
    public ResponseEntity<EntityModel<UsuarioResponse>> obtenerPorId(@PathVariable Long id) {

        UsuarioResponse response = usuarioService.buscarPorId(id);
        return ResponseEntity.ok(assembler.toModel(response));
    }

    // LISTAR TODOS
    @Operation(summary = "Listar todos los usuarios (compatibilidad HATEOAS)")
    @GetMapping
    public ResponseEntity<CollectionModel<EntityModel<UsuarioResponse>>> listar() {

        List<EntityModel<UsuarioResponse>> lista = usuarioService.listarTodos()
                .stream()
                .map(assembler::toModel)
                .collect(Collectors.toList());

        return ResponseEntity.ok(
                CollectionModel.of(lista,
                        linkTo(methodOn(UsuarioControllerV2.class).listar()).withSelfRel()));
    }
}

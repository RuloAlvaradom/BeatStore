package com.beatstore.usuarios.assembler;

import com.beatstore.usuarios.dto.UsuarioResponse;
import com.beatstore.usuarios.controller.UsuarioControllerV2;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@Component
public class UsuarioModelAssembler implements RepresentationModelAssembler<UsuarioResponse, EntityModel<UsuarioResponse>> {

    @Override
    public EntityModel<UsuarioResponse> toModel(UsuarioResponse usuario) {

        return EntityModel.of(usuario,
                linkTo(methodOn(UsuarioControllerV2.class).obtenerPorId(usuario.getId())).withSelfRel(),
                linkTo(methodOn(UsuarioControllerV2.class).listar()).withRel("usuarios")
        );
    }
}

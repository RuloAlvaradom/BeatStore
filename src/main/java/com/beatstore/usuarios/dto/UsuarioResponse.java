package com.beatstore.usuarios.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Builder
public class UsuarioResponse {
    private Long id;
    private String nombre;
    private String apodo;
    private String rut;
    private String telefono;
    private String email;
    private String region;
    private String ciudad;
    private String calle;
    private String numeroDireccion;
}

package com.beatstore.usuarios.dto;

import com.beatstore.usuarios.model.Usuario;
import lombok.Data;

@Data
public class UsuarioResponse {

    private Long id;
    private String nombre;
    private String apodo;
    private String rut;
    private String email;
    private String telefono;
    private String region;
    private String ciudad;
    private String calle;
    private String numeroDireccion;

    // Metodo estatico que convierte una entidad Usuario -> UsuarioResponse
    public static UsuarioResponse from(Usuario usuario) {
        UsuarioResponse res = new UsuarioResponse();

        res.setId(usuario.getId());
        res.setNombre(usuario.getNombre());
        res.setApodo(usuario.getApodo());
        res.setRut(usuario.getRut());
        res.setEmail(usuario.getEmail());
        res.setTelefono(usuario.getTelefono());
        res.setRegion(usuario.getRegion());
        res.setCiudad(usuario.getCiudad());
        res.setCalle(usuario.getCalle());
        res.setNumeroDireccion(usuario.getNumeroDireccion());

        return res;
    }
}

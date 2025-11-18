package com.beatstore.productos.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductoRequest {

    private String nombre;
    private String marca;
    private String categoria;
    private Double precio;
    private Integer stock;
    private String descripcion;
    private String imagen;
}

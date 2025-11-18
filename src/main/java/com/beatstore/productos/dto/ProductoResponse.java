package com.beatstore.productos.dto;

import com.beatstore.productos.model.Producto;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProductoResponse {

    private Long id;
    private String nombre;
    private String marca;
    private String categoria;
    private Double precio;
    private Integer stock;
    private String descripcion;
    private String imagen;

    public static ProductoResponse from(Producto p) {
        return ProductoResponse.builder()
                .id(p.getId())
                .nombre(p.getNombre())
                .marca(p.getMarca())
                .categoria(p.getCategoria())
                .precio(p.getPrecio())
                .stock(p.getStock())
                .descripcion(p.getDescripcion())
                .imagen(p.getImagen())
                .build();
    }
}

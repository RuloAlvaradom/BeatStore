package com.beatstore.compras.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class ResumenCompraDTO {

    private Long compraId;
    private Long usuarioId;
    private Long productoId;
    private Integer cantidad;
    private String nombreProducto;
    private Double total;
}

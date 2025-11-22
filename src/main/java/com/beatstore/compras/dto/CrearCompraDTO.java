package com.beatstore.compras.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class CrearCompraDTO {

    private Long usuarioId;
    private Long productoId;
    private Integer cantidad;
}

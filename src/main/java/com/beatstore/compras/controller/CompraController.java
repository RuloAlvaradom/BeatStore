package com.beatstore.compras.controller;

import com.beatstore.compras.dto.CompraResponseDTO;
import com.beatstore.compras.dto.CrearCompraDTO;
import com.beatstore.compras.dto.ResumenCompraDTO;
import com.beatstore.compras.service.CompraService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/compras")
@CrossOrigin(origins = "*")
public class CompraController {

    private final CompraService compraService;

    public CompraController(CompraService compraService) {
        this.compraService = compraService;
    }

    //CREAR COMPRA
    @PostMapping
    public ResponseEntity<ResumenCompraDTO> crearCompra(@RequestBody CrearCompraDTO dto) {
        return ResponseEntity.ok(compraService.crearCompra(dto));
    }

    //COMPRAS POR USUARIO
    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<CompraResponseDTO>> comprasUsuario(@PathVariable Long id) {
        return ResponseEntity.ok(compraService.comprasPorUsuario(id));
    }

    //COMPRAS POR PRODUCTO
    @GetMapping("/producto/{id}")
    public ResponseEntity<List<CompraResponseDTO>> comprasProducto(@PathVariable Long id) {
        return ResponseEntity.ok(compraService.comprasPorProducto(id));
    }
}

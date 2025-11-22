package com.beatstore.productos.controller;

import com.beatstore.productos.dto.ProductoRequest;
import com.beatstore.productos.dto.ProductoResponse;
import com.beatstore.productos.service.ProductoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @PostMapping
    public ResponseEntity<ProductoResponse> create(@RequestBody ProductoRequest dto) {
        return ResponseEntity.ok(productoService.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<ProductoResponse>> findAll() {
        return ResponseEntity.ok(productoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductoResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.findById(id));
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<ProductoResponse>> findByCategoria(@PathVariable String categoria) {
        return ResponseEntity.ok(productoService.findByCategoria(categoria));
    }

    @GetMapping("/buscar/{nombre}")
    public ResponseEntity<List<ProductoResponse>> findByNombre(@PathVariable String nombre) {
        return ResponseEntity.ok(productoService.findByNombre(nombre));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductoResponse> update(
            @PathVariable Long id,
            @RequestBody ProductoRequest dto) {

        return ResponseEntity.ok(productoService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // DESCONTAR STOCK 
    @PutMapping("/descontar/{id}")
    public ResponseEntity<ProductoResponse> descontar(
            @PathVariable Long id,
            @RequestParam int cantidad) {

        return ResponseEntity.ok(productoService.descontarStock(id, cantidad));
    }
}

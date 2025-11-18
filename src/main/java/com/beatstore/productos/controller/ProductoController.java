package com.beatstore.productos.controller;

import com.beatstore.productos.dto.ProductoRequest;
import com.beatstore.productos.dto.ProductoResponse;
import com.beatstore.productos.service.ProductoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*") // Permite conexión desde BeatStore (React)
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    // ===============================
    // 📌 CREAR PRODUCTO
    // ===============================
    @PostMapping
    public ResponseEntity<ProductoResponse> create(@RequestBody ProductoRequest dto) {
        ProductoResponse nuevo = productoService.create(dto);
        return ResponseEntity.ok(nuevo);
    }

    // ===============================
    // 📌 LISTAR TODOS LOS PRODUCTOS
    // ===============================
    @GetMapping
    public ResponseEntity<List<ProductoResponse>> findAll() {
        return ResponseEntity.ok(productoService.findAll());
    }

    // ===============================
    // 📌 BUSCAR POR ID
    // ===============================
    @GetMapping("/{id}")
    public ResponseEntity<ProductoResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.findById(id));
    }

    // ===============================
    // 📌 BUSCAR POR CATEGORÍA
    // ===============================
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<ProductoResponse>> findByCategoria(
            @PathVariable String categoria) {

        return ResponseEntity.ok(productoService.findByCategoria(categoria));
    }

    // ===============================
    // 📌 BUSCAR POR NOMBRE (contiene)
    // ===============================
    @GetMapping("/buscar/{nombre}")
    public ResponseEntity<List<ProductoResponse>> findByNombre(
            @PathVariable String nombre) {

        return ResponseEntity.ok(productoService.findByNombre(nombre));
    }

    // ===============================
    // 📌 ACTUALIZAR PRODUCTO
    // ===============================
    @PutMapping("/{id}")
    public ResponseEntity<ProductoResponse> update(
            @PathVariable Long id,
            @RequestBody ProductoRequest dto) {

        return ResponseEntity.ok(productoService.update(id, dto));
    }

    // ===============================
    // 📌 ELIMINAR PRODUCTO
    // ===============================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

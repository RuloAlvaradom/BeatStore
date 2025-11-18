package com.beatstore.productos.service;

import com.beatstore.productos.dto.ProductoRequest;
import com.beatstore.productos.dto.ProductoResponse;
import com.beatstore.productos.model.Producto;
import com.beatstore.productos.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    // CREAR PRODUCTO
    public ProductoResponse create(ProductoRequest dto) {

        // Validar nombre repetido (opcional)
        // Si tu negocio requiere evitar duplicados por nombre+marca
        /*
        if (productoRepository.existsByNombre(dto.getNombre())) {
            throw new RuntimeException("Ya existe un producto con este nombre");
        }
        */

        Producto producto = Producto.builder()
                .nombre(dto.getNombre())
                .marca(dto.getMarca())
                .categoria(dto.getCategoria())
                .precio(dto.getPrecio())
                .stock(dto.getStock())
                .descripcion(dto.getDescripcion())
                .imagen(dto.getImagen())
                .build();

        Producto guardado = productoRepository.save(producto);

        return ProductoResponse.from(guardado);
    }

    // LISTAR TODOS
    public List<ProductoResponse> findAll() {
        return productoRepository.findAll()
                .stream()
                .map(ProductoResponse::from)
                .collect(Collectors.toList());
    }

    // BUSCAR POR ID
    public ProductoResponse findById(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        return ProductoResponse.from(producto);
    }

    // BUSCAR POR CATEGORIA
    public List<ProductoResponse> findByCategoria(String categoria) {
        return productoRepository.findByCategoria(categoria)
                .stream()
                .map(ProductoResponse::from)
                .collect(Collectors.toList());
    }

    // BUSCAR POR NOMBRE (contiene)
    public List<ProductoResponse> findByNombre(String nombre) {
        return productoRepository.findByNombreContainingIgnoreCase(nombre)
                .stream()
                .map(ProductoResponse::from)
                .collect(Collectors.toList());
    }

    // ACTUALIZAR PRODUCTO
    public ProductoResponse update(Long id, ProductoRequest dto) {

        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        producto.setNombre(dto.getNombre());
        producto.setMarca(dto.getMarca());
        producto.setCategoria(dto.getCategoria());
        producto.setPrecio(dto.getPrecio());
        producto.setStock(dto.getStock());
        producto.setDescripcion(dto.getDescripcion());
        producto.setImagen(dto.getImagen());

        Producto actualizado = productoRepository.save(producto);

        return ProductoResponse.from(actualizado);
    }

    // ELIMINAR PRODUCTO
    public void delete(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new RuntimeException("Producto no existe");
        }
        productoRepository.deleteById(id);
    }
}

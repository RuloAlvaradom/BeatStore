package com.beatstore.productos.repository;

import com.beatstore.productos.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    
    // Buscar productos por categoría 
    List<Producto> findByCategoria(String categoria);

    // Búsqueda por nombre parcial (para buscador)
    List<Producto> findByNombreContainingIgnoreCase(String nombre);
}

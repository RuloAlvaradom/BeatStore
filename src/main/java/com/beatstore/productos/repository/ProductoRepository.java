package com.beatstore.productos.repository;

import com.beatstore.productos.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    
    //Buscar productos por categoria 
    List<Producto> findByCategoria(String categoria);

    //Busqueda por nombre parcial
    List<Producto> findByNombreContainingIgnoreCase(String nombre);
}

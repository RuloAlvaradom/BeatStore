package com.beatstore.compras.repository;

import com.beatstore.compras.model.Compra;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompraRepository extends JpaRepository<Compra, Long> {

    List<Compra> findByUsuarioId(Long usuarioId);

    List<Compra> findByProductoId(Long productoId);
}

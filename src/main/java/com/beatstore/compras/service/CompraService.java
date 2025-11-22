package com.beatstore.compras.service;

import com.beatstore.compras.dto.CompraResponseDTO;
import com.beatstore.compras.dto.CrearCompraDTO;
import com.beatstore.compras.dto.ResumenCompraDTO;
import com.beatstore.compras.model.Compra;
import com.beatstore.compras.repository.CompraRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class CompraService {

    private final CompraRepository compraRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${ms.usuarios.url}")
    private String usuariosURL;

    @Value("${ms.productos.url}")
    private String productosURL;

    public CompraService(CompraRepository compraRepository) {
        this.compraRepository = compraRepository;
    }

    public ResumenCompraDTO crearCompra(CrearCompraDTO dto) {

        //VALIDAR USUARIO EXISTENTE
        String urlUsuario = usuariosURL + "/api/usuarios/" + dto.getUsuarioId();

        try {
            var usuario = restTemplate.getForObject(urlUsuario, java.util.Map.class);

            if (usuario == null || !usuario.containsKey("id")) {
                throw new RuntimeException("Usuario no encontrado");
            }

        } catch (Exception e) {
            throw new RuntimeException("Error: el usuario " + dto.getUsuarioId() + " no existe", e);
        }

        //CONSULTAR PRODUCTO
        String urlProducto = productosURL + "/api/productos/" + dto.getProductoId();
        var producto = restTemplate.getForObject(urlProducto, java.util.Map.class);

        if (producto == null || !producto.containsKey("precio")) {
            throw new RuntimeException("Producto no encontrado");
        }

        Double precio = Double.valueOf(producto.get("precio").toString());
        String nombreProducto = producto.get("nombre").toString();

        //GUARDAR COMPRA
        Compra compra = new Compra();
        compra.setUsuarioId(dto.getUsuarioId());
        compra.setProductoId(dto.getProductoId());
        compra.setCantidad(dto.getCantidad());
        compraRepository.save(compra);

        //DESCONTAR STOCK
        String urlStock = productosURL +
                "/api/productos/descontar/" + dto.getProductoId() +
                "?cantidad=" + dto.getCantidad();

        restTemplate.put(urlStock, null);

        //DEVOLVER RESUMEN
        return new ResumenCompraDTO(
                compra.getId(),
                dto.getUsuarioId(),
                dto.getProductoId(),
                dto.getCantidad(),
                nombreProducto,
                precio * dto.getCantidad()
        );
    }

    public List<CompraResponseDTO> comprasPorUsuario(Long id) {
        return compraRepository.findByUsuarioId(id)
                .stream()
                .map(c -> new CompraResponseDTO(
                        c.getId(),
                        c.getUsuarioId(),
                        c.getProductoId(),
                        c.getCantidad(),
                        c.getFechaCompra()
                ))
                .toList();
    }

    public List<CompraResponseDTO> comprasPorProducto(Long id) {
        return compraRepository.findByProductoId(id)
                .stream()
                .map(c -> new CompraResponseDTO(
                        c.getId(),
                        c.getUsuarioId(),
                        c.getProductoId(),
                        c.getCantidad(),
                        c.getFechaCompra()
                ))
                .toList();
    }
}

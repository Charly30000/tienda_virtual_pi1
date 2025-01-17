package com.tienda.virtual.backtiendavirtual.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.tienda.virtual.backtiendavirtual.entities.Product;
import com.tienda.virtual.backtiendavirtual.entities.User;

public interface ProductService {
    List<Product> findAll();

    Product save(Product product);

    Product update(Long id, Product product);

    Optional<Product> findById(Long id);

    Optional<Product> findByName(String name);

    void deleteById(Long id);

    // Metodo para obtener los Productos de un Usuario paginados
    Page<Product> findByUserPageable(User user, Pageable pageable);
}

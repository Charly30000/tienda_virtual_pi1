package com.tienda.virtual.backtiendavirtual.services;

import java.util.List;
import java.util.Optional;

import com.tienda.virtual.backtiendavirtual.entities.Product;

public interface ProductService {
    List<Product> findAll();
    Product save(Product product);
    Optional<Product> findById(Long id);
    Optional<Product> findByName(String name);
    void deleteById(Long id);
}
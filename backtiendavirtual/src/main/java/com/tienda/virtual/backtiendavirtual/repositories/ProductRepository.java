package com.tienda.virtual.backtiendavirtual.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tienda.virtual.backtiendavirtual.entities.Product;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {
    Optional<Product> findByName(String name);
}

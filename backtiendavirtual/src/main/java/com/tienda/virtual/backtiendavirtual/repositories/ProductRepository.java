package com.tienda.virtual.backtiendavirtual.repositories;

import org.springframework.data.repository.CrudRepository;

import com.tienda.virtual.backtiendavirtual.entities.Product;

public interface ProductRepository extends CrudRepository<Product, Long> {

}

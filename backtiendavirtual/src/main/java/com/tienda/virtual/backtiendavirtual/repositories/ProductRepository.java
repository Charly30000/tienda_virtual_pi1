package com.tienda.virtual.backtiendavirtual.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tienda.virtual.backtiendavirtual.entities.Product;
import com.tienda.virtual.backtiendavirtual.entities.User;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {
    Optional<Product> findByName(String name);

    // Consulta básica para paginar los productos por usuario
    @Query("SELECT p FROM Product p WHERE p.user = :user")
    Page<Product> findByUser(@Param("user") User user, Pageable pageable);

    // Consulta para inicializar las categorías de un conjunto de productos
    @Query("SELECT DISTINCT p FROM Product p LEFT JOIN FETCH p.categories WHERE p IN :products")
    List<Product> fetchCategories(@Param("products") List<Product> products);

    // Consulta para inicializar las etiquetas de un conjunto de productos
    @Query("SELECT DISTINCT p FROM Product p LEFT JOIN FETCH p.labels WHERE p IN :products")
    List<Product> fetchLabels(@Param("products") List<Product> products);
}

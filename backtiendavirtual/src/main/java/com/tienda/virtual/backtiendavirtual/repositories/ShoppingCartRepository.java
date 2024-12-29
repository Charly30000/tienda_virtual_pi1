package com.tienda.virtual.backtiendavirtual.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.tienda.virtual.backtiendavirtual.entities.ShoppingCart;
import com.tienda.virtual.backtiendavirtual.entities.User;

public interface ShoppingCartRepository extends CrudRepository<ShoppingCart, Long> {
    
    // Método para buscar el carrito activo de un usuario
    Optional<ShoppingCart> findByIsActiveTrueAndUser(User user);
    // Metodo para buscar el historico de todos los carritos del usuario
    List<ShoppingCart> findByUserOrderByDateDesc(User user);
}

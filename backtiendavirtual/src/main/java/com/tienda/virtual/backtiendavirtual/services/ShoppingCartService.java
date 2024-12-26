package com.tienda.virtual.backtiendavirtual.services;

import java.util.Optional;

import com.tienda.virtual.backtiendavirtual.entities.Product;
import com.tienda.virtual.backtiendavirtual.entities.ShoppingCart;
import com.tienda.virtual.backtiendavirtual.entities.User;

public interface ShoppingCartService {
    // Metodo para encontrar un carrito activo por usuario
    Optional<ShoppingCart> findActiveCartByUser(User user);
    // Metodo para crear un carrito nuevo 
    Optional<ShoppingCart> createShoppingCart(User user);
    // Metodo para crear un carrito nuevo y desactivar el anterior
    Optional<ShoppingCart> createCartAndDeactivatePreviousCart(User user);
    // Metodo para añadir un nuevo producto a la ShoppingCart
    Optional<ShoppingCart> addProductToShoppingCart(User user, Product product);
    // Metodo para añadir y/o actualizar un [nuevo] producto de la ShoppingCart
    Optional<ShoppingCart> updateProductToShoppingCart(User user, Product product, Integer quantity);
}

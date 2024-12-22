package com.tienda.virtual.backtiendavirtual.services;

import java.util.Optional;

import com.tienda.virtual.backtiendavirtual.entities.Product;
import com.tienda.virtual.backtiendavirtual.entities.ShoppingCart;
import com.tienda.virtual.backtiendavirtual.entities.User;

public interface ShoppingCartService {
    // Método para encontrar un carrito activo por usuario
    Optional<ShoppingCart> findActiveCartByUser(User user);
    ShoppingCart createShoppingCart(User user);
    ShoppingCart createCartAndDeactivatePreviousCart(User user);
    ShoppingCart addNewProductToShoppingCart(User user, Product product);
}

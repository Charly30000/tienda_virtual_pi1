package com.tienda.virtual.backtiendavirtual.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tienda.virtual.backtiendavirtual.entities.Product;
import com.tienda.virtual.backtiendavirtual.entities.ShoppingCart;
import com.tienda.virtual.backtiendavirtual.entities.ShoppingCartProduct;
import com.tienda.virtual.backtiendavirtual.entities.User;
import com.tienda.virtual.backtiendavirtual.repositories.ShoppingCartRepository;

@Service
public class ShoppingCartServiceImpl implements ShoppingCartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    /**
     * Metodo para buscar la ShoppingCart del usuario
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ShoppingCart> findActiveCartByUser(User user) {
        Optional<ShoppingCart> shoppingCart = shoppingCartRepository.findByIsActiveTrueAndUser(user);

        if (shoppingCart.isEmpty()) {
            ShoppingCart bbddNewShoppingCart = createShoppingCart(user);
            return Optional.of(bbddNewShoppingCart);
        }

        return shoppingCart;
    }

    /**
     * Metodo para crear una nueva ShoppingCart en la BBDD, NO DESACTIVA LA ANTERIOR
     */
    @Override
    @Transactional
    public ShoppingCart createShoppingCart(User user) {
        return shoppingCartRepository.save(new ShoppingCart(user, true));
    }

    /**
     * Metodo para crear una nueva ShoppingCart y hacer que la anterior quede desactivada
     */
    @Override
    @Transactional
    public ShoppingCart createCartAndDeactivatePreviousCart(User user) {
        Optional<ShoppingCart> lastShoppingCartOptional = shoppingCartRepository.findByIsActiveTrueAndUser(user);

        if (lastShoppingCartOptional.isPresent()) {
            ShoppingCart lastShoppingCart = lastShoppingCartOptional.orElseThrow();
            lastShoppingCart.setActive(false);
            lastShoppingCart.setDate(new Date());
            shoppingCartRepository.save(lastShoppingCart);
        }

        return createShoppingCart(user);
    }

    /**
     * Metodo para añadir un nuevo producto a la ShoppingCart del usuario
     */
    @Override
    @Transactional
    public ShoppingCart addNewProductToShoppingCart(User user, Product product) {
        Optional<ShoppingCart> shoppingCartOptional = findActiveCartByUser(user);

        ShoppingCart shoppingCart = shoppingCartOptional.orElseThrow();
        List<ShoppingCartProduct> productsShoppingCart = shoppingCart.getShoppingCartProducts();

        // Identifico si el producto ya existe, si es asi, no lo vuelvo a añadir
        for (ShoppingCartProduct products : productsShoppingCart) {
            if (products.getProduct().equals(product)) {
                return shoppingCart;
            }
        }

        productsShoppingCart.add(new ShoppingCartProduct(shoppingCart, product, 1));
        // productsShoppingCart apunta al mismo lugar en memoria que shoppingCart.getShoppingCartProducts(),
        // por ello no hacemos el shoppingCart.setShoppingCartProducts(productsShoppingCart);
        
        return shoppingCartRepository.save(shoppingCart);
        
    }

}

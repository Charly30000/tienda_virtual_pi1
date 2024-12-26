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
            ShoppingCart bbddNewShoppingCart = createShoppingCart(user).orElseThrow();
            return Optional.of(bbddNewShoppingCart);
        }

        return shoppingCart;
    }

    /**
     * Metodo para crear una nueva ShoppingCart en la BBDD, NO DESACTIVA LA ANTERIOR
     */
    @Override
    @Transactional
    public Optional<ShoppingCart> createShoppingCart(User user) {
        return Optional.of(shoppingCartRepository.save(new ShoppingCart(user, true)));
    }

    /**
     * Metodo para crear una nueva ShoppingCart y hacer que la anterior quede desactivada
     * este método realiza varias operaciones en la bbdd, la etiqueta @Transactional asegura la transaccion
     */
    @Override
    @Transactional
    public Optional<ShoppingCart> createCartAndDeactivatePreviousCart(User user) {
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
    public Optional<ShoppingCart> addProductToShoppingCart(User user, Product product) {
        Integer QUANTITY_TO_ADD = 1;
        Optional<ShoppingCart> shoppingCartOptional = findActiveCartByUser(user);

        ShoppingCart shoppingCart = shoppingCartOptional.orElseThrow();
        List<ShoppingCartProduct> productsShoppingCart = shoppingCart.getShoppingCartProducts();

        // Identifico si el producto ya existe, si es asi, no lo vuelvo a añadir
        for (ShoppingCartProduct products : productsShoppingCart) {
            if (products.getProduct().equals(product)) {
                return shoppingCartOptional;
            }
        }
        // En caso de no encontrar el producto, lo añade
        productsShoppingCart.add(new ShoppingCartProduct(shoppingCart, product, QUANTITY_TO_ADD));
        // productsShoppingCart apunta al mismo lugar en memoria que shoppingCart.getShoppingCartProducts(),
        // por ello no hacemos el shoppingCart.setShoppingCartProducts(productsShoppingCart);
        
        return Optional.of(shoppingCartRepository.save(shoppingCart));
        
    }

    @Override
    public Optional<ShoppingCart> updateProductToShoppingCart(User user, Product product, Integer quantity) {
        Optional<ShoppingCart> shoppingCartOptional = findActiveCartByUser(user);

        ShoppingCart shoppingCart = shoppingCartOptional.orElseThrow();
        List<ShoppingCartProduct> productsShoppingCart = shoppingCart.getShoppingCartProducts();

        // Identifico si el producto ya existe, si es asi, 
        // no lo vuelvo a añadir y solo cambio la cantidad que el usuario quiere
        for (ShoppingCartProduct products : productsShoppingCart) {
            if (products.getProduct().equals(product)) {
                products.setQuantity(quantity);
                return Optional.of(shoppingCartRepository.save(shoppingCart));
            }
        }
        // En caso de no encontrar el producto, lo añade con la cantidad deseada
        productsShoppingCart.add(new ShoppingCartProduct(shoppingCart, product, quantity));
        // productsShoppingCart apunta al mismo lugar en memoria que shoppingCart.getShoppingCartProducts(),
        // por ello no hacemos el shoppingCart.setShoppingCartProducts(productsShoppingCart);
        
        return Optional.of(shoppingCartRepository.save(shoppingCart));
    }

}

package com.tienda.virtual.backtiendavirtual.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tienda.virtual.backtiendavirtual.entities.Product;
import com.tienda.virtual.backtiendavirtual.entities.ShoppingCart;
import com.tienda.virtual.backtiendavirtual.entities.ShoppingCartProduct;
import com.tienda.virtual.backtiendavirtual.entities.User;
import com.tienda.virtual.backtiendavirtual.repositories.ProductRepository;
import com.tienda.virtual.backtiendavirtual.repositories.ShoppingCartRepository;

@Service
public class ShoppingCartServiceImpl implements ShoppingCartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private ProductRepository productRepository;

    /**
     * Metodo para buscar la ShoppingCart del usuario, en caso de no tenerla, la crea
     */
    @Override
    @Transactional
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
     * Actualiza la cantidad de productos disponibles en base a la compra
     * este método realiza varias operaciones en la bbdd, la etiqueta @Transactional asegura la transaccion
     */
    @Override
    @Transactional
    public Optional<ShoppingCart> createCartAndDeactivatePreviousCart(User user) {
        Optional<ShoppingCart> lastShoppingCartOptional = shoppingCartRepository.findByIsActiveTrueAndUser(user);

        // Actualiza el carrito de la compra del usuario
        ShoppingCart lastShoppingCart = lastShoppingCartOptional.orElseThrow();
        lastShoppingCart.setActive(false);
        lastShoppingCart.setDate(new Date());
        shoppingCartRepository.save(lastShoppingCart);

        List<ShoppingCartProduct> shoppingCartProducts = lastShoppingCart.getShoppingCartProducts();
        if (shoppingCartProducts.isEmpty()) {
            throw new IllegalArgumentException("No hay elementos en la cesta, no se procederá con la compra");
        }

        // Actualiza el valor de los productos
        List<Product> products = new ArrayList<>();
        for (ShoppingCartProduct shoppingCartProduct : shoppingCartProducts) {
            Product product = shoppingCartProduct.getProduct();
            Integer totalAvailable = product.getQuantity() - product.getSold();
            if (totalAvailable - shoppingCartProduct.getQuantity() < 0) {
                throw new IllegalArgumentException("La cantidad solicitada del producto sobrepasa a la cantidad disponible");
            }
            if (product.isBlocked()) {
                throw new IllegalArgumentException("El producto seleccionado se encuentra bloqueado");
            }
            product.setSold(product.getSold() + shoppingCartProduct.getQuantity());
            products.add(product);
        }
        productRepository.saveAll(products);
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

    /**
     * Metodo para actualizar la cantidad de un producto que quiere un usuario
     * En caso de no existir la ShoppingCart, la crea
     * En caso de no tener el producto anteriormente, lo añade con la cantidad deseada
     */
    @Override
    @Transactional
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

    /**
     * Eliminacion de un producto de la ShoppingCart del usuario
     * En caso de que no tenga el producto, devolvemos la ShoppingCart sin cambios
     */
    @Override
    @Transactional
    public Optional<ShoppingCart> deleteProductToShoppingCart(User user, Product product) {
        Optional<ShoppingCart> shoppingCartOptional = findActiveCartByUser(user);
        ShoppingCart shoppingCart = shoppingCartOptional.orElseThrow();
        List<ShoppingCartProduct> productsShoppingCart = shoppingCart.getShoppingCartProducts();
        Iterator<ShoppingCartProduct> iterator = productsShoppingCart.iterator();

        // Realizamos el proceso de eliminacion del producto unicamente si encontramos el producto
        while (iterator.hasNext()) {
            ShoppingCartProduct shoppingCartProduct = iterator.next();
            if (shoppingCartProduct.getProduct().equals(product)) {
                iterator.remove();
                return Optional.of(shoppingCartRepository.save(shoppingCart));
            }
        }

        return shoppingCartOptional;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ShoppingCart> findShoppingCartsByUserOrderByDateDesc(User user) {
        return shoppingCartRepository.findByUserOrderByDateDesc(user);
    }

}

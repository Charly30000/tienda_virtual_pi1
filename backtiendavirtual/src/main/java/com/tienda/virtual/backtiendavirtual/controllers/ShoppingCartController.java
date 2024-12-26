package com.tienda.virtual.backtiendavirtual.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tienda.virtual.backtiendavirtual.constants.ConstantsRoles;
import com.tienda.virtual.backtiendavirtual.entities.Product;
import com.tienda.virtual.backtiendavirtual.entities.ShoppingCart;
import com.tienda.virtual.backtiendavirtual.entities.ShoppingCartProduct;
import com.tienda.virtual.backtiendavirtual.entities.User;
import com.tienda.virtual.backtiendavirtual.exceptions.UserBlockedException;
import com.tienda.virtual.backtiendavirtual.exceptions.UserNotFoundException;
import com.tienda.virtual.backtiendavirtual.models.ShoppingCartResponse;
import com.tienda.virtual.backtiendavirtual.services.ProductService;
import com.tienda.virtual.backtiendavirtual.services.ShoppingCartService;
import com.tienda.virtual.backtiendavirtual.utils.ResponseMessagesUtils;
import com.tienda.virtual.backtiendavirtual.utils.UserUtils;

@RestController
@RequestMapping("/api/shoppingCart")
public class ShoppingCartController {

    @Autowired
    UserUtils userUtils;

    @Autowired
    ShoppingCartService shoppingCartService;

    @Autowired
    ProductService productService;

    @GetMapping
    @Secured(ConstantsRoles.ROLE_USER)
    public ResponseEntity<?> getShoppingCart() {
        try {
            User user = userUtils.getUserAuthenticated();
            Optional<ShoppingCart> shoppingCart = shoppingCartService.findActiveCartByUser(user);
            if (shoppingCart.isEmpty()) {
                return ResponseMessagesUtils.notFound("ShoppingCart no encontrada");
            }

            List<ShoppingCartProduct> shoppingCartProducts = shoppingCart.get().getShoppingCartProducts();
            List<ShoppingCartResponse.Product> products = new ArrayList<>();
            ShoppingCartResponse response = new ShoppingCartResponse(shoppingCart.get().getFormatDate(), products);
            for (ShoppingCartProduct shoppingCartProduct : shoppingCartProducts) {
                ShoppingCartResponse.Product product = new ShoppingCartResponse.Product(
                        shoppingCartProduct.getProduct().getId(),
                        shoppingCartProduct.getProduct().getName(),
                        shoppingCartProduct.getProduct().getImage(),
                        shoppingCartProduct.getProduct().getPrice(),
                        shoppingCartProduct.getQuantity(),
                        shoppingCartProduct.getProduct().getSold(),
                        shoppingCartProduct.getProduct().getQuantity() - shoppingCartProduct.getProduct().getSold());
                products.add(product);
            }

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (UserBlockedException e) {
            e.printStackTrace();
            return ResponseMessagesUtils.userBlocked();
        } catch (UserNotFoundException e) {
            e.printStackTrace();
            return ResponseMessagesUtils.userNotFound();
        } catch (NoSuchElementException e) {
            e.printStackTrace();
            return ResponseMessagesUtils.serverError();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseMessagesUtils.serverError();
        }
    }

    @GetMapping("/buy")
    @Secured(ConstantsRoles.ROLE_USER)
    public ResponseEntity<?> buyShoppingCart() {
        try {
            User user = userUtils.getUserAuthenticated();
            return null;
        } catch (UserBlockedException e) {
            e.printStackTrace();
            return ResponseMessagesUtils.userBlocked();
        } catch (UserNotFoundException e) {
            e.printStackTrace();
            return ResponseMessagesUtils.userNotFound();
        } catch (NoSuchElementException e) {
            e.printStackTrace();
            return ResponseMessagesUtils.serverError();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseMessagesUtils.serverError();
        }
    }

    @GetMapping("/addProduct/{id}")
    @Secured(ConstantsRoles.ROLE_USER)
    public ResponseEntity<?> addProduct(@PathVariable Long id) {
        try {
            User user = userUtils.getUserAuthenticated();
            Optional<Product> product = productService.findById(id);

            if (product.isEmpty()) {
                return ResponseMessagesUtils.notFound("Producto no encontrado");
            }

            if (product.get().isBlocked()) {
                return ResponseMessagesUtils.locked("El producto no puede ser seleccionado");
            }
            final Integer QUANTITY_TO_ADD = 1;
            Integer totalAvailable = product.get().getQuantity() - product.get().getSold();
            if (totalAvailable - QUANTITY_TO_ADD < 0) {
                return ResponseMessagesUtils.notAcceptable("No hay disponibilidad suficiente de este producto");
            }

            Optional<ShoppingCart> shoppingCart = shoppingCartService.findActiveCartByUser(user);
            if (shoppingCart.isEmpty()) {
                throw new NoSuchElementException("No se ha generado la ShoppingCart");
            }

            shoppingCartService.addProductToShoppingCart(user, product.get())
                    .orElseThrow();

            return ResponseMessagesUtils.ok("El producto se ha añadido correctamente");
        } catch (UserBlockedException e) {
            e.printStackTrace();
            return ResponseMessagesUtils.userBlocked();
        } catch (UserNotFoundException e) {
            e.printStackTrace();
            return ResponseMessagesUtils.userNotFound();
        } catch (NoSuchElementException e) {
            e.printStackTrace();
            return ResponseMessagesUtils.serverError();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseMessagesUtils.serverError();
        }
    }

    @DeleteMapping("/removeProduct/{id}")
    @Secured(ConstantsRoles.ROLE_USER)
    public ResponseEntity<?> removeProduct(@PathVariable Long id) {
        try {
            User user = userUtils.getUserAuthenticated();

            Optional<Product> productOptional = productService.findById(id);
            if (productOptional.isEmpty()) {
                return ResponseMessagesUtils.notFound("Producto no encontrado");
            }

            shoppingCartService.deleteProductToShoppingCart(user, productOptional.get()).orElseThrow();

            return ResponseMessagesUtils.ok("El producto se ha eliminado de la cesta correctamente");
        } catch (UserBlockedException e) {
            e.printStackTrace();
            return ResponseMessagesUtils.userBlocked();
        } catch (UserNotFoundException e) {
            e.printStackTrace();
            return ResponseMessagesUtils.userNotFound();
        } catch (NoSuchElementException e) {
            e.printStackTrace();
            return ResponseMessagesUtils.serverError();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseMessagesUtils.serverError();
        }
    }

    @PutMapping("/updateProduct/{id}")
    @Secured(ConstantsRoles.ROLE_USER)
    public ResponseEntity<?> updateQuantityProduct(@PathVariable Long id, @RequestParam Integer quantity) {
        try {
            User user = userUtils.getUserAuthenticated();

            Optional<Product> productOptional = productService.findById(id);
            if (productOptional.isEmpty()) {
                return ResponseMessagesUtils.notFound("Producto no encontrado");
            }
            Product product = productOptional.get();
            if (product.isBlocked()) {
                return ResponseMessagesUtils.locked("El producto no puede ser seleccionado");
            }
            Integer totalAvailable = product.getQuantity() - product.getSold();
            if (totalAvailable - quantity < 0) {
                return ResponseMessagesUtils.notAcceptable("No hay disponibilidad suficiente de este producto");
            }

            Optional<ShoppingCart> shoppingCartOptional = shoppingCartService.findActiveCartByUser(user);
            if (shoppingCartOptional.isEmpty()) {
                return ResponseMessagesUtils.notFound("ShoppingCart no encontrada");
            }

            shoppingCartService.updateProductToShoppingCart(user, product, quantity).orElseThrow();

            return ResponseMessagesUtils.ok("El producto se ha actualizado correctamente");
        } catch (UserBlockedException e) {
            e.printStackTrace();
            return ResponseMessagesUtils.userBlocked();
        } catch (UserNotFoundException e) {
            e.printStackTrace();
            return ResponseMessagesUtils.userNotFound();
        } catch (NoSuchElementException e) {
            e.printStackTrace();
            return ResponseMessagesUtils.serverError();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseMessagesUtils.serverError();
        }
    }

}

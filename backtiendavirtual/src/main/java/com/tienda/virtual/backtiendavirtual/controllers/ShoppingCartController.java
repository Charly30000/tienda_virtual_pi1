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
import com.tienda.virtual.backtiendavirtual.models.ShoppingCartInvalidBuyResponse;
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
            Optional<ShoppingCart> shoppingCartOptional = shoppingCartService.findActiveCartByUser(user);
            if (shoppingCartOptional.isEmpty()) {
                return ResponseMessagesUtils.notFound("ShoppingCart no encontrada");
            }
            ShoppingCart shoppingCart = shoppingCartOptional.orElseThrow();
            List<ShoppingCartProduct> shoppingCartProducts = shoppingCart.getShoppingCartProducts();
            List<ShoppingCartResponse.Product> products = new ArrayList<>();
            ShoppingCartResponse response = new ShoppingCartResponse(shoppingCart.getFormatDate(), products);
            for (ShoppingCartProduct shoppingCartProduct : shoppingCartProducts) {
                Product productSC = shoppingCartProduct.getProduct();
                ShoppingCartResponse.Product product = new ShoppingCartResponse.Product(
                        productSC.getId(),
                        productSC.getName(),
                        productSC.getImage(),
                        productSC.getPrice(),
                        shoppingCartProduct.getQuantity(),
                        productSC.getSold(),
                        productSC.getQuantity() - productSC.getSold(),
                        productSC.isBlocked());
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

            Optional<ShoppingCart> actualShoppingCartOptional = shoppingCartService.findActiveCartByUser(user);

            if (actualShoppingCartOptional.isEmpty()) {
                return ResponseMessagesUtils.serverError("No se ha encontrado ninguna cesta de la compra");
            }

            ShoppingCart shoppingCart = actualShoppingCartOptional.get();

            List<ShoppingCartProduct> shoppingCartProducts = shoppingCart.getShoppingCartProducts();
            if (shoppingCartProducts.isEmpty()) {
                return ResponseMessagesUtils.notAcceptable("No hay ningun producto seleccionado");
            }

            // Almacenamos en una lista los productos que no puedan ser comprados
            List<ShoppingCartInvalidBuyResponse.InvalidProducts> lockedProducts = new ArrayList<>();
            for (ShoppingCartProduct shoppingCartProduct : shoppingCartProducts) {
                Integer totalAvailable = shoppingCartProduct.getProduct().getQuantity()
                        - shoppingCartProduct.getProduct().getSold();
                if (totalAvailable - shoppingCartProduct.getQuantity() < 0
                        || shoppingCartProduct.getProduct().isBlocked()) {
                    ShoppingCartInvalidBuyResponse.InvalidProducts productLocked = new ShoppingCartInvalidBuyResponse.InvalidProducts(
                            shoppingCartProduct.getProduct().getId(),
                            shoppingCartProduct.getProduct().getName(),
                            shoppingCartProduct.getProduct().getUser().getUsername(),
                            shoppingCartProduct.getProduct().isBlocked(),
                            totalAvailable,
                            shoppingCartProduct.getQuantity());
                    lockedProducts.add(productLocked);
                }
            }
            // Comprobamos si hay productos que no se puedan comprar
            if (!lockedProducts.isEmpty()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new ShoppingCartInvalidBuyResponse(
                                "Algunos productos que intentas seleccionar están fuera de stock o no hay suficientes",
                                HttpStatus.CONFLICT,
                                true, lockedProducts));
            }

            Optional<ShoppingCart> shoppingCartOptional = shoppingCartService.createCartAndDeactivatePreviousCart(user);
            if (shoppingCartOptional.isEmpty()) {
                return ResponseMessagesUtils.serverError(
                        "No ha podido realizarse el proceso de compra, vuelve a intentarlo más tarde por favor");
            }

            return ResponseMessagesUtils.ok("Compra realizada correctamente");
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
    public ResponseEntity<?> updateQuantityProduct(@PathVariable Long id,
            @RequestParam(required = false) Integer quantity) {
        if (quantity == null || quantity < 1) {
            return ResponseMessagesUtils
                    .badRequest("El campo 'quantity' es obligatorio y ser mayor o igual a 1");
        }
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

    @GetMapping("/historic")
    @Secured(ConstantsRoles.ROLE_USER)
    public ResponseEntity<?> getHistoricalShoppingCart() {
        try {
            User user = userUtils.getUserAuthenticated();
            Optional<ShoppingCart> shoppingCartOptional = shoppingCartService.findActiveCartByUser(user);
            if (shoppingCartOptional.isEmpty()) {
                return ResponseMessagesUtils.notFound("ShoppingCart no encontrada");
            }
            ShoppingCart shoppingCart = shoppingCartOptional.orElseThrow();
            List<ShoppingCartProduct> shoppingCartProducts = shoppingCart.getShoppingCartProducts();
            List<ShoppingCartResponse.Product> products = new ArrayList<>();
            ShoppingCartResponse response = new ShoppingCartResponse(shoppingCart.getFormatDate(), products);
            for (ShoppingCartProduct shoppingCartProduct : shoppingCartProducts) {
                Product productSC = shoppingCartProduct.getProduct();
                ShoppingCartResponse.Product product = new ShoppingCartResponse.Product(
                        productSC.getId(),
                        productSC.getName(),
                        productSC.getImage(),
                        productSC.getPrice(),
                        shoppingCartProduct.getQuantity(),
                        productSC.getSold(),
                        productSC.getQuantity() - productSC.getSold(),
                        productSC.isBlocked());
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
}

package com.tienda.virtual.backtiendavirtual.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import org.springframework.web.bind.annotation.RestController;

import com.tienda.virtual.backtiendavirtual.constants.ConstantsRoles;
import com.tienda.virtual.backtiendavirtual.entities.Product;
import com.tienda.virtual.backtiendavirtual.entities.ShoppingCart;
import com.tienda.virtual.backtiendavirtual.entities.ShoppingCartProduct;
import com.tienda.virtual.backtiendavirtual.entities.User;
import com.tienda.virtual.backtiendavirtual.exceptions.UserBlockedException;
import com.tienda.virtual.backtiendavirtual.exceptions.UserNotFoundException;
import com.tienda.virtual.backtiendavirtual.services.ProductService;
import com.tienda.virtual.backtiendavirtual.services.ShoppingCartService;
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
                Map<String, Object> response = new HashMap<>();
                response.put("message", "ShoppingCart no encontrada");
                response.put("error", true);
                response.put("status", HttpStatus.NOT_FOUND.value());
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("date", shoppingCart.get().getFormatDate());
            List<ShoppingCartProduct> shoppingCartProducts = shoppingCart.get().getShoppingCartProducts();

            List<Object> products = new ArrayList<>();
            for (ShoppingCartProduct shoppingCartProduct : shoppingCartProducts) {
                Map<String, Object> productResult = new HashMap<>();
                productResult.put("id", shoppingCartProduct.getProduct().getId());
                productResult.put("name", shoppingCartProduct.getProduct().getName());
                productResult.put("image", shoppingCartProduct.getProduct().getImage());
                productResult.put("price", shoppingCartProduct.getProduct().getPrice());
                productResult.put("total_available", shoppingCartProduct.getProduct().getQuantity());
                productResult.put("quantity", shoppingCartProduct.getQuantity());
                productResult.put("sold", shoppingCartProduct.getProduct().getSold());
                products.add(productResult);
            }
            
            response.put("products", products);
            
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (UserBlockedException e) {
            e.printStackTrace();
            return userUtils.getUserBlockedMessage();
        } catch (UserNotFoundException e) {
            e.printStackTrace();
            return userUtils.getUserNotFoundMessage();
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
            return userUtils.getUserBlockedMessage();
        } catch (UserNotFoundException e) {
            e.printStackTrace();
            return userUtils.getUserNotFoundMessage();
        }
    }

    @GetMapping("/addProduct/{id}")
    @Secured(ConstantsRoles.ROLE_USER)
    public ResponseEntity<?> addProduct(@PathVariable Long id) {
        try {
            User user = userUtils.getUserAuthenticated();
            Optional<Product> product = productService.findById(id);

            if (product.isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Producto no encontrado");
                response.put("error", true);
                response.put("status", HttpStatus.NOT_FOUND.value());
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
            if (product.get().getSold() >= product.get().getQuantity()) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "No hay disponibilidad suficiente de este producto");
                response.put("error", true);
                response.put("status", HttpStatus.NOT_ACCEPTABLE.value());
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(response);
            }

            Optional<ShoppingCart> shoppingCart = shoppingCartService.findActiveCartByUser(user);
            if (shoppingCart.isEmpty()) {
                ShoppingCart bbddNewShoppingCart = shoppingCartService.createShoppingCart(user);

                Map<String, Object> response = new HashMap<>();
                response.put("date", bbddNewShoppingCart.getFormatDate());
                response.put("products", bbddNewShoppingCart.getShoppingCartProducts());

            }

            shoppingCartService.addNewProductToShoppingCart(user, product.get());

            return ResponseEntity.ok().build();
        } catch (UserBlockedException e) {
            e.printStackTrace();
            return userUtils.getUserBlockedMessage();
        } catch (UserNotFoundException e) {
            e.printStackTrace();
            return userUtils.getUserNotFoundMessage();
        }
    }

    @DeleteMapping("/removeProduct/{id}")
    @Secured(ConstantsRoles.ROLE_USER)
    public ResponseEntity<?> removeProduct() {
        try {
            User user = userUtils.getUserAuthenticated();
            return null;
        } catch (UserBlockedException e) {
            e.printStackTrace();
            return userUtils.getUserBlockedMessage();
        } catch (UserNotFoundException e) {
            e.printStackTrace();
            return userUtils.getUserNotFoundMessage();
        }
    }

    @PutMapping("/updateProduct/{id}")
    @Secured(ConstantsRoles.ROLE_USER)
    public ResponseEntity<?> updateQuantityProduct() {
        try {
            User user = userUtils.getUserAuthenticated();
            return null;
        } catch (UserBlockedException e) {
            e.printStackTrace();
            return userUtils.getUserBlockedMessage();
        } catch (UserNotFoundException e) {
            e.printStackTrace();
            return userUtils.getUserNotFoundMessage();
        }
    }

}

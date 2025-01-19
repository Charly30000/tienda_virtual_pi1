package com.tienda.virtual.backtiendavirtual.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tienda.virtual.backtiendavirtual.constants.ConstantsRoles;
import com.tienda.virtual.backtiendavirtual.entities.Product;
import com.tienda.virtual.backtiendavirtual.services.ProductService;
import com.tienda.virtual.backtiendavirtual.services.UserService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    /**
     * Endpoint para obtener la lista de todos los productos.
     *
     * @return Lista de productos
     */
    @GetMapping
    @Secured(ConstantsRoles.ROLE_BUSSINESS)
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.findAll();
        return ResponseEntity.ok(products);
    }

    /**
     * Endpoint para obtener un producto por su ID.
     *
     * @param id Identificador del producto
     * @return Producto encontrado o error 404
     */
    @GetMapping("/{id}")
    @Secured(ConstantsRoles.ROLE_USER)
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.findById(id);
        if (product.isEmpty()) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "El producto con ID " + id + " no existe.");
            response.put("error", true);
            response.put("status", 404);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("id", product.get().getId());
        response.put("name", product.get().getName());
        response.put("description", product.get().getDescription());
        response.put("username", product.get().getUser().getUsername());

        return ResponseEntity.ok(response);
    }

    /**
     * Método auxiliar para manejar errores de validación.
     *
     * @param result Resultado de validación
     * @return Respuesta con errores
     */
    private ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(err -> {
            errors.put(err.getField(), "El campo " + err.getField() + " " + err.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);
    }
}

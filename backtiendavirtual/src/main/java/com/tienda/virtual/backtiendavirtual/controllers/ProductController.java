package com.tienda.virtual.backtiendavirtual.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tienda.virtual.backtiendavirtual.entities.Product;
import com.tienda.virtual.backtiendavirtual.models.ValidationErrorsResponse;
import com.tienda.virtual.backtiendavirtual.services.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    /**
     * Endpoint para obtener la lista de todos los productos.
     * @return Lista de productos
     */
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.findAll();
        return ResponseEntity.ok(products);
    }

    /**
     * Endpoint para obtener un producto por su ID.
     * @param id Identificador del producto
     * @return Producto encontrado o error 404
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.findById(id);
        if (product.isEmpty()) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "El producto con ID " + id + " no existe.");
            response.put("error", true);
            response.put("status", 404);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        return ResponseEntity.ok(product.get());
    }

    /**
     * Endpoint para crear un nuevo producto.
     * @param product Producto a crear
     * @param result  Resultado de validación
     * @return Producto creado o errores de validación
     */
    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@Valid @RequestBody Product product, BindingResult result) {
        if (result.hasFieldErrors()) {
            return validation(result);
        }

        Optional<Product> existingProduct = productService.findByName(product.getName());
        if (existingProduct.isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "El producto con este nombre ya existe.");
            response.put("error", true);
            response.put("status", 409);
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        Product newProduct = productService.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(newProduct);
    }

    /**
     * Método auxiliar para manejar errores de validación.
     * 
     * @param result Resultado de validación
     * @return Respuesta con errores
     */
    private ResponseEntity<ValidationErrorsResponse> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(err -> {
            errors.put(err.getField(), "El campo " + err.getField() + " " + err.getDefaultMessage());
        });

        return ResponseEntity.badRequest()
                .body(new ValidationErrorsResponse(
                        "Errores de validación en la solicitud",
                        HttpStatus.BAD_REQUEST,
                        true,
                        errors));
    }
}

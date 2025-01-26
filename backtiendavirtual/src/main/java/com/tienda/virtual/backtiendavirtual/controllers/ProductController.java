package com.tienda.virtual.backtiendavirtual.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.tienda.virtual.backtiendavirtual.constants.ConstantsRoles;
import com.tienda.virtual.backtiendavirtual.entities.Product;
import com.tienda.virtual.backtiendavirtual.models.ValidationErrorsResponse;
import com.tienda.virtual.backtiendavirtual.services.ProductService;
import com.tienda.virtual.backtiendavirtual.utils.ResponseMessagesUtils;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    /**
     * Obtener todos los productos con paginación.
     */
    @GetMapping("/paged")
    @Secured(ConstantsRoles.ROLE_USER)
    public ResponseEntity<?> getAllProductsPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection) {
        Sort sort = sortDirection.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Product> productsPage = productService.findAllPaged(pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("products", productsPage.getContent());
        response.put("currentPage", productsPage.getNumber());
        response.put("totalItems", productsPage.getTotalElements());
        response.put("totalPages", productsPage.getTotalPages());

        return ResponseEntity.ok(response);
    }

    /**
     * Obtener producto por ID.
     */
    @GetMapping("/{id}")
    @Secured(ConstantsRoles.ROLE_USER)
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.findById(id);
        if (product.isEmpty()) {
            return ResponseMessagesUtils.notFound("Producto no encontrado.");
        }
        return ResponseEntity.ok(product.get());
    }

    /**
     * Crear un nuevo producto.
     */
    @PostMapping
    @Secured(ConstantsRoles.ROLE_BUSSINESS)
    public ResponseEntity<?> createProduct(@Valid @RequestBody Product product, BindingResult result) {
        if (result.hasErrors()) {
            return validation(result);
        }
        Product savedProduct = productService.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }

    /**
     * Actualizar un producto existente.
     */
    @PutMapping("/{id}")
    @Secured(ConstantsRoles.ROLE_BUSSINESS)
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @Valid @RequestBody Product product, BindingResult result) {
        if (result.hasErrors()) {
            return validation(result);
        }
        Optional<Product> existingProduct = productService.findById(id);
        if (existingProduct.isEmpty()) {
            return ResponseMessagesUtils.notFound("Producto no encontrado.");
        }
        product.setId(id);
        Product updatedProduct = productService.save(product);
        return ResponseEntity.ok(updatedProduct);
    }

    /**
     * Eliminar un producto.
     */
    @DeleteMapping("/{id}")
    @Secured(ConstantsRoles.ROLE_BUSSINESS)
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        Optional<Product> existingProduct = productService.findById(id);
        if (existingProduct.isEmpty()) {
            return ResponseMessagesUtils.notFound("Producto no encontrado.");
        }
        productService.deleteById(id);
        return ResponseMessagesUtils.ok("Producto eliminado correctamente.");
    }

    /**
     * Buscar productos por nombre con paginación.
     */
    @GetMapping("/searchPaged")
    @Secured(ConstantsRoles.ROLE_USER)
    public ResponseEntity<?> searchProductsPaged(
            @RequestParam String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection) {
        Sort sort = sortDirection.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Product> productsPage = productService.searchByNamePaged(name, pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("products", productsPage.getContent());
        response.put("currentPage", productsPage.getNumber());
        response.put("totalItems", productsPage.getTotalElements());
        response.put("totalPages", productsPage.getTotalPages());

        return ResponseEntity.ok(response);
    }

    /**
     * Manejo de errores de validación.
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

package com.tienda.virtual.backtiendavirtual.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tienda.virtual.backtiendavirtual.constants.ConstantsRoles;
import com.tienda.virtual.backtiendavirtual.entities.Category;
import com.tienda.virtual.backtiendavirtual.entities.Label;
import com.tienda.virtual.backtiendavirtual.entities.Product;
import com.tienda.virtual.backtiendavirtual.entities.User;
import com.tienda.virtual.backtiendavirtual.exceptions.UserBlockedException;
import com.tienda.virtual.backtiendavirtual.exceptions.UserNotFoundException;
import com.tienda.virtual.backtiendavirtual.models.BussinessProductResponse;
import com.tienda.virtual.backtiendavirtual.models.ProductInvalidCategoryLabelResponse;
import com.tienda.virtual.backtiendavirtual.models.ProductRequest;
import com.tienda.virtual.backtiendavirtual.models.ValidationErrorsResponse;
import com.tienda.virtual.backtiendavirtual.services.CategoryService;
import com.tienda.virtual.backtiendavirtual.services.LabelService;
import com.tienda.virtual.backtiendavirtual.services.ProductService;
import com.tienda.virtual.backtiendavirtual.utils.ResponseMessagesUtils;
import com.tienda.virtual.backtiendavirtual.utils.UserUtils;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/bussinessTools")
public class BussinessToolsController {

    @Autowired
    UserUtils userUtils;

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private LabelService labelService;

    @GetMapping("/products")
    @Secured(ConstantsRoles.ROLE_BUSSINESS)
    public ResponseEntity<?> getBussinessProducts(
            @RequestParam(required = false, defaultValue = "1") Integer page) {
        try {
            User user = userUtils.getUserAuthenticated();

            final int PAGE_SIZE = 20;
            int pageNumber = (page > 0) ? page - 1 : 0;

            // Objeto para obtener la paginacion adecuada con JPA
            Pageable pageable = PageRequest.of(pageNumber, PAGE_SIZE);

            Page<Product> productPage = productService.findByUserPageable(user, pageable);

            List<BussinessProductResponse> response = productPage.getContent().stream().map(product -> {
                List<BussinessProductResponse.Category> categories = product.getCategories().stream()
                        .map(category -> new BussinessProductResponse.Category(category.getId(), category.getName()))
                        .toList();

                List<BussinessProductResponse.Label> labels = product.getLabels().stream()
                        .map(label -> new BussinessProductResponse.Label(label.getId(), label.getName()))
                        .toList();

                return new BussinessProductResponse(
                        product.getId(),
                        product.getName(),
                        product.getDescription(),
                        product.getImage(),
                        product.getPrice(),
                        product.getQuantity(),
                        product.getSold(),
                        product.getUser().getUsername(),
                        product.isBlocked(),
                        categories,
                        labels);
            }).toList();

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

    @PostMapping("/create")
    @Secured(ConstantsRoles.ROLE_BUSSINESS)
    public ResponseEntity<?> createProduct(
            @Valid @RequestBody ProductRequest product, BindingResult result) {
        try {
            if (result.hasFieldErrors()) {
                return validation(result);
            }
            User user = userUtils.getUserAuthenticated();

            // Obtener los IDs únicos de categorías y etiquetas del producto
            List<ProductRequest.Category> categories = product.getCategories();
            List<ProductRequest.Label> labels = product.getLabels();

            List<Long> categoryIds = categories.stream()
                    .map(ProductRequest.Category::getId)
                    .distinct()
                    .toList();

            List<Long> labelIds = labels.stream()
                    .map(ProductRequest.Label::getId)
                    .distinct()
                    .toList();

            // Consultamos categorías y etiquetas existentes en la base de datos
            List<Long> existingCategoryIds = categoryService.findAllById(categoryIds).stream()
                    .map(Category::getId)
                    .toList();

            List<Long> existingLabelIds = labelService.findAllById(labelIds).stream()
                    .map(Label::getId)
                    .toList();

            // Determinamos cuáles no existen y mapearlos a sus objetos originales
            List<ProductRequest.Category> nonExistingCategories = categories.stream()
                    .filter(category -> !existingCategoryIds.contains(category.getId()))
                    .toList();

            List<ProductRequest.Label> nonExistingLabels = labels.stream()
                    .filter(label -> !existingLabelIds.contains(label.getId()))
                    .toList();

            // Si hay categorías o etiquetas que no existen, devolver respuesta
            if (!nonExistingCategories.isEmpty() || !nonExistingLabels.isEmpty()) {
                List<ProductInvalidCategoryLabelResponse.Category> categoriesError = nonExistingCategories.stream()
                        .map(category -> new ProductInvalidCategoryLabelResponse.Category(category.getId(),
                                category.getName()))
                        .toList();

                List<ProductInvalidCategoryLabelResponse.Label> labelsError = nonExistingLabels.stream()
                        .map(label -> new ProductInvalidCategoryLabelResponse.Label(label.getId(), label.getName()))
                        .toList();

                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ProductInvalidCategoryLabelResponse(
                                "Algunas categorías o etiquetas que intentas introducir no existen",
                                HttpStatus.BAD_REQUEST,
                                true,
                                categoriesError,
                                labelsError));
            }

            // Proceder con la creación del producto
            // Aquí se implementaría la lógica de guardado del producto

            return ResponseMessagesUtils.created("Validacion correcta, implementar respuesta correcta");
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

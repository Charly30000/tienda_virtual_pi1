package com.tienda.virtual.backtiendavirtual.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tienda.virtual.backtiendavirtual.entities.Product;
import com.tienda.virtual.backtiendavirtual.entities.User;
import com.tienda.virtual.backtiendavirtual.exceptions.UserBlockedException;
import com.tienda.virtual.backtiendavirtual.exceptions.UserNotFoundException;
import com.tienda.virtual.backtiendavirtual.models.ProductFiltersParamsRequest;
import com.tienda.virtual.backtiendavirtual.models.ProductResponse;
import com.tienda.virtual.backtiendavirtual.models.ValidationErrorsResponse;
import com.tienda.virtual.backtiendavirtual.services.ProductService;
import com.tienda.virtual.backtiendavirtual.utils.ResponseMessagesUtils;
import com.tienda.virtual.backtiendavirtual.utils.UserUtils;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private UserUtils userUtils;

    /**
     * Endpoint obtencion de la de productos filtrados de manera ascendente o
     * descendente
     * segun el nombre y el precio
     * 
     * @return Lista de productos
     */
    @GetMapping
    public ResponseEntity<?> getAllProductsPaginate(@Valid @ModelAttribute ProductFiltersParamsRequest queryParams,
            BindingResult bindingResult) {
        try {
            User user = userUtils.getUserAuthenticated();

            if (bindingResult.hasErrors()) {
                return validation(bindingResult);
            }

            final int PAGE_SIZE = 20;
            int pageNumber = (queryParams.getPage() > 0) ? queryParams.getPage() - 1 : 0;

            Sort sortType = null;
            if (queryParams.getPrice().isBlank()) {
                sortType = queryParams.getOrder().equalsIgnoreCase(ProductFiltersParamsRequest.ORDER_ASCENDENT)
                        ? Sort.by("id").ascending()
                        : Sort.by("id").descending();
            } else {
                sortType = queryParams.getPrice().equalsIgnoreCase(ProductFiltersParamsRequest.ORDER_ASCENDENT)
                        ? Sort.by("price").ascending()
                        : Sort.by("price").descending();
            }

            PageRequest pageRequest = PageRequest.of(
                    pageNumber,
                    PAGE_SIZE,
                    sortType);

            Page<Product> productsPage = productService.findByNameAndFiltersPageable(queryParams.getName(),
                    pageRequest);

            List<ProductResponse> productList = productsPage.getContent().stream()
                    .map(p -> new ProductResponse(
                            p.getId(),
                            p.getName(),
                            p.getDescription(),
                            p.getImage(),
                            p.getPrice(),
                            p.getQuantity(),
                            p.getSold(),
                            p.getUser().getUsername(),
                            p.getCategories().stream()
                                    .map(np -> new ProductResponse.Category(np.getId(), np.getName())).toList(),
                            p.getLabels().stream()
                                    .map(np -> new ProductResponse.Label(np.getId(), np.getName())).toList(),
                            p.isBlocked(),
                            !p.getUser().isEnabled()))
                    .toList();

            Map<String, Object> pages = new HashMap<>();
            pages.put("totalPages", productsPage.getTotalPages());
            pages.put("actualPage", queryParams.getPage());

            Map<String, Object> response = new HashMap<>();
            response.put("pages", pages);
            response.put("products", productList);

            return ResponseEntity.ok(response);

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
     * Endpoint para obtener un producto por su ID.
     * 
     * @param id Identificador del producto
     * @return Producto encontrado o error 404
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.findByIdWithLabelsAndCategories(id);
        if (product.isEmpty()) {
            return ResponseMessagesUtils.notFound("Producto no encontrado");
        }
        Product p = product.get();
        ProductResponse response = new ProductResponse(
                p.getId(),
                p.getName(),
                p.getDescription(),
                p.getImage(),
                p.getPrice(),
                p.getQuantity(),
                p.getSold(),
                p.getUser().getUsername(),
                p.getCategories().stream()
                        .map(np -> new ProductResponse.Category(np.getId(), np.getName())).toList(),
                p.getLabels().stream()
                        .map(np -> new ProductResponse.Label(np.getId(), np.getName())).toList(),
                p.isBlocked(),
                !p.getUser().isEnabled());

        return ResponseEntity.ok(response);
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

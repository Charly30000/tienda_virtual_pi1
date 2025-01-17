package com.tienda.virtual.backtiendavirtual.controllers;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tienda.virtual.backtiendavirtual.constants.ConstantansUploads;
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
import com.tienda.virtual.backtiendavirtual.models.ProductResponse;
import com.tienda.virtual.backtiendavirtual.models.ValidationErrorsResponse;
import com.tienda.virtual.backtiendavirtual.services.CategoryService;
import com.tienda.virtual.backtiendavirtual.services.LabelService;
import com.tienda.virtual.backtiendavirtual.services.ProductService;
import com.tienda.virtual.backtiendavirtual.utils.ResponseMessagesUtils;
import com.tienda.virtual.backtiendavirtual.utils.UserUtils;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;

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

            List<BussinessProductResponse> products = productPage.getContent().stream().map(product -> {
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

            Map<String, Object> pages = new HashMap<>();
            pages.put("totalPages", productPage.getTotalPages());
            pages.put("actualPage", page);

            Map<String, Object> response = new HashMap<>();
            response.put("pages", pages);
            response.put("products", products);

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

    @PostMapping(value = "/create", consumes = "multipart/form-data")
    @Secured(ConstantsRoles.ROLE_BUSSINESS)
    public ResponseEntity<?> createProduct(
            @RequestParam("product") String productJson,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            User user = userUtils.getUserAuthenticated();

            // Deserializar JSON a ProductRequest
            ObjectMapper objectMapper = new ObjectMapper();
            ProductRequest product = objectMapper.readValue(productJson, ProductRequest.class);

            // Crear un BindingResult para manejar los errores de validación
            BindingResult bindingResult = new BeanPropertyBindingResult(product, "product");

            if (image != null && !image.isEmpty()) {
                String contentType = image.getContentType();
                String originalFilename = image.getOriginalFilename();

                // Validar formato de la imagen
                if (!(ConstantansUploads.IMAGE_JPG.equals(contentType)
                        || ConstantansUploads.IMAGE_PNG.equals(contentType))) {
                    bindingResult.addError(new FieldError("image", "image",
                            "solo permite una imagen en formato JPG o PNG."));
                }

                // Validar longitud del nombre de la imagen
                if (originalFilename != null && originalFilename.length() > 100) {
                    bindingResult.addError(new FieldError("image", "image",
                            "no puede tener más de 100 caracteres."));
                }
            }

            // Validamos manualmente el objeto deserializado
            Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
            Set<ConstraintViolation<ProductRequest>> violations = validator.validate(product);

            for (ConstraintViolation<ProductRequest> violation : violations) {
                String fieldName = violation.getPropertyPath().toString();
                String errorMessage = violation.getMessage();
                bindingResult.addError(new FieldError("product", fieldName, errorMessage));
            }

            // Pasar los errores a tu método de validación personalizado
            if (bindingResult.hasErrors()) {
                return validation(bindingResult);
            }

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
            List<Category> existingCategoryIds = categoryService.findAllById(categoryIds);

            List<Label> existingLabelIds = labelService.findAllById(labelIds);

            // Determinamos cuáles no existen y mapearlos a sus objetos originales
            List<ProductRequest.Category> nonExistingCategories = categories.stream()
                    .filter(category -> existingCategoryIds.stream()
                            .noneMatch(existing -> existing.getId().equals(category.getId())))
                    .toList();

            List<ProductRequest.Label> nonExistingLabels = labels.stream()
                    .filter(label -> existingLabelIds.stream()
                            .noneMatch(existing -> existing.getId().equals(label.getId())))
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

            String imagePath = saveImage(image);
            final Integer DEFAULT_ITEMS_SOLD = 0;
            Product newProduct = productService.save(new Product(
                    product.getName(),
                    product.getDescription(),
                    false,
                    imagePath,
                    product.getPrice(),
                    product.getQuantity(),
                    DEFAULT_ITEMS_SOLD,
                    user,
                    existingCategoryIds,
                    existingLabelIds));

            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ProductResponse(
                            newProduct.getId(),
                            newProduct.getName(),
                            newProduct.getDescription(),
                            newProduct.getImage(),
                            newProduct.getPrice(),
                            newProduct.getQuantity(),
                            newProduct.getSold(),
                            user.getUsername(),
                            newProduct.getCategories().stream()
                                    .map(np -> new ProductResponse.Category(np.getId(), np.getName())).toList(),
                            newProduct.getLabels().stream()
                                    .map(np -> new ProductResponse.Label(np.getId(), np.getName())).toList()));
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

    @PutMapping(value = "/update/{id}", consumes = "multipart/form-data")
    @Secured(ConstantsRoles.ROLE_BUSSINESS)
    public ResponseEntity<?> updateProduct(
            @PathVariable Long id,
            @RequestParam("product") String productJson,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            User user = userUtils.getUserAuthenticated();

            // Deserializar JSON a ProductRequest
            ObjectMapper objectMapper = new ObjectMapper();
            ProductRequest product = objectMapper.readValue(productJson, ProductRequest.class);

            // Crear un BindingResult para manejar los errores de validación
            BindingResult bindingResult = new BeanPropertyBindingResult(product, "product");
            if (image != null && !image.isEmpty()) {
                String contentType = image.getContentType();
                String originalFilename = image.getOriginalFilename();

                // Validar formato de la imagen
                if (!(ConstantansUploads.IMAGE_JPG.equals(contentType)
                        || ConstantansUploads.IMAGE_PNG.equals(contentType))) {
                    bindingResult.addError(new FieldError("image", "image",
                            "solo permite una imagen en formato JPG o PNG."));
                }

                // Validar longitud del nombre de la imagen
                if (originalFilename != null && originalFilename.length() > 100) {
                    bindingResult.addError(new FieldError("image", "image",
                            "no puede tener más de 100 caracteres."));
                }
            }

            // Validamos manualmente el objeto deserializado
            Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
            Set<ConstraintViolation<ProductRequest>> violations = validator.validate(product);

            for (ConstraintViolation<ProductRequest> violation : violations) {
                String fieldName = violation.getPropertyPath().toString();
                String errorMessage = violation.getMessage();
                bindingResult.addError(new FieldError("product", fieldName, errorMessage));
            }

            // Pasar los errores a tu método de validación personalizado
            if (bindingResult.hasErrors()) {
                return validation(bindingResult);
            }

            // Buscar que el producto exista
            Optional<Product> productDB = productService.findById(id);
            if (productDB.isEmpty()) {
                return ResponseMessagesUtils.notFound("El producto que intentas actualizar no existe");
            }

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
            List<Category> existingCategoryIds = categoryService.findAllById(categoryIds);

            List<Label> existingLabelIds = labelService.findAllById(labelIds);

            // Determinamos cuáles no existen y mapearlos a sus objetos originales
            List<ProductRequest.Category> nonExistingCategories = categories.stream()
                    .filter(category -> existingCategoryIds.stream()
                            .noneMatch(existing -> existing.getId().equals(category.getId())))
                    .toList();

            List<ProductRequest.Label> nonExistingLabels = labels.stream()
                    .filter(label -> existingLabelIds.stream()
                            .noneMatch(existing -> existing.getId().equals(label.getId())))
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

            String imagePath = productDB.get().getImage();
            // Comprobamos si recibimos una imagen
            if (image != null && !image.isEmpty()) {
                // En caso de que exista una imagen anterior, la eliminamos
                if (!imagePath.isEmpty()) {
                    File existingImage = new File(imagePath);
                    if (existingImage.exists()) {
                        boolean isDeleted = existingImage.delete();
                        if (!isDeleted) {
                            return ResponseMessagesUtils.serverError("No se pudo eliminar la imagen anterior.");
                        }
                    }
                }
                // Almacenamos la nueva imagen
                imagePath = saveImage(image);
            }
            Product productToUpdate = new Product(
                    product.getName(),
                    product.getDescription(),
                    productDB.get().isBlocked(),
                    imagePath,
                    product.getPrice(),
                    product.getQuantity(),
                    productDB.get().getSold(),
                    user,
                    existingCategoryIds,
                    existingLabelIds);

            Product newProduct = productService.update(productDB.get().getId(), productToUpdate);

            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ProductResponse(
                            newProduct.getId(),
                            newProduct.getName(),
                            newProduct.getDescription(),
                            newProduct.getImage(),
                            newProduct.getPrice(),
                            newProduct.getQuantity(),
                            newProduct.getSold(),
                            user.getUsername(),
                            newProduct.getCategories().stream()
                                    .map(np -> new ProductResponse.Category(np.getId(), np.getName())).toList(),
                            newProduct.getLabels().stream()
                                    .map(np -> new ProductResponse.Label(np.getId(), np.getName())).toList()));
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

    /**
     * Proceso de almacenamiento de una imagen nueva, si no recibe ninguna, devuelve
     * un String vacio ""
     */
    private String saveImage(MultipartFile image) throws IOException, IllegalArgumentException {
        String imagePath = "";
        if (image != null && !image.isEmpty()) {
            String contentType = image.getContentType();
            if (!(ConstantansUploads.IMAGE_JPG.equals(contentType)
                    || ConstantansUploads.IMAGE_PNG.equals(contentType))) {
                throw new IllegalArgumentException("La imagen que se trata de almacenar no está en formato JPG ni PNG");
            }
            String uploadsDir = ConstantansUploads.UPLOADS_FOLDER_LOCATION; // Ruta de almacenamiento
            File dir = new File(uploadsDir);
            if (!dir.exists()) {
                // Creamos la carpeta si no existe
                dir.mkdirs();
            }

            String uniqueFileName = UUID.randomUUID().toString().replace("-", "") + "_" + image.getOriginalFilename();
            imagePath = uploadsDir + "/" + uniqueFileName;

            File file = new File(imagePath);
            image.transferTo(file); // Guardar archivo
        }
        return imagePath;
    }
}

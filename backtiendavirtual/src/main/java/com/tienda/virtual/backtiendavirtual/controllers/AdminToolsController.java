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
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tienda.virtual.backtiendavirtual.constants.ConstantsRoles;
import com.tienda.virtual.backtiendavirtual.entities.Product;
import com.tienda.virtual.backtiendavirtual.entities.Role;
import com.tienda.virtual.backtiendavirtual.entities.User;
import com.tienda.virtual.backtiendavirtual.exceptions.UserBlockedException;
import com.tienda.virtual.backtiendavirtual.exceptions.UserNotFoundException;
import com.tienda.virtual.backtiendavirtual.models.AdminToolsGetUsersQueryParamsRequest;
import com.tienda.virtual.backtiendavirtual.models.AdminToolsProductsQueryParamsRequest;
import com.tienda.virtual.backtiendavirtual.models.AdminToolsTypeUserResponse;
import com.tienda.virtual.backtiendavirtual.models.ProductResponse;
import com.tienda.virtual.backtiendavirtual.models.ValidationErrorsResponse;
import com.tienda.virtual.backtiendavirtual.services.ProductService;
import com.tienda.virtual.backtiendavirtual.services.RoleService;
import com.tienda.virtual.backtiendavirtual.services.UserService;
import com.tienda.virtual.backtiendavirtual.utils.ResponseMessagesUtils;
import com.tienda.virtual.backtiendavirtual.utils.UserUtils;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/adminTools")
public class AdminToolsController {

    @Autowired
    private UserUtils userUtils;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @Autowired
    private RoleService roleService;

    @GetMapping("/users")
    @Secured(ConstantsRoles.ROLE_ADMIN)
    public ResponseEntity<?> getUsersPaginate(@Valid @ModelAttribute AdminToolsGetUsersQueryParamsRequest queryParams,
            BindingResult bindingResult) {
        try {
            User user = userUtils.getUserAuthenticated();

            if (bindingResult.hasErrors()) {
                return validation(bindingResult);
            }

            final int PAGE_SIZE = 20;
            int pageNumber = (queryParams.getPage() > 0) ? queryParams.getPage() - 1 : 0;

            // Configurar la paginación y ordenación
            PageRequest pageRequest = PageRequest.of(
                    pageNumber,
                    PAGE_SIZE,
                    Sort.by("username").ascending());

            // Realizar la consulta
            Page<User> users = userService.findByUsernamePageable(queryParams.getUsername(), pageRequest);

            List<AdminToolsTypeUserResponse> userList = users.stream()
                    .peek(User::populateTransientFields)
                    .map(u -> new AdminToolsTypeUserResponse(
                            u.getUsername(),
                            u.getEmail(),
                            u.getIsBussiness(),
                            u.getIsAdmin(),
                            !u.isEnabled()))
                    .toList();

            Map<String, Object> pages = new HashMap<>();
            pages.put("totalPages", users.getTotalPages());
            pages.put("actualPage", queryParams.getPage());

            Map<String, Object> response = new HashMap<>();
            response.put("pages", pages);
            response.put("users", userList);

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

    @DeleteMapping("/users/{username}")
    @Secured(ConstantsRoles.ROLE_ADMIN)
    public ResponseEntity<?> updateUserBlocked(@PathVariable String username) {
        try {
            User user = userUtils.getUserAuthenticated();

            Optional<User> userdb = userService.findByUsername(username);
            if (!userdb.isPresent()) {
                return ResponseMessagesUtils.notFound("El usuario que intentas bloquear no existe");
            }
            User userBlocked = userdb.get();
            userBlocked.setEnabled(!userBlocked.isEnabled());
            userService.save(userBlocked);
            String responseMessage = userBlocked.isEnabled()
                    ? String.format("Usuario '%s' desbloqueado correctamente", userBlocked.getUsername())
                    : String.format("Usuario '%s' bloqueado correctamente", userBlocked.getUsername());

            return ResponseMessagesUtils.ok(responseMessage);
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

    @GetMapping("/products")
    @Secured(ConstantsRoles.ROLE_ADMIN)
    public ResponseEntity<?> getProductsPaginate(
            @Valid @ModelAttribute AdminToolsProductsQueryParamsRequest queryParams,
            BindingResult bindingResult) {
        try {
            User user = userUtils.getUserAuthenticated();

            if (bindingResult.hasErrors()) {
                return validation(bindingResult);
            }

            final int PAGE_SIZE = 20;
            int pageNumber = (queryParams.getPage() > 0) ? queryParams.getPage() - 1 : 0;

            // Configurar la paginación y ordenación
            PageRequest pageRequest = PageRequest.of(
                    pageNumber,
                    PAGE_SIZE,
                    Sort.by("name").ascending());

            Page<Product> productsPage = productService.findByNamePageable(queryParams.getName(), pageRequest);

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

    @DeleteMapping("/product/{id}")
    @Secured(ConstantsRoles.ROLE_ADMIN)
    public ResponseEntity<?> blockProduct(@PathVariable Long id) {
        try {
            User user = userUtils.getUserAuthenticated();

            Optional<Product> productDB = productService.findById(id);
            if (!productDB.isPresent()) {
                return ResponseMessagesUtils.notFound("El producto que intentas bloquear no existe");
            }
            Product product = productDB.get();
            product.setBlocked(!product.isBlocked());
            productService.save(product);

            String responseMessage = product.isBlocked() ? "Producto bloqueado correctamente"
                    : "Producto desbloqueado correctamente";

            return ResponseMessagesUtils.ok(responseMessage);
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

    @PutMapping("/users/update/bussiness/{username}")
    @Secured(ConstantsRoles.ROLE_ADMIN)
    public ResponseEntity<?> updateUserToBussiness(@PathVariable String username) {
        try {
            User user = userUtils.getUserAuthenticated();

            Optional<User> userDB = userService.findByUsername(username);
            if (!userDB.isPresent()) {
                return ResponseMessagesUtils.notFound("El usuario que intentas actualizar no existe");
            }
            Optional<Role> roleDB = roleService.findByName(ConstantsRoles.ROLE_BUSSINESS);
            if (!roleDB.isPresent()) {
                throw new IllegalAccessError("No se ha podido obtener el Rol deseado");
            }
            User userBussiness = userDB.get();
            List<Role> userRoles = userBussiness.getRoles();
            String responseMessage;
            if (userRoles.stream().anyMatch(role -> role.getName().equals(ConstantsRoles.ROLE_BUSSINESS))) {
                userRoles.removeIf(role -> role.getName().equals(ConstantsRoles.ROLE_BUSSINESS));
                responseMessage = String.format("Quitado rol empresarial a '%s'", userBussiness.getUsername());
            } else {
                userRoles.add(roleDB.get());
                responseMessage = String.format("Añadido rol empresarial a '%s'", userBussiness.getUsername());
            }

            userService.updateRoles(userBussiness, userRoles);

            return ResponseMessagesUtils.ok(responseMessage);
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

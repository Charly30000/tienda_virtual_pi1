package com.tienda.virtual.backtiendavirtual.controllers;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tienda.virtual.backtiendavirtual.constants.ConstantsRoles;
import com.tienda.virtual.backtiendavirtual.entities.Category;
import com.tienda.virtual.backtiendavirtual.entities.User;
import com.tienda.virtual.backtiendavirtual.exceptions.UserBlockedException;
import com.tienda.virtual.backtiendavirtual.exceptions.UserNotFoundException;
import com.tienda.virtual.backtiendavirtual.models.AdminToolsGetUsersQueryParamsRequest;
import com.tienda.virtual.backtiendavirtual.models.ProductResponse;
import com.tienda.virtual.backtiendavirtual.services.CategoryService;
import com.tienda.virtual.backtiendavirtual.utils.ResponseMessagesUtils;
import com.tienda.virtual.backtiendavirtual.utils.UserUtils;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private UserUtils userUtils;

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/getAll")
    @Secured(ConstantsRoles.ROLE_BUSSINESS)
    public ResponseEntity<?> getUsersPaginate(@Valid @ModelAttribute AdminToolsGetUsersQueryParamsRequest queryParams,
            BindingResult bindingResult) {
        try {
            User user = userUtils.getUserAuthenticated();

            List<Category> categoriesDB = categoryService.findAll();

            List<ProductResponse.Category> response = categoriesDB.stream()
                    .map(c -> new ProductResponse.Category(c.getId(), c.getName())).toList();

            return ResponseEntity.ok().body(response);

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

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
import com.tienda.virtual.backtiendavirtual.entities.Label;
import com.tienda.virtual.backtiendavirtual.entities.User;
import com.tienda.virtual.backtiendavirtual.exceptions.UserBlockedException;
import com.tienda.virtual.backtiendavirtual.exceptions.UserNotFoundException;
import com.tienda.virtual.backtiendavirtual.models.AdminToolsGetUsersQueryParamsRequest;
import com.tienda.virtual.backtiendavirtual.models.ProductResponse;
import com.tienda.virtual.backtiendavirtual.services.LabelService;
import com.tienda.virtual.backtiendavirtual.utils.ResponseMessagesUtils;
import com.tienda.virtual.backtiendavirtual.utils.UserUtils;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/labels")
public class LabelController {

    @Autowired
    private UserUtils userUtils;

    @Autowired
    private LabelService labelService;

    @GetMapping("/getAll")
    @Secured(ConstantsRoles.ROLE_BUSSINESS)
    public ResponseEntity<?> getUsersPaginate(@Valid @ModelAttribute AdminToolsGetUsersQueryParamsRequest queryParams,
            BindingResult bindingResult) {
        try {
            User user = userUtils.getUserAuthenticated();

            List<Label> labelsDB = labelService.findAll();

            List<ProductResponse.Label> response = labelsDB.stream()
                    .map(l -> new ProductResponse.Label(l.getId(), l.getName())).toList();

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

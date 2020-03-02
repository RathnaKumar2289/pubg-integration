package com.stackroute.userservice.controller;

import com.stackroute.userservice.constants.UserServiceConstants;
import com.stackroute.userservice.domain.User;
import com.stackroute.userservice.exeption.UserAlreadyExistsException;
import com.stackroute.userservice.exeption.UserNotFoundException;
import com.stackroute.userservice.model.Response;
import com.stackroute.userservice.service.SecurityTokenGenerator;
import com.stackroute.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/authenticationservice")
public class UserController {

  private ResponseEntity responseEntity;
  private UserService userService;
  private SecurityTokenGenerator securityTokenGenerator;

  @Autowired
  public UserController(UserService userService, SecurityTokenGenerator securityTokenGenerator) {
    this.userService = userService;
    this.securityTokenGenerator = securityTokenGenerator;
  }

  @PostMapping("/save")
  public ResponseEntity saveUser(@RequestBody User user) throws UserAlreadyExistsException {

    try{
      userService.saveUser(user);
      responseEntity = new ResponseEntity(new Response(UserServiceConstants.REGISTER_SUCCESS), HttpStatus.CREATED);
    }catch(UserAlreadyExistsException e){
      throw new UserAlreadyExistsException();
    }catch (Exception e) {
      responseEntity = new ResponseEntity(UserServiceConstants.SERVICE_FAILURE, HttpStatus.SERVICE_UNAVAILABLE);
    }
    return responseEntity;
  }

  @PostMapping("/login")
  public ResponseEntity loginUser(@RequestBody User user) throws UserNotFoundException {
    Map<String, String> map = null;
    try {
      User userobj = userService.findByUserNameAndAndPassword(user.getUserName(), user.getPassword());
      if (userobj.getUserName().equals(user.getUserName())) {
        map = securityTokenGenerator.generateToken(user);
      }
      responseEntity = new ResponseEntity(map, HttpStatus.OK);
    } catch (UserNotFoundException e) {
      throw new UserNotFoundException();
    } catch (Exception e) {
      responseEntity = new ResponseEntity(UserServiceConstants.SERVICE_FAILURE, HttpStatus.SERVICE_UNAVAILABLE);
    }
    return responseEntity;
  }


}

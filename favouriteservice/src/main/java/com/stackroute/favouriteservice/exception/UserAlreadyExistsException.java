package com.stackroute.favouriteservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.NO_CONTENT,reason = "User Already Exists")
public class UserAlreadyExistsException extends Exception{
}

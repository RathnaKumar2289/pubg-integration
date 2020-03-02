package com.stackroute.favouriteservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.CONFLICT,reason = "Match Already Exists")
public class MatchAlreadyExistsException extends  Exception{
}

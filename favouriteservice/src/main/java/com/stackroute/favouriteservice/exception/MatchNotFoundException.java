package com.stackroute.favouriteservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.NO_CONTENT,reason = "Match Already Exists")
public class MatchNotFoundException extends Exception{
}

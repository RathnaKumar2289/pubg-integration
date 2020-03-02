package com.stackroute.favouriteservice.service;

import com.stackroute.favouriteservice.domain.Match;
import com.stackroute.favouriteservice.domain.User;
import com.stackroute.favouriteservice.exception.MatchAlreadyExistsException;
import com.stackroute.favouriteservice.exception.MatchNotFoundException;
import com.stackroute.favouriteservice.exception.UserAlreadyExistsException;

import java.util.List;

public interface MatchService {
    User saveFavoriteMatchToList(Match match, String userName) throws MatchAlreadyExistsException;

    User deleteMatchFromFavouriteList(String userName, String matchId) throws MatchNotFoundException;

    User updateCommentForMatch(String comments, String matchId, String userName) throws MatchNotFoundException;

    List<Match> getAllFavouriteMatches(String userName) throws Exception;


}

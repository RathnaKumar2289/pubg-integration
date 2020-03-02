package com.stackroute.favouriteservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.favouriteservice.domain.Match;
import com.stackroute.favouriteservice.domain.MatchAttributes;
import com.stackroute.favouriteservice.domain.User;
import com.stackroute.favouriteservice.exception.MatchAlreadyExistsException;
import com.stackroute.favouriteservice.service.MatchService;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(FavouriteController.class)
public class FavouriteControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private MatchService matchService;

    private Match match;
    private MatchAttributes matchAttributes;
    private User user;
    List<Match> matches;


    @Before
    public void setUp() {
        matchAttributes = new MatchAttributes("2020-01-11T10:24:34Z", 1791, "esports-squad", "Baltic_Main",
                "bluehole-pubg", "progress");
        match = new Match("1234", "test", matchAttributes);
        matches = new ArrayList();
        matches.add(match);
        matchAttributes = new MatchAttributes("2020-01-11T10:24:34Z", 80, "esports-squad", "Baltic_Main",
                "bluehole-pubg", "progress");
        match = new Match("1235", "test", matchAttributes);
        matches.add(match);
        user = new User("John123", "john@gmail.com", matches);
    }

    @After
    public void tearDown() {
        matchAttributes = null;
        match = null;
        user = null;
    }

    @Test
    public void testSaveFavoriteMatchSuccess() throws Exception {
        when(matchService.saveFavoriteMatchToList(any(),eq(user.getUserName()))).thenReturn(user);
        mockMvc.perform(post("/api/v1/userservice/user/{username}/match",user.getUserName())
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonToString(match))).andExpect(status().isCreated())
                .andDo(print());

        verify(matchService, times(1)).saveFavoriteMatchToList(any(),eq(user.getUserName()));
    }


    @Test
    public void testSaveFavoriteMatchFailure() throws Exception {
        when(matchService.saveFavoriteMatchToList(any(),eq(user.getUserName()))).thenThrow(MatchAlreadyExistsException.class);
        mockMvc.perform(post("/api/v1/userservice/user/{username}/match",user.getUserName())
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonToString(match))).andExpect(status().isConflict())
                .andDo(print());

        verify(matchService, times(1)).saveFavoriteMatchToList(any(),eq(user.getUserName()));
    }

    @Test
    public void testUpdateCommentSuccess() throws Exception {
        when(matchService.updateCommentForMatch(match.getComments(),match.getId(),user.getUserName())).thenReturn(user);
        mockMvc.perform(patch("/api/v1/userservice/user/{username}/match",user.getUserName())
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonToString(match))).andExpect(status().isOk())
                .andDo(print());

        verify(matchService, times(1)).updateCommentForMatch(match.getComments(),match.getId(),user.getUserName());
    }


    @Test
    public void testDeleteMatch() throws Exception {
        when(matchService.deleteMatchFromFavouriteList(user.getUserName(),match.getId())).thenReturn(user);
        mockMvc.perform(delete("/api/v1/userservice/user/{username}/match",user.getUserName())
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonToString(match))).andExpect(status().isOk())
                .andDo(print());

        verify(matchService, times(1)).deleteMatchFromFavouriteList(user.getUserName(),match.getId());
    }

    @Test
    public void testGetAllFavouriteMatches() throws Exception {
        when(matchService.getAllFavouriteMatches(user.getUserName())).thenReturn(matches);
        mockMvc.perform(get("/api/v1/userservice/user/{username}/matches",user.getUserName()))
                .andExpect(status().isOk())
                .andDo(print());

        verify(matchService, times(1)).getAllFavouriteMatches(user.getUserName());
    }

    private static String jsonToString(Object obj) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(obj);
    }
}

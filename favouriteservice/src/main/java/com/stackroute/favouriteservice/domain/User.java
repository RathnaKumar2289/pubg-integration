package com.stackroute.favouriteservice.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class User {
	@Id
    private String userName;
    private String email;
    private List<Match> favouritematches;

    public User() {}
    
    public User(String userName, String email, List<Match> favouritematches) {
		super();
		this.userName = userName;
		this.email = email;
		this.favouritematches = favouritematches;
	}

	public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Match> getFavouritematches() {
        return favouritematches;
    }

    public void setFavouritematches(List<Match> favouritematches) {
        this.favouritematches = favouritematches;
    }


}

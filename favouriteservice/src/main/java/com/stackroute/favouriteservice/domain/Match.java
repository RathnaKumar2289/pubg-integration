package com.stackroute.favouriteservice.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;

@Document
public class Match {
    @Id
    private String id;
    @JsonProperty
    private String comments;
    private MatchAttributes attributes;
    
    public Match() {}
    
	public Match(String id, String comments, MatchAttributes attributes) {
		super();
		this.id = id;
		this.comments = comments;
		this.attributes = attributes;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public MatchAttributes getAttributes() {
		return attributes;
	}
	public void setAttributes(MatchAttributes attributes) {
		this.attributes = attributes;
	}
    
    
    
}

package com.stackroute.favouriteservice.domain;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class MatchAttributes {
    private String createdAt;
    private Integer duration;
    private String gameMode;
    private String mapName;
    private String titleId;
    private String seasonState;

    public MatchAttributes() {}


    public MatchAttributes(String createdAt, Integer duration, String gameMode, String mapName, String titleId,
			String seasonState) {
		super();
		this.createdAt = createdAt;
		this.duration = duration;
		this.gameMode = gameMode;
		this.mapName = mapName;
		this.titleId = titleId;
		this.seasonState = seasonState;
	}

	public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getGameMode() {
        return gameMode;
    }

    public void setGameMode(String gameMode) {
        this.gameMode = gameMode;
    }

    public String getMapName() {
        return mapName;
    }

    public void setMapName(String mapName) {
        this.mapName = mapName;
    }

    public String getTitleId() {
        return titleId;
    }

    public void setTitleId(String titleId) {
        this.titleId = titleId;
    }

    public String getSeasonState() {
        return seasonState;
    }

    public void setSeasonState(String seasonState) {
        this.seasonState = seasonState;
    }
}

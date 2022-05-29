import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import Button from '@mui/material/Button'
import { getAllSuggestions } from "../../Actions/User";
import User from "../User/User";
import './Suggestions.css'


const SuggestionsRequest = () => {

  const dispatch = useDispatch();
  const { suggestions, loading: suggestionsLoading } = useSelector(
    (state) => state.allSuggestions
  );

  const [currentSuggestionsLength, setCurrentSuggestionsLength] = useState(2);
  const [showSuggestionsOption, setShowSuggestionsOption] = useState(true);
  const [timeLeft, setTimeLeft] = useState(86400); // 1 day

  useEffect(() => {
    dispatch(getAllSuggestions());
  }, [dispatch]);

  // refreshing suggestions after 1 minute
  useEffect(() => {
    setInterval(() => {
      refreshSuggestions();
    }, 60000)
  }, [])

  useEffect(() => {
    setInterval(() => {
      setShowSuggestionsOption(false);
    }, 300000)
  }, [])

  useEffect(() => {
    setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(timeLeft);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setShowSuggestionsOption(true);
    }
  }, [timeLeft]);

  const refreshSuggestions = async () => {
    await dispatch(getAllSuggestions());
  }

  const showAllSuggestionsList = () => {
    setCurrentSuggestionsLength(suggestions.length)
  }

  return (
    showSuggestionsOption ? <div className="requestSuggestionContainer">
      <div>
        <h3>Today's Friend Suggestions</h3>
        <Button onClick={showAllSuggestionsList} variant="outlined">View All Suggestions</Button>
      </div>
      <br />
      <br />
      {suggestions && suggestions.length > 0 ? (
        // showing only 2 suggestions at a time
        suggestions.slice(0, currentSuggestionsLength).map((suggestion) => (
          <div style={{ width: '50%' }}>
            <User
              key={suggestion._id}
              userId={suggestion._id}
              name={suggestion.name}
              avatar={suggestion.avatar.url}
            />
            <Button variant="outlined">
              <Link to={`/user/${suggestion._id}`} className="homeUser">
                View Profile
              </Link>
            </Button>
          </div>
        ))
      ) : (
        <Typography>No Friend Suggestions for today</Typography>
      )}
    </div> :
      <h3>No Friend Suggestions for Today. They will be visible tomorrow again</h3>

  );
};

export default SuggestionsRequest;

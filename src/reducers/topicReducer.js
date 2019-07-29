
import {
    FETCHING_TOPICS,
    FETCHING_TOPICS_SUCCESS,
    FETCHING_TOPICS_FAIL,
} from '../actions/types';

  const initialState = {
    topics: [] ,
    isFetchingTopics: false,
    fetchingTopicError: false 
  }

  export default function topicReducer(state = initialState, action) {
    switch (action.type) {
      case FETCHING_TOPICS:
        return {
          ...state,
          topics: [],
          isFetchingTopics: true
        }
      case FETCHING_TOPICS_SUCCESS:
        return {
          ...state,
          isFetchingTopics: false,
          topics: action.data,

        }

      case FETCHING_TOPICS_FAIL:
        return {
          ...state,
          isFetchingTopics: false,
          fetchingTopicError: true
        }

      break;

      default:
        return state
    }
  }
import {
    FETCHING_TOPICS,
    FETCHING_TOPICS_SUCCESS,
    FETCHING_TOPICS_FAIL
  } from './types'


  import axios from 'axios';


  export function fethAllTopics() {
      return (dispatch) => {
           dispatch(getAllTopics())
          return  axios.get("http://112.196.16.90:8080/Culture/api/get_topics")
              .then(response => {
                console.log(response.data)
                if(response.data.status == 200){
                    dispatch(getAllTopicSuccess(response.data.topics))

                }else{
                    dispatch(getAllTopicsFailure(response.data))
                }
            })
              .catch(err => {
               console.log(err)
               dispatch(getAllTopicsFailure(response.data))

          })
      };
    }



    export function getAllTopics() {
      return {
        type: FETCHING_TOPICS
      }
    }

    export function getAllTopicSuccess(data) {
      return {
        type: FETCHING_TOPICS_SUCCESS,
        data,
      }
      realm.write(() => {
        realm.create('topics', data);
      })

    }

    export function getAllTopicsFailure() {
      return {
        type: FETCHING_TOPICS_FAIL
      }
    }

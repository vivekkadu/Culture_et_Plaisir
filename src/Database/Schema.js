export const Topics = {
  name: 'topic',
   properties:
   {
     id: 'string',
     name: 'string',
     description: 'string',
     content: 'string',
     total_que: {type: 'int', default: 0 }

   }
};

export const Questions = {
  name: 'questions',
  properties:
  {
    id: 'string',
    name:'string',
    topic_id: 'string',
    question: 'string',
    answer_1: 'string',
    answer_2: 'string',
    answer_3: 'string',
    correct_answer: 'string',
    explaination: 'string',
    user_ans: 'string'

  }
};


export const TopicProgress = {
  name: 'topic_progress',
  properties: {
    topic_id: 'string',
    question_attempt:  { type: 'int', default: 0 }
  }
}

export const QueAns = {
  name: 'answers',
  properties:{
    topic_id: 'string',
    queId: {type: 'int', default: 0 },
    answer: 'string'
  }
}


export const AttendedMixQue = {
  name: 'attended_mix_questions',
  properties:{
    id: 'string',
    name: 'string',
    topic_id: 'string',
    question: 'string',
    answer_1: 'string',
    answer_2: 'string',
    answer_3: 'string',
    correct_answer: 'string',
    explaination: 'string',
    user_ans: 'string'
  }
}

export const AttendedQue = {
  name: 'attended_questions',
  properties:{
    id: 'string',
    name: 'string',
    topic_id: 'string',
    question: 'string',
    answer_1: 'string',
    answer_2: 'string',
    answer_3: 'string',
    correct_answer: 'string',
    explaination: 'string',
    user_ans: 'string'
  }
}

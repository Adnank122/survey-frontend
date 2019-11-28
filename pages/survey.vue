<template>
  <div class="container  mx-auto">
    <div class="row">
      <div class="col-md-8 mx-auto">
        <form class="mt-5" @submit.prevent="submitSurvey">
          <div
            v-for="(question, index) in questions"
            :key="index"
            class="form-group"
          >
            <div class="p-1" style="color:white; background:gray;">
              <p>{{ question.questionText }}</p>
            </div>
            <custom-input
              v-for="(answer, aindex) in question.answers"
              :key="aindex"
              :answerText="answer.answerText"
              :questionType="question.questionType"
              :answerId="answer.id"
              :questionId="question.id"
              @change-answers="changeAnswers"
            />
          </div>
          <button type="submit" class="btn btn-block btn-info">
            Submit Survey
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import CustomInput from '@/components/CustomInput'
export default {
  components: {
    CustomInput
  },
  data() {
    return {
      questions: [],
      userAnwers: [],
      user: this.$store.state.user
    }
  },
  methods: {
    changeAnswers({ answerId }) {
      if (!this.userAnwers.includes(answerId)) {
        this.userAnwers.push(answerId)
      } else {
        this.userAnwers = this.userAnwers.filter(id => id !== answerId)
      }
    },
    async submitSurvey() {
      const payload = this.userAnwers.map(answerId => {
        return { userId: this.$store.state.user.id, answerId }
      })
      const result = await Axios.post('http://localhost:4000/user-answers', {
        answers: payload
      })
      console.log('Result uswer ans', result.data)
    }
  },
  async created() {
    const result = await Axios.get('http://localhost:4000/questions')
    this.questions = result.data
    console.log('Questions are', result.data)
  }
}
</script>

<template>
  <div class="row">
    <div class="col-md-6 mx-auto mt-5">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for>Name</label>
          <input type="text" class="form-control" v-model="name" id="name" name="name" required />
        </div>
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="email"
            name="email"
            required
            aria-describedby="emailHelp"
          />
        </div>
        <div class="form-group">
          <label for="education">Education</label>
          <select class="form-control" v-model="education" id="education" name="education" required>
            <option>Metric</option>
            <option>Intermediate</option>
            <option>Bachelors</option>
            <option>Masters</option>
            <option>Ph.D</option>
          </select>
        </div>

        <div class="form-group">
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              id="male"
              value="male"
              name="gender"
              required
              v-model="gender"
            />
            <label class="form-check-label" for="male">Male</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              id="female"
              v-model="gender"
              value="female"
              name="gender"
              required
            />
            <label class="form-check-label" for="female">Female</label>
          </div>
        </div>

        <button type="submit" class="btn btn-block btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      name: '',
      email: '',
      gender: '',
      education: ''
    }
  },
  mounted() {
    const commands = {
      hello: function() {
        alert('Hello, annyang')
      }
    }
  },
  methods: {
    async handleSubmit() {
      const data = {
        name: this.name,
        email: this.email,
        gender: this.gender,
        education: this.education
      }
      try {
        const result = await axios.post('http://localhost:4000/users', {
          ...data
        })

        this.$store.commit('addUser', result.data)
        this.$router.push('/survey')
        console.log('result is', result)
        console.log('User', this.$store.state.user)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

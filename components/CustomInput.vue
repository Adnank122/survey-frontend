<template>
  <div class="form-check py-2">
    <input
      class="form-check-input"
      :type="inputProps.type"
      :id="inputProps.id"
      :value="answerId"
      :name="inputProps.name"
      @change="$emit('change-answers', { answerId })"
    />
    <label class="form-check-label" for="male">{{ answerText }}</label>
  </div>
</template>

<script>
export default {
  props: {
    questionType: {
      type: String,
      required: true,
      default: 'single'
    },
    answerText: {
      type: String,
      required: true
    },
    answerId: {
      type: Number,
      required: true
    },
    questionId: {
      type: Number,
      required: true
    }
  },

  computed: {
    inputProps() {
      let props =
        this.questionType === 'multiple'
          ? {
              type: 'checkbox',
              id: `check-${this.answerId}`,
              value: this.answerId,
              name: `check-${this.answerId}`
            }
          : {
              type: 'radio',
              id: `radio-${this.answerId}`,
              value: this.answerId,
              name: `radio-${this.questionId}`
            }
      return props
    }
  }
}
</script>

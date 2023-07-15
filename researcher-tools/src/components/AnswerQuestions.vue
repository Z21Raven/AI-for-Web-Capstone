<script setup>
import { ref, computed } from "vue";
import axios from "axios";
axios.defaults.timeout = 10000;

const myQuestion = ref("");
const modelAnswer = ref("");
const props = defineProps({
  paragraph: String,
});

// this is the format of data that a 'model' wants as an argument.
const qnaInputs = computed(() => {
  return {
    modelInputs: {
      question: myQuestion.value,
      context: props.paragraph,
    },
  };
});

const answerQ = async () => {
  const { paragraph } = props;
  if (paragraph == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "There is no context",
    });
    return;
  } else {
    // Request attempting start

    const url = "http://localhost:5043/qna";
    const maxAttempts = 5; // Maximum number of attempts
    const retryInterval = 2000; // Delay between retry attempts in milliseconds

    async function sendRequest(attempt = 1) {
      try {
        const requestAnswer = await axios.post(url, qnaInputs.value);
        if (requestAnswer.status === 200) {
          return requestAnswer.data;
        } else {
          if (attempt < maxAttempts) {
            console.log("Received status code:", requestAnswer.status);
            console.log("Retrying request...");
            await delay(retryInterval);
            return sendRequest(attempt + 1); // Retry the request
          } else {
            throw new Error("Maximum number of attempts reached");
          }
        }
      } catch (error) {
        console.error(error);
        if (attempt < maxAttempts) {
          console.log("Retrying request...");
          await delay(retryInterval);
          return sendRequest(attempt + 1); // Retry the request
        } else {
          throw error;
        }
      }
    }

    // Helper function to delay execution
    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // Usage
    sendRequest()
      .then((data) => {
        // Handle the successful response
        console.log("Response:", data);
        modelAnswer.value = data;
        if (data == "") {
          modelAnswer.value =
            "Sorry, there is no Answer to this question yet. try again";
        }
      })
      .catch((error) => {
        // Handle errors or maximum retries reached
        console.error("Error:", error.message);
        throw error;
      });

    //Request attempting code END
  }
};
</script>

<template>
  <div class="w-1/2 flex flex-col items-center">
    <!-- <label for="question" class="headline-text text-white p-1">
      What is your question?</label
    > -->
    <div class="flex justify-center w-full">
      <input
        id="question"
        v-model.trim="myQuestion"
        type="text"
        placeholder="Ask your question?"
        class="h-10 rounded-lg w-3/4 bg-[#124c62] bg-opacity-50 p-1 text-white border-slate-500 border-2 focus:border-slate-200 focus:outline-none"
        @keyup.enter="answerQ"
      />
    </div>
    <textarea
      id="summary-text"
      rows="5"
      v-model="modelAnswer"
      class="textarea-3d w-3/4 p-1 m-1 text-white text-left text-lg shadow-lg shadow-slate-500/50 border-slate-500 border-2 focus:border-slate-200 focus:outline-none rounded mt-1"
    >
    </textarea>
  </div>
</template>

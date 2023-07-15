<script setup>
import { ref, computed } from "vue";
import axios from "axios";
axios.defaults.timeout = 10000;

// summarizedText is the ref that will handle the result of summarization that will be produced by a paragraphSummary function
const summarizedText = ref("");
const props = defineProps({
  paragraph: String,
});

// This function will return sweetalert for the mentioned reasons below.if everything ok it will generate a summarized text
const paragraphSummary = async () => {
  if (props.paragraph == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "There is no text to Summarize",
    });
    console.log("there is no paragraph");
    return;
  }

  // Summarization Request
  try {
    await axios
      .post("http://localhost:5043/summarize", {
        inputText: props.paragraph,
      })
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
        if (response.data == "") {
          summarizedText.value =
            "Sorry, there is an error interrupt the process. try again";
          return;
        }
        summarizedText.value = response.data;
      });
  } catch (error) {
    console.error(error);
    summarizedText.value =
      "there is an error interrupt the process, press the button again please";
  }
};

// to count the characters of summarized text to compare it with origin paragraph
const answerCount = computed(() => {
  return summarizedText.value.length;
});
</script>

<template>
  <div class="flex flex-col justify-center items-center w-1/2">
    <!-- when click on button the function the event listener will trigger paragraphSummary function -->
    <button
      class="bg-[#124c62] bg-opacity-50 hover:bg-teal-500 animate-bounce border-slate-500 border-2 w-3/4 rounded-xl h-10 text-white headline-text"
      @click="paragraphSummary"
    >
      Summarize the paragraph
    </button>
    <div class="w-3/4 justify-start flex flex-col">
      <textarea
        id="summary-text"
        rows="6"
        v-model.trim="summarizedText"
        class="textarea-3d w-full p-1 m-1 text-white text-left shadow-lg shadow-slate-500/50 border-slate-500 border-2 focus:border-slate-200 focus:outline-none rounded mt-1"
      ></textarea>
      <span class="px-2 text-slate-300">characters: {{ answerCount }}</span>
    </div>
  </div>
</template>

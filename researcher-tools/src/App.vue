<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import TextSummary from "./components/TextSummary.vue";
import AnswerQuestions from "./components/AnswerQuestions.vue";

// paragraph constant, which is the variable that will handle article or any text want to summarize or ask a question about it
const paragraph = ref("");

// Introduction of project
const description = ref(
  "Say goodbye to the painstaking process of manually analyzing articles, and welcome a new era of research efficiency.\n Our research assistance project, designed to streamline the way researchers access and process information effortlessly. We proudly present an  AI-powered platform that revolutionizes the traditional approach to article analysis and comprehension."
);

//to disply the characters below the text area of summarized text or article text. and compare between them
const charactersCount = computed(() => {
  return paragraph.value.length;
});

// Add JavaScript code for the parallax effect
window.addEventListener("scroll", function () {
  var projectDiv = document.getElementById("project-name");
  var appDiv = document.getElementById("app-container");

  var scrollTop = document.documentElement.scrollTop;
  var scrollPercent = scrollTop / window.innerHeight;
  var speedFactor = 0.5; // Adjust this value to increase/decrease the speed

  projectDiv.style.transform =
    "translate3d(0, " + scrollPercent * -50 * speedFactor + "vh, 0)";
  appDiv.style.transform =
    "translate3d(0, " + scrollPercent * 50 * speedFactor + "vh, 0)";
});
// End of parallax effect
</script>
<template>
  <div id="project-container" class="flex flex-col items-center gap-2">
    <!-- Introduction Page -->
    <div
      id="project-name"
      class="bg-cover bg-center h-[100vh] p-4 gap-2 justify-center flex flex-row w-full rounded-lg opacity-90 bg-[#0b0c15]"
      style="background-image: url('./src/assets/gradient-bg-1.png')"
    >
      <div id="intro" class="flex flex-col justify-center w-[60%]">
        <h1 class="text-6xl text-white font-bold py-4">Researcher Tools</h1>
        <br />
        <span class="text-white text-2xl py-4 pr-6 text-justify font-light">
          {{ description }}</span
        >
      </div>
      <!-- 3d object  -->
      <div
        id="d-object"
        class="w-[40%] items-center flex flex-row justify-center"
      >
        <img src="./assets/high-school-boy.png" alt="image" />
      </div>
    </div>

    <!-- Project Start -->
    <div
      id="app-container"
      class="bg-gradient-to-br from-indigo-900 to-teal-600 h-[120vh] items-center justify-center flex flex-col rounded-lg w-full opacity-95"
    >
      <div
        id="App-div"
        class="flex flex-col items-center justify-center h-[70vh]"
      >
        <div class="sm:w-[480px] lg:w-[1024px] p-2">
          <label for="my-text" class="p-2 headline-text text-white">
            <strong>Enter your paragraph here</strong></label
          >
          <!-- bind this text area with paragraph -->
          <textarea
            v-model.trim="paragraph"
            name=""
            id="my-text"
            rows="10"
            style="background-color: rgba(255, 255, 255, 0.14); opacity: 1"
            class="p-2 w-full text-white text-lg text-justify shadow-lg shadow-slate-500/50 border-slate-500 border-2 focus:border-slate-200 focus:outline-none rounded mt-1"
          ></textarea>
          <span class="px-1 text-slate-300"
            >characters: {{ charactersCount }}</span
          >
        </div>
      </div>
      <div id="two-components" class="flex flex-row gap-2 w-full">
        <!-- insert the components here -->
        <TextSummary :paragraph="paragraph" />
        <AnswerQuestions :paragraph="paragraph" />
      </div>
    </div>
  </div>
</template>

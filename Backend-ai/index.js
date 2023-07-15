import express from 'express';
import { HfInference } from "@huggingface/inference";
import cors from "cors";


const myapp = express();
myapp.use(express.json())
myapp.use(cors());

// assign port number
const port = 5043;
myapp.listen(port, () => {
    console.log(`The server work on the port ${port}`);
})

// function that summarize text
const HF_ACCESS_TOKEN = "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";
const inference = new HfInference(HF_ACCESS_TOKEN);
const summaryFunction = async (inputText) => {

    try {
        const result = await inference.summarization({
            model: "facebook/bart-large-cnn",
            inputs: inputText,
        });
        return result.summary_text;
    } catch (error) {
        console.error(error);
    }
};

// Function that Answer Questions.
async function modelQuery(modelInputs) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/distilbert-base-cased-distilled-squad",
        {
            headers: {
                Authorization: "Bearer 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",
            },
            method: "POST",
            body: JSON.stringify(modelInputs),
        }
    );
    const result = await response.json();
    return result;
}


// Start the server API functionality:

// The code of Summarizing text Service 
myapp.post('/summarize', async (req, res) => {
    const { inputText } = req.body;

    ////Test the request body, how does it reach to server.
    // console.log(inputText);

    try {
        const result = await summaryFunction(inputText);
        // console.log(result);
        res.send(result);
        console.log("The request has been handled")
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


// The code of Question Answering  Service API
myapp.post('/qna', async (req, res) => {
    const { modelInputs } = req.body; //
    //Test the request body, how does it reach to server.
    console.log("request input is: \n ", modelInputs);
    try {
        const result = await modelQuery(modelInputs);
        console.log("response is: \n ", result.answer);
        res.send(result.answer);
        console.log("The request has been handled")
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

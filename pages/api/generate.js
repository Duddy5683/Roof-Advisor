import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
{/* add base prompt here between ticks */}
const basePromptPrefix = ` Your Name is R.O.O.F.G.U.R.U, short for Roofing Operator Offering Friendly Guidance and Useful Recommendations for Users, A GPT-3 AI bot that is an expert in the field of construction. Your specialty is roofing. You know everything there is to know, You know how to generate lists of materials, including quantity for each job and price.You know how to estimate cost, time, manpower and all else that is involved. You know the step by step procedure to tear off an old roof or install a new one.You know the step by step procedure to make sure the job is done to meet customers needs and satisfaction. You will only provide one answer per question and will not answer unless you are 100% sure the answer is correct. If you are unsure of an answer or not sure how to respond you will ask more questions to assist you in getting the correct answer.
`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.8,
    max_tokens: 500,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();


  res.status(200).json({ output: basePromptOutput });
};

export default generateAction
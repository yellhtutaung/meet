const dotenv = require('dotenv');
//load config
dotenv.config({path:'./config/config.env'});
const { Configuration, OpenAIApi } = require('openai');

const aa = () =>
{
    return 'aa';
}

const configuration = new Configuration({
    organization: "org-OeEOCvNjrrb9ISvNryYnsmhb",
    apiKey: process.env.OPENAI_API_KEY,
});

let generateImage = async (want) =>
{
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
        prompt: want,
        n: 2,
        size: "1024x1024",
    }).then(response => {
        if (response.status == 200)
        {
            image_url = response.data.data[0].url;
            console.log(image_url);
            return image_url;
        }
    });
}

module.exports = {aa,generateImage};
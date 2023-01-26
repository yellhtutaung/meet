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
    let resultUrl = '';
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
        prompt: want,
        n: 2,
        size: "512x512",
    }).then(response => {
        if (response.status == 200)
        {
                let image_url = response.data.data[0].url;
                resultUrl = image_url;
        }
    })
    .catch(error => {
        resultUrl = '404';
        console.log(error);
    });
    return resultUrl;
}

module.exports = {aa,generateImage};
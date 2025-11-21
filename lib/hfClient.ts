import { HfInference } from '@huggingface/inference';

const hfAccessToken = process.env.HUGGING_FACE_ACCESS_TOKEN;

if (!hfAccessToken) {
    console.warn('Missing Hugging Face Access Token. Check .env.local');
}

export const hf = new HfInference(hfAccessToken);

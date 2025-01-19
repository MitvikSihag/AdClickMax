import os
import requests
from flask import Flask, request, jsonify, send_file
from PIL import Image
from flask_cors import CORS
import google.generativeai as genai
import PIL.Image
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure API keys from environment variables
GOOGLE_GENAI_API_KEY = os.getenv("GOOGLE_GENAI_API_KEY")
STABILITY_API_KEY = os.getenv("STABILITY_API_KEY")

genai.configure(api_key=GOOGLE_GENAI_API_KEY)
gemini_model = genai.GenerativeModel(model_name="gemini-1.5-flash")

@app.route('/generate_ad_image', methods=['POST'])
def generate_ad_image():
    if 'image' not in request.files:
        return jsonify({"error": "No file uploaded under 'image' key."}), 400
    
    uploaded_file = request.files['image']
    if uploaded_file.filename == '':
        return jsonify({"error": "Empty filename"}), 400

    image_path = os.path.join(os.getcwd(), uploaded_file.filename)
    uploaded_file.save(image_path)

    try:
        image_input = PIL.Image.open(image_path)
    except Exception as e:
        return jsonify({"error": f"Failed to open image: {str(e)}"}), 400

    step1_prompt = """
    Act as an expert product researcher. Analyze the attached product image and provide
    a concise yet complete product description (100-120 words). Include:

    1. Product name with no spelling mistake, brand, category (if identifiable).
    2. Key visual attributes (color, shape, texture, text/logos).
    3. Main function or benefits.
    4. Any standout features or style cues.
    5. Brief mention of intended audience or usage context. 
    """

    try:
        response_step1 = gemini_model.generate_content([step1_prompt, image_input])
        product_description = response_step1.text
    except Exception as e:
        return jsonify({"error": f"Gemini image→text generation failed: {str(e)}"}), 500

    step2_prompt = f"""
    You are a creative director preparing an ad prompt for a text-to-image model.
    Base the ad concept on the following product description:

    \"\"\"{product_description}\"\"\"

    In 100-150 words, write a vivid, visually detailed prompt that a text-to-image
    model could follow. Include:

    1. Product name with no spelling mistake from product description, brand, and key benefits.
    2. Suggested setting, mood, and visual style.
    3. Relevant colors, lighting, or props.
    4. Any taglines or short messages to emphasize with no spelling mistakes
    5. Target audiance should be addressed

    Make it engaging, clear, and geared toward a professional, eye-catching advertisement and make it beautiful, attractive and elegant.
    """

    try:
        response_step2 = gemini_model.generate_content([step2_prompt])
        ad_prompt_for_text_to_image = response_step2.text
    except Exception as e:
        return jsonify({"error": f"Gemini text→text generation failed: {str(e)}"}), 500

    stability_url = "https://api.stability.ai/v2beta/stable-image/generate/ultra"
    
    try:
        stability_response = requests.post(
            stability_url,
            headers={"authorization": f"Bearer {STABILITY_API_KEY}", "accept": "image/*"},
            data={"prompt": ad_prompt_for_text_to_image, "output_format": "webp"},
            files={"none": ""}
        )
    except Exception as e:
        return jsonify({"error": f"Failed to call Stability API: {str(e)}"}), 500

    if stability_response.status_code == 200:
        gen_image_path = os.path.join(os.getcwd(), "generated_ad_image.jpg")
        with open(gen_image_path, 'wb') as file:
            file.write(stability_response.content)
        
        return send_file(gen_image_path, mimetype="image/jpeg")
    else:
        try:
            return jsonify({"error": stability_response.json()}), stability_response.status_code
        except:
            return jsonify({"error": "Unknown error from Stability API"}), stability_response.status_code

if __name__ == '__main__':
    app.run(debug=True, port=5000)

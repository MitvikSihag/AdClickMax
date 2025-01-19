import os
import requests
from flask import Flask, request, jsonify, send_file
from PIL import Image
from flask_cors import CORS

# Gemini Flash 1.5 imports
import google.generativeai as genai
import PIL.Image

###############################################################################
# STEP 0: CONFIGURE YOUR GOOGLE GENERATIVE AI AND STABILITY KEYS
###############################################################################
# Replace this with your own Google Generative AI key:
genai.configure(api_key="AIzaSyCC6jbp4nx0oZ-Khbk0WXO6h1jJ3cRvhhI")

# Initialize the Gemini Flash 1.5 model
gemini_model = genai.GenerativeModel(model_name="gemini-1.5-flash")

# Replace this with your actual Stability API key:
STABILITY_API_KEY = "sk-8aJYCOCKvAT6Vfw4dTM6SIq28HvxFh9SSET7VPu3CIrpLiUn"

app = Flask(__name__)
CORS(app)

###############################################################################
# FLASK ROUTE FOR THE END-TO-END PIPELINE
###############################################################################
@app.route('/give_product_description', methods=['POST'])
def generate_ad_image():
    # ------------------------------------------------
    # STEP A: Handle incoming file from request
    # ------------------------------------------------
    if 'image' not in request.files:
        return jsonify({"error": "No file uploaded under 'image' key."}), 400
    
    uploaded_file = request.files['image']
    if uploaded_file.filename == '':
        return jsonify({"error": "Empty filename"}), 400

    # Save the uploaded file (e.g., to the current directory)
    image_path = os.path.join(os.getcwd(), uploaded_file.filename)
    uploaded_file.save(image_path)

    # ------------------------------------------------
    # STEP B: IMAGE → TEXT (Using Gemini Flash 1.5)
    # ------------------------------------------------
    # 1. Load your input product image using Pillow
    try:
        image_input = PIL.Image.open(image_path)
    except Exception as e:
        return jsonify({"error": f"Failed to open image: {str(e)}"}), 400

    # 2. Create the prompt for extracting a detailed product description
    step1_prompt = """
    Act as an expert product researcher. Analyze the attached product image and provide
    a concise yet complete product description (100-120 words). Include:

    1. Product name with no spelling mistake, brand, category (if identifiable).
    2. Key visual attributes (color, shape, texture, text/logos).
    3. Main function or benefits.
    4. Any standout features or style cues.
    5. Brief mention of intended audience or usage context. 
    """

    # 3. Generate text from the image using Gemini
    try:
        response_step1 = gemini_model.generate_content([step1_prompt, image_input])
        product_description = response_step1.text
        return product_description
    except Exception as e:
        return jsonify({"error": f"Gemini image→text generation failed: {str(e)}"}), 500
    

if __name__ == "__main__":
    app.run(debug=True, port=5001)
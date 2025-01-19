import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS
import json
import re

load_dotenv()

api_key = os.getenv("GENAI_API_KEY")
genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-1.5-flash")

app = Flask(__name__)
CORS(app)

ADS_PLATFORMS = [
    "Google Ads",
    "Facebook",
    "Instagram",
    "Twitter",
    "LinkedIn",
    "YouTube",
    "Snapchat",
    "Pinterest",
    "Reddit",
    "Quora",
    "Yahoo Ads",
    "Bing Ads",
    "Amazon Ads",
    "AdRoll"
]

def get_ranked_platforms(category, product, platforms):
    prompt_text = f"""
    You are an AI marketing expert with extensive experience in digital advertising.
    The user has a product named "{product}" in the category "{category}".
    We have the following potential advertising platforms: {platforms}.

    Please:
    1. Rank these platforms from most relevant to least relevant for advertising this product.
    2. Assign a recommended budget percentage for each platform (so that the total of all platforms can sum to 100%).
    3. Return a strictly valid JSON array of objects, where each object has exactly two fields:
       "platform" (string) and "percentage" (number). For example:
       [
         {{
           "platform": "Google Ads",
           "percentage": 30
         }},
         ...
       ]
    """

    try:
        response = model.generate_content(prompt_text)
        generated_text = response.text.strip()
        generated_text = re.sub(r"```(\w+)?", "", generated_text)
        ranked_data = json.loads(generated_text)

        if not isinstance(ranked_data, list) or any(not isinstance(item, dict) for item in ranked_data):
            ranked_data = [{"platform": p, "percentage": 0} for p in platforms]
    except Exception as e:
        ranked_data = [{"platform": p, "percentage": 0} for p in platforms]

    return ranked_data

@app.route('/api/recommend-ads', methods=['GET'])
def recommend_ads():
    category = request.args.get('category')
    product = request.args.get('product')
    count = request.args.get('count', default=3, type=int)

    if not category or not product:
        return jsonify({"error": "Missing required query parameters: 'category' or 'product'."}), 400

    ranked_platforms = get_ranked_platforms(category, product, ADS_PLATFORMS)
    recommended_platforms = ranked_platforms[:count]

    return jsonify({
        "category": category,
        "product": product,
        "recommendedPlatforms": recommended_platforms
    }), 200

if __name__ == '__main__':
    app.run(debug=True, port=5002)

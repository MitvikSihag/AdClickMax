from flask import Flask, request, jsonify
import google.generativeai as genai
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],  # Add your React app's origin
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Hard-coded Gemini Flash 1.5 API key (avoid this in production)
GEMINI_API_KEY = "AIzaSyAgI5dWlELKmcw1GWm18pAlm6qh368k4CI"
genai.configure(api_key="AIzaSyAgI5dWlELKmcw1GWm18pAlm6qh368k4CI")

@app.route('/generate_ad_recommendations', methods=['GET'])
def generate_ad_recommendations():
    product_description = request.args.get('product_description', 'Default description')
    
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = f"""
        You are an AI specialized in marketing recommendations. 
        We have a product described as:
        "{product_description}"

        Based on this description, recommend multiple advertising platforms.
        Return only a valid JSON array of objects. Each object must have:
          "ad_platform": (one of: "Google Ads", "Facebook", "Instagram", "Twitter",
                          "LinkedIn", "YouTube", "Snapchat", "Pinterest", "Reddit",
                           "Quora", "Yahoo Ads", "Bing Ads", "Amazon Ads", "AdRoll"),
          "percentage":  (integer from 0 to 100, summing to ~100 across recommendations),
          "Reason":      (a concise explanation).

        Do not return any additional text or commentary.
        Example (only JSON, no extra words):
        [
          {{
            "ad_platform": "YouTube",
            "percentage": 40,
            "Reason": "Showcases video demonstrations effectively."
          }},
          ...
        ]
        """

    response = model.generate_content(prompt)
    generated_text = response.text[8:-5]
    
    # Parsing the text into JSON assuming the output is in correct JSON format
    try:
        json_response = json.loads(generated_text)
        return jsonify(json_response)
    except json.JSONDecodeError:
        return jsonify({"error": "Failed to decode the generated content"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5003)
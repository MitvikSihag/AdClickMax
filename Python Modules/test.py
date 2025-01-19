from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import google.generativeai as genai
import json
import os
from typing import Dict, List, Tuple
from dataclasses import dataclass
import logging
from dotenv import load_dotenv
from flask_cors import CORS

# load_dotenv()

# app = Flask(__name__)
# CORS(app)

# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

genai.configure(api_key="AIzaSyAHFPnQtTVx07h9gP02lkx-JT_8_Hidrb0")
model = genai.GenerativeModel('gemini-pro')

def analyze_product_with_gemini(product_description: str, week: int) -> dict:
    """
    Sends product description to Gemini API and processes the response
    """
    try:
        prompt = f"""
        Analyze this product description and provide advertising platform recommendations in a structured JSON format:
        
        Product: {product_description}
        Week: {week}

        Return the response in this exact JSON structure:
        
            "platform_recommendations": [
                {{
                    "name": "string", description : name of the social media platform
                    "budget_percentage": number, percentage in number out of 100
                    "reasoning": "string" , reason to choose that social media platform
                }}
            ]

        Important: Ensure budget percentages sum to 100 and are numbers (not strings).
        The names reccommended of the ads platform should be based on {product_description} so as to generate maximum revenue.
        Only give names of social media platform from following list :  [
     "Google Ads"
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
        """
        print(model.generate_content(prompt))
        # Get response from Gemini
        response = model.generate_content(prompt)
        
        # Log the raw response for debugging
        logger.info(f"Raw Gemini response: {response.text}")
        
        # Extract the JSON part from the response
        # Find the first { and last } to extract only the JSON part
        text = response.text
        start_idx = text.find('{')
        end_idx = text.rfind('}') + 1
        json_str = text[start_idx:end_idx]
        
        # Parse and validate the JSON
        analysis = json.loads(json_str)
        
        logger.info(f"Processed analysis: {analysis}")
        return analysis
        
    except Exception as e:
        logger.error(f"Error in Gemini API call: {str(e)}")
        # Return a default structure in case of error
        return {
            "target_audience": {
                "age_group": "25-34",
                "gender": "All",
                "income_level": "Medium"
            },
            "platform_recommendations": [
                {
                    "name": "Facebook",
                    "budget_percentage": 30,
                    "reasoning": "Default allocation due to error"
                },
                {
                    "name": "Instagram",
                    "budget_percentage": 25,
                    "reasoning": "Default allocation due to error"
                },
                {
                    "name": "LinkedIn",
                    "budget_percentage": 20,
                    "reasoning": "Default allocation due to error"
                },
                {
                    "name": "YouTube",
                    "budget_percentage": 25,
                    "reasoning": "Default allocation due to error"
                }
            ]
        }

print(analyze_product_with_gemini("Red Dress", 1))
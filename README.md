# AI-Driven Ad Generation & Distribution

Welcome to the **AI-Driven Ad Generation & Distribution** project! This repository contains two core Flask services that work together to:

1. **Generate a custom advertisement image** from a single product image using an AI pipeline (Gemini 1.5 → Stability AI).
2. **Recommend ideal advertising platforms** (such as YouTube, LinkedIn, or Instagram) for the generated ad based on a textual product description.

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [1. Run the *Image Ad Generation* Service (`imageUpload.py`)](#1-run-the-image-ad-generation-service-imageuploadpy)
  - [2. Test the *Ad Distribution* Service (`distribution.py`)](#2-test-the-ad-distribution-service-distributionpy)
  - [Example Usage with cURL or Postman](#example-usage-with-curl-or-postman)
- [Endpoints](#endpoints)
  - [Generate Ad Image](#generate-ad-image)
  - [Generate Ad Recommendations](#generate-ad-recommendations)
- [File Structure](#file-structure)
- [Environment & Configuration](#environment--configuration)
- [Important Notes](#important-notes)
- [License](#license)
- [Contact](#contact)

---

## Overview

This project showcases a **fully automated solution** for:
1. **Ad Creation**: Generating a fully designed advertisement image from a basic product photo, leveraging:
   - **Gemini Flash 1.5** (Google Generative AI) for \[image → text\] and \[text → text\].
   - **Stable Diffusion** (Stability AI) for \[text → image\].
2. **Platform Distribution**: Suggesting which social platforms to advertise on, based on the product’s description and usage context. The AI (Gemini) returns a JSON array of recommended platforms (YouTube, Instagram, LinkedIn, etc.) with percentage allocations.

The pipeline is broken into **two Flask services**:

1. **`imageUpload.py`**  
   - Accepts a product image and uses a three-stage AI prompt chain to create a final advertisement image.  

2. **`distribution.py`**  
   - Takes a product description and returns AI-curated suggestions on where to allocate the ad budget (e.g., YouTube, Instagram, LinkedIn).  

Together, these services form an **end-to-end** system for turning a **single product image** into a **custom AI-driven ad** and recommended **ad distribution strategy**.

---

## Key Features

- **Image→Text Extraction**: Uses Gemini Flash 1.5 to generate a **detailed product description** from an uploaded product image.
- **Text→Text Generation**: Prompts Gemini again to create an **optimized ad prompt** (focus on creative, marketing-oriented language).
- **Text→Image Rendering**: Uses **Stability AI** to create a **final ad image** from the AI-generated prompt.
- **Platform Allocation**: Suggests marketing platforms based on the product description, returning recommended percentages in JSON.
- **Easy Integration**: Minimal setup with Flask, simple REST endpoints, and optional front-end integration.

---

## Architecture

```mermaid
flowchart LR
    A[Upload Product Image] --> B[Flask API (imageUpload.py)]
    B --> |Gemini Flash 1.5 (image->text)| C[Detailed Product Description]
    C --> |Gemini Flash 1.5 (text->text)| D[Ad Prompt]
    D --> |Stability AI (text->image)| E[Generated Ad Image]

    E --> G[Ad Created]

    F[distribution.py Flask API] --> H[Gemini Flash 1.5 (text->recommendations)]
    H --> I[Recommended Platforms + Percentage]

    C --> F[Send 'product_description' to distribution.py for platform allocation]
    G --> I
```

1. **imageUpload.py**  
   1. Receives a product image.  
   2. Converts it to a textual product description (Gemini).  
   3. Converts that description to an ad prompt (Gemini).  
   4. Uses the final prompt to generate an ad image (Stability AI).  
2. **distribution.py**  
   1. Receives the textual product description.  
   2. Returns recommended platforms and allocations in JSON format (Gemini).  

---

## Prerequisites
- **Python 3.7+**  
- **Pipenv or virtualenv** (recommended for isolated environments).
- **Stability AI** API credentials (your personal `STABILITY_API_KEY`).
- **Google Generative AI (Gemini) key** (`GEMINI_API_KEY`).

**Dependencies**:
- `requests`
- `flask`
- `flask_cors`
- `PIL` (Pillow)
- `google-generativeai` (official Python SDK for Gemini)

---

## Installation

1. **Clone** this repository:  
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd <your-repo>
   ```

2. **Create and activate a virtual environment** (recommended):  
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

3. **Install required packages**:
   ```bash
   pip install -r requirements.txt
   ```
   *(If you do not have a `requirements.txt`, install manually:)*  
   ```bash
   pip install flask flask_cors requests Pillow google-generativeai
   ```

4. **Set up API Keys**. You can either:
   - **Hard-code** them in the scripts (not recommended for production).
   - Use **environment variables** (see [Environment & Configuration](#environment--configuration) below).

---

## Usage

Below is a quick start for running each service.

### 1. Run the *Image Ad Generation* Service (`imageUpload.py`)

1. **Navigate** to the folder containing `imageUpload.py`.
2. **Run**:
   ```bash
   python imageUpload.py
   ```
3. By default, the service listens on `http://127.0.0.1:5000`.

**Endpoints**:  
- `POST /generate_ad_image` (multipart/form-data with key `image`)

### 2. Test the *Ad Distribution* Service (`distribution.py`)

1. **Navigate** to the folder containing `distribution.py`.
2. **Run**:
   ```bash
   python distribution.py
   ```
3. By default, it listens on `http://127.0.0.1:5003`.

**Endpoints**:  
- `GET /generate_ad_recommendations?product_description=YOUR_DESC_HERE`

---

### Example Usage with cURL or Postman

#### Ad Generation

- **URL**: `http://127.0.0.1:5000/generate_ad_image`
- **Method**: `POST`
- **Form Data**: 
  - **Key** = `image`
  - **Type** = `File`
  - **Value** = (select your product image file)

For example, in *cURL*:
```bash
curl -X POST \
     -F "image=@/path/to/your_product_image.jpg" \
     http://127.0.0.1:5000/generate_ad_image \
     --output generated_ad_image.jpg
```
The response is a **JPEG** file (the AI-generated ad), which you can save locally by specifying `--output`.

#### Ad Distribution (Platform Recommendations)

- **URL**: `http://127.0.0.1:5003/generate_ad_recommendations`
- **Method**: `GET`
- **Query Param**: `product_description`

For example:
```bash
curl "http://127.0.0.1:5003/generate_ad_recommendations?product_description=A%20high-quality%20wireless%20earbud"
```

**Sample JSON response**:
```json
[
  {
    "ad_platform": "YouTube",
    "percentage": 40,
    "Reason": "Showcases video demos effectively."
  },
  {
    "ad_platform": "Instagram",
    "percentage": 35,
    "Reason": "Visually driven audience for style-focused ads."
  },
  {
    "ad_platform": "LinkedIn",
    "percentage": 25,
    "Reason": "Professional demographic likely to afford premium earbuds."
  }
]
```

---

## Endpoints

### Generate Ad Image
- **Route**: `POST /generate_ad_image`
- **Request**: 
  - Body: Form Data
    - **Key**: `image` (file to be uploaded)
- **Response**: 
  - `200 OK`: Returns generated ad image (`.jpg` format).
  - `4xx/5xx`: JSON error describing the issue.

### Generate Ad Recommendations
- **Route**: `GET /generate_ad_recommendations?product_description=<your_description>`
- **Response**: 
  - `200 OK`: JSON array of recommendation objects:  
    ```json
    [
      {
        "ad_platform": "LinkedIn",
        "percentage": 30,
        "Reason": "Professional environment matching product's target user base."
      },
      ...
    ]
    ```
  - `5xx`: JSON error if the AI call or JSON parsing fails.

---

## File Structure

```
.
├── imageUpload.py        # Flask service for generating ad images
├── distribution.py       # Flask service for platform recommendations
├── requirements.txt      # (Optional) If you have listed dependencies
├── README.md             # This file
└── ...
```

---

## Environment & Configuration

1. **Google Generative AI (Gemini) Key**  
   - Hard-coded as `genai.configure(api_key="...")` in both files.
   - **Production**: Use environment variables or a secure secrets manager.

2. **Stability AI Key**  
   - Defined as `STABILITY_API_KEY` in `imageUpload.py`.
   - **Production**: Also recommended to store securely or in environment variables.

3. **Ports**:
   - `imageUpload.py` runs on **5000** by default.
   - `distribution.py` runs on **5003** by default.

4. **CORS**: 
   - `imageUpload.py` is configured for default CORS usage.
   - `distribution.py` has an example CORS configuration to allow requests from `localhost:3000` (in case you have a React front-end).

---

## Important Notes

1. **Avoid Hard-Coding Keys**  
   In a real-world scenario, you should never commit or hard-code API keys. This code is for demonstration only.

2. **Gemini Flash 1.5 Model**  
   - The code references `gemini-1.5-flash`. Make sure your Google Generative AI environment is set up to access this model.

3. **Stability AI**  
   - The endpoint used is:  
     ```
     https://api.stability.ai/v2beta/stable-image/generate/ultra
     ```
   - You may need to ensure your billing plan or token scope allows this.

4. **Image Output**  
   - The final ad is saved locally as `generated_ad_image.jpg`. You can modify `imageUpload.py` to change the output format or filename.

5. **JSON Output (Distribution)**  
   - The `distribution.py` script attempts to parse the entire Gemini response into JSON. If Gemini returns extraneous data, parsing may fail. Prompt is designed to strictly return valid JSON.

---

## License

This project is provided **as-is** under no particular open-source license by default. If you intend to open-source it, [choose a license](https://choosealicense.com/) and include it here.  

*(Replace the above statement with your chosen license text if needed.)*

---

## Contact

- **Author**: [Your Name or Team]
- **Email**: [your_email@example.com]
- **GitHub**: [github.com/your-username]

Feel free to open any issues or pull requests if you find bugs or want to contribute features! 

---

**Thank you for using our AI-Driven Ad Generation & Distribution solution!**

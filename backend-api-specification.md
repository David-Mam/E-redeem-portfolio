# API Specification: Headless Campaign Execution Engine

**To:** Backend Engineering (Laravel)
**Subject:** Dynamic Campaign Rendering & Transactional API Endpoints

## Overview
This document outlines the REST API requirements for the E-Redeem campaign execution portal. The frontend is built to be entirely dynamic. When a user navigates to a campaign URL (e.g., `/campaigns/milo-champions`), the frontend will rely entirely on the Laravel backend to tell it what colors to use, what images to display, what text to render, and what activity (quiz, poll, raffle, etc.) the user must complete. 

The campaign listing page (`/campaigns`) is excluded from this scope.

Below are the **GET** (Content/Rendering) and **POST** (Transactional) endpoints required to render and drive the campaign portal.

---

## 1. The Rendering Endpoint (GET)

This is the core endpoint. The frontend will hit this to retrieve the entire visual and structural layout of the campaign.

**Endpoint:** `GET /api/v1/campaigns/{slug}`
**Description:** Fetches the complete configuration for a specific campaign.

### Expected JSON Response
*Note to Developer: You will likely need Eloquent models for `Campaign`, `CampaignTheme`, `CampaignActivity`, and `CampaignSteps` to construct this JSON Resource.*

```json
{
  "success": true,
  "data": {
    "id": "uuid-or-id",
    "slug": "milo-champions-league",
    
    // 1. BRANDING & VISUALS
    "visuals": {
      "clientName": "Nestlé Milo",
      "logoText": "MILO",
      "bannerUrl": "https://your-s3-bucket.com/assets/milo-stadium.jpg",
      "theme": {
        "primary": "#006B3F",       // Used for Active Stepper and Highlights
        "primaryHover": "#005230",  
        "secondary": "#F8B800",     // Used for Primary Call-to-Action Buttons
        "background": "#041F14",    // Page Background overlay
        "surface": "#0B2E20",       // Modals and Stepper Container
        "cardBg": "#123D2B",        // Inner cards and inputs
        "text": "#F5FAF6",          // Primary Text
        "textMuted": "#A4C8B5",     // Secondary/Helper Text
        "border": "#1F543C"         // Input borders and dividers
      }
    },

    // 2. HERO COPY & TEXT
    "copy": {
      "campaignName": "Milo Champions League 2026",
      "rewardHeadline": "Free Airtime & Sports Kits",
      "sponsorTag": "Nestlé Milo",
      "instructions": "Scan the QR code, Input your on-pack promo code and stand a chance to win instant rewards.",
      "inputPlaceholder": "Enter your 8-digit code",
      "buttonText": "Redeem Now"
    },

    // 3. CAMPAIGN RULES & STEPPER FLOW
    "flow": {
      "formType": "code",              // "code" (requires PIN) or "codeless" (just phone number)
      "rewardType": "physical",        // "physical", "airtime", "data", or "cash"
      
      // Dictates exactly what steps appear in the UI Progress Tracker
      "steps": [
        { "id": "code", "label": "Enter Code" },
        { "id": "activity", "label": "Brand Trivia" },
        { "id": "kyc", "label": "Participant KYC" },
        { "id": "requirement", "label": "Reward Claim" },
        { "id": "result", "label": "Confirmation" }
      ]
    },

    // 4. ACTIVITY CONTENT
    "activity": {
      "mechanicType": "quiz",          // Can be: "quiz", "poll", "survey", "vote", "raffle", "short-code"
      
      // The payload below changes based on the mechanicType
      "mechanicData": {
        "passingScore": 2,
        "questions": [
          {
            "id": "q1",
            "question": "Which crucial vitamin in Milo helps unlock energy?",
            "options": ["Vitamin C", "B-Vitamins", "Vitamin D", "Vitamin A"],
            "correctIndex": 1,
            "explanation": "B-Vitamins help release energy from the food you eat!"
          },
          {
            "id": "q2",
            "question": "What is the official tagline of Milo?",
            "options": ["Just Do It", "Nourish Your Dreams", "Energy to go further", "Taste the feeling"],
            "correctIndex": 2,
            "explanation": "Milo gives you the energy to go further."
          }
        ]
      }
    }
  }
}
```

---

## 2. Transactional Endpoints (POST)

As the user interacts with the page, the frontend will make POST requests to progress through the campaign steps securely. 

### A. Validate Promo Code (Step 1)
**Endpoint:** `POST /api/v1/campaigns/{slug}/validate-code`
**Description:** Validates the user's input code against the WCI (Winning Code Iteration) database.
**Request Payload:**
```json
{
  "code": "ML-8821"
}
```
**Response (Success):**
```json
{
  "success": true,
  "message": "Code is valid.",
  "data": {
    "sessionToken": "jwt-or-random-string-to-track-flow"
  }
}
```

### B. Submit Activity (Step 2)
**Endpoint:** `POST /api/v1/campaigns/{slug}/activity`
**Description:** Submits the outcome of the mechanic (e.g., their quiz score, their poll vote).
**Request Payload:**
```json
{
  "sessionToken": "...",
  "activityType": "quiz",
  "data": {
    "score": 2,
    "passed": true
  }
}
```
**Response (Success):**
```json
{
  "success": true,
  "message": "Activity recorded successfully."
}
```

### C. Submit KYC (Step 3)
**Endpoint:** `POST /api/v1/campaigns/{slug}/kyc`
**Description:** Captures the participant's demographic data before they can claim the reward.
**Request Payload:**
```json
{
  "sessionToken": "...",
  "fullName": "Adebayo Ogunlesi",
  "email": "adebayo@example.com",
  "phone": "08012345678",
  "ageConsent": "18_plus"
}
```
**Response (Success):**
```json
{
  "success": true,
  "message": "KYC saved successfully."
}
```

### D. Submit Reward Claim (Step 4)
**Endpoint:** `POST /api/v1/campaigns/{slug}/claim`
**Description:** Finalizes the flow. Depending on `rewardType`, this either accepts a delivery address for physical items, or triggers automated Airtime/Data disbursement via a Telco API.
**Request Payload (For Physical Reward):**
```json
{
  "sessionToken": "...",
  "deliveryAddress": "15 Marina Street",
  "deliveryState": "Lagos",
  "deliveryLga": "Lagos Island"
}
```
**Response (Success):**
```json
{
  "success": true,
  "message": "Reward claimed successfully.",
  "data": {
    "transactionRef": "WCI-MILO-847291"
  }
}
```

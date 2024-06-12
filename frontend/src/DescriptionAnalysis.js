import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DescriptionAnalysis = () => {
    const [sentiments, setSentiments] = useState([]);
    const baseURL = 'http://localhost:3000/api/feedbackcategories';

    useEffect(() => {
        const fetchCategoryDescriptions = async () => {
            try {
                // Fetch category data
                const { data: categories } = await axios.get(baseURL);
                analyzeSentiments(categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategoryDescriptions();
    }, []);

    const analyzeSentiments = async (categories) => {
        const key = '1ef8c84d1be0e550750908434ea31158'; // Your API key
        const endpoint = 'https://api.meaningcloud.com/sentiment-2.1';

        categories.forEach(async category => {
            if (category.description) {
                try {
                    const response = await axios.post(endpoint, null, {
                        params: {
                            key: key,
                            lang: 'en', // assuming English for simplicity
                            txt: category.description,
                            txtf: 'plain'
                        }
                    });
                    const result = response.data;
                    if (result.status.code === "0") {
                        setSentiments(prev => [...prev, {
                            description: category.description,
                            score: result.score_tag,
                            agreement: result.agreement,
                            subjectivity: result.subjectivity,
                            confidence: result.confidence,
                            irony: result.irony
                        }]);
                    } else {
                        console.error('API error:', result.status.msg);
                    }
                } catch (error) {
                    console.error('Error calling API:', error);
                }
            }
        });
    };

    return (
        <div>
            <h2>Sentiment Analysis of Feedback Category Descriptions</h2>
            {sentiments.length > 0 ? (
                <ul>
                    {sentiments.map((sentiment, index) => (
                        <li key={index}>
                            <p>Description: {sentiment.description}</p>
                            <p>Sentiment: {sentiment.score}</p>
                            <p>Agreement: {sentiment.agreement}</p>
                            <p>Subjectivity: {sentiment.subjectivity}</p>
                            <p>Confidence: {sentiment.confidence}</p>
                            <p>Irony: {sentiment.irony}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No sentiment data available or no descriptions to analyze.</p>
            )}
        </div>
    );
};

export default DescriptionAnalysis;

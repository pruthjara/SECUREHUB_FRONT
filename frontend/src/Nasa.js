import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Nasa = () => {
    const [apodData, setApodData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://138.4.11.247:9000/api/apod`, {
                    withCredentials: true,
                });
                console.log("Response data:", response.data);
                setApodData(response.data);
            } catch (error) {
                if (error.response) {
                    console.error("Error response data:", error.response.data);
                    console.error("Error response status:", error.response.status);
                    setError(`Error: ${error.response.status} - ${error.response.data}`);
                } else if (error.request) {
                    console.error("Error request:", error.request);
                    setError(error.request);
                } else {
                    console.error("Error message:", error.message);
                    setError("Error: " + error.message);
                }
            } finally {
                setLoading(false);  
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>Error: {error}</div>;
    }

    const { title, url, explanation, copyright, date } = apodData || {};

    if (!url || !title) {
        return <div style={{ color: 'red' }}>Error: Missing critical data from the API response.</div>;
    }

    return (
        <div>
            <h2>{title || "No Title Available"}</h2>
            <img src={url || "default-image.jpg"} alt={title || "No Title Available"} />
            <p>{explanation || "No explanation available."}</p>
            {copyright && <p><strong>Copyright:</strong> {copyright}</p>}
            <p><strong>Date:</strong> {date || "Unknown date"}</p>
        </div>
    );
};

export default Nasa;

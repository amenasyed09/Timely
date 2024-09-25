import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';  
import Section from './Section';

function FullHistoryPage() {
  const { id } = useParams();  
  const [item, setItem] = useState(null);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/fullHistoryPage/${id}`);
        const fetchedItem = response.data;

        setItem(fetchedItem);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [id]);

  useEffect(() => {
    if (item && item.description) {
      const paragraphs = item.description.split('\n\n');
      const sectionContents = [];

      paragraphs.forEach((paragraph, index) => {
        const lines = paragraph.split('\n');
        const title = lines[0]; 
        const content = lines.slice(1).join('\n'); 
        const imageUrl = item.urlToImage[index % item.urlToImage.length];

        sectionContents.push({
          title: title,
          content: content,
          imageUrl: imageUrl,
        });
      });

      setSections(sectionContents);
    }
  }, [item]);

  return (
    <div className="brief-page font-playfair">
      {item ? (
        <>
          <h1 className="text-center text-4xl mt-8 mb-6">{item.title}</h1>
          {sections.map((section, index) => (
            <Section
              key={index}
              content={section.content}
              imageUrl={section.imageUrl}
              mainsummary={item.summary}
            />
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default FullHistoryPage;

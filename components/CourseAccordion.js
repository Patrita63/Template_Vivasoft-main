import React, { useState } from 'react';

const CourseAccordionItem = ({ title, content, isOpen, onToggle }) => {
  return (
    <div className="accordion-item mb-4">
      <div
        className="accordion-title p-4 cursor-pointer bg-primary/80 text-white font-semibold rounded-md"
        onClick={onToggle}
      >
        {title}
      </div>
      <div
        className={`accordion-content overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        {isOpen && (
          <div className="p-4 bg-primary/20 text-white/80 rounded-md mt-2 shadow-md">
            {content}
          </div>
        )}
      </div>
    </div>
  );
};

const CourseAccordion = ({ courses }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the open index
  };

  return (
    <div className="accordion">
      {courses.map((course, index) => (
        <CourseAccordionItem
          key={index}
          title={course.title}
          content={course.content}
          isOpen={openIndex === index}
          onToggle={() => toggleAccordion(index)}
        />
      ))}
    </div>
  );
};

export default CourseAccordion;

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';
const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is AI image generation?",
      answer:
        "AI image generation is a technology that uses artificial intelligence algorithms to create unique images based on text prompts or other inputs. Our platform uses advanced machine learning models to transform your ideas into high-quality visual content.",
    },
    {
      question: "How do I create an image?",
      answer:
        "Simply type a descriptive prompt in the text field, select your preferred style and resolution options, and click 'Generate'. Our AI will process your request and create a unique image based on your description within seconds.",
    },
    {
      question: "What file formats are supported?",
      answer:
        "Generated images can be downloaded in PNG, JPEG, and WebP formats. Premium users also have access to SVG and lossless formats for professional design work.",
    },
    {
      question: "How many images can I generate?",
      answer:
        "Free users can generate up to 5 images per day. Our premium plans offer higher limits: Basic (50/day), Pro (200/day), and Enterprise (unlimited generation).",
    },
    {
      question: "Can I edit images after generation?",
      answer:
        "Yes! Our platform includes basic editing tools for all users. Premium subscribers get access to advanced editing features like selective regeneration, style transfer, and detailed customization options.",
    },
    {
      question: "Are the generated images copyright-free?",
      answer:
        "Images generated on our platform are available for personal and commercial use under our standard license. Premium users receive full commercial rights with no attribution required.",
    },
    {
      question: "How do I improve my prompts for better results?",
      answer:
        "Be specific with details, include style references, mention lighting conditions, and specify composition. Our 'Prompt Guide' section provides examples and tips for crafting effective prompts.",
    },
    {
      question: "Is my data secure?",
      answer:
        "We take data privacy seriously. Your prompts and generated images are stored securely and never shared with third parties. You can delete your data at any time from your account settings.",
    },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 lg:px-6 lg:py-8">
      {/* Heading */}
      <div className="text-center">
        <h1 className="lg:text-4xl mt-4 text-xl font-bold text-white">Frequently Asked Questions</h1>
        <p className="text-gray-400 mt-2 md:text-sm">
          Find answers to common questions about our AI image generation platform
        </p>
      </div>

      {/* Accordion */}
      <div className="lg:w-3/4 w-full">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="rounded-xl border mt-4 border-white/10 bg-white/5 backdrop-blur-lg overflow-hidden shadow-lg transition-all duration-300 px-2 "
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center p-2 text-left"
            >
              <h3 className="text-lg font-medium text-white">{faq.question}</h3>
              <span className="text-white text-xl">
                {activeIndex === index ? <ChevronDown /> : <ChevronUp />}
              </span>
            </button>

            <div
              className={`px-4 pb-2 text-gray-300 text-sm transition-all duration-500 ease-in-out ${
                activeIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;

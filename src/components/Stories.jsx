// src/Stories.jsx
import { useState, useEffect } from "react";
import BadBunny from "/img/BadBunny.jpg";
import PesoPluma from "/img/pesopluma.png";
import Duki from "/img/duki.png";
import Drake from "/img/drake.png";
import Eladio from "/img/eladio.png";
import BadBunnyStory from "/img/storiebadbunny.jpg";
import PesoPlumaStory from "/img/storiepesopluma.jpg";
import DukiStory from "/img/storieduki.jpg";

const Stories = () => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const storiesData = [
    {
      id: 1,
      name: "Bad Bunny",
      imageUrl: BadBunny,
      storyImageUrl: BadBunnyStory,
    },
    {
      id: 2,
      name: "Peso Pluma",
      imageUrl: PesoPluma,
      storyImageUrl: PesoPlumaStory,
    },
    { id: 3, name: "Duki", imageUrl: Duki, storyImageUrl: DukiStory },
    { id: 4, name: "Drake", imageUrl: Drake, storyImageUrl: DukiStory },
    { id: 5, name: "Eladio", imageUrl: Eladio, storyImageUrl: PesoPlumaStory },
    { id: 6, name: "Duki", imageUrl: Duki, storyImageUrl: DukiStory },
    { id: 7, name: "Drake", imageUrl: Drake, storyImageUrl: DukiStory },
    { id: 8, name: "Eladio", imageUrl: Eladio, storyImageUrl: PesoPlumaStory },
  ];

  const openModal = (story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
    setProgress(0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProgress(0);
  };

  useEffect(() => {
    if (isModalOpen) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            closeModal();
            return 0;
          }
          return prev + 1;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isModalOpen]);

  return (
    <div className="flex space-x-4 mb-6">
      {storiesData.map((story) => (
        <div
          key={story.id}
          onClick={() => openModal(story)}
          className="flex flex-col items-center cursor-pointer"
        >
          <img
            src={story.imageUrl}
            alt={`${story.name}'s profile`}
            className="w-14 h-14 rounded-full border-2 border-purple-500"
          />
          <p className="text-xs text-white mt-2">{story.name}</p>
        </div>
      ))}

      {isModalOpen && selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="relative w-[350px] h-[600px] bg-black rounded-lg overflow-hidden flex flex-col items-center">
            {/* Barra de progreso */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-600">
              <div
                className="h-full bg-white transition-all duration-500 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <button
              className="absolute top-4 right-4 text-white text-2xl font-bold"
              onClick={closeModal}
            >
              ✖
            </button>

            <img
              src={selectedStory.storyImageUrl}
              alt={`${selectedStory.name}'s story`}
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-4 left-4 text-white text-lg font-semibold bg-black bg-opacity-50 px-3 py-1 rounded-lg">
              {selectedStory.name}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;

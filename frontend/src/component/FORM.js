import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import icon from "./image/icon.jpg"

function FORM({ setIsLogged }) {
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noConfessions, setNoConfessions] = useState(false);
  const [isCapturingScreenshot, setIsCapturingScreenshot] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, []);

  const fetchData = () => {
    fetch("/api/get/form", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFormData(data.forms);
        setIsLoading(false);
        if (data.forms.length === 0) {
          setNoConfessions(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching form data: ", error);
        setIsLoading(false);
      });
  };

  const handlePostButtonClick = (id) => {
    fetch(`/api/update/form/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ posted: true }),
    })
      .then(() => {
        fetchData();
        setFormData((prevData) =>
          prevData.map((form) =>
            form._id === id ? { ...form, posted: true } : form
          )
        );
      })
      .catch((error) => {
        console.error("Error updating form data: ", error);
      });
  };

  const handleScreenshotButtonClick = () => {
    setIsCapturingScreenshot(true);

    // Hide buttons during screenshot capture
    const buttons = document.querySelectorAll(".screenshot-button");
    buttons.forEach((button) => (button.style.display = "none"));

    html2canvas(document.getElementById("screenshot-target")).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, "screenshot.png");

        // Show buttons again after taking the screenshot
        buttons.forEach((button) => (button.style.display = "block"));

        setIsCapturingScreenshot(false);
      });
    });
  };

  const handleLogout = () => {
    setIsLogged(false);
  };

  return (
    <div>
      <header className="text-right p-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </header>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          {isLoading ? (
            <p>Loading confessions...</p>
          ) : noConfessions ? (
            <p>No confessions available.</p>
          ) : (
            <div className="flex flex-wrap -m-12 justify-center">
              {formData.map((form, index) => (
                <div
                  className="p-5 md:w-1/2 flex flex-col items-start text-white"
                  key={index}
                >
                  <div
                    className="bg-gray-800 w-full p-12"
                    id="screenshot-target"
                  >
                    <a className="inline-flex items-center">
                      <img
                        alt="blog"
                        src={icon}
                        className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                      />
                      <span className="flex-grow flex flex-col pl-4">
                        <span className="title-font font-medium text-white">
                          ramswaroopconfession2.0
                        </span>
                        <span className="text-orange-600 text-xs tracking-widest mt-0.5">
                          {new Date(form.timestamp).toLocaleString()}
                        </span>
                      </span>
                    </a>

                    <hr />
                    <p className="leading-relaxed mb-8">{form.text}</p>
                    <hr />
                    <div className="flex justify-evenly">
                      {!isCapturingScreenshot && (
                        <button
                          className="btn bg-blue-700 p-2 rounded my-3 text-white screenshot-button"
                          onClick={() => handlePostButtonClick(form._id)}
                        >
                          Mark as Posted
                        </button>
                      )}
                      {!isCapturingScreenshot && (
                        <button
                          className="btn bg-green-500 p-2 rounded my-3 text-white screenshot-button"
                          onClick={handleScreenshotButtonClick}
                        >
                          Capture Screenshot
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default FORM;

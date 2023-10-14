import React, { useState, useEffect } from "react";

function FORM() {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    // Fetch the data from your server
    fetchData()
  }, []);

  const fetchData = () => {
    fetch("http://localhost:5000/api/get/form")
    .then((response) => response.json())
    .then((data) => {
      setFormData(data.forms);
    })
    .catch((error) => {
      console.error("Error fetching form data: ", error);
    });
  }

  const handlePostButtonClick = (id) => {
    // Send a PUT request to update the 'posted' status
    fetch(`http://localhost:5000/api/update/form/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ posted: true }),
    })
      .then(() => {
        // Update the 'formData' state to reflect the change
        fetchData()
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

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-12 justify-center">
            {formData.map((form, index) => (
              <div
                className="p-5 md:w-1/2 flex flex-col items-start text-white"
                key={index}
              >
                <div className="bg-gray-800 w-full p-12">
                  <a className="inline-flex items-center">
                    <img
                      alt="blog"
                      src="https://dummyimage.com/104x104"
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
                  <hr/>
                  <button className=" btn bg-blue-700 p-2 rounded my-3 text-white" onClick={() => handlePostButtonClick(form._id)}>
                    Mark as Posted
                  </button>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default FORM;

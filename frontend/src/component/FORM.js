import React from "react";

function FORM() {
  return (
    <div>
      <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-12">
            {
              <div class="p-12 md:w-1/2 flex flex-col items-start">
                <a class="inline-flex items-center">
                  <img
                    alt="blog"
                    src="https://dummyimage.com/104x104"
                    class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                  />
                  <span class="flex-grow flex flex-col pl-4">
                    <span class="title-font font-medium text-gray-900">
                      Holden Caulfield
                    </span>
                    <span class="text-gray-400 text-xs tracking-widest mt-0.5">
                      UI DEVELOPER
                    </span>
                  </span>
                </a>
                <h2 class="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
                  Roof party normcore before they sold out, cornhole vape
                </h2>
                <p class="leading-relaxed mb-8">
                  Live-edge letterpress cliche, salvia fanny pack humblebrag
                  narwhal portland. VHS man braid palo santo hoodie brunch trust
                  fund. Bitters hashtag waistcoat fashion axe chia unicorn.
                  Plaid fixie chambray 90's, slow-carb etsy tumeric. Cray pug
                  you probably haven't heard of them hexagon kickstarter craft
                  beer pork chic.
                </p>
              </div>
            }
          </div>
        </div>
      </section>
    </div>
  );
}

export default FORM;

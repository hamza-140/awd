import React from "react";

function Awd() {
  return (
    <div>
      <div className="flex flex-col items-center my-3">
        {/*center align text in a container*/}
        <div>
          <h1 className="text-red-950 text-2xl">Author Name</h1>{" "}
          {/*text color*/}
        </div>
        <div className="text-center w-[400px]">
          <p>
            This is introduction about the author. This introduction is written
            in paragraph element. The author is interested in programming
            languages related to web, mobile application. The author has
            expertise in JavaScript and Python language.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Awd;

import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { Token } from "~/components/vtt/Token";

describe(
  "The Token component",
  () =>{
    it("Is a circle", () => {
      const { container } = render(
          <Token
            actor={null}
            cellDimension={25}
            vttTransform={[1,0,0,1,0,0]}
          />,
          {
            container:
              document.body.appendChild(
                document.createElementNS("http://www.w3.org/2000/svg", "svg")),
          });

      expect(container.firstChild.nodeName).toBe("circle");
    })
  }
);
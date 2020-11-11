import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { Token } from "~/components/vtt/Token";

describe(
  "The Token component",
  () =>{
    it("Is a circle", () => {
      const { container } = render(
        <svg>
          <Token
            actor={null}
            cellDimension={25}
            vttTransform={[1,0,0,1,0,0]}
          />
        </svg>);

      expect(container.firstChild.firstChild.nodeName).toBe("circle");
    })
  }
);
import * as React from "react";

interface Props {
  id: number;
  type: string;
  x: number;
  y: number;
  height: number;
  width: number;
  zoomScale: number;
  rotation: number;
  scorable: boolean;
}

export module PieceGlow {
  export class PieceGlow extends React.Component<Props, {}> {

    glowStyle() {
      let { x, y, height, width, zoomScale, rotation } = this.props;

      return {
        left: x * zoomScale,
        top: y * zoomScale,
        height: height * zoomScale,
        width: width * zoomScale,
        transform: "rotate(" + rotation + "rad)",
      }
    }

    className() {
      if (this.props.scorable) {
        return "glow scorable";
      } else {
        return "glow"
      }
    }

    rectangle() {
      return <rect x="0" y="0" width="100" height="100"/>
    }

    circle() {
      return <circle cx="50" cy="50" r="50"/>
    }

    octagon() {
      return <polygon points="14,0 86,0 100,25 100,75 86,100 14,100 0,75 0,25" />
    }

    l() {
      return <polygon points="0,0 50,0 50,50 100,50 100,100 0,100" />
    }

    render() {
      let { id, type } = this.props;

      if (id == 15) {
        return null;
      }

      let shapeHTML;
      switch (type) {
        case "rectangle":
          shapeHTML = this.rectangle();
          break;
        case "circle":
          shapeHTML = this.circle();
          break;
        case "octagon":
          shapeHTML = this.octagon();
          break;
        case "L":
          shapeHTML = this.l();
          break;
        default:
      }

      return (
        <div className={this.className()} style={this.glowStyle()}>
          <svg xmlns="http://www.w3.org/2000/svg"
            width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            {shapeHTML}
          </svg>
        </div>
      );

    }
  }
}

const Util = {
  shuffle: (arr) => {
    var n = arr.length;
    var temp, i;

    while (n) {
        i = Math.floor(Math.random() * n--);
        temp = arr[n];
        arr[n] = arr[i];
        arr[i] = temp;
    }
    return arr;
  },

  addCircle: (x, y, r, color = "rgba(255, 110, 110, 0.5)") => {
    const circle = document.createElement("div");
    circle.style.width = `${r*2}px`;
    circle.style.height = `${r*2}px`;
    circle.style.backgroundColor = color;
    circle.style.left = `${x - r}px`;
    circle.style.top = `${y - r}px`;
    circle.style.borderRadius = `${r}px`;
    circle.style.display = "inline-block";
    circle.style.position = "absolute";
    fieldDom.appendChild(circle);
    return circle;
  },

  circleAoE: (x, y, r, reason) => {
    return {
      collision: (px, py) => {
        return Util.distance(x, y, px, py) < r;
      },
      reason
    };
  },

  strokeCircle: (x, y, r) => {
    const circle = document.createElement("div");
    circle.style.width = `${r*2}px`;
    circle.style.height = `${r*2}px`;
    circle.style.backgroundColor = "rgba(0, 0, 0, 0)";
    circle.style.left = `${x - r}px`;
    circle.style.top = `${y - r}px`;
    circle.style.borderRadius = `${r}px`;
    circle.style.border = `1px solid rgba(0, 0, 0, 1)`;
    circle.style.display = "inline-block";
    circle.style.position = "absolute";
    fieldDom.appendChild(circle);
    return circle;
  },

  strokeRect: (x1, y1, x2, y2) => {
    console.log("strokeRect", x1, y1, x2, y2);
    const rect = document.createElement("div");
    rect.style.width = `${x2-x1}px`;
    rect.style.height = `${y2-y1}px`;
    rect.style.backgroundColor = "rgba(200, 200, 200, 0.2)";
    rect.style.left = `${x1}px`;
    rect.style.top = `${y1}px`;
    rect.style.display = "inline-block";
    rect.style.position = "absolute";
    fieldDom.appendChild(rect);
    return rect;
  },

  addImage: (imgUrl, x, y, width, height) => {
    const img = document.createElement("img");
    img.src = imgUrl;
    img.style.width = width;
    img.style.height = height;
    img.style.left = x - width / 2;
    img.style.top = y - height / 2;
    img.style.display = "inline-block";
    img.style.position = "absolute";
    fieldDom.appendChild(img);
    return img;
  },

  addDonut: (x, y, rIn, rOut) => {
    const circle = document.createElement("div");
    circle.style.width = `${rIn*2}px`;
    circle.style.height = `${rIn*2}px`;
    circle.style.backgroundColor = "rgba(0, 0, 0, 0)";
    circle.style.border = `${rOut - rIn}px solid rgba(255, 110, 110, 0.5)`;
    circle.style.left = `${x - rOut}px`;
    circle.style.top = `${y - rOut}px`;
    circle.style.borderRadius = `${rOut}px`;
    circle.style.display = "inline-block";
    circle.style.position = "absolute";
    fieldDom.appendChild(circle);
    return circle;
  },

  donutAoE: (x, y, rIn, rOut, reason) => {
    return {
      collision: (px, py) => {
        const d = Util.distance(x, y, px, py);
        return  rIn < d && d < rOut;
      },
      reason
    };
  },

  addBoldLine: (x1, y1, x2, y2, width, length) => {
    if (!length) {
        length = Util.distance(x1, y1, x2, y2);
    }

    const rect = document.createElement("div");
    rect.style.width = `${length}px`;
    rect.style.height = `${width}px`;
    rect.style.backgroundColor = "rgba(255, 110, 110, 0.5)";
    rect.style.left = `${x1}px`;
    rect.style.top = `${y1 - width/2}px`;
    rect.style.display = "inline-block";
    rect.style.position = "absolute";

    const rotdeg = Math.atan2(y2 - y1, x2 - x1) / Math.PI * 180;
    rect.style.transformOrigin = "left center";
    rect.style.transform = `rotate(${rotdeg}deg)`;
    fieldDom.appendChild(rect);
    return rect;
  },

  rectAoe: (x1, y1, x2, y2, reason) => {
    return {
      collision: (px, py) => {
        return x1 < px && px < x2 && y1 < py && py < y2;
      },
      reason
    };
  },

  removeLater: (dom, timeoutMs) => {
    setTimeout(() => {
      fieldDom.removeChild(dom)
    }, timeoutMs);
  },

  distance: (x1, y1, x2, y2) => {
    const x = x1 - x2;
    const y = y1 - y2;
    return Math.sqrt(x*x + y*y);
  },

  pixelToMeter: (px) => {
      return px / 15;
  },

  tile: (t) => {
      return t * 15;
  }
};
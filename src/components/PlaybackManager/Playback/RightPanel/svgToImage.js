const getCSSVariables = () => {
  const variables = {};

  Array.from(document.styleSheets).forEach((styleSheet) => {
    try {
      Array.from(styleSheet.cssRules).forEach((rule) => {
        if (rule.selectorText === "#root") {
          Array.from(rule.style).forEach((property) => {
            if (property.startsWith("--")) {
              variables[property] = rule.style
                .getPropertyValue(property)
                .trim();
            }
          });
        }
      });
    } catch (e) {
      return;
    }
  });

  return variables;
};

const replaceCSSVariablesWithValues = (cssText, variables) => {
  return cssText.replace(/var\((--[\w-]+)\)/g, (_, variable) => {
    return variables[variable] || variable;
  });
};

const getAllCSS = () => {
  const variables = getCSSVariables();

  const allCSS = Array.from(document.styleSheets)
    .map((styleSheet) => {
      try {
        return Array.from(styleSheet.cssRules || [])
          .map((rule) => {
            let cssText = rule.cssText;
            cssText = replaceCSSVariablesWithValues(cssText, variables);
            return cssText;
          })
          .join("\n");
      } catch (e) {
        return;
      }
    })
    .join("\n");

  return allCSS;
};

export const exportSVGToPNG = (mapRef, size = 2048) => {
  const svgElement = mapRef.current;

  const allCSS = getAllCSS();

  const styleElement = document.createElement("style");
  styleElement.textContent = allCSS;

  const clonedSvgElement = svgElement.cloneNode(true);
  clonedSvgElement.insertBefore(styleElement, clonedSvgElement.firstChild);

  const svgString = new XMLSerializer().serializeToString(clonedSvgElement);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = size;
  canvas.height = size;

  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 0, 0, size, size);
    const pngData = canvas.toDataURL("image/jpng");
    const link = document.createElement("a");
    link.href = pngData;
    link.download = "image.png";
    link.click();
  };

  img.src = "data:image/svg+xml;base64," + btoa(svgString);
};

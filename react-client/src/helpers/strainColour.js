export const getStrainColour = strain => {
  switch (strain) {
    case "hybrid":
    case "Hybrid":
      return "green";
    case "indica":
    case "Indica":
      return "purple";
    case "sativa":
    case "Sativa":
      return "gold";
    case "terpenes":
    case "Terpenes":
      return "magenta";
    default:
      return "orange";
  }
};

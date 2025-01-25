function Query(data, query) {
  for (const key in query) {
    const value = query[key];

    if (typeof value === "object" && !Array.isArray(value)) {
      for (const operator in value) {
        const operatorValue = value[operator];
        const keys = key.split(".");
        let current = data;

        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];

          if (i === keys.length - 1) {
            switch (operator) {
              case "equal":
                if (current[k] !== operatorValue) return false;
                break;
              case "notequal":
                if (current[k] === operatorValue) return false;
                break;
              case "less":
                if (current[k] >= operatorValue) return false;
                break;
              case "greater":
                if (current[k] <= operatorValue) return false;
                break;
              default:
                throw new Error(`Operador inválido ou não encontrado: ${operator}`);
            }
          } else {
            if (!current[k]) return false;
            current = current[k];
          }
        }
      }
    } else {
      const keys = key.split(".");
      let current = data;

      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];

        if (i === keys.length - 1) {
          if (current[k] !== value) return false;
        } else {
          if (!current[k]) return false;
          current = current[k];
        }
      }
    }
  }

  return true;
}

module.exports = Query;
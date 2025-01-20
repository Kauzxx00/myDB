function Query(data, query) {
  const operators = Object.keys(query);

  for (const operator of operators) {
    const conditions = query[operator];

    for (const path in conditions) {
      const value = conditions[path];
      const keys = path.split(".");
      let current = data;

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        // Caso não tenha operador, fazer a comparação direta
        if (!operators.includes(operator)) {
          if (current[key] !== value) return false;
          break;
        }

        // Tentativa de verificar se é um array
        if (Array.isArray(current)) {
          if (
            !current.some((item) =>
              Query(item, { [operator]: { [keys.slice(i).join(".")]: value } })
            )
          ) {
            return false;
          }
          break;
        }

        if (i === keys.length - 1) {
          switch (operator) {
            case "equal":
              if (current[key] !== value) return false;
              break;
            case "notequal":
              if (current[key] !== value) return false;
              break;
            case "less":
              if (current[key] >= value) return false;
              break;
            case "greater":
              if (current[key] <= value) return false;
              break;
            default:
              throw new Error(`Operador inválido ou não encontrado: ${operator}`);
          }
        } else {
          if (!current[key]) return false;
          current = current[key];
        }
      }
    }
  }

  return true;
}

module.exports = Query;
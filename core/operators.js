function Operators(obj, path, value, operation) {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (key === "$" && Array.isArray(current)) {
      for (const item of current) {
        Operators(item, keys.slice(i + 1).join("."), value, operation);
      }
      return;
    }

    if (i === keys.length - 1) {
      switch (operation) {
        case "sum":
          current[key] = (current[key] || 0) + value;
          break;
        case "sub":
          current[key] = (current[key] || 0) - value;
          break;
        case "set":
          current[key] = value;
          break;
        case "push":
          if (!Array.isArray(current[key])) current[key] = [];
          current[key].push(value);
          break;
        case "pull":
          if (Array.isArray(current[key])) {
            current[key] = current[key].filter((item) => item !== value);
          }
          break;
        default:
          throw new Error(`Operação inválida ou não encontrada: ${operation}`);
      }
    } else {
      if (!current[key]) current[key] = {};
      current = current[key];
    }
  }
}

module.exports = Operators;
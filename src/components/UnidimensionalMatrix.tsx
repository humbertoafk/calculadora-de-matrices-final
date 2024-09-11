// Importamos React y el hook useState
import React, { useState } from 'react';

// Definimos las propiedades (props vistos en clase jeje) que recibirá el componente UnidimensionalMatrix
interface UnidimensionalMatrixProps {
  matrix1: number[]; // Primer matriz unidimensional
  matrix2: number[]; // Segunda matriz unidimensional
  onMatrix1Change: (index: number, value: number) => void; // Función que maneja cambios en los valores de la primera matriz
  onMatrix2Change: (index: number, value: number) => void; // Función que maneja cambios en los valores de la segunda matriz
  addElementMatrix1: () => void; // Función que agrega un elemento a la primera matriz
  addElementMatrix2: () => void; // Función que agrega un elemento a la segunda matriz
}

// Definimos el componente funcional UnidimensionalMatrix
const UnidimensionalMatrix: React.FC<UnidimensionalMatrixProps> = ({
  matrix1,
  matrix2,
  onMatrix1Change,
  onMatrix2Change,
  addElementMatrix1,
  addElementMatrix2,
}) => {
  // Utilizamos el hook useState para gestionar el estado de la matriz de resultados
  const [result, setResult] = useState<number[]>([]);

  // Función para multiplicar los elementos de las dos matrices
  const multiplyMatrices = () => {
    if (matrix1.length !== matrix2.length) {
      alert('Las matrices deben tener el mismo tamaño para multiplicarse.');
      return;
    }
    // Multiplica los elementos correspondientes de las matrices
    const multiplied = matrix1.map((value, index) => value * matrix2[index]);
    setResult(multiplied); // Guardamos el resultado en el estado
  };

  // Función para sumar los elementos de las dos matrices
  const addMatrices = () => {
    if (matrix1.length !== matrix2.length) {
      alert('Las matrices deben tener el mismo tamaño para sumarse.');
      return;
    }
    // Suma los elementos correspondientes de las matrices
    const summed = matrix1.map((value, index) => value + matrix2[index]);
    setResult(summed); // Guardamos el resultado en el estado
  };

  // Función para restar los elementos de las dos matrices
  const subtractMatrices = () => {
    if (matrix1.length !== matrix2.length) {
      alert('Las matrices deben tener el mismo tamaño para restarse.');
      return;
    }
    // Resta los elementos correspondientes de las matrices
    const subtracted = matrix1.map((value, index) => value - matrix2[index]);
    setResult(subtracted); // Guardamos el resultado en el estado
  };

  return (
    <div>
      <h2>Matriz Unidimensional</h2>

      {/* Renderiza los inputs de la primera matriz */}
      <div>
        <h3>Matriz 1</h3>
        {matrix1.map((value, index) => (
          <input
            key={index}
            type="number"
            value={value} // Muestra el valor actual del elemento de la matriz
            onChange={(e) => onMatrix1Change(index, parseFloat(e.target.value))} // Llama a la función para manejar el cambio en el valor del elemento
          />
        ))}
        <button onClick={addElementMatrix1}>Agregar elemento</button> {/* Botón para agregar un elemento a la primera matriz */}
      </div>

      {/* Renderiza los inputs de la segunda matriz */}
      <div>
        <h3>Matriz 2</h3>
        {matrix2.map((value, index) => (
          <input
            key={index}
            type="number"
            value={value} // Muestra el valor actual del elemento de la matriz
            onChange={(e) => onMatrix2Change(index, parseFloat(e.target.value))} // Llama a la función para manejar el cambio en el valor del elemento
          />
        ))}
        <button onClick={addElementMatrix2}>Agregar elemento</button> {/* Botón para agregar un elemento a la segunda matriz */}
      </div>

      {/* Botones para las operaciones de suma, resta y multiplicación */}
      <div className="botones-opera">
        <button onClick={addMatrices}>Sumar Matrices</button>
        <button onClick={subtractMatrices}>Restar Matrices</button>
        <button onClick={multiplyMatrices}>Multiplicar Matrices</button>
      </div>

      {/* Si hay un resultado, renderiza la tabla con los resultados */}
      {result.length > 0 && (
        <div className="matrix-result-container">
          <h3>Resultado</h3>
          <table className="matrix-result">
            <tbody>
              <tr>
                {result.map((value, index) => (
                  <td key={index} className="matrix-cell">{value}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UnidimensionalMatrix;

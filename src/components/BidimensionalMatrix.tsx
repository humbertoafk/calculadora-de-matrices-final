// Importamos React y el hook useState
import React, { useState } from 'react';

// Definimos las propiedades (props vistos en clase jeje) que recibirá el componente BidimensionalMatrix
interface BidimensionalMatrixProps {
  matrix1: number[][]; // Primer matriz bidimensional
  matrix2: number[][]; // Segunda matriz bidimensional
  onMatrix1Change: (rowIndex: number, colIndex: number, value: number) => void; // Función para manejar cambios en los valores de la primera matriz
  onMatrix2Change: (rowIndex: number, colIndex: number, value: number) => void; // Función para manejar cambios en los valores de la segunda matriz
  addRowMatrix1: () => void; // Función para agregar una fila a la primera matriz
  addRowMatrix2: () => void; // Función para agregar una fila a la segunda matriz
  addColumnMatrix1: () => void; // Función para agregar una columna a la primera matriz
  addColumnMatrix2: () => void; // Función para agregar una columna a la segunda matriz
}

// Definimos el componente funcional BidimensionalMatrix
const BidimensionalMatrix: React.FC<BidimensionalMatrixProps> = ({
  matrix1,
  matrix2,
  onMatrix1Change,
  onMatrix2Change,
  addRowMatrix1,
  addRowMatrix2,
  addColumnMatrix1,
  addColumnMatrix2,
}) => {
  // Utilizamos el hook useState para gestionar el estado de la matriz de resultados
  const [result, setResult] = useState<number[][]>([]);

  // Función para multiplicar las dos matrices
  const multiplyMatrices = () => {
    // Verifica si las matrices son compatibles para la multiplicación
    if (matrix1[0].length !== matrix2.length) {
      alert('Las matrices deben ser compatibles para multiplicarse.');
      return;
    }

    // Multiplica las dos matrices (operación clásica de producto de matrices)
    const multiplied = matrix1.map((row, i) =>
      matrix2[0].map((_, j) =>
        row.reduce((sum, el, k) => sum + el * matrix2[k][j], 0)
      )
    );
    setResult(multiplied); // Guardamos el resultado en el estado
  };

  // Función para sumar las dos matrices
  const addMatrices = () => {
    // Verifica si las matrices tienen el mismo tamaño
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
      alert('Las matrices deben tener el mismo tamaño para sumarse.');
      return;
    }

    // Suma las matrices elemento por elemento
    const summed = matrix1.map((row, i) =>
      row.map((value, j) => value + matrix2[i][j])
    );
    setResult(summed); // Guardamos el resultado en el estado
  };

  // Función para restar las dos matrices
  const subtractMatrices = () => {
    // Verifica si las matrices tienen el mismo tamaño
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
      alert('Las matrices deben tener el mismo tamaño para restarse.');
      return;
    }

    // Resta las matrices elemento por elemento
    const subtracted = matrix1.map((row, i) =>
      row.map((value, j) => value - matrix2[i][j])
    );
    setResult(subtracted); // Guardamos el resultado en el estado
  };

  return (
    <div>
      <h2>Matriz Bidimensional</h2>

      {/* Renderiza la primera matriz (inputs para cada valor) */}
      <div>
        <h3>Matriz 1</h3>
        {matrix1.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((value, colIndex) => (
              <input
                key={colIndex}
                type="number"
                value={value} // Valor actual del elemento de la matriz
                onChange={(e) => onMatrix1Change(rowIndex, colIndex, parseFloat(e.target.value))} // Maneja el cambio en el valor
              />
            ))}
          </div>
        ))}
        {/* Botones para agregar fila o columna a la primera matriz */}
        <button onClick={addRowMatrix1}>Agregar fila</button>
        <button onClick={addColumnMatrix1}>Agregar columna</button>
      </div>

      {/* Renderiza la segunda matriz (inputs para cada valor) */}
      <div>
        <h3>Matriz 2</h3>
        {matrix2.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((value, colIndex) => (
              <input
                key={colIndex}
                type="number"
                value={value} // Valor actual del elemento de la matriz
                onChange={(e) => onMatrix2Change(rowIndex, colIndex, parseFloat(e.target.value))} // Maneja el cambio en el valor
              />
            ))}
          </div>
        ))}
        {/* Botones para agregar fila o columna a la segunda matriz */}
        <button onClick={addRowMatrix2}>Agregar fila</button>
        <button onClick={addColumnMatrix2}>Agregar columna</button>
      </div>

      {/* Botones para realizar las operaciones: suma, resta, multiplicación */}
      <div className="botones-opera">
        <button onClick={addMatrices}>Sumar Matrices</button>
        <button onClick={subtractMatrices}>Restar Matrices</button>
        <button onClick={multiplyMatrices}>Multiplicar Matrices</button>
      </div>

      {/* Si hay resultados, se renderiza una tabla con el resultado */}
      {result.length > 0 && (
        <div className="matrix-result-container">
          <h3>Resultado</h3>
          <table className="matrix-result">
            <tbody>
              {result.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((value, colIndex) => (
                    <td key={colIndex} className="matrix-cell">{value}</td> /* Valor resultante de la operación */
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BidimensionalMatrix;

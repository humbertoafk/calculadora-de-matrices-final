// Importamos React y el hook useState
import React, { useState } from 'react';

// Definimos las propiedades (props vistos en clase jeje) que recibirá el componente TridimensionalMatrix
interface TridimensionalMatrixProps {
  matrix1: number[][][]; // Primer matriz tridimensional
  matrix2: number[][][]; // Segunda matriz tridimensional
  onMatrix1Change: (depthIndex: number, rowIndex: number, colIndex: number, value: number) => void; // Función para manejar cambios en los valores de la primera matriz
  onMatrix2Change: (depthIndex: number, rowIndex: number, colIndex: number, value: number) => void; // Función para manejar cambios en los valores de la segunda matriz
  addDepthMatrix1: () => void; // Función para agregar una capa a la primera matriz
  addDepthMatrix2: () => void; // Función para agregar una capa a la segunda matriz
  addRowMatrix1: () => void; // Función para agregar una fila a la primera matriz
  addRowMatrix2: () => void; // Función para agregar una fila a la segunda matriz
  addColumnMatrix1: () => void; // Función para agregar una columna a la primera matriz
  addColumnMatrix2: () => void; // Función para agregar una columna a la segunda matriz
}

// Definimos el componente funcional TridimensionalMatrix
const TridimensionalMatrix: React.FC<TridimensionalMatrixProps> = ({
  matrix1,
  matrix2,
  onMatrix1Change,
  onMatrix2Change,
  addDepthMatrix1,
  addDepthMatrix2,
  addRowMatrix1,
  addRowMatrix2,
  addColumnMatrix1,
  addColumnMatrix2,
}) => {
  // Utilizamos el hook useState para gestionar el estado de la matriz de resultados
  const [result, setResult] = useState<number[][][]>([]);

  // Función para multiplicar las dos matrices tridimensionales
  const multiplyMatrices = () => {
    // Verifica si ambas matrices tienen el mismo número de capas
    if (matrix1.length !== matrix2.length) {
      alert('Las matrices tridimensionales deben tener el mismo tamaño.');
      return;
    }

    // Multiplica las matrices elemento por elemento
    const multiplied = matrix1.map((depth, i) =>
      depth.map((row, j) =>
        row.map((_, k) =>
          row.reduce((sum, el, l) => sum + el * matrix2[i][j][l], 0)
        )
      )
    );
    setResult(multiplied); // Guardamos el resultado en el estado
  };

  // Función para sumar las matrices tridimensionales
  const addMatrices = () => {
    // Verifica si las matrices tienen el mismo tamaño
    if (
      matrix1.length !== matrix2.length || 
      matrix1[0].length !== matrix2[0].length || 
      matrix1[0][0].length !== matrix2[0][0].length
    ) {
      alert('Las matrices deben tener el mismo tamaño para sumarse.');
      return;
    }

    // Suma las matrices elemento por elemento
    const summed = matrix1.map((depth, i) =>
      depth.map((row, j) =>
        row.map((value, k) => value + matrix2[i][j][k])
      )
    );
    setResult(summed); // Guardamos el resultado en el estado
  };

  // Función para restar las matrices tridimensionales
  const subtractMatrices = () => {
    // Verifica si las matrices tienen el mismo tamaño
    if (
      matrix1.length !== matrix2.length || 
      matrix1[0].length !== matrix2[0].length || 
      matrix1[0][0].length !== matrix2[0][0].length
    ) {
      alert('Las matrices deben tener el mismo tamaño para restarse.');
      return;
    }

    // Resta las matrices elemento por elemento
    const subtracted = matrix1.map((depth, i) =>
      depth.map((row, j) =>
        row.map((value, k) => value - matrix2[i][j][k])
      )
    );
    setResult(subtracted); // Guardamos el resultado en el estado
  };

  return (
    <div>
      <h2>Matriz Tridimensional</h2>

      {/* Renderiza la primera matriz tridimensional (inputs para cada valor) */}
      {matrix1.map((depth, depthIndex) => (
        <div key={depthIndex}>
          <h3>Matriz 1 - Capa {depthIndex + 1}</h3>
          {depth.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((value, colIndex) => (
                <input
                  key={colIndex}
                  type="number"
                  value={value} // Valor actual del elemento de la matriz
                  onChange={(e) =>
                    onMatrix1Change(depthIndex, rowIndex, colIndex, parseFloat(e.target.value)) // Maneja el cambio en el valor
                  }
                />
              ))}
            </div>
          ))}
        </div>
      ))}
      {/* Botones para agregar capa, fila o columna a la primera matriz */}
      <button onClick={addDepthMatrix1}>Agregar capa</button>
      <button onClick={addRowMatrix1}>Agregar fila</button>
      <button onClick={addColumnMatrix1}>Agregar columna</button>

      {/* Renderiza la segunda matriz tridimensional (inputs para cada valor) */}
      {matrix2.map((depth, depthIndex) => (
        <div key={depthIndex}>
          <h3>Matriz 2 - Capa {depthIndex + 1}</h3>
          {depth.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((value, colIndex) => (
                <input
                  key={colIndex}
                  type="number"
                  value={value} // Valor actual del elemento de la matriz
                  onChange={(e) =>
                    onMatrix2Change(depthIndex, rowIndex, colIndex, parseFloat(e.target.value)) // Maneja el cambio en el valor
                  }
                />
              ))}
            </div>
          ))}
        </div>
      ))}
      {/* Botones para agregar capa, fila o columna a la segunda matriz */}
      <button onClick={addDepthMatrix2}>Agregar capa</button>
      <button onClick={addRowMatrix2}>Agregar fila</button>
      <button onClick={addColumnMatrix2}>Agregar columna</button>

      {/* Botones para realizar las operaciones: suma, resta y multiplicación */}
      <div className="botones-opera">
        <button onClick={addMatrices}>Sumar Matrices</button>
        <button onClick={subtractMatrices}>Restar Matrices</button>
        <button onClick={multiplyMatrices}>Multiplicar Matrices</button>
      </div>

      {/* Si hay resultados, se renderizan las capas de la matriz tridimensional resultante */}
      {result.length > 0 && (
        <div className="matrix-result-container">
          <h3>Resultado</h3>
          {result.map((depth, depthIndex) => (
            <div key={depthIndex}>
              <h4>Capa {depthIndex + 1}</h4>
              <table className="matrix-result">
                <tbody>
                  {depth.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((value, colIndex) => (
                        <td key={colIndex} className="matrix-cell">{value}</td> /* Valor resultante de la operación */
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TridimensionalMatrix;

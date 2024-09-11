import React, { useState } from 'react';
import UnidimensionalMatrix from './UnidimensionalMatrix';
import BidimensionalMatrix from './BidimensionalMatrix';
import TridimensionalMatrix from './TridimensionalMatrix';
import { add, subtract, multiply, matrix, Matrix } from 'mathjs';  // Importamos operaciones matemáticas desde mathjs

// Definimos los tippos de matrices unidimensional, bidimensional o tridimensional
type MatrixType = 'unidimensional' | 'bidimensional' | 'tridimensional'; 

const MatrixCalculator: React.FC = () => {
  // Estado para manejar el tipo de matriz seleccionado
  const [matrixType, setMatrixType] = useState<MatrixType>('unidimensional');
  
  // Estados para almacenar las matrices de diferentes tipos
  const [uniMatrix1, setUniMatrix1] = useState<number[]>([0]);  // Matriz unidimensional 1
  const [uniMatrix2, setUniMatrix2] = useState<number[]>([0]);  // Matriz unidimensional 2
  const [biMatrix1, setBiMatrix1] = useState<number[][]>([[0]]);  // Matriz bidimensional 1
  const [biMatrix2, setBiMatrix2] = useState<number[][]>([[0]]);  // Matriz bidimensional 2
  const [triMatrix1, setTriMatrix1] = useState<number[][][]>([[[0]]]);  // Matriz tridimensional 1
  const [triMatrix2, setTriMatrix2] = useState<number[][][]>([[[0]]]);  // Matriz tridimensional 2
  
  // Estado para almacenar el resultado de la operación
  const [resultMatrix, setResultMatrix] = useState<Matrix | null>(null);
  
  // Estado para almacenar mensajes de error
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Función para manejar el cambio de tipo de matriz
  const handleMatrixTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMatrixType(e.target.value as MatrixType);  // Actualiza el tipo de matriz
    setResultMatrix(null);  // Limpia el resultado anterior
    setErrorMessage(null);  // Limpia cualquier mensaje de error
  };

  // Función para verificar si el valor es del tipo Matrix de mathjs
  const isMatrix = (value: any): value is Matrix => {
    return value && typeof value.toArray === 'function';  // Verifica si el objeto tiene un método toArray
  };

  // Función para realizar la multiplicación de matrices (Me dice que está declarado pero el valor nunca se lelee)
  const handleMatrixMultiplication = () => {
    try {
      setErrorMessage(null);  // Limpia cualquier mensaje de error

      // Verifica el tipo de matriz y aplica la multiplicación correspondiente
      if (matrixType === 'unidimensional') {
        const result = matrix(multiply(matrix(uniMatrix1), matrix(uniMatrix2)));  // Multiplicar matrices unidimensionales
        setResultMatrix(result);
      } else if (matrixType === 'bidimensional') {
        const result = matrix(multiply(matrix(biMatrix1), matrix(biMatrix2)));  // Multiplicar matrices bidimensionales
        setResultMatrix(result);
      } else if (matrixType === 'tridimensional') {
        // Para matrices tridimensionales, multiplicamos capa por capa
        const resultLayers = triMatrix1.map((layer, index) =>
          matrix(multiply(matrix(layer), matrix(triMatrix2[index])))
        );
        setResultMatrix(matrix(resultLayers));  // Convertimos el resultado a tipo Matrix (No sé qué hice pero funciona :C)
      }
    } catch (error: any) {
      console.error('Error en la operación de multiplicación: ', error);
      setErrorMessage(`Error en la operación de multiplicación: ${error.message}`);  // Muestra un mensaje de error
    }
  };

  // Función para realizar la suma de matrices (Utilizo la función anterior que no se lee pero aquí se realiza la suma)
  const handleMatrixAddition = () => {
    try {
      setErrorMessage(null);  // Limpia cualquier mensaje de error

      if (matrixType === 'unidimensional') {
        const result = matrix(add(matrix(uniMatrix1), matrix(uniMatrix2)));  // Sumar matrices unidimensionales
        setResultMatrix(result);
      } else if (matrixType === 'bidimensional') {
        const result = matrix(add(matrix(biMatrix1), matrix(biMatrix2)));  // Sumar matrices bidimensionales
        setResultMatrix(result);
      } else if (matrixType === 'tridimensional') {
        const result = matrix(add(matrix(triMatrix1), matrix(triMatrix2)));  // Sumar matrices tridimensionales (Me sigue dando error)
        setResultMatrix(result);
      }
    } catch (error: any) {
      console.error('Error en la operación de suma: ', error);
      setErrorMessage(`Error en la operación de suma: ${error.message}`);  // Muestra un mensaje de error
    }
  };

  // Función para realizar la resta de matrices
  const handleMatrixSubtraction = () => {
    try {
      setErrorMessage(null);  // Limpia cualquier mensaje de error

      if (matrixType === 'unidimensional') {
        const result = matrix(subtract(matrix(uniMatrix1), matrix(uniMatrix2)));  // Restar matrices unidimensionales
        setResultMatrix(result);
      } else if (matrixType === 'bidimensional') {
        const result = matrix(subtract(matrix(biMatrix1), matrix(biMatrix2)));  // Restar matrices bidimensionales
        setResultMatrix(result);
      } else if (matrixType === 'tridimensional') {
        const result = matrix(subtract(matrix(triMatrix1), matrix(triMatrix2)));  // Restar matrices tridimensionales (Otro error jeje)
        setResultMatrix(result);
      }
    } catch (error: any) {
      console.error('Error en la operación de resta: ', error);
      setErrorMessage(`Error en la operación de resta: ${error.message}`);  // Muestra un mensaje de error
    }
  };

  // Función para renderizar el resultado de la operación de forma segura
  const renderMatrixResult = (result: Matrix | null) => {
    if (!result || !isMatrix(result)) return null;  // Verifica si el resultado es válido y es de tipo Matrix

    const resultArray = result.toArray() as any[];  // Convertimos el resultado a un array

    // Renderizado de matrices unidimensionales
    if (matrixType === 'unidimensional') {
      return (
        <table className="matrix-result">
          <tbody>
            <tr>
              {resultArray.map((value: number, index: number) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          </tbody>
        </table>
      );
    }

    // Renderizado de matrices bidimensionales
    if (matrixType === 'bidimensional') {
      return (
        <table className="matrix-result">
          <tbody>
            {resultArray.map((row: number[], rowIndex: number) => (
              <tr key={rowIndex}>
                {row.map((value: number, colIndex: number) => (
                  <td key={colIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    // Renderizado de matrices tridimensionales
    if (matrixType === 'tridimensional') {
      return resultArray.map((layer: number[][], depthIndex: number) => (
        <div key={depthIndex}>
          <h3>Capa {depthIndex + 1}</h3>
          <table className="matrix-result">
            <tbody>
              {layer.map((row: number[], rowIndex: number) => (
                <tr key={rowIndex}>
                  {row.map((value: number, colIndex: number) => (
                    <td key={colIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ));
    }
  };

  return (
    <div className="container">
      <h1>Calculadora de Matrices</h1>
      {/* Selector de tipo de matriz */}
      <label htmlFor="matrixType" className='label'>Selecciona el tipo de matriz: </label>
      <select id="matrixType" value={matrixType} onChange={handleMatrixTypeChange} data-testid="matrix-type-select">
        <option value="unidimensional">Unidimensional</option>
        <option value="bidimensional">Bidimensional</option>
        <option value="tridimensional">Tridimensional</option>
      </select>

      {/* Renderizado dinámico de componentes según el tipo de matriz seleccionado */}
      {matrixType === 'unidimensional' && (
        <UnidimensionalMatrix
          matrix1={uniMatrix1}
          matrix2={uniMatrix2}
          onMatrix1Change={(index, value) => {
            const newMatrix = [...uniMatrix1];
            newMatrix[index] = value;
            setUniMatrix1(newMatrix);  // Actualizamos la primera matriz unidimensional
          }}
          onMatrix2Change={(index, value) => {
            const newMatrix = [...uniMatrix2];
            newMatrix[index] = value;
            setUniMatrix2(newMatrix);  // Actualizamos la segunda matriz unidimensional
          }}
          addElementMatrix1={() => setUniMatrix1([...uniMatrix1, 0])}  // Agregamos un elemento a la primera matriz
          addElementMatrix2={() => setUniMatrix2([...uniMatrix2, 0])}  // Agregamos un elemento a la segunda matriz
        />
      )}

      {matrixType === 'bidimensional' && (
        <BidimensionalMatrix
          matrix1={biMatrix1}
          matrix2={biMatrix2}
          onMatrix1Change={(rowIndex, colIndex, value) => {
            const newMatrix = [...biMatrix1];
            newMatrix[rowIndex][colIndex] = value;
            setBiMatrix1(newMatrix);  // Actualizamos la primera matriz bidimensional
          }}
          onMatrix2Change={(rowIndex, colIndex, value) => {
            const newMatrix = [...biMatrix2];
            newMatrix[rowIndex][colIndex] = value;
            setBiMatrix2(newMatrix);  // Actualizamos la segunda matriz bidimensional
          }}
          addRowMatrix1={() => setBiMatrix1([...biMatrix1, Array(biMatrix1[0].length).fill(0)])}  // Agregamos una fila a la primera matriz
          addRowMatrix2={() => setBiMatrix2([...biMatrix2, Array(biMatrix2[0].length).fill(0)])}  // Agregamos una fila a la segunda matriz
          addColumnMatrix1={() => setBiMatrix1(biMatrix1.map(row => [...row, 0]))}  // Agregamos una columna a la primera matriz
          addColumnMatrix2={() => setBiMatrix2(biMatrix2.map(row => [...row, 0]))}  // Agregamos una columna a la segunda matriz
        />
      )}

      {matrixType === 'tridimensional' && (
        <TridimensionalMatrix
          matrix1={triMatrix1}
          matrix2={triMatrix2}
          onMatrix1Change={(depthIndex, rowIndex, colIndex, value) => {
            const newMatrix = [...triMatrix1];
            newMatrix[depthIndex][rowIndex][colIndex] = value;
            setTriMatrix1(newMatrix);  // Actualizamos la primera matriz tridimensional
          }}
          onMatrix2Change={(depthIndex, rowIndex, colIndex, value) => {
            const newMatrix = [...triMatrix2];
            newMatrix[depthIndex][rowIndex][colIndex] = value;
            setTriMatrix2(newMatrix);  // Actualizamos la segunda matriz tridimensional
          }}
          addDepthMatrix1={() =>
            setTriMatrix1([
              ...triMatrix1,
              Array(triMatrix1[0].length).fill(null).map(() => Array(triMatrix1[0][0].length).fill(0)),
            ])
          }  // Agregamos una capa a la primera matriz tridimensional
          addDepthMatrix2={() =>
            setTriMatrix2([
              ...triMatrix2,
              Array(triMatrix2[0].length).fill(null).map(() => Array(triMatrix2[0][0].length).fill(0)),
            ])
          }  // Agregamos una capa a la segunda matriz tridimensional
          addRowMatrix1={() => setTriMatrix1(triMatrix1.map(layer => [...layer, Array(layer[0].length).fill(0)]))}  // Agregamos una fila a la primera matriz tridimensional
          addRowMatrix2={() => setTriMatrix2(triMatrix2.map(layer => [...layer, Array(layer[0].length).fill(0)]))}  // Agregamos una fila a la segunda matriz tridimensional
          addColumnMatrix1={() => setTriMatrix1(triMatrix1.map(layer => layer.map(row => [...row, 0])))}  // Agregamos una columna a la primera matriz tridimensional
          addColumnMatrix2={() => setTriMatrix2(triMatrix2.map(layer => layer.map(row => [...row, 0])))}  // Agregamos una columna a la segunda matriz tridimensional
        />
      )}

      {/* Muestra un mensaje de error si ocurre algún problema */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Renderiza el resultado de la operación */}
      {resultMatrix && (
        <div className="result">
          <h2>Resultado:</h2>
          {renderMatrixResult(resultMatrix)}  {/* Renderiza el resultado según el tipo de matriz */}
        </div>
      )}
    </div>
  );
};

export default MatrixCalculator;

//
//
//
//
//
//
//
//
//
// Se intentó pero ne le entendí en absoluto
import { render, screen, fireEvent } from '@testing-library/react';
import MatrixCalculator from '../src/components/MatrixCalculator';
import { describe, it, expect } from 'vitest';

describe('MatrixCalculator Component', () => {
  it('should render the MatrixCalculator component', () => {
    render(<MatrixCalculator />);
    const titleElement = screen.getByText(/Calculadora de Matrices/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('should handle matrix addition for unidimensional matrices', () => {
    render(<MatrixCalculator />);
    
    // Cambiamos el tipo de matriz a unidimensional usando el select por su rol de combobox
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'unidimensional' } });
    
    // Cambiamos los valores de las matrices
    const inputMatrix1 = screen.getAllByRole('spinbutton')[0]; // Primer input para matrix1
    const inputMatrix2 = screen.getAllByRole('spinbutton')[1]; // Primer input para matrix2
    fireEvent.change(inputMatrix1, { target: { value: '2' } });
    fireEvent.change(inputMatrix2, { target: { value: '3' } });

    // Verificar que los valores han cambiado correctamente
    expect(inputMatrix1.value).toBe('2');
    expect(inputMatrix2.value).toBe('3');

    // Realizamos la operación de suma
    fireEvent.click(screen.getByText('Sumar Matrices'));

    // Comprobamos el resultado de la suma (2 + 3 = 5)
    const resultElement = screen.getByText('5');
    expect(resultElement).toBeInTheDocument();
  });

  it('should handle matrix subtraction for bidimensional matrices', () => {
    render(<MatrixCalculator />);
    
    // Cambiamos el tipo de matriz a bidimensional usando el select por su rol de combobox
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'bidimensional' } });
    
    // Cambiamos los valores de las matrices
    const inputMatrix1Row1Col1 = screen.getAllByRole('spinbutton')[0]; // Primer input para matrix1
    const inputMatrix2Row1Col1 = screen.getAllByRole('spinbutton')[1]; // Primer input para matrix2
    fireEvent.change(inputMatrix1Row1Col1, { target: { value: '6' } });
    fireEvent.change(inputMatrix2Row1Col1, { target: { value: '4' } });

    // Verificar que los valores han cambiado correctamente
    expect(inputMatrix1Row1Col1.value).toBe('6');
    expect(inputMatrix2Row1Col1.value).toBe('4');

    // Realizamos la operación de resta
    fireEvent.click(screen.getByText('Restar Matrices'));

    // Comprobamos el resultado de la resta (6 - 4 = 2)
    const resultElement = screen.getByText('2');
    expect(resultElement).toBeInTheDocument();
  });

  it('should handle matrix multiplication for tridimensional matrices', () => {
    render(<MatrixCalculator />);
    
    // Cambiamos el tipo de matriz a tridimensional usando el select por su rol de combobox
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'tridimensional' } });
    
    // Cambiamos los valores de las matrices
    const inputMatrix1Depth1Row1Col1 = screen.getAllByRole('spinbutton')[0]; // Primer input para matrix1
    const inputMatrix2Depth1Row1Col1 = screen.getAllByRole('spinbutton')[1]; // Primer input para matrix2
    fireEvent.change(inputMatrix1Depth1Row1Col1, { target: { value: '2' } });
    fireEvent.change(inputMatrix2Depth1Row1Col1, { target: { value: '3' } });

    // Verificar que los valores han cambiado correctamente
    expect(inputMatrix1Depth1Row1Col1.value).toBe('2');
    expect(inputMatrix2Depth1Row1Col1.value).toBe('3');

    // Realizamos la operación de multiplicación
    fireEvent.click(screen.getByText('Multiplicar Matrices'));

    // Comprobamos el resultado de la multiplicación (2 * 3 = 6)
    const resultElement = screen.getByText('6');
    expect(resultElement).toBeInTheDocument();
  });

  // Prueba para matrices bidimensionales más grandes
  it('should handle matrix addition for larger bidimensional matrices', () => {
    render(<MatrixCalculator />);
    
    // Cambiamos el tipo de matriz a bidimensional usando el select por su rol de combobox
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'bidimensional' } });
    
    // Cambiamos los valores de las matrices
    const inputs = screen.getAllByRole('spinbutton');
    fireEvent.change(inputs[0], { target: { value: '2' } });
    fireEvent.change(inputs[1], { target: { value: '3' } });
    fireEvent.change(inputs[2], { target: { value: '4' } });
    fireEvent.change(inputs[3], { target: { value: '5' } });

    // Verificar que los valores han cambiado correctamente
    expect(inputs[0].value).toBe('2');
    expect(inputs[1].value).toBe('3');
    expect(inputs[2].value).toBe('4');
    expect(inputs[3].value).toBe('5');

    // Realizamos la operación de suma
    fireEvent.click(screen.getByText('Sumar Matrices'));

    // Comprobamos el resultado de la suma (2+3, 4+5 = 5, 9)
    const resultElement1 = screen.getByText('5');
    const resultElement2 = screen.getByText('9');
    expect(resultElement1).toBeInTheDocument();
    expect(resultElement2).toBeInTheDocument();
  });

  // Prueba para error de dimensiones incompatibles
  it('should show an error message when trying to multiply matrices with incompatible dimensions', () => {
    render(<MatrixCalculator />);
    
    // Cambiamos el tipo de matriz a bidimensional usando el select por su rol de combobox
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'bidimensional' } });
    
    // Cambiamos los valores de las matrices con dimensiones incompatibles
    const inputs = screen.getAllByRole('spinbutton');
    fireEvent.change(inputs[0], { target: { value: '2' } });
    fireEvent.change(inputs[1], { target: { value: '3' } });
    fireEvent.change(inputs[2], { target: { value: '4' } });
    fireEvent.change(inputs[3], { target: { value: '5' } });

    // Realizamos la operación de multiplicación
    fireEvent.click(screen.getByText('Multiplicar Matrices'));

    // Comprobamos que aparece un mensaje de error
    const errorMessage = screen.getByText(/Las dimensiones de las matrices no son compatibles para la multiplicación/i);
    expect(errorMessage).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox component', () => {
  test('renders checkbox correctly', () => {
    render(
      <Checkbox id={1} isChecked={false} handleCheckboxChange={jest.fn()} />,
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test('checkbox is checked when isChecked is true', () => {
    render(
      <Checkbox id={1} isChecked={true} handleCheckboxChange={jest.fn()} />,
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('calls handleCheckboxChange on checkbox change', () => {
    const handleCheckboxChange = jest.fn();
    render(
      <Checkbox
        id={1}
        isChecked={false}
        handleCheckboxChange={handleCheckboxChange}
      />,
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleCheckboxChange).toHaveBeenCalledTimes(1);
  });
});

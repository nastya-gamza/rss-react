import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('CHECKBOX TEST', () => {
  const handleCheckboxChange = jest.fn();

  test('renders checkbox correctly', () => {
    render(
      <Checkbox
        id={1}
        isChecked={false}
        handleCheckboxChange={handleCheckboxChange}
      />,
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test('checkbox is checked when isChecked is true', () => {
    render(
      <Checkbox
        id={1}
        isChecked={true}
        handleCheckboxChange={handleCheckboxChange}
      />,
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('calls handleCheckboxChange on checkbox change', () => {
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

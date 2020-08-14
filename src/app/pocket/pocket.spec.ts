import { Pocket } from './pocket.model';
import { SavingFrequency } from './saving-frequency.enum';

describe('Pocket', () => {
  let pocket: Pocket;
  const startDate: Date = new Date(2019, 10, 11);
  const completionDate: Date = new Date(2020, 10, 11);

  beforeEach(() => {
    pocket = new Pocket(
      1,
      'TEST NAME',
      'TEST DESCRIPTION',
      5,
      100,
      1,
      SavingFrequency.MONTHLY,
      startDate,
      completionDate,
      false
    );
  });

  it('should create an instance with the expected values', () => {
    expect(pocket).toBeTruthy();
    expect(pocket.name).toBe('TEST NAME');
    expect(pocket.description).toBe('TEST DESCRIPTION');
    expect(pocket.currentBalance).toBe(5);
    expect(pocket.targetBalance).toBe(100);
    expect(pocket.savingAmount).toBe(1);
    expect(pocket.savingFrequency).toBe(SavingFrequency.MONTHLY);
    expect(pocket.startDate).toBe(startDate);
    expect(pocket.completionDate).toBe(completionDate);
    expect(pocket.isCompleted).toBeFalsy();
  });
});

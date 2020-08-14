import { SavingFrequency } from './saving-frequency.enum';

/**
 * The Pocket model
 */
export class Pocket {
  id: number;
  name: string;
  description: string;
  currentBalance: number;
  targetBalance: number;
  savingAmount: number;
  savingFrequency: SavingFrequency;
  startDate: Date;
  completionDate: Date;
  isCompleted: boolean;

  /**
   * Creates a new instance of a Pocket with the given parameters
   *
   * @param id The id
   * @param name The name
   * @param description the description
   * @param currentBalance the current balance
   * @param targetBalance the balance to achieve
   * @param savingAmount the amount to save
   * @param savingFrequency the frequency at which to save
   * @param startDate the start date
   * @param completionDate the completion date
   * @param isCompleted whetwer if the pocket is completed or not
   */
  constructor(
    id: number,
    name: string,
    description: string,
    currentBalance: number,
    targetBalance: number,
    savingAmount: number,
    savingFrequency: SavingFrequency,
    startDate: Date,
    completionDate: Date,
    isCompleted: boolean
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.currentBalance = currentBalance;
    this.targetBalance = targetBalance;
    this.savingAmount = savingAmount;
    this.savingFrequency = savingFrequency;
    this.startDate = startDate;
    this.completionDate = completionDate;
    this.isCompleted = isCompleted;
  }
}

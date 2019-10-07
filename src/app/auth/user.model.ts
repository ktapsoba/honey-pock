/**
 * Represents the user model
 */
export class User {
  /** The user id */
  id: string;

  /** The user name */
  name: string;

  /**
   * Creates a new instance of the user model
   *
   * @param id the id
   * @param name the name
   */
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

}

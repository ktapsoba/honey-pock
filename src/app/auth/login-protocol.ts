import { auth } from 'firebase';

/**
 *  Represents a login protocol
 */
export class LoginProtocol {
  /** The name of the provider */
  name: string;

  /** The provider instance */
  provider: auth.AuthProvider;

  /**
   * Creates a new instance of the login protocol
   *
   * @param name the protocol name
   * @param provider the protocol provider
   */
  constructor(name: string, provider: auth.AuthProvider) {
    this.name = name;
    this.provider = provider;
  }
}

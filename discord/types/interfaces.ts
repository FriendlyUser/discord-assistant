/**
 * Set of all interfaces that interacts with the discord functionality of the application.
 */

/**
  * @interface TodoObj has the property from the graphql interface
  * @property name of the string
  * @property id mongodb id
  */
 export interface TodoObj {
  start_date: string;
  end_date: string;
  name: string;
  category: string;
  priority: string;
  id: string;
}

/**
  * @interface ConfObj has the property from the graphql interface
  * @property start_date 
  */
 export interface HelpObj {
  readonly name: string;
  readonly category: string;
  readonly description: string;
  readonly usage: string;
  readonly list_args?: string[];
}

export interface ConfObj {
  readonly enabled: boolean
  readonly guildOnly?: boolean
  readonly aliases: string[]
  readonly permLevel?: string
}

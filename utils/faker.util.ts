import { faker } from '@faker-js/faker';

/**
 * Generates a random first name
 * @returns {string} Random first name
 */
export function generateFirstName(): string {
  return faker.person.firstName();
}

/**
 * Generates a random last name
 * @returns {string} Random last name
 */
export function generateLastName(): string {
  return faker.person.lastName();
}

/**
 * Generates a random full name
 * @returns {string} Random full name
 */
export function generateFullName(): string {
  return faker.person.fullName();
}

/**
 * Generates a random email address
 * @param {string} [domain] - Optional domain for the email
 * @returns {string} Random email address
 */
export function generateEmail(domain?: string): string {
  if (domain) {
    return faker.internet.email({ provider: domain });
  }
  return faker.internet.email();
}

/**
 * Generates a random username
 * @returns {string} Random username
 */
export function generateUsername(): string {
  return faker.internet.userName();
}

/**
 * Generates a random password
 * @param {number} [length=12] - Length of the password
 * @returns {string} Random password
 */
export function generatePassword(length: number = 12): string {
  return faker.internet.password({ length });
}

/**
 * Generates a random strong password with special characters
 * @returns {string} Random strong password
 */
export function generateStrongPassword(): string {
  const uppercase = faker.string.alpha({ length: 2, casing: 'upper' });
  const lowercase = faker.string.alpha({ length: 4, casing: 'lower' });
  const numbers = faker.string.numeric(3);
  const special = faker.helpers.arrayElement(['!', '@', '#', '$', '%', '&', '*']);
  return faker.helpers.shuffle([uppercase, lowercase, numbers, special].join('').split('')).join('');
}

/**
 * Generates a random phone number
 * @returns {string} Random phone number
 */
export function generatePhoneNumber(): string {
  return faker.phone.number();
}

/**
 * Generates a random address
 * @returns {string} Random address
 */
export function generateAddress(): string {
  return faker.location.streetAddress();
}

/**
 * Generates a random city
 * @returns {string} Random city
 */
export function generateCity(): string {
  return faker.location.city();
}

/**
 * Generates a random country
 * @returns {string} Random country
 */
export function generateCountry(): string {
  return faker.location.country();
}

/**
 * Generates a random URL
 * @returns {string} Random URL
 */
export function generateUrl(): string {
  return faker.internet.url();
}

/**
 * Generates a random number within a range
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
export function generateRandomNumber(min: number, max: number): number {
  return faker.number.int({ min, max });
}

/**
 * Generates a random sentence
 * @param {number} [wordCount=5] - Number of words in the sentence
 * @returns {string} Random sentence
 */
export function generateSentence(wordCount: number = 5): string {
  return faker.lorem.sentence(wordCount);
}

/**
 * Generates a random paragraph
 * @param {number} [sentenceCount=3] - Number of sentences in the paragraph
 * @returns {string} Random paragraph
 */
export function generateParagraph(sentenceCount: number = 3): string {
  return faker.lorem.paragraph(sentenceCount);
}

/**
 * Generates a random date in the past
 * @param {number} [years=1] - Number of years in the past
 * @returns {Date} Random past date
 */
export function generatePastDate(years: number = 1): Date {
  return faker.date.past({ years });
}

/**
 * Generates a random date in the future
 * @param {number} [years=1] - Number of years in the future
 * @returns {Date} Random future date
 */
export function generateFutureDate(years: number = 1): Date {
  return faker.date.future({ years });
}

/**
 * Generates a random unique identifier
 * @returns {string} Random UUID
 */
export function generateUUID(): string {
  return faker.string.uuid();
}

/**
 * Generates a random test framework name from a predefined list
 * @returns {string} Random test framework name
 */
export function generateTestFramework(): string {
  const frameworks = [
    'Selenium WebDriver',
    'Playwright',
    'Cypress',
    'Jest',
    'TestNG',
    'JUnit',
    'Mocha',
    'Jasmine',
    'Puppeteer',
    'WebDriverIO',
  ];
  return faker.helpers.arrayElement(frameworks);
}

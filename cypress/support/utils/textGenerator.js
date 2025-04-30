import { faker } from '@faker-js/faker';

// Generates a random subject consisting of 5 words using Faker
export function generateRandomSubject() {
  return faker.lorem.words(5);
}

// Generates a random description consisting of 5 sentences, each with 8-12 words
export function generateRandomDescription() {
  const sentences = Array.from({ length: 5 }, () => {
    const wordCount = Math.floor(Math.random() * (12 - 8) + 8); // Random word count between 8 and 12
    return faker.lorem.sentence(wordCount);
  });
  return sentences.join(" ");
}

// Generates random subject and description, writes them to files, and returns them as an object
export function generateAndSaveStoryText() {
  const subject = generateRandomSubject();
  const description = generateRandomDescription();
  cy.writeFile("cypress/fixtures/generatedSubject.txt", subject);
  cy.writeFile("cypress/fixtures/generatedDescription.txt", description);
  return { subject, description };
}

// Generates a random sprint name with a numeric identifier
export function generateRandomSprintName() {
  return `Sprint-${Math.floor(Math.random() * 10000)}`;
}



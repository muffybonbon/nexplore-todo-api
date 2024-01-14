import { seedDatabase } from '../../seed';

const globalSetup = async () => {
  await seedDatabase();
};

export default globalSetup;

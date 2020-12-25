const app = require('./app');
const { startDatabase } = require('./database/mongo');

const port = process.env.PORT || 3000;
const address = 'localhost' || '0.0.0.0';

const startMongo = async () => {
  await startDatabase();
};

app.listen(port, address, () => {
  startMongo();
  console.log(`✅ Express server started with ${address}:${port}`);
});

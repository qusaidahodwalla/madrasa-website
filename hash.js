const bcrypt = require("bcryptjs");

async function run() {
  const plain = "Test1234!"; // change this if you want
  const hash = await bcrypt.hash(plain, 10);
  console.log("PLAIN:", plain);
  console.log("HASH:", hash);
}

run();

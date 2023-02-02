const hre = require("hardhat");

async function main() {
  const contractSwap = await ethers.getContractFactory("Swap");
  const swapDeploy = await contractSwap.deploy();
  await swapDeploy.deployed();
  console.log("Contract Deployed", swapDeploy.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

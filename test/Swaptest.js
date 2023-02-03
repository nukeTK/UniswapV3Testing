const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Uniswap Contract Single Swap", () => {
  let WETH9, DAI, weth, accounts, dai, swapDeploy, SwapExample;

  before(async () => {
    WETH9 = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
    DAI = "0x6b175474e89094c44da98b954eedeac495271d0f";
    weth = await ethers.getContractAt("IWETH", WETH9);
    accounts = await ethers.getSigners();
    dai = await ethers.getContractAt("IERC20", DAI);

    SwapExample = await ethers.getContractFactory("Swap");
    swapDeploy = await SwapExample.deploy();
    await swapDeploy.deployed();
  });
   it("SwapExactSingleInput Function", async () => {
    const amountIn = 10n ** 18n;

    await weth.connect(accounts[0]).deposit({ value: amountIn });
    await weth.connect(accounts[0]).approve(swapDeploy.address, amountIn);

    await swapDeploy.swapExactInputSingle(amountIn);

    console.log("DAI balance", await dai.balanceOf(accounts[0].address));
  });
  it("SwapExactOuputSingle Function", async () => {
    const wethAmountInMax  = 10n ** 18n;
    const daiAmountOut = 100n * 10n ** 18n;
    await weth.connect(accounts[0]).deposit({ value: wethAmountInMax  });
    await weth.connect(accounts[0]).approve(swapDeploy.address, wethAmountInMax );

    await swapDeploy.swapExactOutputSingle(daiAmountOut, wethAmountInMax);

    console.log("Dai balance", await dai.balanceOf(accounts[0].address));
  }); 

  it("swapExactInputMultihop Function", async () => {
    const amountIn = 10n ** 18n;
   
    await weth.connect(accounts[0]).deposit({ value: amountIn  });
    await weth.connect(accounts[0]).approve(swapDeploy.address, amountIn );
    
    await swapDeploy.swapExactInputMultihop(amountIn);

    console.log("Dai balance", await dai.balanceOf(accounts[0].address));
  });

  it("swapExactInputMultihop Function", async () => {
    const wethAmountInMax  = 10n ** 18n;
    const daiAmountOut = 100n * 10n ** 18n;
    await weth.connect(accounts[0]).deposit({ value: wethAmountInMax  });
    await weth.connect(accounts[0]).approve(swapDeploy.address, wethAmountInMax );
    
    await swapDeploy.swapExactOutputMultihop(daiAmountOut, wethAmountInMax);

    console.log("Dai balance", await dai.balanceOf(accounts[0].address));
  });

});

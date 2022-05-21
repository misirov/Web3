// https://docs.ethers.io/v5/api/contract/contract/#contract-functionsSend

Simple exercise

I want the bot to:

call a function contract:

- depending on how much gas each of the bots used, the tx will end up higher or lower in the block

The idea is to test if i can programatically make bot_1 always land transactions higher in the block than bot_2 by paying more gas
Both tx's will be executed 'almost' simultaneously, in fact giving bot_2 a ms advantage.

- execute tx's (bot_2 first) calling a contract
- pay more gas with bot_1
- watch block, identify tx's, report observations.

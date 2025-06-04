# Srajtaśma

An amazing web app for managing the household budget.

It would allow adding receipts for stuff you bought and requesting items to be bought.\
Then based on the receipts it would display who is the most behind in terms of contributing to the budget. In other words who spent the least money and, as such, who's turn it is to go shopping for the requested items.\
The idea was to remove the need for exchanging money between the household memebers.

Yes. It was abandoned... who would have thought! But some of the core functionality was actually implemented, see the video below.

<video src="https://github.com/user-attachments/assets/6e697979-6a90-4c82-ac5d-a2e42691e38f"></video>

# run

0. MongoDB 6.x with `srajtasma` database created (can be empty).
1. Backend: `npm i` `npm run start`
2. Frontend: `cd client` `npm i` `npm run build` `npm run start`

# develop

**Use prettier!**\
Run the Svelte compiler in the `client` folder: `npm i` `npm run dev` \
Remember to build with `npm run build` for production!
